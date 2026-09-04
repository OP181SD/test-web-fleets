"use client";

import { motion } from "framer-motion";
import { useIntlayer } from "next-intlayer";
import type { ReactNode } from "react";
import { useWatch } from "react-hook-form";
import { ChevronRightIcon, FolderIcon } from "@/icons";
import { cn } from "@/utils";
import {
  type CreateFleetValues,
  type FleetColorKey,
  fleetCardColorVar,
} from "../lib/schema";
import { useTilt } from "../lib/useTilt";

const PREVIEW_MASK =
  "radial-gradient(502px 502px at -96px -60px, #000 0%, transparent 100%)";

const PreviewBreadcrumb = () => {
  const { breadcrumbLabel, breadcrumbRoot, titlePlaceholder } =
    useIntlayer("create-fleet");
  const name = useWatch<CreateFleetValues>({ name: "name" });

  return (
    <nav
      aria-label={`${breadcrumbLabel}`}
      className="flex h-7 items-center gap-1 text-white/70"
    >
      <span className="text-[length:var(--text-sm)] font-normal leading-7">
        {breadcrumbRoot}
      </span>
      <ChevronRightIcon className="size-5 shrink-0" />
      <span className="truncate text-[length:var(--text-sm)] font-semibold leading-7 text-white">
        {name?.trim() ? name : titlePlaceholder}
      </span>
    </nav>
  );
};

const PreviewCardContent = () => {
  const { typeLabel, titlePlaceholder, descriptionPlaceholder } =
    useIntlayer("create-fleet");
  const values = useWatch<CreateFleetValues>();
  const name = values?.name?.trim() ?? "";
  const description = values?.description?.trim() ?? "";
  const color = (values?.color ?? "blue") as FleetColorKey;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundColor: fleetCardColorVar(color),
          maskImage: PREVIEW_MASK,
          WebkitMaskImage: PREVIEW_MASK,
        }}
      />

      <div className="relative flex h-full flex-col justify-between px-12 pt-12 pb-16">
        <div className="flex h-[22px] items-center justify-between">
          <div className="flex items-center gap-2 text-white/50">
            <FolderIcon className="size-[22px] shrink-0" />
            <span className="text-[18px] leading-[22px] font-normal">
              {typeLabel}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-[7px] rounded-full bg-white/30" />
            <span className="size-[7px] rounded-full bg-white/30" />
            <span className="size-[7px] rounded-full bg-white/30" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2
            className={cn(
              "line-clamp-2 text-[length:var(--text-xl)] leading-12 font-bold break-words",
              name ? "text-white" : "text-white/40",
            )}
          >
            {name || titlePlaceholder}
          </h2>
          <p
            className={cn(
              "line-clamp-2 text-[22px] leading-[31px] font-normal break-words",
              description ? "text-white/60" : "text-white/30",
            )}
          >
            {description || descriptionPlaceholder}
          </p>
        </div>

        <div className="h-[27px]" />
      </div>
    </>
  );
};

const TiltCard = ({ children }: { children: ReactNode }) => {
  const tilt = useTilt();
  return (
    <div style={{ perspective: 1200 }}>
      <motion.article
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        className="glassmorphism animated-cards-container relative h-[519px] w-[550px] overflow-hidden rounded-10"
      >
        {children}
      </motion.article>
    </div>
  );
};

export const FleetPreview = () => {
  return (
    <div className="flex h-[563px] w-[550px] flex-col gap-4">
      <PreviewBreadcrumb />
      <TiltCard>
        <PreviewCardContent />
      </TiltCard>
    </div>
  );
};
