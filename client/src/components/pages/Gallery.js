import React, { Fragment, useState, useContext, useEffect } from 'react';
import GalleryContext from '../../context/gallery/galleryContext';
import GalleryGrid from '../gallery/GalleryGrid';

const Gallery = () => {
  const galleryContext = useContext(GalleryContext);

  const { getGalleryItems } = galleryContext;

  useEffect(() => {
    getGalleryItems('');
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    const category = e.target.value;

    getGalleryItems(category);
  };

  return (
    <Fragment>
      <h1>Gallery</h1>

      <div className="form-group">
        <label htmlFor="category">Select Category</label>
        <select className="form-control" id="category" onChange={onChange}>
          <option value="">--</option>
          <option value="Action">Action</option>
          <option value="Pixel Art">Pixel Art</option>
          <option value="RPG">RPG</option>
        </select>
      </div>

      <GalleryGrid />
    </Fragment>
  );
};

export default Gallery;
