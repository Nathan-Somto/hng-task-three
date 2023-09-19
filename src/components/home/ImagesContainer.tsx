import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ImagesContainer({ children }: Props) {
  return (
    <div className="grid  md:grid-cols-2 justify-items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[95%] mx-auto ">{children}</div>
  );
}
