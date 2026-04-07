import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 pb-16 md:ml-24 md:pb-0 bg-zinc-950">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-2xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-white">
              Hey there! 👋
            </h1>

            <div className="space-y-4 text-zinc-300">
              <p className="text-lg leading-relaxed">
                This is an <span className="font-semibold text-orange-400">open source project</span> born out of my own frustration.
              </p>

              <p className="leading-relaxed">
                While studying for my AWS certification, I found it really difficult to find a simple, 
                well-organized AWS services guide with a nice UI. Everything was either too cluttered, 
                outdated, or just plain ugly.
              </p>

              <p className="leading-relaxed">
                So I built this. A clean, searchable reference for all AWS services organized by category.
              </p>
            </div>

            <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="mb-3 text-lg font-semibold text-white">
                Want to contribute?
              </h2>
              <p className="mb-4 text-sm text-zinc-400">
                Check out the GitHub repo and make a pull request. All contributions are welcome!
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>

            <p className="mt-8 text-sm text-zinc-500">
              Thanks for stopping by! 🙏
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
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
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
