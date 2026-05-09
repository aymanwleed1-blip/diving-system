/**
 * RSEAS ODCS - US Navy Diving Manual Revision 7 Table Registry
 * EXHAUSTIVE SOURCE OF TRUTH
 */

export const CONVERSION = {
  M_TO_FT: 3.28084
};

export interface SurfaceIntervalRange {
  min: number; // minutes
  max: number; // minutes
  nextGroup: string;
}

// Table 9-7: No-Decompression Limits and Repetitive Group Designators
// Depth in fsw, limit in minutes, times for each PG
export const USN_TABLE_9_7 = [
  { depth: 10, limit: 999, groups: [ {t:57, g:'A'}, {t:101, g:'B'}, {t:158, g:'C'}, {t:245, g:'D'}, {t:426, g:'E'}, {t:999, g:'Z'} ] },
  { depth: 15, limit: 999, groups: [ {t:36, g:'A'}, {t:60, g:'B'}, {t:88, g:'C'}, {t:121, g:'D'}, {t:163, g:'E'}, {t:217, g:'F'}, {t:297, g:'G'}, {t:449, g:'H'}, {t:999, g:'Z'} ] },
  { depth: 20, limit: 999, groups: [ {t:26, g:'A'}, {t:43, g:'B'}, {t:61, g:'C'}, {t:82, g:'D'}, {t:106, g:'E'}, {t:133, g:'F'}, {t:165, g:'G'}, {t:205, g:'H'}, {t:256, g:'I'}, {t:330, g:'J'}, {t:461, g:'K'}, {t:999, g:'Z'} ] },
  { depth: 25, limit: 1102, groups: [ {t:20, g:'A'}, {t:33, g:'B'}, {t:47, g:'C'}, {t:62, g:'D'}, {t:78, g:'E'}, {t:97, g:'F'}, {t:117, g:'G'}, {t:140, g:'H'}, {t:166, g:'I'}, {t:198, g:'J'}, {t:236, g:'K'}, {t:285, g:'L'}, {t:354, g:'M'}, {t:469, g:'N'}, {t:992, g:'O'}, {t:1102, g:'Z'} ] },
  { depth: 30, limit: 371, groups: [ {t:17, g:'A'}, {t:27, g:'B'}, {t:38, g:'C'}, {t:50, g:'D'}, {t:62, g:'E'}, {t:76, g:'F'}, {t:91, g:'G'}, {t:107, g:'H'}, {t:125, g:'I'}, {t:145, g:'J'}, {t:167, g:'K'}, {t:193, g:'L'}, {t:223, g:'M'}, {t:260, g:'N'}, {t:307, g:'O'}, {t:371, g:'Z'} ] },
  { depth: 35, limit: 232, groups: [ {t:14, g:'A'}, {t:23, g:'B'}, {t:32, g:'C'}, {t:42, g:'D'}, {t:52, g:'E'}, {t:63, g:'F'}, {t:74, g:'G'}, {t:87, g:'H'}, {t:100, g:'I'}, {t:115, g:'J'}, {t:131, g:'K'}, {t:148, g:'L'}, {t:168, g:'M'}, {t:190, g:'N'}, {t:215, g:'O'}, {t:232, g:'Z'} ] },
  { depth: 40, limit: 163, groups: [ {t:12, g:'A'}, {t:20, g:'B'}, {t:27, g:'C'}, {t:36, g:'D'}, {t:44, g:'E'}, {t:53, g:'F'}, {t:63, g:'G'}, {t:73, g:'H'}, {t:84, g:'I'}, {t:95, g:'J'}, {t:108, g:'K'}, {t:121, g:'L'}, {t:135, g:'M'}, {t:151, g:'N'}, {t:163, g:'O'} ] },
  { depth: 45, limit: 125, groups: [ {t:11, g:'A'}, {t:17, g:'B'}, {t:24, g:'C'}, {t:31, g:'D'}, {t:39, g:'E'}, {t:46, g:'F'}, {t:55, g:'G'}, {t:63, g:'H'}, {t:72, g:'I'}, {t:82, g:'J'}, {t:92, g:'K'}, {t:102, g:'L'}, {t:114, g:'M'}, {t:125, g:'N'} ] },
  { depth: 50, limit: 92, groups: [ {t:9, g:'A'}, {t:15, g:'B'}, {t:21, g:'C'}, {t:28, g:'D'}, {t:34, g:'E'}, {t:41, g:'F'}, {t:48, g:'G'}, {t:56, g:'H'}, {t:63, g:'I'}, {t:71, g:'J'}, {t:80, g:'K'}, {t:89, g:'L'}, {t:92, g:'M'} ] },
  { depth: 60, limit: 63, groups: [ {t:7, g:'A'}, {t:12, g:'B'}, {t:17, g:'C'}, {t:22, g:'D'}, {t:28, g:'E'}, {t:33, g:'F'}, {t:39, g:'G'}, {t:45, g:'H'}, {t:51, g:'I'}, {t:57, g:'J'}, {t:63, g:'K'} ] },
  { depth: 70, limit: 48, groups: [ {t:6, g:'A'}, {t:10, g:'B'}, {t:14, g:'C'}, {t:19, g:'D'}, {t:23, g:'E'}, {t:28, g:'F'}, {t:32, g:'G'}, {t:37, g:'H'}, {t:42, g:'I'}, {t:47, g:'J'}, {t:48, g:'L'} ] },
  { depth: 80, limit: 39, groups: [ {t:5, g:'A'}, {t:9, g:'B'}, {t:12, g:'C'}, {t:16, g:'D'}, {t:20, g:'E'}, {t:24, g:'F'}, {t:28, g:'G'}, {t:32, g:'H'}, {t:36, g:'I'}, {t:39, g:'J'} ] },
  { depth: 90, limit: 33, groups: [ {t:4, g:'A'}, {t:7, g:'B'}, {t:11, g:'C'}, {t:14, g:'D'}, {t:17, g:'E'}, {t:21, g:'F'}, {t:24, g:'G'}, {t:28, g:'H'}, {t:31, g:'I'}, {t:33, g:'J'} ] },
  { depth: 100, limit: 25, groups: [ {t:4, g:'A'}, {t:6, g:'B'}, {t:9, g:'C'}, {t:12, g:'D'}, {t:15, g:'E'}, {t:18, g:'F'}, {t:21, g:'G'}, {t:25, g:'H'} ], decoProtocols: [{ bottomTime: 40, stops: [{depth: 20, time: 15}] }] },
  { depth: 110, limit: 20, groups: [ {t:3, g:'A'}, {t:6, g:'B'}, {t:8, g:'C'}, {t:11, g:'D'}, {t:14, g:'E'}, {t:16, g:'F'}, {t:19, g:'G'}, {t:20, g:'H'} ] },
  { depth: 120, limit: 15, groups: [ {t:3, g:'A'}, {t:5, g:'B'}, {t:7, g:'C'}, {t:10, g:'D'}, {t:12, g:'E'}, {t:15, g:'F'} ] },
  { depth: 130, limit: 12, groups: [ {t:2, g:'A'}, {t:4, g:'B'}, {t:6, g:'C'}, {t:9, g:'D'}, {t:11, g:'E'}, {t:12, g:'F'} ] },
  { depth: 140, limit: 10, groups: [ {t:2, g:'A'}, {t:4, g:'B'}, {t:6, g:'C'}, {t:8, g:'D'}, {t:10, g:'E'} ], decoProtocols: [{ bottomTime: 20, stops: [{depth: 20, time: 14}] }] },
  { depth: 150, limit: 8, groups: [ {t:3, g:'A'}, {t:5, g:'B'}, {t:7, g:'C'}, {t:8, g:'D'} ] },
  { depth: 160, limit: 20, groups: [ {t:3, g:'B'}, {t:5, g:'C'}, {t:6, g:'D'}, {t:7, g:'E'} ] }, // Override: User safe limit 20
  { depth: 170, limit: 5, groups: [ {t:4, g:'C'}, {t:6, g:'D'} ], decoProtocols: [{ bottomTime: 20, stops: [{depth: 30, time: 2}, {depth: 20, time: 23}] }] }, // Override: User safe limit 5
  { depth: 180, limit: 5, groups: [ {t:4, g:'C'}, {t:5, g:'D'}, {t:6, g:'E'} ] }, // Override: User safe limit 5
  { depth: 190, limit: 5, groups: [ {t:3, g:'C'}, {t:5, g:'D'} ] },
];

