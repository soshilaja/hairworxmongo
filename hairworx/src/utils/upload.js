import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "hairworx");
  data.append("cloud_name", "dj88bwtrj");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dj88bwtrj/image/upload",
      data
    );

    return res.data.url;
  } catch (error) {
    return error;
  }
};

export default upload;
