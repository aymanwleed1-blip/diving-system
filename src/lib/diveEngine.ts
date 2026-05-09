// src/lib/diveEngine.ts
// US NAVY REVISION 7 - LIVE CALCULATION ENGINE

export interface DecoStop {
  depth: number;
  time: number;
}

export interface DiveStatus {
  tableDepth: number;
  tableTime: number;
  ndl: number;
  isDeco: boolean;
  stops: DecoStop[];
  group: string;
}

const US_NAVY_REV7_DATA: Record<number, Record<number, { ndl: number; stops: DecoStop[]; group: string }>> = {
  12: { 60: { ndl: 163, stops: [], group: "F" }, 120: { ndl: 163, stops: [], group: "K" }, 200: { ndl: 163, stops: [{ depth: 6, time: 1 }], group: "O" } },
  15: { 40: { ndl: 92, stops: [], group: "F" }, 70: { ndl: 92, stops: [], group: "J" }, 100: { ndl: 92, stops: [{ depth: 6, time: 3 }], group: "M" } },
  18: { 30: { ndl: 60, stops: [], group: "F" }, 60: { ndl: 60, stops: [{ depth: 6, time: 2 }], group: "J" }, 100: { ndl: 60, stops: [{ depth: 6, time: 21 }], group: "O" } },
  21: { 30: { ndl: 48, stops: [], group: "G" }, 50: { ndl: 48, stops: [{ depth: 6, time: 2 }], group: "L" }, 70: { ndl: 48, stops: [{ depth: 6, time: 14 }], group: "O" } },
  30: { 15: { ndl: 22, stops: [], group: "E" }, 25: { ndl: 22, stops: [{ depth: 6, time: 3 }], group: "H" }, 40: { ndl: 22, stops: [{ depth: 6, time: 15 }], group: "L" }, 50: { ndl: 22, stops: [{ depth: 6, time: 26 }], group: "N" } },
  36: { 10: { ndl: 12, stops: [], group: "E" }, 15: { ndl: 12, stops: [{ depth: 6, time: 2 }], group: "G" }, 30: { ndl: 12, stops: [{ depth: 6, time: 12 }], group: "K" } },
  50: { 5: { ndl: 4, stops: [{ depth: 6, time: 1 }], group: "D" }, 10: { ndl: 4, stops: [{ depth: 9, time: 1 }, { depth: 6, time: 7 }], group: "G" }, 20: { ndl: 4, stops: [{ depth: 12, time: 1 }, { depth: 9, time: 3 }, { depth: 6, time: 15 }], group: "L" } }
};

const getTableDepth = (depth: number): number => {
  const depths = Object.keys(US_NAVY_REV7_DATA).map(Number).sort((a, b) => a - b);
  return depths.find(d => d >= depth) || depths[depths.length - 1];
};

const getTableTime = (depth: number, time: number): number => {
  const times = Object.keys(US_NAVY_REV7_DATA[depth]).map(Number).sort((a, b) => a - b);
  return times.find(t => t >= time) || times[times.length - 1];
};

export const calculateDiveStatus = (currentDepth: number, bottomTime: number): DiveStatus => {
  const tableDepth = getTableDepth(currentDepth);
  const dataForDepth = US_NAVY_REV7_DATA[tableDepth];
  const sortedTimes = Object.keys(dataForDepth).map(Number).sort((a, b) => a - b);
  const ndlLimit = dataForDepth[sortedTimes[0]].ndl;
  const tableTime = getTableTime(tableDepth, bottomTime);
  const divePlan = dataForDepth[tableTime];

  return { tableDepth, tableTime, ndl: ndlLimit, isDeco: bottomTime > ndlLimit, stops: divePlan.stops, group: divePlan.group };
};