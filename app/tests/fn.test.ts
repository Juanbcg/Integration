import { multiplicar } from "../src/utils";

test("multiplica dos números", () => {
  expect(multiplicar(3, 4)).toBe(12);
});