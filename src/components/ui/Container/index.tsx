import {ReactNode} from "react";

export function Container({children}: {children: ReactNode}) {
  return (
    <div className="container mx-auto px-5 sm:px-0 lg:px-5 xl:px-0 py-14">
      {children}
    </div>
  );
}
