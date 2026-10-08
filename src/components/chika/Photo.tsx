import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { SHOW_PENDING } from "@/lib/chika/config";

type PhotoSpec = { file: string; alt: string; brief: string; position?: string };

const DIR = path.join(process.cwd(), "public", "chika");

/**
 * Fotografía editorial. Si `public/chika/<file>` existe se usa automáticamente;
 * si no, se reserva el espacio (Arena) con la indicación del catálogo y el nombre
 * de archivo esperado — basta con copiar la foto con ese nombre para reemplazarla.
 */
export function Photo({
  photo,
  sizes,
  priority = false,
}: {
  photo: PhotoSpec;
  sizes: string;
  priority?: boolean;
}) {
  const exists = fs.existsSync(path.join(DIR, photo.file));
  if (exists) {
    return (
      <div className="ck-photo">
        <Image
          src={`/chika/${photo.file}`}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: photo.position ?? "50% 50%" }}
        />
      </div>
    );
  }
  return (
    <div
      className="ck-photo ck-photo--placeholder"
      role="img"
      aria-label={`Espacio reservado para fotografía: ${photo.alt}`}
      data-replace-with={`public/chika/${photo.file}`}
    >
      <p className="ck-photo__label">
        <span className="ck-photo__kicker">Foto por incorporar</span>
        {photo.brief}
        {SHOW_PENDING && <span className="ck-photo__file">public/chika/{photo.file}</span>}
      </p>
    </div>
  );
}
