import React, { Fragment, useContext, useEffect } from 'react';
import GalleryContext from '../../context/gallery/galleryContext';
import GalleryItem from './GalleryItem';
import Spinner from '../layout/Spinner';

const GalleryGrid = () => {
  const galleryContext = useContext(GalleryContext);

  const { galleryItems, loading } = galleryContext;

  if (galleryItems.length === 0 && !loading) {
    return <h4>Gallery is empty</h4>;
  }

  return (
    <Fragment>
      <div className='grid-2'>
        {galleryItems.map(galleryItem => (
          <GalleryItem galleryItem={galleryItem} />
        ))}
      </div>
    </Fragment>
  );
};

export default GalleryGrid;
