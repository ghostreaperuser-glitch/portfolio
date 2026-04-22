# GhostR Software — Setup Guide

## Your repo should look like this on GitHub:

```
your-repo/
├── index.html
├── contributions.html
├── manifest.json
├── sw.js
├── .nojekyll
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── minez.jpeg
    ├── icon-192.png       ← PWA icon (included)
    ├── icon-512.png       ← PWA icon (included)
    └── docs/              ← upload contributor documents here
        └── semester-1/
            └── dr-grace-os-notes.pdf
```

---

## ① Connect Your Google Sheet (Contributions Page)

### Step 1 — Create the Google Sheet

Go to [sheets.google.com](https://sheets.google.com) and create a new sheet.
In **Row 1**, add these exact headers (copy-paste this row):

```
name	role	department	avatar_url	doc1_name	doc1_url	doc2_name	doc2_url	doc3_name	doc3_url	semester	filter_tag
```

### Step 2 — Fill in contributors (one per row)

| Column | What to put |
|---|---|
| `name` | Full name, e.g. `Dr. Ahereza Grace` |
| `role` | `Lecturer` or `Student` |
| `department` | e.g. `Computer Science` |
| `avatar_url` | Direct photo link, or leave blank (shows coloured initials) |
| `doc1_name` | File name shown on site, e.g. `Operating Systems Notes.pdf` |
| `doc1_url` | Raw GitHub URL (see below) |
| `doc2_name` / `doc2_url` | Second doc, or leave blank |
| `doc3_name` / `doc3_url` | Third doc, or leave blank |
| `semester` | e.g. `Semester 1 · 2025` |
| `filter_tag` | One of: `lecturer` `student` `cs` `eng` |

### Step 3 — Get the GitHub raw URL for a document

1. Upload the PDF/doc to your GitHub repo under `images/docs/`
2. Click the file on GitHub → click **Raw** button
3. Copy that URL — it looks like:
   `https://raw.githubusercontent.com/ghostreaperuser-glitch/YOUR-REPO/main/images/docs/filename.pdf`

### Step 4 — Publish the Sheet as CSV

1. **File → Share → General access → "Anyone with the link" → Viewer → Done**
2. **File → Share → Publish to web**
3. Choose **Sheet1** and **Comma-separated values (.csv)**
4. Click **Publish** → Copy the URL

### Step 5 — Paste the URL into contributions.html

Open `contributions.html` and find this line near the top of the `<script>`:

```javascript
const SHEET_CSV_URL = 'YOUR_GOOGLE_SHEET_CSV_PUBLISH_URL_HERE';
```

Replace the placeholder with your CSV URL. Save and push to GitHub. Done!

**That's it — to add a new contributor in future, just add a new row to your Google Sheet. No code changes needed.**

---

## ② PWA — Install as App on Any Device

Your site now works as an installable app on every platform:

| Device | How to install |
|---|---|
| **Android (Chrome)** | Visit site → tap ⋮ menu → "Add to Home screen" or "Install app" |
| **iPhone / iPad (Safari)** | Visit site → tap Share icon → "Add to Home Screen" |
| **Windows (Chrome/Edge)** | Visit site → click install icon in address bar (⊕) |
| **Mac (Chrome/Edge)** | Visit site → click install icon in address bar (⊕) |

The app will open full-screen without any browser chrome, just like a native app.

---

## ③ GitHub Security — Your repo is safe

- **Public repo = read-only for everyone except you.**
- Nobody can push, edit, or delete your files unless you add them as a Collaborator.
- Your Google Sheet data is also read-only (Viewer access).
- If you ever want to be extra careful, enable **Branch protection rules**:
  `Settings → Branches → Add rule → Require pull request before merging`