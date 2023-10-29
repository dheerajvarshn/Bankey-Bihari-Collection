import axios from "axios";
import { clearCart } from "../Action";

import logo from "../images/1.png";





// payment method
export let handlePayment = (total,naviagte,dispatch) => {
  const _data={
    amount:total
  }
  axios
    .post("https://mern-zvtq.onrender.com/payment/order",_data)
    .then((result) => {
      console.log(result.data, "14");
      handleOpenRazorpay(result.data.data,naviagte,dispatch);
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    })
}



// api of open razorpay
export let  handleOpenRazorpay = (data,naviagte,dispatch) => {
  
    let option = {
      key:'rzp_test_67c3VOXCJvMgTo',
      amount: Number(data.amount),
      currrency: data.currrency,
      name: "Bankey Bihari Collection",
      description: "xyz",
      order_id: data.id,
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      image: logo,
      handler: function (response) {
        axios.post('https://mern-zvtq.onrender.com/payment/verify',{response:response}).then((res)=>{
          console.log(res.data)
          dispatch(clearCart())
          naviagte('/')
          // naviagte('/user/order')          
        }).catch((err)=>{
          console.log(err)
        })
      },
    };
    const rzp = new window.Razorpay(option);
    rzp.open();
  };

 