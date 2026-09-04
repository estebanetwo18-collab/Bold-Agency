import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos de uso del sitio y del proceso de cotización de VoltTech Soluciones.",
};

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      updatedNote="Plantilla editable — reemplazar con el texto legal definitivo antes de publicar."
    >
      <p>
        Este sitio es operado por {SITE.legalName}, bajo el nombre comercial {SITE.brandName}. La
        información publicada (precios, rangos, garantías) tiene fines informativos y no constituye una
        cotización final — toda propuesta formal se entrega mediante proforma y contrato firmado antes de
        cualquier adelanto.
      </p>
      <p>
        Los resultados de la calculadora de cotización son estimados preliminares basados en datos de
        referencia y en la información que el usuario ingresa — están sujetos a confirmación con la factura
        eléctrica real y una visita técnica cuando aplique.
      </p>
      <p>
        [Editable: agregar aquí las condiciones comerciales definitivas, política de garantías detallada, y
        cualquier limitación de responsabilidad que aplique según la legislación local.]
      </p>
      <p>
        Dudas sobre estos términos:{" "}
        <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
          {SITE.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
