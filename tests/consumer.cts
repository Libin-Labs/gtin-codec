import { validateGtin, gtin14 } from '@lp-labs/gtin-codec';
if (!validateGtin('036000291452') || gtin14('036000291452') !== '00036000291452')
  throw new Error('GTIN');
// @ts-expect-error invalid argument must be rejected by declarations
validateGtin(36000291452);
