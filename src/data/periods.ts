import { palette } from "../themes";

export const periods = [
  {
    name: "1405—1771",
    startDate: 1405,
    endDate: 1771,
    color: palette.periods.i,
  },
  {
    name: "1772—1865",
    startDate: 1772,
    endDate: 1865,
    color: palette.periods.ii,
  },
  {
    name: "1866—1913",
    startDate: 1866,
    endDate: 1913,
    color: palette.periods.iii,
  },
  {
    name: "1914—1918",
    startDate: 1914,
    endDate: 1918,
    color: palette.periods.iv,
  },
  {
    name: "1919—1944",
    startDate: 1919,
    endDate: 1944,
    color: palette.periods.v,
  },
] as const;

export const periodsOfDestruction = [
  {
    name: "втрачені до 1944",
    startDate: 0,
    endDate: 1944,
    color: palette.lost.i,
  },
  {
    name: "втрачені в 1945—1990",
    startDate: 1945,
    endDate: 1990,
    color: palette.lost.ii,
  },
  {
    name: "втрачені після 1991",
    startDate: 1991,
    endDate: 9999,
    color: palette.lost.iii,
  },
] as const;
