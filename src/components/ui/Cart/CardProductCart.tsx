import {IoTrashOutline} from "react-icons/io5";

export function CardProductCart() {
  return (
    <div className="bg-background p-3 rounded-xl">
      <h3 className="text-lg font-medium mb-1.5">Manzana verde</h3>
      <p className="text-primary text-xl font-bold mb-3">$25.89</p>
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center size-7 text-lg border border-border cursor-pointer rounded-full text-muted-foreground hover:border-primary transition-colors duration-150">
            -
          </button>
          <span className="text-primary font-semibold">1</span>
          <button className="flex items-center justify-center size-7 text-lg border border-border cursor-pointer rounded-full text-muted-foreground hover:border-primary transition-colors duration-150">
            +
          </button>
        </div>
        <div>
          <button className="flex items-center justify-center transition-colors duration-300 border rounded-full border-border size-10 hover:border-primary cursor-pointer">
            <IoTrashOutline className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
