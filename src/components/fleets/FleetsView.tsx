"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntlayer } from "next-intlayer";
import { useEffect, useRef } from "react";

import { Button } from "@/components/button";
import {
  CREATE_FLEET_MODAL_ID,
  CreateFleetModal,
} from "@/components/create-fleet-modal";
import { FleetCard } from "@/components/fleet-card";
import { useModalActions } from "@/components/modal";
import { SparkleIcon } from "@/icons";

import {
  fetchFleetsPage,
  FLEETS_QUERY_KEY,
  PAGE_SIZE,
  toCardFleet,
} from "./fleets-api";

export const FleetsView = () => {
  const { openModal } = useModalActions();
  const { createButton, loadError, retry, empty } = useIntlayer("fleets-page");

  const {
    data,
    isPending,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: FLEETS_QUERY_KEY,
    queryFn: fetchFleetsPage,
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const fleets =
    data?.pages.flatMap((page) => page.items.map(toCardFleet)) ?? [];

  const scrollRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: scrollRef.current, rootMargin: "300px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const showEmpty = !isPending && !isError && fleets.length === 0;
  const showError = isError && fleets.length === 0;

  return (
    <main className="mx-auto flex h-screen w-full max-w-[1869px] flex-col gap-12 py-7">
      <header className="flex h-12 shrink-0 items-center justify-end">
        <Button
          variant="ghostMedium"
          padding="sm"
          textSize="base"
          onClick={() => openModal(CREATE_FLEET_MODAL_ID)}
        >
          <SparkleIcon className="size-4" />
          {createButton}
        </Button>
      </header>

      <section
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-scroll fleet-scrollbar pr-4"
      >
        <div className="flex flex-wrap content-start justify-end gap-6">
          {isPending
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="glassmorphism h-[280px] w-[320px] shrink-0 animate-pulse rounded-10"
                />
              ))
            : fleets.map(({ id, ...fleet }) => <FleetCard key={id} {...fleet} />)}
        </div>

        {showError && (
          <div className="flex flex-col items-center gap-4 py-16 text-white/60">
            <p>{loadError}</p>
            <Button
              variant="primary"
              size="sm"
              alignment="center"
              isLoading={isFetching}
              onClick={() => refetch()}
            >
              {retry}
            </Button>
          </div>
        )}

        {showEmpty && (
          <div className="flex justify-center py-16 text-white/40">{empty}</div>
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center py-6">
            <div className="size-5 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
          </div>
        )}

        <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
      </section>

      <CreateFleetModal />
    </main>
  );
};
