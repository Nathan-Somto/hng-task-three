import { Dispatch, SetStateAction } from "react";
import { LightBoxState } from "../../app/home/page";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
type Props = {
  src: string;
  alt: string;
  tag: string;
  index: number;
  id: string;
  dragId: string  | -1;
  setLightBoxState: Dispatch<SetStateAction<LightBoxState>>;
};

export default function Image({
  src,
  alt,
  tag,
  index,
  dragId,
  setLightBoxState,
  id
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  function handleClick() {
   setLightBoxState(({currIndex: index, show:true}))
   
  }
  return (
    <figure
      onClick={handleClick}
      style={style}
      className={`relative h-[350px] max-w-full w-full transition-all ease-in duration-300 overflow-hidden rounded-2xl`}
    >
      <img
        loading="lazy"
        src={src}
        alt={alt}
        data-id={index}
        draggable
        ref={setNodeRef}  {...attributes} {...listeners}
        className={`h-full hover:scale-125 transition-all touch-manipulation z-[6] cursor-grab ease-in-out duration-200 delay-75 w-full  max-w-full object-cover ${
          dragId === index ? "opacity-0" : "opacity-100"
        }`}
      />
      <figcaption className="absolute bottom-4 z-[6] bg-[rgba(0,0,0,0.5)] px-4 py-3 font-semibold rounded-md left-3">
        <span>{tag}</span>
      </figcaption>
    </figure>
  );
}
