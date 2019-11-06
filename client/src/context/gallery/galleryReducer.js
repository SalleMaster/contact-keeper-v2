import {
  GET_GALLERY_ITEMS,
  ADD_GALLERY_ITEM,
  DELETE_GALLERY_ITEM,
  SET_CURRENT_GALLERY_ITEM,
  CLEAR_CURRENT_GALLERY_ITEM,
  UPDATE_GALLERY_ITEM,
  FILTER_GALLERY_ITEMS,
  CLEAR_GALLERY_ITEMS,
  GALLERY_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
