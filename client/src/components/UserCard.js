import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { useSelector } from 'react-redux';

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing, msg }) => {

  const { theme } = useSelector(state => state)

  const handleCloseAll = () => {
    if(handleClose) handleClose()
    if(setShowFollowers) setShowFollowers(false)
    if(setShowFollowing) setShowFollowing(false)
}

const showMsg = (user) => {
  return(
    <>
    <div style={{ filter: theme ? 'invert(1)' : 'invert(0)'}}>{user.text}</div>
    {
      user.media.length > 0 && 
      <div>
       {user.media.length} <i className="fas fa-image" />
      </div> 
    }
     {
      user.call && 
      <span className="material-icons" style={{
        fontSize: "1rem",
        filter: theme ? "invert(1)" : "invert(0)",
      }}>
        {
          user.call.times === 0 
          ? user.call.video ? 'videocamm_off' : 'phone_disabled'
          : user.call.video ? 'video_camera_front' : 'call'
        }
      </span>
     }
  </>
  ) 
}

  return (
    <div className={`d-flex align-items-center justify-content-between w-100 rounded ${border}`}>
      <Link to={`/profil/${user._id}`} onClick={handleCloseAll} className="d-flex align-items-center">
        <Avatar src={user.avatar} size="medium-avatar" />
        <div style={{transform: 'translateY(-2px)', marginLeft:'.5rem'}}>
          <span className='text-black d-block'>{user.username}</span>
         
          <small className="text-black" style={{ opacity: 0.7 }}>
            {
              msg
              ? showMsg(user)
              : user.fullname
            }
          </small>
        </div>
      </Link>

      {children}
    </div>
  )
}

export default UserCard;