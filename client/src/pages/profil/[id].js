import React, {useEffect, useState} from 'react';
import Info from '../../components/profile/info';
import Posts from '../../components/profile/posts';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileUsers } from '../../redux/actions/profileAction';
import Loading from '../../components/alert/Loading';
import { useParams } from 'react-router-dom'
import Saved from '../../components/profile/Saved';

const Profil = () => {

  const { profile, auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false)

  useEffect(() => {
    if(profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({id, auth}))
    }
  }, [ profile.ids, id, auth, dispatch])

  return (
    <div className='container'>

   
    <div className='profile'>
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

        {
          auth.user._id === id &&
          <div className='profile_tab pb-5'>
            <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
            <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Sauvegarder</button>
          </div>
        }
      {
        profile.loading
        ? <Loading />
        : <>
          {
            saveTab 
            ? <Saved auth={auth} dispatch={dispatch} />
            : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} /> 
          }
        </>
        
        
      }
    </div>
    </div>
  )
}

export default Profil;