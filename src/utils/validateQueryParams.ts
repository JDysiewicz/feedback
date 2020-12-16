export const validateQueryParams = (queryParam: string) => {
    const regexToCheckBoard = /^\?board=[0-9]*$/; // checks for '?board=123...32' as the query param
    return  regexToCheckBoard.test(queryParam) ? true : false;
};