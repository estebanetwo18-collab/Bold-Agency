import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio web de BOLD Agency.",
};

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      updatedNote="Plantilla editable — reemplazar con el texto legal definitivo antes de publicar."
    >
      <p>
        El acceso y uso de este sitio implica la aceptación de estos
        términos. El contenido publicado tiene fines informativos sobre los
        servicios de BOLD Agency y no constituye un contrato hasta que se
        formalice un acuerdo específico entre BOLD Agency y el cliente.
      </p>
      <p>
        [Editable: agregar aquí las condiciones reales sobre propiedad
        intelectual del contenido del sitio, limitación de responsabilidad,
        jurisdicción aplicable, y las condiciones comerciales que apliquen
        a los planes y servicios ofrecidos.]
      </p>
      <p>
        Para cualquier consulta sobre estos términos, escríbenos a{" "}
        <a href="mailto:hola@boldagency.com" className="underline underline-offset-4">
          hola@boldagency.com
        </a>{" "}
        (dirección editable).
      </p>
    </LegalPage>
  );
}
