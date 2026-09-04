import { z } from "zod";

export const FLEET_COLOR_KEYS = [
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "violet",
] as const;

export type FleetColorKey = (typeof FLEET_COLOR_KEYS)[number];

const FLEET_COLOR_VARS: Record<FleetColorKey, string> = {
  blue: "var(--color-fleet-blue)",
  cyan: "var(--color-fleet-cyan)",
  green: "var(--color-fleet-green)",
  yellow: "var(--color-fleet-yellow)",
  orange: "var(--color-fleet-orange)",
  red: "var(--color-fleet-red)",
  pink: "var(--color-fleet-pink)",
  violet: "var(--color-fleet-violet)",
};

export const fleetCardColorVar = (key: FleetColorKey) => FLEET_COLOR_VARS[key];

export const fleetSwatchColorVar = (key: FleetColorKey) =>
  `var(--color-fleet-${key}-swatch)`;

export const NAME_MAX = 60;
export const DESCRIPTION_MAX = 160;

export interface CreateFleetMessages {
  nameRequired: string;
  nameMax: string;
  descriptionMax: string;
}

export const buildCreateFleetSchema = (messages: CreateFleetMessages) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, messages.nameRequired)
      .max(NAME_MAX, messages.nameMax),
    description: z
      .string()
      .trim()
      .max(DESCRIPTION_MAX, messages.descriptionMax)
      .optional(),
    color: z.enum(FLEET_COLOR_KEYS),
  });

export type CreateFleetValues = z.infer<
  ReturnType<typeof buildCreateFleetSchema>
>;

export const CREATE_FLEET_DEFAULTS: CreateFleetValues = {
  name: "",
  description: "",
  color: "blue",
};
