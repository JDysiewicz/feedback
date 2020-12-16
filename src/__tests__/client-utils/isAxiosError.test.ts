import { isAxiosError } from "src/utils/isAxiosError";
import { AxiosError, AxiosRequestConfig } from "axios"; 

test("utils: isAxiosError, Error", async() => {
    const notAxiosError = isAxiosError(Error("test"));
    expect(notAxiosError).toBeFalsy();
});

test("utils: isAxiosError, empty", async() => {
    const notAxiosError = isAxiosError("");
    expect(notAxiosError).toBeFalsy();
});

test("utils: isAxiosError, AxiosError", async() => {
    const axiosError: AxiosError = {
        name: "",
        message: "",
        config: {} as AxiosRequestConfig,
        isAxiosError: true,
        toJSON: () => { return {}}
    }

    expect(isAxiosError(axiosError)).toBeTruthy();
});