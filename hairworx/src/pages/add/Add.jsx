import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [coverFile, setCoverFile] = useState(undefined);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleTag = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TAGS",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(coverFile);
      const images = await Promise.all(
        [...imageFiles].map(async (imageFile) => {
          const url = await upload(imageFile);
          return url;
        })
      );
      setUploading(false);
      dispatch({
        type: "ADD_IMAGES",
        payload: { cover, images },
      });
    } catch (error) {
      return error;
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");
  };
  // console.log(state);
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Service</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="I offer this service"
              name="title"
              id="title"
              onChange={handleChange}
            />
            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="women's hair">Women&#39;s Hair</option>
              <option value="men's hair">Men&#39;s Hair</option>
              <option value="children's hair">Children&#39;s Hair</option>
              <option value="pet's hair">Pet&#39;s Hair</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="cover">Cover Image</label>
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                />
                <label htmlFor="images">Upload Images</label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  onChange={(e) => setImageFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "upload"}
              </button>
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="16"
              placeholder="Brief description of the service you provide"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="right">
            <label htmlFor="shortTitle">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              id=""
              placeholder="Title of service"
              onChange={handleChange}
            />
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              cols="30"
              rows="10"
              placeholder="Short Description of service"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time</label>
            <input
              type="number"
              name="deliveryTime"
              id=""
              min={1}
              onChange={handleChange}
            />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              id=""
              min={1}
              onChange={handleChange}
            />

            <label htmlFor="tags">Add Features</label>
            <form className="tags" onSubmit={handleTag}>
              <input
                type="text"
                name="tags"
                id=""
                placeholder="e.g hair washing"
              />
              <button type="submit">add</button>
            </form>
            <div className="addedTags">
              {state?.tags?.map((tag) => (
                <div className="item" key={tag}>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_TAGS",
                        payload: tag,
                      })
                    }
                  >
                    {tag}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="">Price</label>
            <input
              type="number"
              name="price"
              id=""
              min={1}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
