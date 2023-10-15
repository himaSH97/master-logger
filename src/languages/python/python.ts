import { parseFileName } from "../../utils/utils";
import * as vscode from "vscode";
import { getUserPrefix } from "../../services/userPrefixService";

const DELEMITER = ',';

export const getPythonStatement = (editor: vscode.TextEditor):string => {
    const selection = editor.selection;
    const lineText = editor.document.lineAt(editor.selection.active.line).text;
    const indentationMatch = lineText.match(/^\s+/) || '';
    const indentation = indentationMatch[0] || '';

    const isFunction = lineText[lineText.length-1] ===':' ? true: false;
    const selectedText = editor.document.getText(selection);
    let tab = "\t";
    let baseContent = `"${getUserPrefix()}${parseFileName(editor.document.fileName)} : ${editor.selection.active.line + 1} : ${
        editor.document.getText(editor.selection)
      }"`;
    let statement = `${indentation}print( ${baseContent}${DELEMITER} ${selectedText})`;
    
    if (isFunction) {
        statement = tab + statement;
    }

    return statement;
};