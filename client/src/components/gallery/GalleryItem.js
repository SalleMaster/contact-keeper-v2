import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import GalleryContext from '../../context/gallery/galleryContext';

const GalleryItem = ({ galleryItem }) => {
  const galleryContext = useContext(GalleryContext);

  const { category, description, images, mainImage, name, price } = galleryItem;

  return (
    <Fragment>
      <div className="card">
        <img className="card-img-top" src={`/uploads/${mainImage}`} alt="" />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          <a className="btn btn-success btn-block" href="#">
            Read More
          </a>
        </div>
      </div>
    </Fragment>
  );
};

GalleryItem.propTypes = {
  galleryItem: PropTypes.object.isRequired
};

export default GalleryItem;
