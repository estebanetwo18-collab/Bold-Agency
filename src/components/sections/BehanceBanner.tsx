import { getServerContent } from "@/lib/getContentServer";

const BEHANCE_URL = "https://www.behance.net/estebanmuozm1";

export async function BehanceBanner() {
  const { portfolioPage } = await getServerContent();

  return (
    <section className="relative bg-ink py-10 text-paper">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div>
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-volt">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            {portfolioPage.behanceEyebrow}
          </span>
          <h3 className="mt-2 font-display text-xl font-bold leading-tight sm:text-2xl">
            {portfolioPage.behanceHeadline}
          </h3>
        </div>

        <a
          href={BEHANCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-volt px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition-colors duration-300 hover:bg-paper"
        >
          {portfolioPage.behanceCtaLabel}
          <ExternalIcon />
        </a>
      </div>
    </section>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
    >
      <path
        d="M4 12L12 4M12 4H5M12 4V11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
