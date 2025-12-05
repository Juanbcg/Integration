test("El documento carga y existe el body", () => {
  document.body.innerHTML = `<button id="btn">Click</button>`;
  const btn = document.getElementById("btn");
  expect(btn).not.toBeNull();
});