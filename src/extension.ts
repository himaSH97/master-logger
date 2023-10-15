import * as vscode from "vscode";
import { getStatement } from "./utils/utils";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "master-logger.wrapInStatement",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const totalLines = editor.document.lineCount;

        if (selectedText) {
          const currentPosition = editor.selection.active;
          let newPosition = currentPosition.with(currentPosition.line + 1, 0);

          editor.edit((editBuilder) => {
            let logStatement = getStatement(editor) + "\n";
            if (currentPosition.line + 1 === totalLines) {
              logStatement = "\n"+ logStatement;
            }
            editBuilder.insert(newPosition, logStatement);
          });
          editor.selection = selection;
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
