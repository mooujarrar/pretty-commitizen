import * as vscode from 'vscode';
import * as path from 'path';
import { SidebarProvider } from './SidebarProvider'; // <--- 1. Import the provider

export function activate(context: vscode.ExtensionContext) {
  
  console.log('Congratulations, your extension "pretty-commitizen" is now active!');
  
  // --- NEW: Register the Sidebar Provider ---
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "pretty-commitizen.launcher", // Must match the ID in your package.json 'views'
      sidebarProvider
    )
  );
  
  // --- EXISTING: The Main Command ---
  const disposable = vscode.commands.registerCommand('pretty-commitizen.run', () => {
    
    // 1. Create the Webview Panel
    const panel = vscode.window.createWebviewPanel(
      'pretty-commitizen',
      'Pretty Commitizen: your best commit message generator',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
      }
    );
    
    // 2. Load the HTML content
    panel.webview.html = getWebviewContent(panel.webview, context.extensionPath);
    
    // 3. Handle messages
    panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case 'webviewLoaded':
            sendConfig(panel);
            return;
          case 'submit':
            const gitExtension = vscode.extensions.getExtension('vscode.git');
            if (!gitExtension) {
              vscode.window.showErrorMessage('Git extension not found');
              return;
            }
            
            const git = gitExtension.exports.getAPI(1);
            const repo = git.repositories[0];
            
            if (!repo) {
              vscode.window.showErrorMessage('No Git repository found');
              return;
            }
            
            try {
              await repo.commit(message.text);
              vscode.window.showInformationMessage('Commit created successfully!');
              panel.dispose();
            } catch (err) {
              vscode.window.showErrorMessage('Failed to commit. Did you stage your changes?');
              console.error(err);
            }
            return;
        }
      },
      undefined,
      context.subscriptions
    );
  });
  
  context.subscriptions.push(disposable);
}

export function deactivate() {}

// --- HELPERS (Keep these exactly as they were) ---

function sendConfig(panel: vscode.WebviewPanel) {
  const config = vscode.workspace.getConfiguration('pretty-commitizen');
  const rawReviewers = config.get('reviewers');
  const prefix = config.get('issue-prefix');
  
  let reviewers: any[] = [];
  if (Array.isArray(rawReviewers) && rawReviewers.length > 0) {
    reviewers = rawReviewers;
  } else {
    reviewers = [
      { name: "Please configure reviewers in settings", value: "" }
    ];
  }
  
  panel.webview.postMessage({ command: 'init', data: { reviewers, prefix } });
}

function getWebviewContent(webview: vscode.Webview, extensionPath: string) {
  const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionPath, 'media', 'index.js')));
  const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionPath, 'media', 'index.css')));
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource}; script-src ${webview.cspSource};">
        <link rel="stylesheet" type="text/css" href="${styleUri}">
        <title>Pretty Commitizen UI</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="${scriptUri}"></script>
      </body>
    </html>
    `;
}

