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
  "EHGQYVZZ33", // Replace with your Algolia Application ID
  "df00a97c46abb92a4a23636b2442fd60" // Replace with your Algolia Search-Only API Key
);

function Hit({ hit }: { hit: any }) {
  return (
    <a
      href={hit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-zinc-200 dark:bg-zinc-700">
          <span className="text-xs font-bold text-zinc-500">
            {hit.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <Highlight attribute="name" hit={hit} />
        </p>
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {hit.category}
        </p>
      </div>
    </a>
  );
}

function EmptyQueryBoundary({ children }: { children: React.ReactNode }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return null;
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

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <InstantSearch searchClient={searchClient} indexName="algolia-services">
        <SearchBox
          placeholder="Search AWS services... (⌘K)"
          onFocus={() => setIsOpen(true)}
          classNames={{
            root: "w-full",
            form: "relative",
            input:
              "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 pl-10 text-sm text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500",
            submit: "absolute left-3 top-1/2 -translate-y-1/2",
            submitIcon: "h-4 w-4 text-zinc-400",
            reset: "absolute right-3 top-1/2 -translate-y-1/2",
            resetIcon: "h-4 w-4 text-zinc-400 hover:text-zinc-600",
          }}
        />

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-auto rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <EmptyQueryBoundary>
              <NoResultsBoundary>
                <Hits
                  hitComponent={Hit}
                  classNames={{
                    list: "divide-y divide-zinc-100 dark:divide-zinc-800",
                  }}
                />
              </NoResultsBoundary>
            </EmptyQueryBoundary>
          </div>
        )}
      </InstantSearch>
    </div>
  );
}
