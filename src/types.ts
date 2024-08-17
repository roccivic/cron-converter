export type Unit = {
  name: 'minute' | 'hour' | 'day' | 'month' | 'weekday',
  min: number;
  max: number;
  alt?: Map<string, number>;
}

export type Options = {
  outputHashes: boolean;
  outputWeekdayNames: boolean;
  outputMonthNames: boolean;
}
