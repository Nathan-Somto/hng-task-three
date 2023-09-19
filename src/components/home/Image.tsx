import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { moveImage } from "../../features/board/boardSlice";
import { LightBoxState } from "../../app/home/page";

type Props = {
  src: string;
  alt: string;
  tag: string;
  index: number;
  id: string;
  setDragId: Dispatch<SetStateAction<number>>;
  dragId: number;
  setLightBoxState: Dispatch<SetStateAction<LightBoxState>>;
};

export default function Image({
  src,
  alt,
  tag,
  index,
  setDragId,
  dragId,
  setLightBoxState,
}: Props) {
  const dispatch = useDispatch();
  const [drop, setDrop] = useState(false);
  const [dragged, setDragged] = useState(false);
  useEffect(() => {
    if (drop) {
      const timer = setTimeout(() => {
        setDrop(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [drop]);
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function handleDragStart(e: React.DragEvent | React.TouchEvent) {
    let from: string | null | number = (
      e.target as HTMLImageElement
    ).getAttribute("data-id");
    if (from === null) return;
    from = +from;
    if (isNaN(from)) return;
    setDragId(from);
  }
  function handleDrop(e: React.DragEvent | React.TouchEvent) {
    e.preventDefault();
    let to: string | null | number = (
      e.target as HTMLImageElement
    ).getAttribute("data-id");
    console.log('to',to)
    if (to === null) return;
    to = +to;
    if (isNaN(to)) return;
    const from = dragId;
    dispatch(moveImage({ to, from }));
    setDragId(-1);
    setDrop(true);
    
  }
  function handleClick() {
   setLightBoxState(({currIndex: index, show:true}))
   
  }
  function onTouchStart(e: React.TouchEvent) {
    e.preventDefault();
    setDragged(true);
    handleDragStart(e);
  }

  function onTouchEnd(e: React.TouchEvent) {
    e.preventDefault();
    if (dragged) {
      handleDrop(e);
    } else {
      handleClick();
    }
    setDragged(false);
  }
  
  return (
    <figure
      onClick={handleClick}
      className={`relative h-[350px] max-w-full w-full transition-all ease-in duration-300 overflow-hidden rounded-2xl ${
        dragId === index ? "bg-gray-100" : ""
      } ${drop ? "scale-up" : ""}`}
    >
      <img
        loading="lazy"
        src={src}
        alt={alt}
        data-id={index}
        draggable
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        className={`h-full hover:scale-125 transition-all cursor-grab ease-in-out duration-300 w-full  max-w-full object-cover ${
          dragId === index ? "opacity-50" : "opacity-100"
        }`}
      />
      <figcaption className="absolute bottom-4 z-[6] bg-[rgba(0,0,0,0.5)] px-4 py-3 font-semibold rounded-md left-3">
        <span>{tag}</span>
      </figcaption>
    </figure>
  );
}
