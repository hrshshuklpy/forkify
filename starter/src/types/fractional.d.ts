declare module 'fractional' {
  export class Fraction {
    constructor(numerator: number, denominator: number);
    add(fraction: Fraction): Fraction;
    subtract(fraction: Fraction): Fraction;
    multiply(fraction: Fraction): Fraction;
    divide(fraction: Fraction): Fraction;
    toString(): string;
  }
}
