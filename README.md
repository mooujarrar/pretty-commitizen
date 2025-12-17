# Pretty Commitizen for VS Code

<div align="center">
  <img src="https://raw.githubusercontent.com/mooujarrar/pretty-commitizen/refs/heads/main/assets/logo.png" width="800" alt="Pretty Commitizen Logo" />
  <h1>Pretty Commitizen</h1>
  <b>Interactive. Configurable. Beautiful.</b>
</div>

**"Pretty Commitizen"** is a VS Code extension that transforms the mundane task of writing commit messages into a smooth, interactive experience. It replaces the standard text input with a modern, step-by-step wizard to ensure your team's commit conventions are followed perfectly every time.

Say goodbye to "fix bug" messages. Pretty Commitizen enforces a standardized format like:
`feat#JIRA-123; New login API implementation ;Alice;Bob`

-----

## ✨ Features

* **Interactive Wizard:** A beautiful, animated UI slides you through the commit process step-by-step.
* **Smart Logic:**
  * **Bugs:** Automatically skips the "Issue Number" step (as internal bugs often lack external IDs).
  * **Features/Fixes:** Enforces mandatory issue numbers.
  * **Maintenance/Docs:** Makes issue numbers optional.
* **Strict Formatting:** Automatically generates the schema: `<type>[#<prefix>-<issue>]; <message> ;<reviewer1>;<reviewer2>`.
* **Configurable Reviewers:** Define your team's reviewers directly in your VS Code settings.
* **Custom Prefix:** Set a global prefix (e.g., "JIRA", "PROJ") that is automatically prepended to ticket numbers.
* **Seamless Git Integration:** Commits your staged changes directly from the extension.

-----

## 🚀 How to Use

1. **Stage your changes** in the VS Code Source Control tab.
2. Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P`).
3. Run the command: `Run Pretty Commitizen`.
4. Follow the interactive steps:
   * **Select Type:** Choose from 'feat', 'fix', 'bug', 'maint', 'enh', or 'docs'.
   * **Issue Number:** Enter the ticket number (smartly skipped or required based on type).
   * **Description:** Write a short, clear summary.
   * **Reviewers:** Select technical and functional reviewers from your configured list.
5. **Preview & Commit:** Review the generated string and click **"Commit"**.

-----

## ⚙️ Configuration

You can customize the extension to match your project's workflow via **Settings** (`Ctrl+,`) or by editing `.vscode/settings.json`.

### 1\. Configure Reviewers

Define the list of team members available for selection.

**Key:** `pretty-commitizen.reviewers`

```json
"pretty-commitizen.reviewers": [
  { "name": "Alice (Lead)", "value": "Alice" },
  { "name": "Bob (Backend)", "value": "Bob" },
  { "name": "Charlie (QA)", "value": "Charlie" }
]
```

### 2\. Set Issue Prefix

Define the prefix to automatically add to issue numbers. For example, if your prefix is "JIRA" and you enter "450", the result will be "JIRA-450".

**Key:** `pretty-commitizen.issue-prefix`

```json
"pretty-commitizen.issue-prefix": "JIRA"
```

-----

## 📦 Installation

1. Open **VS Code**.
2. Go to the **Extensions** view (`Ctrl+Shift+X`).
3. Search for **"Pretty Commitizen"**.
4. Click **Install**.

-----

## 🔧 Requirements

* VS Code version 1.103.0 or higher.
* A Git repository initialized in your workspace.

-----

## 🤝 Contributing

Found a bug or have a feature request? We welcome contributions\!

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

-----

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

-----

**Publisher:** mohyiddine oujarrar (@mooujarrar)
**Contact:** mohyiddineoujarrar@gmail.com