import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { contact, placeholders } from "@/lib/chika/config";
import { finalCta } from "@/lib/chika/content";
import { WhatsAppCta } from "./Button";
import { Logo } from "./Logo";
import { Pending } from "./Pending";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

function Row({ label, value, placeholder, href }: { label: string; value: string | null; placeholder: string; href?: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        {value ? (
          href ? <a href={href} target="_blank" rel="noopener noreferrer">{value}</a> : value
        ) : (
          <Pending>{placeholder}</Pending>
        )}
      </dd>
    </div>
  );
}

export function FinalCta() {
  const qr = fs.existsSync(path.join(process.cwd(), "public", "chika", contact.qrFile));
  return (
    <section id="contacto" className="ck-final ck-tone-graphite" aria-labelledby="ck-final-h">
      <div className="ck-final__media">
        <Photo photo={finalCta.photo} sizes="(min-width: 900px) 42vw, 100vw" />
      </div>
      <Reveal className="ck-final__body">
        <h2 id="ck-final-h" className="ck-final__title">{finalCta.title}</h2>
        <p className="ck-final__text">{finalCta.text}</p>
        <WhatsAppCta label={finalCta.button} message={finalCta.message} variant="solid" />

        <h3 className="ck-label ck-final__label">{finalCta.contactLabel}</h3>
        <dl className="ck-contact">
          <Row
            label="WhatsApp"
            value={contact.whatsapp ? `+${contact.whatsapp}` : null}
            placeholder={placeholders.whatsapp}
            href={contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : undefined}
          />
          <Row label="Instagram" value={contact.instagram} placeholder={placeholders.instagram} href={contact.instagram ?? undefined} />
          <Row label="Dirección" value={contact.address} placeholder={placeholders.address} />
          <Row label="Horario" value={contact.hours} placeholder={placeholders.hours} />
        </dl>

        <div className="ck-final__qr">
          {qr ? (
            <Image src={`/chika/${contact.qrFile}`} alt="Código QR para escribir a Chika por WhatsApp" width={112} height={112} />
          ) : (
            <div className="ck-qr" role="img" aria-label="Espacio reservado para el código QR">
              <Pending>{placeholders.qr}</Pending>
            </div>
          )}
        </div>

        <div className="ck-final__notes">
          {finalCta.notes.map((n) => (
            <p key={n} className="ck-note">{n}</p>
          ))}
        </div>
        <p className="ck-final__brand"><Logo compact /></p>
      </Reveal>
    </section>
  );
}
