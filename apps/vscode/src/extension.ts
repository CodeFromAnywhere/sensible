import * as vscode from "vscode";
import { WebviewPanel, getWebviewOptions } from "./webview";

function openFiles(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand("vscode.openFiles", async (data) => {
    let uri = vscode.workspace.workspaceFolders;
    if (uri && uri.length > 0 && data) {
      const types = vscode.Uri.file(
        `${uri[0].uri.path}/packages/core/src/${data}/types.ts`
      );
      const endpoints = vscode.Uri.file(
        `${uri[0].uri.path}/packages/core/src/${data}/endpoints.ts`
      );
      const api = vscode.Uri.file(
        `${uri[0].uri.path}/apps/server/src/${data}/api.ts`
      );
      const model = vscode.Uri.file(
        `${uri[0].uri.path}/apps/server/src/${data}/model.ts`
      );
      const ui = vscode.Uri.file(
        `${uri[0].uri.path}/packages/ui/src/${data}/index.ts`
      );
      await WebviewPanel.createOrShow(context.extensionUri);
      await vscode.commands.executeCommand("vscode.setEditorLayout", {
        orientation: 0,
        groups: [
          { groups: [{}, {}], size: 0.5 },
          { groups: [{}, {}], size: 0.5 },
          { groups: [{}, {}], size: 0.5 },
        ],
      });
      await vscode.commands.executeCommand("workbench.action.focusNextGroup");
      await vscode.commands.executeCommand("vscode.open", types);
      await vscode.commands.executeCommand("workbench.action.focusNextGroup");
      await vscode.commands.executeCommand("vscode.open", api);
      await vscode.commands.executeCommand("workbench.action.focusNextGroup");
      await vscode.commands.executeCommand("vscode.open", endpoints);
      await vscode.commands.executeCommand("workbench.action.focusNextGroup");
      await vscode.commands.executeCommand("vscode.open", model);
      await vscode.commands.executeCommand("workbench.action.focusNextGroup");
      await vscode.commands.executeCommand("vscode.open", ui);
      await vscode.commands.executeCommand("workbench.action.focusNextGroup");
    }
  });
}

function openModule() {
  return vscode.commands.registerCommand("vscode.openmodule", async () => {
    let input =
      (await vscode.window.showInputBox({
        prompt: "Paste a Module name",
        placeHolder: "Type a module name",
        value: "user",
      })) || "";
    vscode.commands.executeCommand("vscode.openFiles", input);
    vscode.window.showInformationMessage(input);
  });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(openFiles(context));
  context.subscriptions.push(openModule());
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(WebviewPanel.viewType, {
      async deserializeWebviewPanel(
        webviewPanel: vscode.WebviewPanel,
        state: any
      ) {
        webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
        WebviewPanel.revive(webviewPanel, context.extensionUri);
      },
    });
  }
}

export function deactivate() {}
