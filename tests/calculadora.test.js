const { requestToBodyStream } = require("next/dist/server/body-streams");
const calculadora = require("../models/calculadora.js");

test("somar 2 + 2 deve ser 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 5 + 100 deve ser 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("somar 'banana' + 100 deve ser 'banana'", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Error");
});

test("somar 2 + 'kitkat' deve ser 'banana'", () => {
  const resultado = calculadora.somar(2, "kit");
  expect(resultado).toBe("Error");
});
