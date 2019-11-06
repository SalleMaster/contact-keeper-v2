import React, { useReducer } from 'react';
import GalleryContext from './galleryContext';
import galleryReducer from './galleryReducer';
import axios from 'axios';
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

const GalleryState = props => {
  const initialState = {
    galleryItems: [
      // {
      //   images: [
      //     '29775073d3b97f926235212b7b2953ad8acb8d22173b2897a04477950fffe659.jpg',
      //     'Witcher 3 Wild Hunt, The -  wallpaper 1.jpg',
      //     'Witcher 3 Wild Hunt, The -  wallpaper 6.jpg',
      //     'witcher3_en_wallpaper_the_witcher_3_wild_hunt_ciri_meditating_1920x1080_1446715311.png',
      //     'witcher3_en_wallpaper_the_witcher_3_wild_hunt_fish_market_1920x1080_1446476590.png',
      //     'witcher3_en_wallpaper_wallpaper_3_1920x1080_1433245773.jpg',
      //     'witcher3_en_wallpaper_wallpaper_4_1920x1080_1433245801.jpg',
      //     'witcher3_en_wallpaper_wallpaper_5_1920x1080_1433245840.jpg',
      //     'witcher3_en_wallpaper_wallpaper_11_1920x1080_1434718639.jpg'
      //   ],
      //   _id: '5dc1e59a3b0c6e127cbe8cf6',
      //   name: 'Witcher 3 Wild Hunt',
      //   price: '15',
      //   category: 'RPG',
      //   description: 'Geralt of Rivia Adventures',
      //   mainImage:
      //     'witcher3_en_wallpaper_wallpaper_11_1920x1080_1434718639.jpg',
      //   __v: 0
      // },
      // {
      //   images: ['402053.jpg', '423181.jpg'],
      //   _id: '5dc1e6c03b0c6e127cbe8cf7',
      //   name: 'Tomb Raider',
      //   price: '25',
      //   category: 'Action',
      //   description: 'Lara Croft origin story',
      //   mainImage: '337943.jpg',
      //   __v: 0
      // },
      // {
      //   images: [
      //     'ACO_screen_BayekAya_Interrogate_GC_299659.jpg',
      //     'ACO_screen_Horseback_GC_299699.jpg',
      //     'ACO_screen_Septimius_GC_299723.jpg'
      //   ],
      //   _id: '5dc1e8073b0c6e127cbe8cf8',
      //   name: 'Assassins Creed Origins',
      //   price: '19.99',
      //   category: 'Action',
      //   description: 'Assassins Creed in Egipt',
      //   mainImage: 'ACO_HR_Gamescom_Final_horizontal_299739.jpg',
      //   __v: 0
      // },
      // {
      //   images: ['images.jpg', 'Katana-Zero.jpg', 'ZIMwQmm.jpg'],
      //   _id: '5dc1e8b63b0c6e127cbe8cf9',
      //   name: 'Katana Zero',
      //   price: '9.99',
      //   category: 'Pixel Art',
      //   description: 'Platformer',
      //   mainImage: 'db7bec91b6c7e7128c3d74857e2eabd5.jpg',
      //   __v: 0
      // }
    ],
    currentGalleryItem: null,
    filteredGalleryItem: null,
    galleryError: null,
    galleryLoading: true
  };

  const [state, dispatch] = useReducer(galleryReducer, initialState);

  // Get Gallery Items
  const getGalleryItems = async category => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.get(
        `/api/gallery/${category && category}`,
        config
      );

      dispatch({ type: GET_GALLERY_ITEMS, payload: res.data });
    } catch (err) {
      dispatch({
        type: GALLERY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Gallery Item
  const addGalleryItem = async () => {
    console.log('Add Gallery Item');
  };

  // Delete Gallery Item
  const deleteGalleryItem = async () => {
    console.log('Delete Gallery Item');
  };

  // Set Current Gallery Item
  const setCurrentGalleryItem = async () => {
    console.log('Set Current Gallery Item');
  };

  // Clear Current Gallery Item
  const clearCurrentGalleryItem = async () => {
    console.log('Clear Current Gallery Item');
  };

  // Update Gallery Item
  const updateGalleryItem = async () => {
    console.log('Update Gallery Item');
  };

  // Filter Gallery Items
  const filterGalleryItems = async () => {
    console.log('Filter Gallery Items');
  };

  // Clear Gallery Items
  const clearGalleryItems = async () => {
    console.log('Clear Gallery Items');
  };

  return (
    <GalleryContext.Provider
      value={{
        galleryItems: state.galleryItems,
        currentGalleryItem: state.currentGalleryItem,
        filteredGalleryItem: state.filteredGalleryItem,
        galleryError: state.galleryError,
        galleryLoading: state.galleryLoading,
        addGalleryItem,
        deleteGalleryItem,
        setCurrentGalleryItem,
        clearCurrentGalleryItem,
        updateGalleryItem,
        filterGalleryItems,
        clearGalleryItems,
        getGalleryItems
      }}
    >
      {props.children}
    </GalleryContext.Provider>
  );
};

export default GalleryState;
