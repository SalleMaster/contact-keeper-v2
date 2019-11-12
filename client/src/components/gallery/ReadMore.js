import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import GalleryContext from '../../context/gallery/galleryContext';
import SimilarItem from './SimilarItem';

const ReadMore = () => {
  const galleryContext = useContext(GalleryContext);

  const { current, galleryItems } = galleryContext;

  const { category, description, images, mainImage, name, price } = current;

  let badgeStyle = '';

  if (category === 'RPG') {
    badgeStyle = 'badge-danger';
  }
  if (category === 'Pixel Art') {
    badgeStyle = 'badge-primary';
  }
  if (category === 'Action') {
    badgeStyle = 'badge-warning';
  }

  const similarItems = galleryItems.filter(
    item => item.category === current.category && item._id !== current._id
  );

  return (
    <Fragment>
      <div className="row">
        <div className="col d-flex justify-content-left align-items-center">
          <Link className="btn btn-light mr-4" to="/gallery">
            Back To Gallery
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div
              id="slider"
              className="carousel slide mb-2"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  className="active"
                  data-target="#slider"
                  data-slide-to="0"
                ></li>
                {images &&
                  images.map((image, index) => (
                    <li
                      data-target="#slider"
                      data-slide-to={index + 1}
                      key={index + 1}
                    ></li>
                  ))}
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block img-fluid"
                    src={`/uploads/${mainImage}`}
                    alt="First Slide"
                  />
                </div>

                {images &&
                  images.map((image, index) => (
                    <div className="carousel-item" key={index + 1}>
                      <img
                        className="d-block img-fluid"
                        src={`/uploads/${image}`}
                        alt="Second Slide"
                      />
                    </div>
                  ))}
              </div>

              <a
                href="#slider"
                className="carousel-control-prev"
                data-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </a>

              <a
                href="#slider"
                className="carousel-control-next"
                data-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </a>
            </div>
            <div className="card-body">
              <h3 className="card-title text-center">{name}</h3>
              <div>
                <p className="card-text">Description: </p>
                <p className="text-muted">{description}</p>
              </div>

              <p className="card-text">
                Category:{' '}
                <span className={`badge ${badgeStyle} p-2`}>{category}</span>
              </p>
              <p className="card-text">
                Price:{' '}
                <span className="badge badge-success p-2">{`$${price}`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {similarItems.length > 0 && (
        <div className="row">
          <div className="col">
            <h3>Similar Items</h3>
          </div>
        </div>
      )}
      <div className="row mb-5">
        {similarItems.map(similarItem => (
          <SimilarItem item={similarItem} key={similarItem._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default ReadMore;
