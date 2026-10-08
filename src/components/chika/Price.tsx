import { formatColones } from "@/lib/chika/experiences";
import type { Experience } from "@/lib/chika/experiences";
import { Pending } from "./Pending";

export function Price({ price }: { price: Experience["price"] }) {
  if (price.amount === null) {
    return (
      <p className="ck-price ck-price--tbc">
        <span className="ck-price__label">Inversión</span>
        <span className="ck-price__amount ck-price__amount--tbc">
          <Pending>Precio por confirmar</Pending>
        </span>
      </p>
    );
  }
  return (
    <p className="ck-price">
      <span className="ck-price__label">{price.from ? "Inversión desde" : "Inversión"}</span>
      <span className="ck-price__amount">{formatColones(price.amount)}</span>
    </p>
  );
}
