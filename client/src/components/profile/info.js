import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Following from './Following';
import Followers from './Followers';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from 'react-avatar';

const Info = ({ id, auth, profile, dispatch }) => {

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);


  useEffect(() => {
    if(id === auth.user._id){
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter(user => user._id === id)
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users])

  useEffect(() => {
    if(showFollowers || showFollowing || onEdit){
      dispatch({ type: GLOBALTYPES.MODAL, payload: true })
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false })
    }
  }, [showFollowers, showFollowing, onEdit, dispatch])

  return (
    <div className='text-black info'>
      {
        userData.map((user, i) => (

          <React.Fragment key={i}>
          <div className='info_container'>
              <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'green', 'yellow', 'black'])} name={user.username} size="50" round="20px" />

              <div className='info_content'>
                <div className='info_content_title'>
                  <h2>{user.username}</h2>
                  {
                    user._id === auth.user._id
                    ? <button onClick={() => setOnEdit(true)} className="text-white text-lowercase border border-0 bouton btn-primary rounded-0 shadow-0 btn-sm btn">Modifier</button>
                    : <FollowBtn user={user} />
                  }
                </div>

                <div className="follow_btn">
                  <span className="mx-2" onClick={() => setShowFollowers(true)}>
                    {user.followers.length} Followers
                  </span>
                  <span className="" onClick={() => setShowFollowing(true)}>
                    {user.following.length} Following
                  </span>
                </div>

                <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                <p className="m-0">{user.address}</p>
                <h6 className="m-0">{user.email}</h6>
                <p>{user.story}</p>
              </div>

              { onEdit && <EditProfile setOnEdit={setOnEdit} /> }
              { showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers} /> }
              { showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing} /> }

          </div>
          </React.Fragment>

          
        ))  
      }
    </div>
  )
}

export default Info;