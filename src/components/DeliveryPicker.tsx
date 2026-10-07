import { useMemo } from "react";
import {
  getAvailableDates,
  getAvailableWindows,
  getSameDayInfo,
  TIME_WINDOWS,
  type DeliveryDate,
  type DeliverySelection,
} from "../utils/delivery";
import { TruckIcon } from "./icons";

export type DeliveryValue = DeliverySelection;

interface DeliveryPickerProps {
  value: DeliveryValue;
  onChange: (value: DeliveryValue) => void;
  title?: string;
}

export default function DeliveryPicker({ value, onChange, title = "Delivery" }: DeliveryPickerProps) {
  // `now` is captured when the picker mounts; the cutoff logic in
  // utils/delivery.ts compares it against today's 2:00 PM same-day cutoff.
  const now = useMemo(() => new Date(), []);
  const sameDay = getSameDayInfo(now);
  const dates = getAvailableDates(7, now);
  const windows = getAvailableWindows(value.dateIso, now);

  function pickDate(d: DeliveryDate) {
    // Switching date resets the time window to the first one available that day.
    const ws = getAvailableWindows(d.iso, now);
    const w = ws[0] ?? TIME_WINDOWS[0];
    onChange({ dateIso: d.iso, dateLabel: d.label, windowId: w.id, windowLabel: w.label });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-serif text-lg">{title}</h3>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
            sameDay.isBeforeCutoff ? "bg-sage-soft text-sage-deep" : "bg-[#F1EAE0] text-[#7A6A58]"
          }`}
        >
          <TruckIcon className="h-3.5 w-3.5" />
          {sameDay.message}
        </span>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-warm">Date</p>
        <div className="flex gap-2 overflow-x-auto pb-1.5">
          {dates.map((d) => {
            const selected = value.dateIso === d.iso;
            return (
              <button
                key={d.iso}
                type="button"
                onClick={() => pickDate(d)}
                className={`flex min-w-[76px] flex-col items-center gap-0.5 rounded-2xl border px-3 py-2.5 transition-all duration-200 ${
                  selected
                    ? "border-terracotta bg-terracotta text-white"
                    : "border-line bg-white hover:border-terracotta/60"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider opacity-75">
                  {d.weekday}
                </span>
                <span className="font-serif text-lg leading-tight">
                  {d.sameDay ? "Today" : d.isTomorrow ? "Tomorrow" : d.day}
                </span>
                {d.sameDay && (
                  <span
                    className={`rounded-full px-1.5 py-px text-[9px] font-bold uppercase ${
                      selected ? "bg-white/25" : "bg-sage-soft text-sage-deep"
                    }`}
                  >
                    Same-day
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-warm">Time window</p>
        {windows.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {windows.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => onChange({ ...value, windowId: w.id, windowLabel: w.label })}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
                  value.windowId === w.id
                    ? "border-terracotta bg-terracotta text-white"
                    : "border-line bg-white text-ink hover:border-terracotta/60"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-warm">No delivery windows left today — please choose another date.</p>
        )}
      </div>
    </div>
  );
}
