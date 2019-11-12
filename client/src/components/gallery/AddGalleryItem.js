import React, { Fragment, useState, useContext } from 'react';
import GalleryContext from '../../context/gallery/galleryContext';

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

  const [mainImageName, setMainImageName] = useState('Choose file');
  const [imagesName, setImagesName] = useState('Choose file');

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
    addGalleryItem(galleryItem);
    setGalleryItem({
      name: '',
      category: '',
      description: '',
      price: '',
      mainImage: '',
      images: ''
    });
  };

  const onClose = () => {
    setGalleryItem({
      name: '',
      category: '',
      description: '',
      price: '',
      mainImage: '',
      images: ''
    });

    setMainImageName('Choose File');
    setImagesName('Choose File');
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
                <span onClick={onClose}>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    name='name'
                    type='text'
                    placeholder='Name'
                    className='form-control'
                    value={name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='category'>Category</label>
                  <select
                    className='form-control'
                    id='category'
                    name='category'
                    onChange={onChange}
                    required
                    value={category}
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
                    required
                    value={description}
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
                    required
                    value={price}
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
                      required
                    />
                    <label
                      className='custom-file-label'
                      htmlFor='myfile'
                      style={{ overflow: 'hidden' }}
                    >
                      {mainImageName}
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
                      onChange={onChangeImages}
                    />
                    <label
                      className='custom-file-label'
                      htmlFor='slideImages'
                      style={{ overflow: 'hidden' }}
                    >
                      {imagesName}
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddGalleryItem;
