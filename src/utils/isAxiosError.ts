import { AxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const isAxiosError = (error: any): error is AxiosError => {
    return (error as AxiosError).isAxiosError !== undefined;
};

// Function to check if something fits the AxiosError interface
// Will return the error as instanceof AxiosError is .isAxiosError property
// exists on the error object (will be undefined if not an AxiosError)
