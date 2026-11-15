// Reference solution for exercise 06. Open it only after your own attempt.

type Hotspot = { id: string; tempC: number; areaM2: number };
type Severity = "low" | "medium" | "high";
type Summary = { count: number; totalAreaM2: number; hottestId: string | null };

function severityOf(tempC: number): Severity {
  if (tempC >= 300) return "high";
  if (tempC >= 100) return "medium";
  return "low";
}

export function summarise(hotspots: Hotspot[]): Record<Severity, Summary> {
  const result: Record<Severity, Summary> = {
    low: { count: 0, totalAreaM2: 0, hottestId: null },
    medium: { count: 0, totalAreaM2: 0, hottestId: null },
    high: { count: 0, totalAreaM2: 0, hottestId: null },
  };
  const hottestTemp: Record<Severity, number> = {
    low: -Infinity,
    medium: -Infinity,
    high: -Infinity,
  };

  for (const h of hotspots) {
    const severity = severityOf(h.tempC);
    const group = result[severity];
    group.count += 1;
    group.totalAreaM2 += h.areaM2;
    if (h.tempC > hottestTemp[severity]) {
      hottestTemp[severity] = h.tempC;
      group.hottestId = h.id;
    }
  }
  return result;
}
