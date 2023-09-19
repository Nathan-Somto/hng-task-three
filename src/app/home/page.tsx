import { useDispatch, useSelector } from "react-redux";
import ImagesContainer from "../../components/home/ImagesContainer";
import Navbar from "../../components/home/Navbar";
import { selectBoard, setIndexes } from "../../features/board/boardSlice";
import Image from "../../components/home/Image";
import { useEffect, useMemo, useState } from "react";
import Lightbox from "../../components/home/Lightbox";
import Footer from "../../components/home/Footer";
export type LightBoxState = {
  currIndex: number;
  show:boolean;
}
export default function HomePage() {
  const dispatch = useDispatch();
  const [dragId, setDragId] = useState(-1);
  const [lightBoxState, setLightBoxState] = useState<LightBoxState>({
    currIndex: -1,
    show: false
  });
  const [tag, setTag] = useState("");
  const { images, originalIndexes } = useSelector(selectBoard);
  useEffect(() => {
    dispatch(setIndexes());
  }, [dispatch]);
  const filteredImages = useMemo(() => {
    if (tag) {
      return images.filter((image) => image.tag.toLowerCase().includes(tag.toLowerCase()));
    }
    return images;
  }, [images, tag]);
  return (
    <>
      <Navbar setTag={setTag} tag={tag} />
      <main className="mt-[120px] mb-[80px]">
        <div className="flex items-center justify-between w-[95%] mb-[50px]  mx-auto">
          <h2 className="opacity-80 text-3xl">Gallery</h2>
          <button className="btn btn-success btn-sm">Save</button>
        </div>
        <ImagesContainer>
          {filteredImages.map(({ id, tag, url }) => (
            <Image
              alt="gallery image"
              index={originalIndexes[id]}
              src={url}
              tag={tag}
              key={id}
              id={id}
              dragId={dragId}
              setDragId={setDragId}
              setLightBoxState={setLightBoxState}
            />
          ))}
        </ImagesContainer>
        <section>
          {tag && filteredImages.length === 0 ? (
            <p className="text-center text-2xl text-primary">
              No Images with a tag of <span className='text-secondary'>{tag}</span> could be found{" "}
            </p>
          ) : null}
        </section>
      </main>
      {
        lightBoxState.show && (
      <Lightbox lightBoxState={lightBoxState} setLightBoxState={setLightBoxState}/>
        )
      }
      <Footer/>
    </>
  );
}
