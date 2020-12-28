import { pixabayAPI, weatherbitAPI, geoNamesAPI } from "../src/server/index.js"

describe('testing if the pixabayAPI is valid or not', () => {
    test("the function return  true if valid", () => {
        expect(pixabayAPI).toBeDefined();
    });
})

describe('testing if the weatherbitAPI is valid or not', () => {
    test("the function return  true if valid", () => {
        expect(weatherbitAPI).toBeDefined();
    });
})

describe('testing if the geoNamesAPI is valid or not', () => {
    test("the function return  true if valid", () => {
        expect(geoNamesAPI).toBeDefined();
    });
})