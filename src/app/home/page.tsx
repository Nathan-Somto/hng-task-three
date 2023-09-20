import { useDispatch, useSelector } from "react-redux";
import ImagesContainer from "../../components/home/ImagesContainer";
import Navbar from "../../components/home/Navbar";
import {
  moveImage,
  selectBoard,
  setIndexes,
} from "../../features/board/boardSlice";
import Image from "../../components/home/Image";
import { useEffect, useMemo, useState } from "react";
import Lightbox from "../../components/home/Lightbox";
import Footer from "../../components/home/Footer";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";
import ImageList from "../../components/home/ImageList";
export type LightBoxState = {
  currIndex: number;
  show: boolean;
};

export default function HomePage() {
  const dispatch = useDispatch();
  const [dragId, setDragId] = useState<string | -1>(-1);
  const [lightBoxState, setLightBoxState] = useState<LightBoxState>({
    currIndex: -1,
    show: false,
  });
  const [tag, setTag] = useState("");
  const { images, originalIndexes } = useSelector(selectBoard);
  useEffect(() => {
    dispatch(setIndexes());
  }, [dispatch]);
  const filteredImages = useMemo(() => {
    if (tag) {
      return images.filter((image) =>
        image.tag.toLowerCase().includes(tag.toLowerCase())
      );
    }
    return images;
  }, [images, tag]);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over === null) return;
    if (active.id !== over.id) {
      dispatch(
        moveImage({
          to: originalIndexes[over.id],
          from: originalIndexes[active.id],
        })
      );
    }
    setDragId(-1);
  }
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setDragId(active.id as string);
  }
  function handleDragCancel() {
    setDragId(-1);
  }
  return (
    <>
      <Navbar setTag={setTag} tag={tag} />
      <main className="mt-[120px] mb-[80px]">
        <div className="flex items-center justify-between w-[95%] mb-[50px]  mx-auto">
          <h2 className="opacity-80 text-3xl">Gallery</h2>
          <button className="btn btn-success btn-sm">Save</button>
        </div>
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={images} strategy={rectSwappingStrategy}>
            <ImagesContainer>
              <ImageList
                filteredImages={filteredImages}
                dragId={dragId}
                setLightBoxState={setLightBoxState}
                originalIndexes={originalIndexes}
              />
            </ImagesContainer>
          </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: "0 0" }}>
            {dragId !== -1 ? (
              <Image
                dragId={dragId}
                {...images[originalIndexes[dragId]]}
                src={images[originalIndexes[dragId]].url}
                alt="preview"
                index={originalIndexes[dragId]}
                setLightBoxState={setLightBoxState}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
        <section>
          {tag && filteredImages.length === 0 ? (
            <p className="text-center text-2xl text-primary">
              No Images with a tag of{" "}
              <span className="text-secondary">{tag}</span> could be found{" "}
            </p>
          ) : null}
        </section>
      </main>
      {lightBoxState.show && (
        <Lightbox
          lightBoxState={lightBoxState}
          setLightBoxState={setLightBoxState}
        />
      )}
      <Footer />
    </>
  );
}
