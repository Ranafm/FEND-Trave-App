import { validateDate } from "../src/client/js/validateDate"

describe('testing if the validateDate is valid or not', () => {
    test("the function return  true if valid", () => {
        expect(validateDate).toBeTruthy;
    });
})