/**
 * Table 9-8 (Top): Surface Interval Credit Matrix
 * Format: [InitialPG]: [ {min, max, nextPG} ]
 */
export const SURFACE_INTERVAL_CREDIT: Record<string, SurfaceIntervalRange[]> = {
  'A': [ { min: 10, max: 9999, nextGroup: 'A' } ],
  'B': [ { min: 10, max: 76, nextGroup: 'B' }, { min: 77, max: 9999, nextGroup: 'A' } ],
  'C': [ { min: 10, max: 55, nextGroup: 'C' }, { min: 56, max: 131, nextGroup: 'B' }, { min: 132, max: 9999, nextGroup: 'A' } ],
  'D': [ { min: 10, max: 52, nextGroup: 'D' }, { min: 53, max: 107, nextGroup: 'C' }, { min: 108, max: 183, nextGroup: 'B' }, { min: 184, max: 9999, nextGroup: 'A' } ],
  'E': [ { min: 10, max: 52, nextGroup: 'E' }, { min: 53, max: 104, nextGroup: 'D' }, { min: 105, max: 159, nextGroup: 'C' }, { min: 160, max: 235, nextGroup: 'B' }, { min: 236, max: 9999, nextGroup: 'A' } ],
  'F': [ { min: 10, max: 52, nextGroup: 'F' }, { min: 53, max: 104, nextGroup: 'E' }, { min: 105, max: 157, nextGroup: 'D' }, { min: 158, max: 211, nextGroup: 'C' }, { min: 212, max: 287, nextGroup: 'B' }, { min: 288, max: 9999, nextGroup: 'A' } ],
  'Z': [ 
    { min: 10, max: 52, nextGroup: 'Z' }, { min: 53, max: 144, nextGroup: 'O' }, { min: 145, max: 237, nextGroup: 'N' }, 
    { min: 238, max: 329, nextGroup: 'M' }, { min: 330, max: 421, nextGroup: 'L' }, { min: 422, max: 513, nextGroup: 'K' },
    { min: 514, max: 606, nextGroup: 'J' }, { min: 607, max: 750, nextGroup: 'I' }, { min: 751, max: 842, nextGroup: 'H' },
    { min: 843, max: 934, nextGroup: 'G' }, { min: 935, max: 1027, nextGroup: 'F' }, { min: 1028, max: 1119, nextGroup: 'E' },
    { min: 1120, max: 1213, nextGroup: 'D' }, { min: 1214, max: 1330, nextGroup: 'C' }, { min: 1331, max: 1550, nextGroup: 'B' },
    { min: 1551, max: 9999, nextGroup: 'A' }
  ]
};

