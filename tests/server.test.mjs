import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const iterator = values => {
  let index = 0;
  return { hasNext: () => index < values.length, next: () => values[index++] };
};
const folders = new Map();
const files = new Map();
function folder(id, parents = []) {
  const value = { getId: () => id, getName: () => id,
    getParents: () => iterator(parents.map(parent => folders.get(parent))),
    getFolders: () => iterator([...folders.values()].filter(item => item.parents.includes(id))),
    getFiles: () => iterator([...files.values()].filter(item => item.parents.includes(id))), parents };
  folders.set(id, value);
  return value;
}
function file(id, parents) {
  const value = { name: id, trashed: false, parents, getId: () => id,
    getName: () => value.name, getParents: () => iterator(parents.map(parent => folders.get(parent))),
    setName: name => { value.name = name; }, setTrashed: trashed => { value.trashed = trashed; } };
  files.set(id, value);
  return value;
}
folder("outside"); folder("root", ["outside"]); folder("child", ["root"]); folder("deep", ["child"]);
folder("cycle-a", ["cycle-b"]); folder("cycle-b", ["cycle-a"]);
const inside = file("inside-file", ["deep"]);
const outsider = file("outside-file", ["outside"]);
const context = vm.createContext({ DriveApp: {
  getFolderById: id => { assert.ok(folders.has(id)); return folders.get(id); },
  getFileById: id => { assert.ok(files.has(id)); return files.get(id); }
}, HtmlService: { createHtmlOutputFromFile: name => name } });
vm.runInContext(readFileSync(new URL("../Code.gs", import.meta.url), "utf8"), context);
assert.equal(context.doGet(), "index");
assert.throws(() => context.getFiles(), /Set ROOT/);
context.ROOT = "root";
assert.equal(context.getFiles().id, "root");
assert.equal(context.getFiles("deep").files[0].id, "inside-file");
assert.throws(() => context.getFiles("outside"), /outside the configured/);
assert.throws(() => context.getFiles("cycle-a"), /outside the configured/);
assert.throws(() => context.getFiles("bad/id"), /valid Drive item ID/);
assert.throws(() => context.renameFile("outside-file", "renamed"), /outside the configured/);
assert.equal(outsider.name, "outside-file");
assert.throws(() => context.deleteFile("outside-file"), /outside the configured/);
assert.equal(outsider.trashed, false);
assert.throws(() => context.renameFile("inside-file", "  "), /filename/);
assert.throws(() => context.renameFile("inside-file", "x".repeat(256)), /filename/);
context.renameFile("inside-file", "  useful name.pdf  ");
assert.equal(inside.name, "useful name.pdf");
context.deleteFile("inside-file");
assert.equal(inside.trashed, true);
console.log("Passed: root and descendant listing, traversal cycles, invalid IDs, rename validation and out-of-root mutation protection.");
