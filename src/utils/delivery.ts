/*
 * Delivery scheduling helpers — including the same-day delivery cutoff logic.
 *
 * How same-day delivery works:
 *  - The shop accepts same-day orders until a fixed cutoff: 2:00 PM local time
 *    (SAME_DAY_CUTOFF_HOUR). Every bouquet needs about an hour of prep and travel
 *    time (MIN_LEAD_HOURS) before it can be inside a delivery window.
 *  - getSameDayInfo() compares the current time against today's cutoff:
 *      - BEFORE the cutoff → same-day delivery is offered ("Order by 2:00 PM…").
 *      - AFTER the cutoff  → the cutoff has passed for today, so same-day is no
 *        longer possible; the earliest bookable date rolls over to tomorrow and
 *        the UI says so instead.
 *  - getAvailableDates() builds the bookable date list: today first, but only
 *    while the cutoff hasn't passed; otherwise it starts at tomorrow.
 *  - getAvailableWindows() hides time windows that would start sooner than
 *    MIN_LEAD_HOURS from now when the chosen date is today (e.g. at 1:30 PM only
 *    the 3:00 – 6:00 PM window remains bookable).
 */

export const SAME_DAY_CUTOFF_HOUR = 14; // 2:00 PM local time
export const MIN_LEAD_HOURS = 1; // prep + travel time before a window opens

export interface TimeWindow {
  id: string;
  label: string;
  /** Hour of the day (24h) at which this window opens, e.g. 9, 12, 15. */
  startHour: number;
}

export const TIME_WINDOWS: TimeWindow[] = [
  { id: "morning", label: "9:00 AM – 12:00 PM", startHour: 9 },
  { id: "midday", label: "12:00 – 3:00 PM", startHour: 12 },
  { id: "afternoon", label: "3:00 – 6:00 PM", startHour: 15 },
];

export interface DeliveryDate {
  /** Local date as "yyyy-mm-dd" — no timezone shifting. */
  iso: string;
  /** Short weekday, e.g. "Sun". */
  weekday: string;
  /** Day of month, e.g. 14. */
  day: number;
  sameDay: boolean;
  isTomorrow: boolean;
  /** "Today" | "Tomorrow" | full weekday name, e.g. "Friday". */
  label: string;
}

export interface DeliverySelection {
  dateIso: string;
  dateLabel: string;
  windowId: string;
  windowLabel: string;
}

export interface SameDayInfo {
  isBeforeCutoff: boolean;
  cutoffLabel: string;
  message: string;
}

function formatHour(hour: number): string {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:00 ${suffix}`;
}

export function getSameDayInfo(now: Date = new Date()): SameDayInfo {
  // Today's cutoff moment: the same calendar day at SAME_DAY_CUTOFF_HOUR:00:00.
  const cutoff = new Date(now);
  cutoff.setHours(SAME_DAY_CUTOFF_HOUR, 0, 0, 0);

  // Compare the current time with the cutoff:
  //  - now < cutoff  → the order can still make it onto today's van.
  //  - now >= cutoff → the cutoff has passed for today; same-day delivery is
  //    closed and the earliest available date becomes tomorrow.
  const isBeforeCutoff = now.getTime() < cutoff.getTime();
  const cutoffLabel = formatHour(SAME_DAY_CUTOFF_HOUR);

  return {
    isBeforeCutoff,
    cutoffLabel,
    message: isBeforeCutoff
      ? `Order by ${cutoffLabel} for same-day delivery`
      : `Today's ${cutoffLabel} cutoff has passed — earliest delivery is tomorrow`,
  };
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isSameDayDate(dateIso: string, now: Date = new Date()): boolean {
  return toIsoDate(now) === dateIso;
}

/** The next `count` bookable dates. Today is included only before the cutoff. */
export function getAvailableDates(count = 7, now: Date = new Date()): DeliveryDate[] {
  const { isBeforeCutoff } = getSameDayInfo(now);
  const dates: DeliveryDate[] = [];
  // Start at today only if the cutoff hasn't passed; otherwise start at tomorrow.
  const start = isBeforeCutoff ? 0 : 1;
  for (let i = start; i < start + count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push({
      iso: toIsoDate(d),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      sameDay: i === 0,
      isTomorrow: i === 1,
      label:
        i === 0
          ? "Today"
          : i === 1
            ? "Tomorrow"
            : d.toLocaleDateString("en-US", { weekday: "long" }),
    });
  }
  return dates;
}

/** Time windows bookable on a given date (today's past windows are hidden). */
export function getAvailableWindows(dateIso: string, now: Date = new Date()): TimeWindow[] {
  // For future dates every window is available.
  if (!isSameDayDate(dateIso, now)) return TIME_WINDOWS;
  // For today, a window is only offered if it starts at least MIN_LEAD_HOURS
  // from now — e.g. at 1:30 PM only the 3:00 – 6:00 PM window remains.
  const earliestStart = now.getHours() + now.getMinutes() / 60 + MIN_LEAD_HOURS;
  return TIME_WINDOWS.filter((w) => w.startHour >= earliestStart);
}

/** Sensible default selection: the earliest bookable date + its first window. */
export function getDefaultDeliverySelection(now: Date = new Date()): DeliverySelection {
  const dates = getAvailableDates(7, now);
  const first = dates[0];
  const windows = getAvailableWindows(first.iso, now);
  const w = windows[0] ?? TIME_WINDOWS[0];
  return {
    dateIso: first.iso,
    dateLabel: first.label,
    windowId: w.id,
    windowLabel: w.label,
  };
}