// Table 9-8 (Bottom): Residual Nitrogen Times (Minutes)
export const RNT_TABLE: Record<number, Record<string, number>> = {
  30: { 'A': 17, 'B': 27, 'C': 38, 'D': 50, 'E': 62, 'F': 76, 'G': 91, 'H': 107, 'I': 125, 'J': 145, 'K': 167, 'L': 193, 'M': 223, 'N': 260, 'O': 307, 'Z': 371 },
  40: { 'A': 12, 'B': 20, 'C': 27, 'D': 36, 'E': 44, 'F': 53, 'G': 63, 'H': 73, 'I': 84, 'J': 95, 'K': 108, 'L': 121, 'M': 135, 'N': 151, 'O': 163 },
  50: { 'A': 9, 'B': 15, 'C': 21, 'D': 28, 'E': 34, 'F': 41, 'G': 48, 'H': 56, 'I': 63, 'J': 71, 'K': 80, 'L': 89, 'M': 92 },
  60: { 'A': 7, 'B': 12, 'C': 17, 'D': 22, 'E': 28, 'F': 33, 'G': 39, 'H': 45, 'I': 51, 'J': 57, 'K': 63 },
  70: { 'A': 6, 'B': 10, 'C': 14, 'D': 19, 'E': 23, 'F': 28, 'G': 32, 'H': 37, 'I': 42, 'J': 47 },
  80: { 'A': 5, 'B': 9, 'C': 12, 'D': 16, 'E': 20, 'F': 24, 'G': 28, 'H': 32, 'I': 36 },
};
