// __tests__/app.test.js
const sum = (a, b) => a + b;

// Test sederhana untuk menjumlahkan 1 + 2
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});