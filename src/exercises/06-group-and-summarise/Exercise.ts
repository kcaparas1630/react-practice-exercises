// EDIT THIS FILE. The instructions are in README.md, in this folder.

/**
 * Requirements:
 * - Group into three groups, via low, medium high
 * - When input or let's say hotspots are empty, just return empty values, or initial values.
 * - Return type would be returning a Summary type
 */
import type { Hotspot, Severity, Summary } from "./given";

function severityOf(tempC: number): Severity {
  if (tempC < 100) {
    return "low";
  } 
  if (tempC > 100 && tempC < 300) {
    return "medium";
  }
  return "high";
}

export function summarise(hotspots: Hotspot[]): Record<Severity, Summary> {
  // initial value
  const result: Record<Severity, Summary> = {
    low: {count: 0, totalAreaM2: 0, hottestId: null},
    medium: {count: 0, totalAreaM2: 0, hottestId: null},
    high: {count: 0, totalAreaM2: 0, hottestId: null},
  };
  const hottestHotspotTempC: Record<Severity, number> = {
    low: 0,
    medium: 0,
    high: 0
  }

  for (const hotspot of hotspots) {
    const severity = severityOf(hotspot.tempC);
    const summary = result[severity];
    summary.count += 1;
    summary.totalAreaM2 += hotspot.areaM2;
    if (hotspot.tempC > hottestHotspotTempC[severity]) {
      hottestHotspotTempC[severity] = hotspot.tempC;
      summary.hottestId = hotspot.id;
    } 
  }
  return result;
}
