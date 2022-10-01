import React from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
 
const Status = () => {

  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();


  return (
    <div className='status my-3 d-flex'>
      <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'green', 'yellow', 'black'])} name={auth.user.username} size="50" round="20px" />
      <button onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })} className='statusBtn flex-fill'>
        {auth.user.username}, à quoi pensez-vous ?
      </button>
    </div>
  )
}
 
export default Status;