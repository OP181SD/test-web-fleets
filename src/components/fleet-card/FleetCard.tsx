"use client";

import { useIntlayer } from "next-intlayer";
import { BuildingIcon } from "@/icons";
import { cn } from "@/utils";

export interface IFleetCardProps {
  title: string;
  description?: string;
  color: string;
  companiesCount: number;
  className?: string;
}

const COLOR_MASK =
  "radial-gradient(251px 251px at -3.5px -5px, #000 0%, transparent 100%)";

export const FleetCard = ({
  title,
  description,
  color,
  companiesCount,
  className,
}: IFleetCardProps) => {
  const { companies, emptyDescription, menuLabel } = useIntlayer("fleet-card");
  return (
    <article
      className={cn(
        "group glassmorphism relative h-[280px] w-[320px] shrink-0 overflow-hidden rounded-10",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-200 group-hover:opacity-40"
        style={{
          backgroundColor: color,
          maskImage: COLOR_MASK,
          WebkitMaskImage: COLOR_MASK,
        }}
      />

      <div className="relative flex h-full flex-col justify-between px-6 pb-8 pt-6">
        <button
          type="button"
          aria-label={`${menuLabel}`}
          className="flex h-1 w-fit items-center gap-1 self-end rounded transition hover:opacity-70"
        >
          <span className="size-1 rounded-full bg-white/30" />
          <span className="size-1 rounded-full bg-white/30" />
          <span className="size-1 rounded-full bg-white/30" />
        </button>

        <div className="flex w-[272px] flex-col gap-4">
          <h3 className="line-clamp-2 max-h-12 text-[length:var(--text-20)] font-bold leading-6 text-white">
            {title}
          </h3>
          <p
            className={cn(
              "line-clamp-2 h-9 text-[length:var(--text-13)] font-normal leading-[18px]",
              description ? "text-white/60" : "text-white/30",
            )}
          >
            {description || emptyDescription}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-white">
          <BuildingIcon className="h-2.5 w-[9px] shrink-0" />
          <span className="text-[length:var(--text-13)] font-medium leading-4 tracking-[0.02em]">
            {companiesCount} {companies(companiesCount)}
          </span>
        </div>
      </div>
    </article>
  );
};
