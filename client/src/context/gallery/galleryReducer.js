import {
  GET_GALLERY_ITEMS,
  ADD_GALLERY_ITEM,
  DELETE_GALLERY_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT_GALLERY_ITEM,
  UPDATE_GALLERY_ITEM,
  FILTER_GALLERY_ITEMS,
  CLEAR_GALLERY_ITEMS,
  GALLERY_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_GALLERY_ITEM:
      return {
        ...state,
        galleryItems: [action.payload, ...state.galleryItems],
        loading: false
      };
    case GET_GALLERY_ITEMS:
      return {
        ...state,
        galleryItems: action.payload,
        loading: false
      };
    case GALLERY_ERROR:
      return {
        ...state,
        galleryError: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case DELETE_GALLERY_ITEM:
      return {
        ...state,
        galleryItems: state.galleryItems.filter(
          item => item._id !== action.payload
        ),
        loading: false
      };
    default:
      return state;
  }
};
