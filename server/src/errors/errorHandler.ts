import { Request, Response } from "express";
import ApiError from "./apiError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: ApiError | Error | string, req: Request, res: Response, next: () => void): void => {
    console.error(err);

    if (err instanceof ApiError){
        res.status(err.code).send({success: false, err: err.error, message: err.message});
    } else {
        res.status(500).send({success: false,err: "Internal server error", message: "Something went wrong"});
    }
};

export default errorHandler;