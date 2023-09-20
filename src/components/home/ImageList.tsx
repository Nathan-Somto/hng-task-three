import {Dispatch , SetStateAction} from 'react';
import Image from './Image';
import { LightBoxState } from "../../app/home/page";
type ImageListProps = {
    filteredImages: { id: string; tag: string; url: string }[],
      originalIndexes: Record<string, number>,
      dragId: string | -1,
      setLightBoxState: Dispatch<SetStateAction<LightBoxState>>
  }
  const ImageList = 
    (
      {filteredImages,
      originalIndexes,
      dragId,
      setLightBoxState}: ImageListProps
    ) => {
      return (
        <>
          {filteredImages.map(({ id, tag, url }) => (
            <Image
              alt="gallery image"
              index={originalIndexes[id]}
              src={url}
              tag={tag}
              key={id}
              id={id}
              dragId={dragId}
              forOverlay={false}
              setLightBoxState={setLightBoxState}
            />
          ))}
        </>
      );
    };
export default ImageList