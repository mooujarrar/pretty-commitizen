import * as vscode from 'vscode';

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  
  constructor(private readonly _extensionUri: vscode.Uri) {}
  
  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;
    
    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    
    // Listen for the button click from the UI
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "start-wizard": {
          // Trigger the existing command to open the full modal
          vscode.commands.executeCommand("pretty-commitizen.run");
          break;
        }
      }
    });
  }
  
  private _getHtmlForWebview(webview: vscode.Webview) {
    // Inline CSS for the launcher button matching VS Code theme
    const style = `
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 10px;
        text-align: center;
      }
      button {
        background: var(--vscode-button-background);
        color: var(--vscode-button-foreground);
        border: none;
        padding: 10px 20px;
        width: 80%;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        cursor: pointer;
        border-radius: 4px;
      }
      button:hover {
        background: var(--vscode-button-hoverBackground);
      }
      p {
        color: var(--vscode-descriptionForeground);
        font-size: 0.9em;
        margin-bottom: 20px;
      }
    `;
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'sidebar.js'));
    
    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${style}</style>
        </head>
        <body>
          <p>Ready to generate your pretty commit message?</p>
          <button id="startBtn">Start Wizard</button>
          <script src="${scriptUri}"></script>
        </body>
      </html>`;
  }
}