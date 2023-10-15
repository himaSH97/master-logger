/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import { getPythonStatement } from "../languages/python/python";

export type statementType = {
  language: string;
  fileName: string;
  lineNo?: number;
  selectedText?: string;
  isFunction?: boolean;
  indentation?: string;
};

export const lang = {
  python: ",",
  javascript: ",",
  typescript: ",",
  csharp: "+",
  java: "+",
  rust: ",",
};

export const getStatement = (editor: vscode.TextEditor): string => {
  const editorLanguage = editor.document.languageId;
  let content = `"${parseFileName(editor.document.fileName)} : ${editor.selection.active.line + 1} : ${
    editor.document.getText(editor.selection)
  }"`;

  if(editor.document.languageId === 'python'){
    let pyStatement= getPythonStatement(editor);  
    return pyStatement;
  }else if (
    editorLanguage === "javascript" ||
    editorLanguage === "typescript"
  ) {
    return `console.log(${content}${lang[editorLanguage]} ${editor.document.getText(editor.selection)})`;
  } else if (editorLanguage === "csharp") {
    return `Console.WriteLine(${content} ${lang[editorLanguage]} ${editor.document.getText(editor.selection)})`;
  } else if (editorLanguage === "java") {
    //work heredsgvcsd

    return `System.out.println(${content} ${lang[editorLanguage]} ${editor.document.getText(editor.selection)})`;
  } else if (editorLanguage === "rust") {
    return ` println(${content}${lang[editorLanguage]} ${editor.document.getText(editor.selection)})`;
  }

  return ` println(${content}, ${editor.document.getText(editor.selection)})`;
};


export const parseFileName = (fileName: string): string => {
  let fileNameWithoutPath = "file";
  if (fileName.includes("/")) {
    fileNameWithoutPath = fileName.split("/").pop() || fileNameWithoutPath;
  } else {
    fileNameWithoutPath = fileName.split("\\").pop() || fileNameWithoutPath;
  }
  return fileNameWithoutPath;
};
