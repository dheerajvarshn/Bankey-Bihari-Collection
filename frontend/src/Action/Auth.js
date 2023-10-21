import axios from "axios";

export const AuthDetail = () => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("Token"));
    console.log(token);
    if (token) {
      axios
        .get("http://localhost:5000/auth/protected", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          const userDetail = res.data.userDetail;
          dispatch({
            type: "ADD_AUTH",
            payload: userDetail,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export const DeleteAuth = () => {
  return {
    type: "DELETE_AUTH",
  };
};
