import React, {useState, useEffect} from "react";
 import { useNavigate,useLocation } from "react-router-dom";
const Spinner = () => {
const [count, setCount] = useState(5)
const navigate = useNavigate()
const Location = useLocation()
useEffect (() => {
const interval = setInterval(() => { setCount((prevValue) => --prevValue );
}, 1000);
if(count === 0){
    navigate('/login',{
      state:Location.pathname,  //it will redirect user after require sign in where user was at website
    });
}

return ()=> clearInterval(interval)
}, [count,navigate,Location])
return (

    
    <div style={{ height: "100vh" }} className="d-flex flex-column justify-content-center align-items-center" >

    <h1 className="display-4"> Redirecting You In {count}</h1>

    <div>
  <div className="spinner-grow text-primary ms-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-secondary ms-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-success ms-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-danger ms-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-warning ms-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-info ms-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow text-dark ms-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
</div>

);
};

export default Spinner