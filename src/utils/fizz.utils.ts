export class FizzUtil {
    numbers = (arg: number): string | number => {
        if (arg % 3 == 0 && arg % 5 === 0) {
            return "FizzBuzz";
        } else if (arg % 5 === 0) {
            return "Buzz";
        } else if (arg % 3 == 0) {
            return "Fizz";
        } else {
            return arg;
        }
    };
}

// const obj = new FizzUtil();
// for (let index = 0; index < 101; index++) {
//     console.log(obj.numbers(index));
// }
