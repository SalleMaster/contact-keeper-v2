import React, { Fragment, useState, useContext } from "react";
import GalleryContext from "../../context/gallery/galleryContext";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";

const EditGalleryItem = () => {
  const galleryContext = useContext(GalleryContext);
  const alertContext = useContext(AlertContext);

  let { updateGalleryItem, setCurrent, galleryItems } = galleryContext;
  const { setAlert } = alertContext;

  let current =
    JSON.parse(localStorage.getItem("current")) || galleryContext.current;

  const [galleryItem, setGalleryItem] = useState({
    _id: current._id,
    name: current.name,
    category: current.category,
    description: current.description,
    price: current.price,
    mainImage: "",
    images: ""
  });

  const [mainImageName, setMainImageName] = useState(current.mainImage);
  const [imagesName, setImagesName] = useState(current.images);

  const { name, category, description, price } = galleryItem;

  const onChange = e => {
    setGalleryItem({
      ...galleryItem,
      [e.target.name]: e.target.value
    });
  };

  const onChangeMainImage = e => {
    setGalleryItem({
      ...galleryItem,
      mainImage: e.target.files[0]
    });
    setMainImageName(e.target.files[0].name);
  };

  const onChangeImages = e => {
    let imageNames = [];
    const filesLength = e.target.files.length;
    for (let i = 0; i < filesLength; i++) {
      imageNames.push(e.target.files[i].name);
    }
    setGalleryItem({
      ...galleryItem,
      images: e.target.files
    });
    setImagesName(imageNames);
  };

  const onSubmit = e => {
    e.preventDefault();
    updateGalleryItem(galleryItem);
    const updated = galleryItems.filter(item => item._id === current._id);

    setCurrent(updated[0]);
    setAlert("Item Updated", "success");
  };

  const openModal = () => {
    setGalleryItem({
      ...galleryItem,
      name: current.name,
      category: current.category,
      description: current.description,
      price: current.price,
      mainImage: current.mainImage,
      images: current.images
    });
  };

  return (
    <Fragment>
      {/* ADD MODAL BUTTON */}
      <div className="row">
        <div className="col m-right">
          <button
            className="btn btn-primary btn-block mt-1 mb-1"
            data-toggle="modal"
            data-target="#editGalleryItem"
          >
            <div onClick={openModal}>Edit Gallery Item</div>
          </button>
        </div>
      </div>

      {/* MODAL */}
      <div className="modal" id="editGalleryItem">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Gallery Item</h5>
              <button className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <Alerts />
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    className="form-control"
                    id="category"
                    name="category"
                    onChange={onChange}
                    value={category}
                  >
                    <option value="">--</option>
                    <option value="Action">Action</option>
                    <option value="Pixel Art">Pixel Art</option>
                    <option value="RPG">RPG</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    cols="30"
                    rows="10"
                    placeholder="Description"
                    className="form-control"
                    onChange={onChange}
                    value={description}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    name="price"
                    type="text"
                    placeholder="Price"
                    className="form-control"
                    onChange={onChange}
                    value={price}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mainImage">Change Main Image</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      id="myfile"
                      name="mainImage"
                      className="custom-file-input"
                      onChange={onChangeMainImage}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="myfile"
                      style={{ overflow: "hidden" }}
                    >
                      {mainImageName}
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="images">Change Slide Images</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      id="slideImages"
                      name="images"
                      className="custom-file-input"
                      multiple
                      onChange={onChangeImages}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="slideImages"
                      style={{ overflow: "hidden" }}
                    >
                      {imagesName.length > 1
                        ? imagesName.map(image => image + " ")
                        : imagesName}
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="submit"
                    value="Confirm Edit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditGalleryItem;
