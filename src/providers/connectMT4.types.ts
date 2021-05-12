export type Message = {
  command: string;
  arguments?: {
    userId: string;
    password: string;
  };
};

export type SymbolData = {
  ask: number;
  bid: number;
  categoryName: string;
  contractSize: 1;
  currency: string;
  currencyPair: boolean;
  currencyProfit: string;
  description: string;
  exemode: number;
  expiration: string | null;
  groupName: string;
  high: number;
  initialMargin: number;
  instantMaxVolume: number;
  leverage: number;
  longOnly: boolean;
  lotMax: number;
  lotMin: number;
  lotStep: number;
  low: number;
  marginHedged: number;
  marginHedgedStrong: boolean;
  marginMaintenance: number;
  marginMode: number;
  percentage: number;
  pipsPrecision: number;
  precision: number;
  profitMode: number;
  quoteId: number;
  quoteIdCross: number;
  shortSelling: boolean;
  spreadRaw: number;
  spreadTable: number;
  starting: string | null;
  stepRuleId: number;
  stopsLevel: number;
  swapEnable: boolean;
  swapLong: number;
  swapShort: number;
  swapType: number;
  // eslint-disable-next-line camelcase
  swap_rollover3days: number;
  symbol: string;
  tickSize: number;
  tickValue: number;
  time: number;
  timeString: string;
  trailingEnabled: boolean;
  type: number;
};
