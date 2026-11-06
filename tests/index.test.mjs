import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('EAN13 reference', () => {
  assert.ok(api.validateGtin('4006381333931'));
  assert.equal(api.gtinCheckDigit('400638133393'), '1');
});
test('UPC-A reference', () => {
  assert.ok(api.validateGtin('036000291452'));
});
test('EAN8 reference', () => {
  assert.ok(api.validateGtin('96385074'));
});
test('canonical padding', () => {
  assert.equal(api.gtin14('036000291452'), '00036000291452');
});
test('invalid length and mismatch', () => {
  assert.equal(api.validateGtin('4006381333932'), false);
  assert.throws(() => api.gtin14('4006381333932'));
  assert.throws(() => api.validateGtin('12345'));
});
test('all parity lengths oracle', () => {
  for (const length of [7, 11, 12, 13])
    for (let i = 0; i < 50; i++) {
      const b = String(i * 3713).padStart(length, '0'),
        c = api.gtinCheckDigit(b),
        digits = b + c;
      let sum = 0;
      for (let j = digits.length - 1, w = 1; j >= 0; j--, w = 4 - w) sum += Number(digits[j]) * w;
      assert.equal(sum % 10, 0);
    }
});
