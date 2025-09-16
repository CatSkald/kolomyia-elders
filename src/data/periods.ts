import { palette } from "../themes";

export const periods = [
  {
    name: "1550—1650",
    startDate: 1550,
    endDate: 1650,
    color: palette.vi,
  },
  {
    name: "1651—1750",
    startDate: 1651,
    endDate: 1750,
    color: palette.v,
  },
  {
    name: "1751—1850",
    startDate: 1751,
    endDate: 1850,
    color: palette.iv,
  },
  {
    name: "1851—1913",
    startDate: 1851,
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
];

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
];
