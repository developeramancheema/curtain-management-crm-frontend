import {
  Grid3x3,
  PanelTop,
  Ruler,
  Scissors,
  Sun,
  type LucideIcon,
} from 'lucide-react';

export type ItemTone = 'violet' | 'blue' | 'amber' | 'teal' | 'rose' | 'neutral';

export interface ItemVisual {
  icon: LucideIcon;
  tone: ItemTone;
}

const toneStyles: Record<ItemTone, string> = {
  violet: 'bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400',
  blue: 'bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400',
  amber: 'bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
  teal: 'bg-teal-100 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400',
  rose: 'bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400',
  neutral: 'bg-muted text-muted-foreground',
};

export function getItemVisual(description: string): ItemVisual {
  const value = description.toLowerCase();

  if (value.includes('plain') || value.includes('parray') || value.includes('parday')) {
    return { icon: PanelTop, tone: 'violet' };
  }
  if (value.includes('net')) {
    return { icon: Grid3x3, tone: 'blue' };
  }
  if (value.includes('blackout')) {
    return { icon: Sun, tone: 'amber' };
  }
  if (value.includes('channel')) {
    return { icon: Ruler, tone: 'teal' };
  }
  if (value.includes('stitch')) {
    return { icon: Scissors, tone: 'rose' };
  }

  return { icon: PanelTop, tone: 'neutral' };
}

export function getItemToneClass(tone: ItemTone): string {
  return toneStyles[tone];
}
