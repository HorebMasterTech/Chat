import React, { useState } from 'react';
import { useEffect } from 'react';

const Toast = ({ msg, handleShow, bgColor }) => {

  const [cacher, setCacher] = useState("");

  useEffect(() => {

    setTimeout(() => {
      setCacher("hide")
    }, 5000);
  }, []);

  return (
    <div className={`toast ${cacher} show position-fixed rounded text-black bg-opacity-50 bg-${bgColor}`}
      style={{ top: '5px', right: '15px', minWidth: '100px', zIndex: 9999, cursor: "pointer" }}>

      <div className={` border-start border-4 border-${bgColor} p-1 px-2 close`} role="alert" data-dismiss="toast" onClick={handleShow}>
        <p className="fs-6 fw-bolder">{msg.title}</p>
        <p>{msg.body}</p>
      </div>

    </div>
  )
}

export default Toast;