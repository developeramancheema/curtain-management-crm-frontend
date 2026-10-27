export function formatInr(value: number, withDecimals = true): string {
  return `₹ ${value.toLocaleString('en-IN', {
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  })}`;
}
