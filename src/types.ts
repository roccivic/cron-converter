export type Unit = {
  name: 'minute' | 'hour' | 'day' | 'month' | 'weekday',
  min: number;
  max: number;
  alt?: ReadonlyArray<string>;
};

export type ParseOptions = {
  enableLastDayOfMonth: boolean;
};

export type Options = ParseOptions & {
  outputHashes: boolean;
  outputWeekdayNames: boolean;
  outputMonthNames: boolean;
};
