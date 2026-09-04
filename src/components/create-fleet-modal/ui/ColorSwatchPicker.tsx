"use client";

import { useIntlayer } from "next-intlayer";
import { type KeyboardEvent, useRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  type CreateFleetValues,
  FLEET_COLOR_KEYS,
  fleetSwatchColorVar,
} from "../lib/schema";

export const ColorSwatchPicker = () => {
  const { control } = useFormContext<CreateFleetValues>();
  const { field } = useController({ control, name: "color" });
  const { colors } = useIntlayer("create-fleet");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (index: number) => {
    const key = FLEET_COLOR_KEYS[index];
    field.onChange(key);
    refs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move((i + 1) % FLEET_COLOR_KEYS.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move((i - 1 + FLEET_COLOR_KEYS.length) % FLEET_COLOR_KEYS.length);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Couleur"
      className="flex items-center gap-[18px]"
    >
      {FLEET_COLOR_KEYS.map((key, i) => {
        const selected = field.value === key;
        const swatch = fleetSwatchColorVar(key);
        return (
          <button
            key={key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${colors[key]}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => field.onChange(key)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="relative flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-white/50"
            style={
              selected
                ? { border: `1.5px solid ${swatch}` }
                : { backgroundColor: swatch }
            }
          >
            {selected && (
              <span
                className="size-[18px] rounded-full"
                style={{ backgroundColor: swatch }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
