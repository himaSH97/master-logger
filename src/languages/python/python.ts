import { statementType, lang } from "../../utils/utils";

const DELEMITER = ',';

export const createPythonStatement = (logInfo:statementType, baseContent:string):string => {
    let tab = "\t";
    let statement = `${logInfo.indentation}print(${baseContent}${DELEMITER} ${logInfo.selectedText})`;
    if (logInfo.isFunction) {
        statement = tab + statement;
    }
    return statement;
};