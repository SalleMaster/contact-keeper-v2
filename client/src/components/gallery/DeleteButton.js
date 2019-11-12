import React, { Fragment, useContext } from 'react';
import GalleryContext from '../../context/gallery/galleryContext';
import PropTypes from 'prop-types';

const DeleteButton = id => {
  const galleryContext = useContext(GalleryContext);

  const { deleteGalleryItem } = galleryContext;

  const onClick = () => {
    deleteGalleryItem(id.id);
  };

  return (
    <Fragment>
      <button className='btn btn-danger btn-block' onClick={onClick}>
        Delete
      </button>
    </Fragment>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired
};

export default DeleteButton;
