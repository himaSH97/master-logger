import * as vscode from "vscode";
import { statementType, getStatement } from "./utils/utils";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "master-logger.wrapInStatement",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const fileName = editor.document.fileName;
        const selection = editor.selection;
        const lineText = editor.document.lineAt(editor.selection.active.line).text;
        const indentationMatch = lineText.match(/^\s+/) || '';
        const indentation = indentationMatch[0] || '';
        const isFunction = lineText[lineText.length-1] ===':' ? true: false;
        const selectedText = editor.document.getText(selection);
        const fileLanguageId = editor.document.languageId;
        const totalLines = editor.document.lineCount;

        let statementInfo: statementType = {
          language: fileLanguageId,
          fileName: fileName,
          selectedText: selectedText,
          isFunction:isFunction,
          indentation:indentation,
        };

        if (selectedText !== "") {
          const currentPosition = editor.selection.active;
          let newPosition = currentPosition.with(currentPosition.line + 1, 0);
          statementInfo.lineNo = currentPosition.line + 1;

          editor.edit((editBuilder) => {
            let logStatement =  getStatement(statementInfo) + "\n";
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
