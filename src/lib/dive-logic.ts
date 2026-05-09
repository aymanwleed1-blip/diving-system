/**
 * US Navy Dive Table Logic (Simplified)
 * Values derived from US Navy Diving Manual Revision 7
 */

export interface DiveState {
  depth: number; // meters
  time: number; // minutes
  gas: 'Air' | 'Nitrox';
  pressureGroupIn?: string;
  surfaceInterval?: number; // minutes
}

// Depth in meters to NDL in minutes (Air)
const AIR_NDL: Record<number, number> = {
  9: 444, // 30ft
  10.6: 310, // 35ft
  12: 200, // 40ft
  15: 100, // 50ft
  18: 60, // 60ft
  21: 50, // 70ft
  24: 40, // 80ft
  27: 30, // 90ft
  30: 25, // 100ft
  33: 20, // 110ft
  36: 15, // 120ft
  39: 10, // 130ft
  42: 7, // 140ft
};

/**
 * Get No-Decompression Limit for a given depth (meters)
 */
export function getNDL(depth: number): number {
  const depths = Object.keys(AIR_NDL).map(Number).sort((a, b) => a - b);
  const targetDepth = depths.find(d => d >= depth) || depths[depths.length - 1];
  return AIR_NDL[targetDepth];
}

/**
 * Pressure Groups (A-Z)
 * This is a highly simplified mock-up of the transition matrix.
 * In a real-world app, this would be an exhaustive lookup table.
 */
export function getPressureGroup(depth: number, time: number): string {
  // Mock logic: depth * time determines the group
  const score = depth * time;
  if (score < 100) return 'A';
  if (score < 250) return 'C';
  if (score < 500) return 'G';
  if (score < 800) return 'L';
  if (score < 1200) return 'R';
  if (score < 1500) return 'W';
  return 'Z';
}

/**
 * Surface Interval update
 */
export function updatePressureGroupAfterSI(group: string, interval: number): string {
  if (interval > 720) return ''; // 12 hours clears all nitrogen
  // Mock reduction logic
  const steps = Math.floor(interval / 60);
  const groups = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const idx = groups.indexOf(group);
  if (idx === -1) return '';
  return groups[Math.max(0, idx - steps)];
}
