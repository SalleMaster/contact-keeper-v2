import React, { Fragment, useContext } from "react";
import GalleryContext from "../../context/gallery/galleryContext";
import PropTypes from "prop-types";

const DeleteButton = id => {
  const galleryContext = useContext(GalleryContext);

  const { deleteGalleryItem } = galleryContext;

  const itemId = id.id;

  const onClick = () => {
    deleteGalleryItem(itemId);
  };

  return (
    <Fragment>
      {/* <!-- MODAL TRIGGER --> */}
      <button
        className="btn btn-danger btn-block mt-2"
        data-toggle="modal"
        data-target={`#${itemId}`}
      >
        Delete Item
      </button>

      {/* <!-- MODAL --> */}
      <div className="modal" id={itemId}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure?</h5>
              <button className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-footer d-flex flex-direction-column justify-content-between">
              <button className="btn btn-secondary btn-lg">No</button>
              <button className="btn btn-danger btn-lg" data-dismiss="modal">
                <div onClick={onClick}>Yes</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired
};

export default DeleteButton;
