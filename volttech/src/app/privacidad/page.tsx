import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo VolTech recopila, usa y protege la información de sus visitantes y leads.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      updatedNote="Plantilla editable — reemplazar con el texto legal definitivo antes de publicar."
    >
      <p>
        {SITE.legalName} ({SITE.brandName}) recopila la información que envías voluntariamente a través
        del formulario de contacto o de la calculadora de cotización (nombre, teléfono, ubicación, rango de
        factura eléctrica y tipo de interés) con el único fin de preparar y coordinar tu cotización.
      </p>
      <p>
        [Editable: agregar aquí el detalle real sobre almacenamiento de datos, terceros con los que se
        comparte información (por ejemplo, el CRM o webhook conectado), tiempo de conservación, y los
        derechos de acceso, rectificación y eliminación que aplican según la legislación local.]
      </p>
      <p>
        Para ejercer cualquiera de estos derechos o resolver dudas sobre el tratamiento de tu información,
        escríbenos a{" "}
        <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
          {SITE.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
