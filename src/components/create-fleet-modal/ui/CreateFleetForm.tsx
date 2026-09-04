"use client";

import { useIntlayer } from "next-intlayer";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/button";
import type { CreateFleetValues } from "../lib/schema";
import { ColorSwatchPicker } from "./ColorSwatchPicker";

const FIELD_CLASS =
  "rounded-s border border-black/10 bg-white/10 px-4 py-3 text-[length:var(--text-sx)] leading-[17px] text-white outline-none transition-colors duration-200 placeholder:text-white/40 focus:border-white/30";

const LABEL_CLASS =
  "text-[length:var(--text-sx)] font-medium leading-5 text-white";

interface CreateFleetFormProps {
  onCancel: () => void;
}

export const CreateFleetForm = ({ onCancel }: CreateFleetFormProps) => {
  const {
    register,
    formState: { isValid, isSubmitting, errors },
  } = useFormContext<CreateFleetValues>();
  const c = useIntlayer("create-fleet");

  const ERROR_CLASS = "text-[length:var(--text-sx)] leading-4 text-danger";

  return (
    <div className="flex w-[698px] flex-col gap-[60px]">
      <header className="flex flex-col gap-4">
        <h1 className="text-[length:var(--text-m)] leading-[29px] font-semibold text-white">
          {c.formTitle}
        </h1>
        <p className="text-[length:var(--text-sx)] leading-5 font-normal text-white/70">
          {c.formSubtitle}
        </p>
      </header>

      <div className="flex h-[69px] gap-[60px]">
        <div className="flex w-[288px] flex-col gap-2">
          <label htmlFor="fleet-name" className={LABEL_CLASS}>
            {c.nameLabel} *
          </label>
          <input
            id="fleet-name"
            type="text"
            placeholder={`${c.namePlaceholder}`}
            autoComplete="off"
            disabled={isSubmitting}
            className={`h-[41px] w-[288px] ${FIELD_CLASS}`}
            {...register("name")}
          />
          {errors.name && <p className={ERROR_CLASS}>{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: le radiogroup porte déjà aria-label */}
          <span className={LABEL_CLASS}>{c.colorLabel}</span>
          <div className="flex h-[41px] items-center">
            <ColorSwatchPicker />
          </div>
          {errors.color && <p className={ERROR_CLASS}>{errors.color.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fleet-description" className={LABEL_CLASS}>
          {c.descriptionLabel}
        </label>
        <textarea
          id="fleet-description"
          placeholder={`${c.descriptionInputPlaceholder}`}
          disabled={isSubmitting}
          className={`h-[92px] w-[698px] resize-none ${FIELD_CLASS}`}
          {...register("description")}
        />
        {errors.description && (
          <p className={ERROR_CLASS}>{errors.description.message}</p>
        )}
      </div>

      {errors.root && <p className={ERROR_CLASS}>{errors.root.message}</p>}

      <div className="flex h-[43px] justify-between">
        <Button
          type="button"
          variant="danger"
          textSize="base"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-[43px] w-[90px] justify-center rounded-xs"
        >
          {c.cancel}
        </Button>
        <Button
          type="submit"
          variant="ghostMonochrome"
          alignment="center"
          textSize="base"
          disabled={!isValid || isSubmitting}
          className="h-[43px] w-[136px] rounded-xs bg-white/10 px-4 py-3 text-[length:var(--text-s)] leading-[19px] font-normal text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-white/40 disabled:hover:bg-white/5"
        >
          {c.submit}
        </Button>
      </div>
    </div>
  );
};
