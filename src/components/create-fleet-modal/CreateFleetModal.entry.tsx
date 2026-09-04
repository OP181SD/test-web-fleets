"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntlayer } from "next-intlayer";
import { type ReactNode, useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  type ApiFleet,
  FLEETS_QUERY_KEY,
  type FleetsPage,
} from "@/components/fleets/fleets-api";
import { Modal, useModalStore } from "@/components/modal";
import { InfoIcon } from "@/icons";
import {
  buildCreateFleetSchema,
  CREATE_FLEET_DEFAULTS,
  type CreateFleetValues,
} from "./lib/schema";
import { CreateFleetForm } from "./ui/CreateFleetForm";
import { FleetPreview } from "./ui/FleetPreview";

export const CREATE_FLEET_MODAL_ID = "create-fleet";

type SubmitError =
  | { kind: "validation"; fieldErrors: Partial<Record<string, string[]>> }
  | { kind: "server" };

const FocusTrap = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = ref.current;
    const selector =
      'input,textarea,button,[href],[tabindex]:not([tabindex="-1"])';
    const focusables = () =>
      [...(root?.querySelectorAll<HTMLElement>(selector) ?? [])].filter(
        (el) => !el.hasAttribute("disabled"),
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, []);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
};

export const CreateFleetModal = () => {
  const openModalId = useModalStore((s) => s.openModalId);
  const closeModal = useModalStore((s) => s.closeModal);
  const isOpen = openModalId === CREATE_FLEET_MODAL_ID;

  const content = useIntlayer("create-fleet");
  const queryClient = useQueryClient();

  const schema = useMemo(
    () =>
      buildCreateFleetSchema({
        nameRequired: `${content.validation.nameRequired}`,
        nameMax: `${content.validation.nameMax}`,
        descriptionMax: `${content.validation.descriptionMax}`,
      }),
    [content],
  );

  const methods = useForm<CreateFleetValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: CREATE_FLEET_DEFAULTS,
  });

  useEffect(() => {
    if (!isOpen) methods.reset(CREATE_FLEET_DEFAULTS);
  }, [isOpen, methods]);

  const createFleet = useMutation({
    mutationFn: async (values: CreateFleetValues): Promise<ApiFleet> => {
      const res = await fetch("/api/fleets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-locale": document.documentElement.lang,
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          color: values.color,
        }),
      });
      if (res.status === 400) {
        const data = (await res.json()) as { errors?: Record<string, string[]> };
        throw { kind: "validation", fieldErrors: data.errors ?? {} } satisfies SubmitError;
      }
      if (!res.ok) throw { kind: "server" } satisfies SubmitError;
      return res.json();
    },
  });

  const onValid = async (values: CreateFleetValues) => {
    methods.clearErrors("root");
    try {
      const created = await createFleet.mutateAsync(values);

      queryClient.setQueryData<InfiniteData<FleetsPage>>(
        FLEETS_QUERY_KEY,
        (old) => {
          if (!old || old.pages.length === 0) return old;
          const [first, ...rest] = old.pages;
          return {
            ...old,
            pages: [{ ...first, items: [created, ...first.items] }, ...rest],
          };
        },
      );

      closeModal();
    } catch (err) {
      const error = err as SubmitError;
      if (error?.kind === "validation") {
        (Object.keys(error.fieldErrors) as (keyof CreateFleetValues)[]).forEach(
          (field) => {
            const message = error.fieldErrors[field]?.[0];
            if (message) methods.setError(field, { message });
          },
        );
      } else {
        methods.setError("root", { message: `${content.errors.submitFailed}` });
      }
    }
  };

  const requestClose = () => {
    if (!methods.formState.isSubmitting) closeModal();
  };

  return (
    <FormProvider {...methods}>
      <Modal id={CREATE_FLEET_MODAL_ID} animation="scale">
        <Modal.Overlay blurIntensity={10} opacity={0.3} />
        <Modal.Return
          label={`${content.return}`}
          defaultTextClassname="text-white/60"
        />

        <button
          type="button"
          aria-label={`${content.help}`}
          className="fixed top-11.75 right-26 z-70 flex items-center gap-3 rounded-xs px-2 py-1 text-white/60 transition-colors duration-200 hover:text-white"
        >
          <span className="text-[length:var(--text-s)] leading-6 font-normal">
            {content.help}
          </span>
          <InfoIcon className="size-5 shrink-0" />
        </button>

        <Modal.Content
          size="full"
          width="100vw"
          maxWidth="100vw"
          maxHeight="100vh"
          padding="0"
          borderRadius="0"
          scrollable={false}
        >
          <form
            onSubmit={methods.handleSubmit(onValid)}
            className="flex h-screen w-screen items-center justify-center"
          >
            <FocusTrap>
              <div className="flex items-center justify-center gap-[clamp(40px,calc(23.8vw-293.7px),164px)]">
                <FleetPreview />
                <CreateFleetForm onCancel={requestClose} />
              </div>
            </FocusTrap>
          </form>
        </Modal.Content>
      </Modal>
    </FormProvider>
  );
};
