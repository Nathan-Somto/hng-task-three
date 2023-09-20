import { Dispatch, SetStateAction, useState } from "react";
import { LightBoxState } from "../../app/home/page";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type Props = {
  src: string;
  alt: string;
  tag: string;
  index: number;
  id: string;
  dragId: string | -1;
  setLightBoxState: Dispatch<SetStateAction<LightBoxState>>;
  forOverlay:boolean;
};

export default function Image({
  src,
  alt,
  tag,
  index,
  dragId,
  setLightBoxState,
  id,
  forOverlay,
}: Props) {
  const [loading, setLoading] = useState(!forOverlay);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  function handleClick() {
    setLightBoxState({ currIndex: index, show: true });
  }
  function handleLoad() {
    setLoading(false);
  }
  function handleError() {
    setLoading(false);
  }
  return (
    <figure
      onClick={handleClick}
      style={style}
      className={`relative h-[350px] max-w-full w-full transition-all ease-in duration-300 overflow-hidden rounded-2xl`}
    >
      {loading && (
        <div className="h-[350px] max-w- animate-pulse rounded-md inset-0 z-[2] backdrop-blur-lg bg-[rgba(255,255,255,0.3)]">
          <div className="absolute animate-pulse bottom-4 backdrop-blur-lg z-[6] bg-[rgba(255,255,255,0.5)] w-[65px] h-[30px] px-4 py-3  rounded-md left-3"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        data-id={index}
        draggable
        onLoad={handleLoad}
        onError={handleError}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`h-full hover:scale-125 transition-all  z-[6] cursor-grab ease-in-out duration-200 delay-75 w-full  max-w-full object-cover ${
          dragId === index ? "opacity-50" : "opacity-100"
        }`}
      />
      {!loading && (
      <figcaption className="absolute bottom-4 z-[6] bg-[rgba(0,0,0,0.5)] px-4 py-3 font-semibold rounded-md left-3">
        <span>{tag}</span>
      </figcaption>
      )}
    </figure>
  );
}
