import * as vscode from "vscode";
import { WebviewHelper } from "@estruyf/vscode";

export function getWebviewOptions(
  extensionUri: vscode.Uri
): vscode.WebviewOptions {
  return {
    enableScripts: true,
    localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
  };
}

export class WebviewPanel {
  public static currentPanel: WebviewPanel | undefined;
  public static readonly viewType = "webviewdocs";
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static async createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    if (WebviewPanel.currentPanel) {
      WebviewPanel.currentPanel._panel.reveal(column);
      return;
    }
    const panel = vscode.window.createWebviewPanel(
      WebviewPanel.viewType,
      "Docs",
      column || vscode.ViewColumn.One,
      getWebviewOptions(extensionUri)
    );
    WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public doRefactor() {
    this._panel.webview.postMessage({ command: "refactor" });
  }

  public dispose() {
    WebviewPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    const webview = this._panel.webview;
    this._panel.title = "Docs";
    this._panel.webview.html = this._getHtmlForWebview(webview, "Docs");
  }

  private _getHtmlForWebview(webview: vscode.Webview, catGifPath: string) {
    const nonce = WebviewHelper.getNonce();
    return `<!DOCTYPE html> 
                <html lang="en"> 
                <head>
                    <meta charset="UTF-8"> 
                    <!--
                        Use a content security policy to only allow loading images from https or from our extension directory,
                        and only allow scripts that have a specific nonce.
                    -->
                   <meta http-equiv="Content-Security-Policy" content="default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob 'nonce-${nonce}': data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Sensible Docs</title>
                </head>
                <body style="padding:0">
                <iframe frameBorder="0" width="100%"  style="height:100vh" src="https://www.sensiblestack.com" title="Google">
                </iframe>
                </body>
                </html>`;
  }
}
