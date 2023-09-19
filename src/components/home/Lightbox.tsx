import { useSelector } from "react-redux";
import { selectBoard } from "../../features/board/boardSlice";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { LightBoxState } from "../../app/home/page";

type Props = {
  setLightBoxState: Dispatch<SetStateAction<LightBoxState>>;
  lightBoxState: LightBoxState;
};

export default function Lightbox({
  lightBoxState: { currIndex },
  setLightBoxState,
}: Props) {
  const [scrollIndex, setScrollIndex] = useState(currIndex);
  const { images } = useSelector(selectBoard);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    if (containerRef.current !== null && imgRef.current !== null) {
      scrollTo(currIndex);
    }
  }, [currIndex]);
  function scrollTo(offset: number) {
    if (containerRef.current !== null && imgRef.current !== null) {
      containerRef.current.scrollTo({
        left: imgRef.current.offsetWidth * offset,
        behavior: "smooth",
      });
    }
  }
  function scrollToNext() {
    if (scrollIndex < images.length) {
      scrollTo(scrollIndex + 1);
      setScrollIndex(scrollIndex + 1);
    } else {
      scrollTo(0);
      setScrollIndex(0);
    }
  }
  function scrollToPrev() {
    if (scrollIndex > 0) {
      scrollTo(scrollIndex - 1);
      setScrollIndex(scrollIndex - 1);
    }
  }
  function handleClose() {
    setLightBoxState(({ currIndex: -1, show: false }));
  }
  return (
    <div
      id="lightBox"
      className="bg-[rgba(0,0,0,0.5)] transition-all ease-in duration-200 grid place-items-center backdrop-blur-md fixed inset-0 h-full w-full z-[9999]"
    >
      <button
        onClick={handleClose}
        className="btn btn-circle bg-primary h-7 w-7 !min-h-[1rem] absolute top-6 right-6 z-[10]"
      >
        <FaTimes />
      </button>
      <div className="relative">
        <div
          ref={containerRef}
          className=" max-w-[500px] overflow-hidden max-[500px]:!w-[90%] w-full rounded-xl mx-auto relative flex items-center"
        >
          {images.map((item) => (
            <img
              src={item.url}
              ref={imgRef}
              alt={item.tag}
              key={item.id}
              className="h-[400px] flex-shrink-0  w-full mx-auto object-cover "
            />
          ))}
        </div>
        <button
          className="btn btn-circle top-1/2 -translate-y-1/2 absolute max-[500px]:right-0 -right-6"
          onClick={scrollToNext}
        >
          ❯
        </button>
        <button
          className="btn btn-circle -left-6 top-1/2 -translate-y-1/2 absolute max-[500px]:left-0"
          onClick={scrollToPrev}
        >
          ❮
        </button>
      </div>
    </div>
  );
}
