import axios from "axios";
import { toast } from "react-toastify";

const apiCallFunction = (method, slug, payload, token) => {
  // const apiUrl = "http://localhost:8080/api/v1/";
  const apiUrl = "https://sms-api-ha7n.onrender.com/api/v1/";
  let config = {
    method,
    url: `${apiUrl + slug}`,
    headers: {
      token,
    },
    ...(payload instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }),
    data: payload,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((err) => {
      toast.error("Something went wrong! Please contact the administrator");
      console.log(err);
    });
};

export default apiCallFunction;
