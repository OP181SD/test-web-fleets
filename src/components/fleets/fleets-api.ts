import {
  fleetCardColorVar,
  type FleetColorKey,
} from "@/components/create-fleet-modal/lib/schema";
import type { IFleetCardProps } from "@/components/fleet-card";

export const FLEETS_QUERY_KEY = ["fleets"] as const;
export const PAGE_SIZE = 12;

export type Fleet = IFleetCardProps & { id: string };

export type ApiFleet = {
  id: string;
  title: string;
  description: string | null;
  color: FleetColorKey;
  companiesCount: number;
  createdAt: string;
};

export type FleetsPage = { items: ApiFleet[]; nextCursor: string | null };

export const fetchFleetsPage = async ({
  pageParam,
}: {
  pageParam: string | undefined;
}): Promise<FleetsPage> => {
  const url = new URL("/api/fleets", window.location.origin);
  url.searchParams.set("limit", String(PAGE_SIZE));
  if (pageParam) url.searchParams.set("cursor", pageParam);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load fleets");
  return res.json();
};

export const toCardFleet = (f: ApiFleet): Fleet => ({
  id: f.id,
  title: f.title,
  description: f.description ?? undefined,
  color: fleetCardColorVar(f.color),
  companiesCount: f.companiesCount,
});
