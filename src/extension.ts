import * as vscode from "vscode";
import {statementType, getStatement} from "./utils/utils";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "master-logger.wrapInStatement",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const fileName = editor.document.fileName;
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const fileLanguageId = editor.document.languageId;
        const totalLines = editor.document.lineCount;

		let statement:statementType = {
			language: fileLanguageId,
			fileName: fileName,
			selectedText: selectedText,
		};
        
        if (selectedText !== "") {
          const currentPosition = editor.selection.active;
          let newPosition = currentPosition.with(currentPosition.line + 1, 0);
		  statement.lineNo = currentPosition.line + 1;

          editor.edit((editBuilder) => {
			let logStatement=getStatement(statement) + "\n";
			if((currentPosition.line + 1) === totalLines ){
				logStatement ="\n"+ getStatement(statement) + "\n";
			}
            editBuilder.insert(
              newPosition,
              logStatement
            );
          });

          // Move the cursor to the inside of the quotes
          const newPositionInsideQuotes = new vscode.Position(
            newPosition.line,
            newPosition.character + getStatement(statement).indexOf('"') + 1
          );
          editor.selection = new vscode.Selection(
            newPositionInsideQuotes,
            newPositionInsideQuotes
          );
        }
      }
    }
  );
  
context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
