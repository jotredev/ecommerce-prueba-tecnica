import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

export function Container({className, ...props}: ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn(
        "container mx-auto px-5 sm:px-0 lg:px-5 xl:px-0 py-8",
        className
      )}
      {...props}
    />
  );
}
