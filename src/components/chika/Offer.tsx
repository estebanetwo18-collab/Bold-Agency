import { formatColones, type Experience } from "@/lib/chika/experiences";
import { pricing } from "@/lib/chika/content";
import { WhatsAppCta } from "./Button";
import { Pending } from "./Pending";

/** Bloque de decisión: inversión de referencia + valoración/beneficio + CTA a WhatsApp. */
export function Offer({ exp }: { exp: Experience }) {
  const { price } = exp;
  return (
    <div className="ck-offer">
      <div className="ck-offer__row">
        <p className="ck-offer__price">
          <span className="ck-offer__label">{price.amount === null ? pricing.label : price.from ? pricing.fromLabel : pricing.label}</span>
          <span className="ck-offer__amount">
            {price.amount === null ? <Pending>{pricing.tbc}</Pending> : formatColones(price.amount)}
          </span>
        </p>
        <p className="ck-offer__note">{exp.priceNote ?? pricing.note}</p>
      </div>
      <WhatsAppCta
        label={exp.cta}
        message={exp.waMessage}
        location="experience"
        experience={exp.id}
        ctaType={exp.ctaType}
        className="ck-offer__btn"
      />
      <p className="ck-offer__avail">{exp.availabilityNote}</p>
    </div>
  );
}
