import {CardProductCart} from "./CardProductCart";

export function Cart() {
  return (
    <div className="bg-secondary p-5 rounded-xl">
      <ul className="grid grid-cols-1 gap-3 h-[450px] overflow-auto">
        <li>
          <CardProductCart />
        </li>
        <li>
          <CardProductCart />
        </li>
        <li>
          <CardProductCart />
        </li>
        <li>
          <CardProductCart />
        </li>
        <li>
          <CardProductCart />
        </li>
      </ul>
      <hr className="border-border my-8" />
      <div className="flex flex-col items-end">
        <ul className="text-right space-y-2">
          <li>
            <span className="text-muted-foreground">{`Subtotal: $1,259`}</span>
          </li>
          <li>
            <span className="text-muted-foreground">{`Impuestos (16%): $1,259`}</span>
          </li>
          <li>
            <span className="font-bold">{`Total: $1,259`}</span>
          </li>
        </ul>
      </div>
      <div className="mt-5">
        <button className="w-full flex items-center justify-center h-10 rounded-full bg-primary text-white cursor-pointer">
          Pagar
        </button>
      </div>
    </div>
  );
}
