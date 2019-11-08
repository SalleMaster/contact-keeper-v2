import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import GalleryContext from '../../context/gallery/galleryContext';
import PropTypes from 'prop-types';

const SimilarItem = item => {
  const galleryContext = useContext(GalleryContext);

  const { setCurrent } = galleryContext;

  const { category, description, images, mainImage, name, price } = item.item;

  const onClick = () => {
    setCurrent(item.item);
  };
  return (
    <Fragment>
      {
        <div className="col-3">
          <div className="card similar-item-card">
            <img
              className="card-img-top"
              src={`/uploads/${mainImage}`}
              alt=""
            />
            <div className="card-body">
              <p className="card-title">{name}</p>
              <Link to="/gallery/read-more" onClick={onClick}>
                Read More
              </Link>
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};

SimilarItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default SimilarItem;
