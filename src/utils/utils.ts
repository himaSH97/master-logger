/* eslint-disable @typescript-eslint/naming-convention */

import { createPythonStatement } from "../languages/python/python";

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

export const getStatement = (logInfo: statementType): string => {
  const editorLanguage = logInfo.language;

  let content = `"${parseFileName(logInfo.fileName)} : ${logInfo.lineNo} : ${
    logInfo.selectedText
  }"`;

  if (editorLanguage === "python") {
    let pythonStatement = createPythonStatement(logInfo, content);  
    return pythonStatement;
  } else if (
    editorLanguage === "javascript" ||
    editorLanguage === "typescript"
  ) {
    return `${logInfo.indentation}console.log(${content}${lang[editorLanguage]} ${logInfo.selectedText})`;
  } else if (editorLanguage === "csharp") {
    return `Console.WriteLine(${content} ${lang[editorLanguage]} ${logInfo.selectedText})`;
  } else if (editorLanguage === "java") {
    return `System.out.println(${content} ${lang[editorLanguage]} ${logInfo.selectedText})`;
  } else if (editorLanguage === "rust") {
    return ` println!(${content}${lang[editorLanguage]} ${logInfo.selectedText})`;
  }

  return `Console.WriteLine(${content},  ${logInfo.selectedText})`;
};

const parseFileName = (fileName: string): string => {
  let fileNameWithoutPath = "file";
  if (fileName.includes("/")) {
    fileNameWithoutPath = fileName.split("/").pop() || fileNameWithoutPath;
  } else {
    fileNameWithoutPath = fileName.split("\\").pop() || fileNameWithoutPath;
  }
  return fileNameWithoutPath;
};
