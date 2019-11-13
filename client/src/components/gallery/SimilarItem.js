import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import GalleryContext from "../../context/gallery/galleryContext";
import PropTypes from "prop-types";

const SimilarItem = item => {
  const galleryContext = useContext(GalleryContext);

  const { setCurrent } = galleryContext;

  const { mainImage, name } = item.item;

  const onClick = () => {
    setCurrent(item.item);
  };
  return (
    <Fragment>
      {
        <div className="col-sm-6 col-md-3">
          <div className="card similar-item-card" style={{ height: "100%" }}>
            <img
              className="card-img-top"
              src={`/uploads/${mainImage}`}
              alt=""
            />
            <div className="card-body d-flex flex-column justify-content-around">
              <p className="card-title">{name}</p>
              <Link
                to="/gallery/read-more"
                onClick={onClick}
                className="btn btn-sm btn-success"
              >
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
