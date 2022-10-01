import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unFollow } from '../redux/actions/profileAction';

const FollowBtn = ({user}) => {

  const [followed, setFollowed] = useState(false);

  const { auth, profile, theme, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false)

  useEffect(() => {
    if(auth.user.following.find(item => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false)
  }, [auth.user.following, user._id]);

  const handleFollow = async() => {
    if(load) return;

    setFollowed(true)
    setLoad(true)
    await dispatch(follow({ users: profile.users, user, auth, socket }))
    setLoad(false)
  }

  const handleUnFollow = async() => {
    setFollowed(false)
    setLoad(true)
    await dispatch(unFollow({ users: profile.users, user, auth, socket }))
    setLoad(false)
  }

  return (
    <>
      {
        followed
        ? <button className='text-white normal-case border border-0 rounded-0 shadow-0 btn-sm btn-dark' onClick={handleUnFollow} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>désabonner</button>
        : <button className='text-white normal-case border border-0 bouton btn-primary rounded-0 shadow-0 btn-sm' onClick={handleFollow} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>s'abonner</button>
      }
    </>
  )
}

export default FollowBtn;