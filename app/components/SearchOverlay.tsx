"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  useInstantSearch,
} from "react-instantsearch";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string
);

function Hit({ hit }: { hit: any }) {
  return (
    <a
      href={hit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800"
    >
      {hit.icon ? (
        <Image
          src={hit.icon}
          alt={hit.name}
          width={32}
          height={32}
          className="shrink-0"
        />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-zinc-700">
          <span className="text-xs font-bold text-zinc-400">
            {hit.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-100">
          <Highlight attribute="name" hit={hit} />
        </p>
        <p className="truncate text-xs text-zinc-400">{hit.category}</p>
      </div>
    </a>
  );
}

function EmptyQueryBoundary({ children }: { children: React.ReactNode }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return (
      <div className="px-4 py-8 text-center text-sm text-zinc-500">
        Start typing to search AWS services...
      </div>
    );
  }

  return <>{children}</>;
}

function NoResultsBoundary({ children }: { children: React.ReactNode }) {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <div className="px-4 py-6 text-center text-sm text-zinc-500">
        No services found for &quot;{results.query}&quot;
      </div>
    );
  }

  return <>{children}</>;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>(
          ".ais-SearchBox-input"
        );
        input?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 pt-24"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={overlayRef}
        className="w-full max-w-2xl rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl"
      >
        <InstantSearch searchClient={searchClient} indexName="algolia-services">
          <div className="border-b border-zinc-700 p-4">
            <SearchBox
              placeholder="Search AWS services..."
              autoFocus
              classNames={{
                root: "w-full",
                form: "relative",
                input:
                  "w-full rounded-lg border-0 bg-zinc-800 px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500",
                submit: "absolute left-3 top-1/2 -translate-y-1/2 hidden",
                reset: "absolute right-3 top-1/2 -translate-y-1/2",
                resetIcon: "h-4 w-4 text-zinc-500 hover:text-zinc-300",
              }}
            />
          </div>

          <div className="max-h-96 overflow-auto">
            <EmptyQueryBoundary>
              <NoResultsBoundary>
                <Hits
                  hitComponent={Hit}
                  classNames={{
                    list: "divide-y divide-zinc-800",
                  }}
                />
              </NoResultsBoundary>
            </EmptyQueryBoundary>
          </div>

          <div className="border-t border-zinc-700 px-4 py-2 text-xs text-zinc-500">
            Press <kbd className="rounded bg-zinc-800 px-1.5 py-0.5">ESC</kbd>{" "}
            to close
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
