import React, { Fragment } from 'react';
import GalleryGrid from '../gallery/GalleryGrid';

const Gallery = () => {
  const onSubmit = () => {
    console.log('Form action');
  };

  return (
    <Fragment>
      <h1>Gallery</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Select Category</label>
          <select className='form-control' id='category'>
            <option>Action</option>
            <option>Pixel Art</option>
            <option>RPG</option>
          </select>
        </div>
      </form>
      <GalleryGrid />
    </Fragment>
  );
};

export default Gallery;
