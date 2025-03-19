import {cn} from "@/lib/utils";

export function Title({className, ...props}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="title"
      className={cn("text-xl font-bold", className)}
      {...props}
    />
  );
}
