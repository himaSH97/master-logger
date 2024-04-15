import * as vscode from "vscode";
import { getStatement } from "./utils/utils";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("master-logger.wrapInStatement", async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage("Editor not found!");
      return;
    }

    const editorLanguage = editor.document.languageId;
    if (editorLanguage !== "python") {
      vscode.window.showErrorMessage("Only Python supported for now!");
      return;
    }

    const insertSpaces = editor.options.insertSpaces;

    if (insertSpaces) {
      const options: vscode.QuickPickItem[] = [
        { label: "Yes", description: "Enable tab indentation" },
        { label: "No", description: "Keep using spaces for indentation" },
      ];
      const pick = await vscode.window.showQuickPick(options, {
        placeHolder: "Do you want to enable tab indentation to continue using this extension?",
      });

      if (!pick) {
        return;
      }

      if (pick.label === "No") {
        vscode.window.showInformationMessage(`Please Enable tab indentation to continue using this extension`);
        return;
      }
      
      if (pick.label === "Yes") {
        vscode.window.showInformationMessage(`Tab Indentation Enabled`);
        await vscode.commands.executeCommand("editor.action.indentationToTabs");
      }
    }

    const selection = editor.selection;
    const totalLines = editor.document.lineCount;
    const selectedText = editor.document.getText(selection);

    if (!selectedText) {
      vscode.window.showInformationMessage("Selected text not found!");
      return;
    }

    const currentPosition = editor.selection.active;
    let newPosition = currentPosition.with(currentPosition.line + 1, 0);

    editor.edit((editBuilder) => {
      let logStatement = getStatement(editor) + "\n";
      if (currentPosition.line + 1 === totalLines) {
        logStatement = "\n" + logStatement;
      }
      editBuilder.insert(newPosition, logStatement);
    });
    editor.selection = selection;
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
