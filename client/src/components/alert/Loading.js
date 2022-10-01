import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex flex-column text-center position-fixed w-100 h-100 loading"
        style={{background: "#0008", color: "white", top: 0, left: 0, zIndex: 50}}>
<div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
   <p>Merci de patienter...</p>
            
        </div>
  )
}

export default Loading;