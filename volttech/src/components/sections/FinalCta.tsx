import { FINAL_CTA } from "@/lib/content";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export function FinalCta() {
  return (
    <section className="bg-forest py-20 text-cream sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">{FINAL_CTA.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-cream/70">{FINAL_CTA.body}</p>
        <a
          href={FINAL_CTA.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-forest transition-colors hover:bg-gold-bright"
        >
          {FINAL_CTA.cta.label}
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
