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

export const getStatement = (editor: vscode.TextEditor): string | undefined => {
  const pyStatement= getPythonStatement(editor);  
  return pyStatement;
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
