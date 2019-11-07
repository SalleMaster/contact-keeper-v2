import React, { useContext } from 'react';
import GalleryContext from '../../context/gallery/galleryContext';

const ReadMore = () => {
  const galleryContext = useContext(GalleryContext);

  const { current } = galleryContext;

  const { category, description, images, mainImage, name, price } = current;

  return <div>{name}</div>;
};

export default ReadMore;
