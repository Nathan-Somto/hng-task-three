import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ImagesContainer({ children }: Props) {
  return (
    <div className="grid  grid-cols-2 justify-items-center md:grid-cols-3 max-w-[1280px]  gap-4 w-[95%] mx-auto ">
      {children}
    </div>
  );
}
