function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function decimal(text: string, length: number): void {
  strictText(text, length);
  if (text.length !== length || /[^0-9]/.test(text))
    throw new RangeError('Exact ASCII digit count required');
}
function mod10(body: string): string {
  let sum = 0;
  for (let i = body.length - 1, weight = 3; i >= 0; i--, weight = 4 - weight)
    sum += Number(body[i]) * weight;
  return String((10 - (sum % 10)) % 10);
}
export function gtinCheckDigit(body: string): string {
  if (typeof body !== 'string' || ![7, 11, 12, 13].includes(body.length))
    throw new RangeError('GTIN body length');
  decimal(body, body.length);
  return mod10(body);
}
export function validateGtin(code: string): boolean {
  if (typeof code !== 'string' || ![8, 12, 13, 14].includes(code.length))
    throw new RangeError('GTIN length');
  decimal(code, code.length);
  return gtinCheckDigit(code.slice(0, -1)) === code[code.length - 1];
}
export function gtin14(code: string): string {
  if (!validateGtin(code)) throw new RangeError('GTIN checksum mismatch');
  return code.padStart(14, '0');
}
