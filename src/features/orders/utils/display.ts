import type { OrderLineItem } from '../types';

const SUMMARY_UNITS = ['Mtr', 'Pcs', 'Ft'] as const;

const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function formatDueWithWeekday(dueDate: string): string {
  const match = dueDate.match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/);
  if (!match) return dueDate;

  const day = Number(match[1]);
  const month = MONTHS[match[2]];
  const year = Number(match[3]);
  if (month === undefined) return dueDate;

  const parsed = new Date(Date.UTC(year, month, day));
  const weekday = parsed.toLocaleDateString('en-GB', {
    weekday: 'short',
    timeZone: 'UTC',
  });

  return `${dueDate} (${weekday})`;
}

function shortAssigneeName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1].charAt(0)}.`;
}

function buildItemSummary(items: readonly OrderLineItem[]): string {
  const byUnit = new Map<string, number>();

  for (const item of items) {
    const current = byUnit.get(item.unit) ?? 0;
    byUnit.set(item.unit, Math.max(current, item.quantity));
  }

  const parts = [`${items.length} items`];
  for (const unit of SUMMARY_UNITS) {
    const quantity = byUnit.get(unit);
    if (quantity) parts.push(`${quantity} ${unit}`);
  }

  return parts.join(' • ');
}

export { formatDueWithWeekday, shortAssigneeName, buildItemSummary };
