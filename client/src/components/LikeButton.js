import React from 'react';
import { useSelector } from 'react-redux';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {

    const {theme} = useSelector(state => state)

  return (
    <>
        {
            isLike
            ? ( <i onClick={handleUnLike} className="fa-solid text-danger fa-heart" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}></i>)
            : (<i onClick={handleLike} className="fa-regular text-dark fa-heart" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}></i>)
        }
    </>
  )
}

export default LikeButton;