import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GalleryContext from "../../context/gallery/galleryContext";
import DeleteButton from "./DeleteButton";

const GalleryItem = ({ galleryItem }) => {
  const galleryContext = useContext(GalleryContext);

  const { setCurrent } = galleryContext;

  const {
    category,

    mainImage,
    name,

    _id
  } = galleryItem;

  let badgeStyle = "";

  if (category === "RPG") {
    badgeStyle = "badge-danger";
  }
  if (category === "Pixel Art") {
    badgeStyle = "badge-primary";
  }
  if (category === "Action") {
    badgeStyle = "badge-warning";
  }

  const onClick = () => {
    setCurrent(galleryItem);
    localStorage.setItem("current", JSON.stringify(galleryItem));
  };

  return (
    <Fragment>
      <div className="card">
        <img className="card-img-top" src={`/uploads/${mainImage}`} alt="" />
        <div className="card-body text-center d-flex flex-column justify-content-between">
          <h4 className="card-title">{name}</h4>
          <p className="card-text text-left">
            <span className={`badge ${badgeStyle} p-2`}>{category}</span>
          </p>
          <div>
            <Link
              className="btn btn-success btn-block"
              to="/gallery/read-more"
              onClick={onClick}
            >
              Read More
            </Link>
            <DeleteButton id={_id} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

GalleryItem.propTypes = {
  galleryItem: PropTypes.object.isRequired
};

export default GalleryItem;
