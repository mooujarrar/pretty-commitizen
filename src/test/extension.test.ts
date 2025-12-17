import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');
  
  // test('Extension should be present', () => {
  //   const extension = vscode.extensions.getExtension('mohyiddine.pretty-commitizen'); // Use your Publisher.Name
  //   assert.ok(extension, 'Extension should be found');
  // });
  
  // test('Extension should activate', async () => {
  //   const extension = vscode.extensions.getExtension('mohyiddine.pretty-commitizen');
  //   // This triggers your activate() function
  //   await extension?.activate();
  //   assert.strictEqual(extension?.isActive, true);
  // });
  
  test('Git Extension should be available', () => {
    const gitExtension = vscode.extensions.getExtension('vscode.git');
    assert.ok(gitExtension, 'Built-in Git extension should be available');
  });
  
  test('Git API should be accessible', async () => {
    const gitExtension = vscode.extensions.getExtension('vscode.git');
    const gitApi = gitExtension?.exports.getAPI(1);
    assert.ok(gitApi, 'Git API v1 should be accessible');
  });
  
  test('Configuration should load default settings', () => {
    const config = vscode.workspace.getConfiguration('pretty-commitizen');
    
    // Test that we can read the prefix
    const prefix = config.get('issue-prefix');
    assert.strictEqual(prefix, 'JIRA', 'Default prefix should be JIRA');
    
    // Test that reviewers is an array
    const reviewers = config.get('reviewers');
    assert.ok(Array.isArray(reviewers), 'Reviewers should be an array by default');
  });
});