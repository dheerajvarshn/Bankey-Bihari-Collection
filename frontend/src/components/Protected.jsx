import { Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Token"))
    console.log(token)

    axios
      .get("https://mern-zvtq.onrender.com/auth/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
        navigate('/login')
      })

  });

  return (
    <div>
      <Heading>Protected</Heading>
    </div>
  );
};

export default Protected;
