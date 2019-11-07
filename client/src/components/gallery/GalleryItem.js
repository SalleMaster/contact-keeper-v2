import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GalleryContext from '../../context/gallery/galleryContext';

const GalleryItem = ({ galleryItem }) => {
  const galleryContext = useContext(GalleryContext);

  const { setCurrent } = galleryContext;

  const { category, description, images, mainImage, name, price } = galleryItem;

  const onClick = () => {
    setCurrent(galleryItem);
  };

  return (
    <Fragment>
      <div className="card">
        <img className="card-img-top" src={`/uploads/${mainImage}`} alt="" />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          <Link
            className="btn btn-success btn-block"
            to="/gallery/read-more"
            onClick={onClick}
          >
            Read More
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

GalleryItem.propTypes = {
  galleryItem: PropTypes.object.isRequired
};

export default GalleryItem;
