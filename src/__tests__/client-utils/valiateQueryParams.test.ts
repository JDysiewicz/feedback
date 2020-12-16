import { validateQueryParams } from "src/utils/validateQueryParams";

test("util: validateQueryParams, null", () => {
    expect(validateQueryParams("")).toBe(false);
});

test("util: validateQueryParams, invalid", () => {
    expect(validateQueryParams("?board=ABCS")).toBe(false);
});

test("util: validateQueryParams, otherparams", () => {
    expect(validateQueryParams("?board=123456&another=test")).toBe(false);
});

test("util: validateQueryParams, valid", () => {
    expect(validateQueryParams("?board=123456")).toBe(true);
});