// Configure the ID of the folder this dashboard may manage.
var ROOT = "PASTE_YOUR_FOLDER_ID_HERE";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function validId_(id) {
  if (typeof id !== "string" || !/^[A-Za-z0-9_-]+$/.test(id)) {
    throw new Error("A valid Drive item ID is required.");
  }
  return id;
}

function rootId_() {
  if (!ROOT || ROOT === "PASTE_YOUR_FOLDER_ID_HERE") {
    throw new Error("Set ROOT in Code.gs to your Google Drive folder ID first.");
  }
  return validId_(ROOT);
}

function isWithinRoot_(folder, rootId) {
  var queue = [folder];
  var visited = Object.create(null);
  var inspected = 0;
  while (queue.length && inspected < 128) {
    var current = queue.shift();
    var id = current.getId();
    if (id === rootId) return true;
    if (visited[id]) continue;
    visited[id] = true;
    inspected++;
    var parents = current.getParents();
    while (parents.hasNext()) queue.push(parents.next());
  }
  return false;
}

function requireFolder_(id) {
  var rootId = rootId_();
  var folder = DriveApp.getFolderById(validId_(id || rootId));
  if (!isWithinRoot_(folder, rootId)) {
    throw new Error("This folder is outside the configured dashboard folder.");
  }
  return folder;
}

function requireFile_(id) {
  var rootId = rootId_();
  var file = DriveApp.getFileById(validId_(id));
  var parents = file.getParents();
  while (parents.hasNext()) {
    if (isWithinRoot_(parents.next(), rootId)) return file;
  }
  throw new Error("This file is outside the configured dashboard folder.");
}

function getFiles(folderId) {
  var folder = requireFolder_(folderId);
  var data = { name: folder.getName(), id: folder.getId(), folders: [], files: [] };
  var subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    var child = subfolders.next();
    data.folders.push({ name: child.getName(), id: child.getId() });
  }
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    data.files.push({
      name: file.getName(), id: file.getId(),
      preview: "https://drive.google.com/file/d/" + encodeURIComponent(file.getId()) + "/preview"
    });
  }
  return data;
}

function deleteFile(id) {
  requireFile_(id).setTrashed(true);
}

function renameFile(id, newName) {
  if (typeof newName !== "string" || !newName.trim() || newName.trim().length > 255) {
    throw new Error("Enter a filename between 1 and 255 characters.");
  }
  requireFile_(id).setName(newName.trim());
}
