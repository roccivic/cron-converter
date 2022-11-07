export type Unit = {
  name: 'minute' | 'hour' | 'day' | 'month' | 'weekday',
  min: number;
  max: number;
  alt?: string[];
}

export type Options = {
  outputHashes: boolean;
  outputWeekdayNames: boolean;
  outputMonthNames: boolean;
  timezone: string;
}
