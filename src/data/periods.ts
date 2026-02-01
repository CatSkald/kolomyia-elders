import { palette } from "../themes";

export const periods = [
  {
    name: "1405—1771",
    startDate: 1405,
    endDate: 1771,
    color: palette.vi,
  },
  {
    name: "1772—1865",
    startDate: 1772,
    endDate: 1865,
    color: palette.v,
  },
  {
    name: "1866—1913",
    startDate: 1866,
    endDate: 1913,
    color: palette.iii,
  },
  {
    name: "1914—1918",
    startDate: 1914,
    endDate: 1918,
    color: palette.ii,
  },
  {
    name: "1919—1944",
    startDate: 1919,
    endDate: 1944,
    color: palette.i,
  },
] as const;

export const periodsOfDestruction = [
  {
    name: "втрачені до 1944",
    startDate: 0,
    endDate: 1944,
    color: palette.l1,
  },
  {
    name: "втрачені в 1945—1990",
    startDate: 1945,
    endDate: 1990,
    color: palette.l2,
  },
  {
    name: "втрачені після 1991",
    startDate: 1991,
    endDate: 9999,
    color: palette.l3,
  },
] as const;
