import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import GalleryContext from '../../context/gallery/galleryContext';

const GalleryItem = ({ galleryItem }) => {
  const galleryContext = useContext(GalleryContext);

  const { category, description, images, mainImage, name, price } = galleryItem;

  return (
    <Fragment>
      <h1>{name}</h1>
      <img src={`/uploads/${mainImage}`} alt="" />
    </Fragment>
  );
};

GalleryItem.propTypes = {
  galleryItem: PropTypes.object.isRequired
};

export default GalleryItem;
