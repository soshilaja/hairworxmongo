/* eslint-disable no-unused-vars */
import { useActionData } from "react-router-dom";

export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  category: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  tags: [],
  price: 0,
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };

    case "ADD_TAGS":
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };

    case "REMOVE_TAGS":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };

    default:
      return state;
  }
};
