import React, { Fragment, useContext } from "react";
import GalleryContext from "../../context/gallery/galleryContext";
import GalleryItem from "./GalleryItem";
import Spinner from "../layout/Spinner";

const GalleryGrid = () => {
  const galleryContext = useContext(GalleryContext);

  const { galleryItems, loading } = galleryContext;

  if (galleryItems.length === 0 && !loading) {
    return <h4>Gallery is empty</h4>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="grid-2">
        {galleryItems.map(galleryItem => (
          <GalleryItem galleryItem={galleryItem} key={galleryItem._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default GalleryGrid;
