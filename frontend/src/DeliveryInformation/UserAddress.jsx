import axios from "axios";

export function getAllAddress() {
  const token = JSON.parse(localStorage.getItem("Token"));
  if (token) {
    return axios
      .get("https://mern-zvtq.onrender.com/user/address", {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
