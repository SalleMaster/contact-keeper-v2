import React, { Fragment } from 'react';

const AddGalleryItem = () => {
  return (
    <Fragment>
      {/* ADD MODAL BUTTON */}
      <div className="row">
        <div className="col m-right">
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#addGalleryItem"
          >
            Add Gallery Item
          </button>
        </div>
      </div>

      {/* MODALS */}
      <div className="modal" id="addGalleryItem">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Gallery Item</h5>
              <button className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    className="form-control"
                    id="category"
                    name="category"
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
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    name="price"
                    type="text"
                    placeholder="Price"
                    className="form-control"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-dismiss="modal">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddGalleryItem;
