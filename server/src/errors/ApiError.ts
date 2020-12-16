interface ApiErrorParams {
    error: Error | string;
    message: string;
}

class ApiError {

    code: number;
    error: Error | string;
    message: string;

    constructor(code: number, error: Error | string, message: string){
        this.code = code;
        this.error = error;
        this.message = message;
    }

    static badRequest({error, message}: ApiErrorParams): ApiError{
        return new ApiError(400, error, message);
    }

    static internalError({error, message}: ApiErrorParams): ApiError{
        return new ApiError(500, error, message);
    }

}

export default ApiError;