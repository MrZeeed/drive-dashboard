# Drive Dashboard

A Google Apps Script dashboard for browsing and managing files inside one configured Google Drive folder.

## Implemented features

- Browse the configured root and its descendant folders.
- Return to ancestor folders with Back, breadcrumbs or All Files.
- Search file and folder names in the current folder without a new server request.
- Preview a file in a labelled panel or open the Drive preview in a new tab.
- Rename files and move files to Google Drive Trash, with confirmation for trash actions.
- Recover from listing or mutation failures using a visible status and retry control.
- Use the responsive layout and keyboard controls, including Escape to close previews.

Upload, Recent, Starred and a Trash browser are not implemented. This project uses the built-in Apps Script **DriveApp** service; it does not require enabling the Advanced Drive API for the current code.

## Source files

| File | Purpose |
| --- | --- |
| `Code.gs` | Apps Script server and root-folder checks |
| `index.html` | Dashboard UI; create an Apps Script HTML file named `index` |
| `tests/server.test.mjs` | Server checks using fake Drive objects |

The earlier `.txt` filenames were source attachments. Use the files above when importing the project.

## Set up in Apps Script

1. Create a project at [Google Apps Script](https://script.google.com/).
2. Paste `Code.gs` into its script file.
3. Add an HTML file named **index** and paste the contents of `index.html`.
4. Set `ROOT` to the ID of a folder you own or are authorised to manage. The ID is the final part of that folder's Drive URL. Keep actual folder IDs out of public commits.
5. Use **Deploy → Test deployments** for initial testing and complete Google's authorisation flow yourself.
6. When creating a web-app deployment, choose its execution identity and access deliberately. For personal use, restrict access to yourself. The dashboard can rename and trash files, so do not expose an owner-executed deployment to anonymous visitors.
7. Open the Apps Script web-app URL. A normal static host or `file://` preview cannot provide `google.script.run` or access Drive through this project.

The server checks that listed folders and mutated files are under `ROOT`. That check limits the managed folder tree; the deployment's access settings still control who may use the app. Drive permissions can also prevent an operation even when the item is inside the root. Shortcuts are not followed as folder navigation.

## Check the source

With Node.js installed, run:

```bash
node tests/server.test.mjs
```

These tests use fake Drive objects and never access an account or modify real files. They check unset configuration, root and descendant access, traversal cycles, invalid IDs, rename validation and rejection of mutations outside the root.

In an Apps Script test deployment, check root listing, nested navigation, search, retry after an unavailable folder, a quote-containing filename, preview close and a phone-width layout. Test rename and Trash only with disposable files you own. Live Google authentication, permissions and real-file operations still require that deployment check.

## Common problems

| Problem | Next step |
| --- | --- |
| HTML file cannot be found | Create an Apps Script HTML file named `index`, matching `doGet()` |
| ROOT configuration message | Replace the placeholder in your private Apps Script project |
| A folder or file is rejected | Confirm it is inside the configured root and accessible to the execution identity |
| Notes about Apps Script when opened locally | Open the deployed web app; the static file alone has no backend |
| No search matches | Clear the query or navigate to the folder that contains the item |

## Official references

- [Apps Script web apps](https://developers.google.com/apps-script/guides/web)
- [Browser-to-server calls](https://developers.google.com/apps-script/guides/html/communication)
- [DriveApp service](https://developers.google.com/apps-script/reference/drive)

No live demo or screenshot is supplied in this repository. Add a link only when a deployment is ready for its intended audience.
