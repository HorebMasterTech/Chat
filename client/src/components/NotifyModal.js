import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import question from '../images/question.png';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import moment from 'moment';
import { deleteAllNotifies, isReadNotify, NOTIFY_TYPES } from '../redux/actions/notifyAction';

const NotifyModal = () => {

  const { auth, notify } = useSelector(state => state)
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }))
  }

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound })
  }

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if(newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    if(window.confirm(`Vous avez ${newArr.length} message(s) non lus. Voulez-vous vraiment tout supprimer ?`)){
        return dispatch(deleteAllNotifies(auth.token))
    }
}

  return (
    <div style={{minWidth: '250px', backgroundColor: 'white'}}>
      <div className='d-flex justify-content-between align-items-center p-3'>
        <p className='mb-0'>Notification</p>
          {
            notify.sound 
            ? <i style={{ fontSize: '15px', cursor: 'pointer' }} className='fas fa-bell text-danger' onClick={handleSound} />
            : <i style={{ fontSize: '15px', cursor: 'pointer' }} className='fas fa-bell-slash text-danger' onClick={handleSound} />
          }
      </div>
      <hr />
      {
        notify.data.length === 0 &&
       ( <div className='text-center'><img style={{ width: 'auto', height:'60px', opacity: '.5' }} className='img-fluid' src={question} alt='question' /> </div>)
      }
      <div style={{ maxHeight:'calc(100vh -200px)', overflow: 'auto' }}>
        {
          notify.data.map((msg, index) => (
            <div key={index} className="px-2 mb-3 text-center">
              <Link to={`${msg.url}`} className='d-flex text-dark align-items-center' onClick={() => handleIsRead(msg)}>
                <Avatar src={msg.user.avatar} size='small-avatar' />

                <div className='mx-1 flex-fill'>
                  <div>
                    <strong className='mr-1'>{msg.user.username}</strong><br />
                    <span>{msg.text}</span>
                  </div>
                  {msg.centent && <small>{msg.content.slice(0, 20)}...</small>}
                </div>
                <div style={{ width: '30px' }}>
                  {msg.image && <Avatar src={msg.image} size="small-avatar "/>}
                </div>
              </Link>
              <small className='text-muted d-flex justify-content-between px-2'>
                {moment(msg.createdAt).fromNow()}
                {
                  !msg.isRead && <i className='fas fa-circle text-primary' />
                }
              </small>
            </div>
          ))
        }
      </div>

      <hr className='my-1' />
        <div className='text-end text-danger mx-2' style={{ cursor: 'pointer' }} onClick={handleDeleteAll}>
          Supprimer Notification(s)
        </div>
    </div>
  )
}

export default NotifyModal;