import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo BOLD Agency recopila, usa y protege la información de sus visitantes y leads.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      updatedNote="Plantilla editable — reemplazar con el texto legal definitivo antes de publicar."
    >
      <p>
        BOLD Agency recopila la información que envías voluntariamente a
        través del formulario de Diagnóstico 360 (nombre, empresa, datos de
        contacto, tipo de negocio, desafío y presupuesto aproximado) con el
        único fin de preparar y coordinar dicho diagnóstico.
      </p>
      <p>
        [Editable: agregar aquí el detalle real sobre almacenamiento de
        datos, terceros con los que se comparte información (por ejemplo,
        el proveedor de la hoja de cálculo o CRM conectado), tiempo de
        conservación, y los derechos de acceso, rectificación y eliminación
        que aplican según la legislación local.]
      </p>
      <p>
        Para ejercer cualquiera de estos derechos o resolver dudas sobre el
        tratamiento de tu información, escríbenos a{" "}
        <a href="mailto:hola@boldagency.com" className="underline underline-offset-4">
          hola@boldagency.com
        </a>{" "}
        (dirección editable).
      </p>
    </LegalPage>
  );
}
