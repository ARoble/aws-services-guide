import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import data from "@/data/aws-services.json";
import Sidebar from "@/app/components/Sidebar";

export function generateStaticParams() {
  return data.categories.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = data.categories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 pb-16 md:ml-24 md:pb-0 bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to categories
          </Link>

          <div className="mb-10 flex items-center gap-5">
            <Image
              src={category.icon}
              alt={category.name}
              width={64}
              height={64}
            />
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {category.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {category.title}
              </p>
              <span className="mt-2 inline-block rounded-full bg-orange-500/10 px-3 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
                {category.services.length} services
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service) => (
              <a
                key={service.id}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 border border-zinc-200 bg-white p-5 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                {service.icon ? (
                  <Image
                    src={service.icon}
                    alt={service.name}
                    width={48}
                    height={48}
                    className="shrink-0"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                    <span className="text-sm font-bold text-zinc-400">
                      {service.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-orange-600 dark:text-zinc-100 dark:group-hover:text-orange-400">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {service.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
