import { FizzUtil } from "../../utils/fizz.utils";

describe("Fizz Util Tests", () => {
    let fizzUtil: FizzUtil;
    beforeEach(() => {
        fizzUtil = new FizzUtil();
    });

    it("should return Fizz when number is divisible by 3", () => {
        expect(fizzUtil.numbers(3)).toBe("Fizz");
    });
    it("should return Buzz when number is divisible by 5", () => {
        expect(fizzUtil.numbers(5)).toBe("Buzz");
    });
    it("should return Buzz when number is divisible by 15", () => {
        expect(fizzUtil.numbers(15)).toBe("FizzBuzz");
    });
    it("should return the number when number isnt divisible by 3 or 5", () => {
        expect(fizzUtil.numbers(2)).toBe(2);
    });

    // it("spyOn demo", () => {
    //     const spy = jest.spyOn(fizzUtil, "isDivisibleByFive");
    //     fizzBuzz.fizzBuzz(8);
    //     expect(spy).toHaveBeenCalledTimes(2);
    // });
});
