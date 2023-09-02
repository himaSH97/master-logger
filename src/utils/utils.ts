/* eslint-disable @typescript-eslint/naming-convention */

export type statementType = {
  language: string;
  fileName: string;
  lineNo?: number;
  selectedText?: string;
};

const lang = {
  python: ",",
  javascript: ",",
  typescript: ",",
  csharp: "+",
  java: "+",
  rust: ",",
};

export const getStatement = (
  customStatemnt: statementType,
  indentation: string,
  isFunction: boolean
): string => {
  const editorLanguage = customStatemnt.language;
  const space = " ";

  let content = `"${parseFileName(customStatemnt.fileName)} : ${
    customStatemnt.lineNo
  } : ${customStatemnt.selectedText}"`;

  if (editorLanguage === "python") {
    let tab = "\t";
    let st = `${indentation}print(${content}${lang[editorLanguage]} ${customStatemnt.selectedText})`;
    if (isFunction) {
      st = tab + st;
    }
    return st;
  } else if (
    editorLanguage === "javascript" ||
    editorLanguage === "typescript"
  ) {
    return `${indentation}console.log(${content}${lang[editorLanguage]} ${customStatemnt.selectedText})`;
  } else if (editorLanguage === "csharp") {
    return `Console.WriteLine(${content} ${lang[editorLanguage]} ${customStatemnt.selectedText})`;
  } else if (editorLanguage === "java") {
    return `System.out.println(${content} ${lang[editorLanguage]} ${customStatemnt.selectedText})`;
  } else if (editorLanguage === "rust") {
    return ` println!(${content}${lang[editorLanguage]} ${customStatemnt.selectedText})`;
  }

  return `Console.WriteLine(${content},  ${customStatemnt.selectedText})`;
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
