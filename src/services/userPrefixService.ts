import * as vscode from "vscode";


export const getUserPrefix = (): string => {
  let userPrefix: string | undefined = vscode.workspace
    .getConfiguration("lazyLogger")
    .get("userPrefix");
  if (userPrefix) {
    userPrefix = userPrefix.trim();
    userPrefix = userPrefix + " : ";
  }
  return userPrefix || "";
};

