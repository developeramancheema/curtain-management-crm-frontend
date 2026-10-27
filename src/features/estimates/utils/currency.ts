const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
] as const;

const TENS = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Forty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety',
] as const;

export function formatInr(value: number, withDecimals = true): string {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  });
}

export function formatInrWithSymbol(value: number, withDecimals = true): string {
  return `₹ ${formatInr(value, withDecimals)}`;
}

/**
 * Converts an amount into the Indian words format used on printed estimates,
 * e.g. "One Lakh Thirteen Thousand Seven Hundred Thirty Three Rupees and
 * Eighty Eight Paise Only".
 */
export function amountToWords(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return 'Zero Rupees Only';

  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  const rupeeWords = integerToIndianWords(rupees);
  const parts = [`${rupeeWords} Rupees`];

  if (paise > 0) {
    parts.push(`and ${integerToIndianWords(paise)} Paise`);
  }

  return `${parts.join(' ')} Only`;
}

function integerToIndianWords(value: number): string {
  if (value === 0) return 'Zero';

  const crore = Math.floor(value / 10_000_000);
  const lakh = Math.floor((value % 10_000_000) / 100_000);
  const thousand = Math.floor((value % 100_000) / 1_000);
  const hundred = Math.floor((value % 1_000) / 100);
  const remainder = value % 100;

  const segments: string[] = [];

  if (crore > 0) segments.push(`${integerToIndianWords(crore)} Crore`);
  if (lakh > 0) segments.push(`${twoDigitsToWords(lakh)} Lakh`);
  if (thousand > 0) segments.push(`${twoDigitsToWords(thousand)} Thousand`);
  if (hundred > 0) segments.push(`${ONES[hundred]} Hundred`);
  if (remainder > 0) segments.push(twoDigitsToWords(remainder));

  return segments.join(' ');
}

function twoDigitsToWords(value: number): string {
  if (value < 20) return ONES[value];

  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return ones > 0 ? `${TENS[tens]} ${ONES[ones]}` : TENS[tens];
}
