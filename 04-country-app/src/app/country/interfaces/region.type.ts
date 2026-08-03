export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'] as const;

export type Region = (typeof REGIONS)[number];
