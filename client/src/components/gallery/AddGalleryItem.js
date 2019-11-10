import React, { Fragment, useState, useContext } from 'react';
import GalleryContext from '../../context/gallery/galleryContext';
import axios from 'axios';

const AddGalleryItem = () => {
  const galleryContext = useContext(GalleryContext);

  const { addGalleryItem } = galleryContext;

  const [galleryItem, setGalleryItem] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    mainImage: '',
    images: ''
  });

  const { name, category, description, price, mainImage, images } = galleryItem;

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
  };

  const onSubmit = e => {
    e.preventDefault();
    addGalleryItem(galleryItem);
  };

  return (
    <Fragment>
      {/* ADD MODAL BUTTON */}
      <div className='row'>
        <div className='col m-right'>
          <button
            className='btn btn-primary'
            data-toggle='modal'
            data-target='#addGalleryItem'
          >
            Add Gallery Item
          </button>
        </div>
      </div>

      {/* MODAL */}
      <div className='modal' id='addGalleryItem'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Gallery Item</h5>
              <button className='close' data-dismiss='modal'>
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    name='name'
                    type='text'
                    placeholder={name !== '' ? name : 'Name'}
                    className='form-control'
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='category'>Category</label>
                  <select
                    className='form-control'
                    id='category'
                    name='category'
                    onChange={onChange}
                  >
                    <option value=''>--</option>
                    <option value='Action'>Action</option>
                    <option value='Pixel Art'>Pixel Art</option>
                    <option value='RPG'>RPG</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    name='description'
                    cols='30'
                    rows='10'
                    placeholder='Description'
                    className='form-control'
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className='form-group'>
                  <label htmlFor='price'>Price</label>
                  <input
                    name='price'
                    type='text'
                    placeholder='Price'
                    className='form-control'
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='mainImage'>Insert Main Image</label>
                  <div className='custom-file'>
                    <input
                      type='file'
                      id='myfile'
                      name='mainImage'
                      className='custom-file-input'
                      onChange={onChangeMainImage}
                    />
                    <label className='custom-file-label' htmlFor='myfile'>
                      Choose file
                    </label>
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='images'>Insert Slide Images</label>
                  <div className='custom-file'>
                    <input
                      type='file'
                      id='slideImages'
                      name='images'
                      className='custom-file-input'
                      multiple
                    />
                    <label className='custom-file-label' htmlFor='slideImages'>
                      Choose files
                    </label>
                  </div>
                </div>
                <div className='modal-footer'>
                  <input
                    type='submit'
                    value='Upload'
                    className='btn btn-primary btn-block mt-4'
                  />
                </div>
              </form>
            </div>
            {/* <div className='modal-footer'>
              <input
                type='submit'
                className='btn btn-primary'
                data-dismiss='modal'
                value='Submit'
                onClick={onSubmit}
              />
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddGalleryItem;
