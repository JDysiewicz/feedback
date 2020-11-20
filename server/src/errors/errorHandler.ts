import { Request, Response } from "express";
import ApiError from "./apiError";

const errorHandler = (err: ApiError | Error | string, req: Request, res: Response, next: () => any) => {
    console.error(err);

    if (err instanceof ApiError){
        res.status(err.code).send({success: false, err: err.error, message: err.message});
        return;
    } else {
        res.status(500).send({success: false,err: "Internal server error", message: "Something went wrong"})
        return;
    }
};

export default errorHandler;