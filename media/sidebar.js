// Sidebar launcher script (externalized to allow stricter CSP)
const vscode = acquireVsCodeApi();
const startBtn = document.getElementById('startBtn');
if (startBtn) {
  startBtn.addEventListener('click', () => {
    vscode.postMessage({ type: 'start-wizard' });
  });
}
