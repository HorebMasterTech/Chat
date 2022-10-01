import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../../LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, savePost, unLikePost, unSavePost } from '../../../redux/actions/postAction';
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config';

const CardFooter = ({ post }) => {

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

const [isShare, setIsShare] = useState(false);

  const { auth, theme, socket } = useSelector(state => state)
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);


// LIKES
  useEffect(() => {
    if(post.likes.find(like => like._id === auth.user._id)){
      setIsLike(true);
    }else {
      setIsLike(false)
    }
  }, [post.likes, auth.user._id])

  const handleLike = async () => {
    if(loadLike) return;
    
    setLoadLike(true)
    await dispatch(likePost({ post, auth, socket}))
    setLoadLike(false);
  }

  const handleUnLike = async () => {
    if(loadLike) return;

    setLoadLike(true)
    await dispatch(unLikePost({ post, auth, socket}))
    setLoadLike(true);
  }


// SAVED
  useEffect(() => {
    if(auth.user.saved.find(id => id === post._id)){
      setSaved(true);
    }else {
      setSaved(false)
    }
  }, [auth.user.saved, post._id]);


  const handleSavePost = async () => {
    if(saveLoad) return;
    
    setSaveLoad(true)
    await dispatch(savePost({ post, auth }))
    setSaveLoad(false);
  }

  const handleUnSavePost = async () => {
    if(saveLoad) return;

    setSaveLoad(true)
    await dispatch(unSavePost({ post, auth }))
    setSaveLoad(true);
  }



  return (
    <div className='card_footer'>
      <div className="card_icon_menu">
        <div>
        <LikeButton 
          isLike={isLike}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
        />

          <Link to={`/post/${post._id}`}>
          <i className="fa-regular text-dark fa-comment"></i>
          </Link>
          
          <i className="fa-solid text-dark fa-share-nodes" onClick={() => setIsShare(!isShare)}></i>
        </div>

        {
          saved 
          ? <i className="fa-solid text-info fa-bookmark" onClick={handleUnSavePost}></i>
          : <i className="fa-regular text-dark fa-bookmark" onClick={handleSavePost}></i>
        }
        

      
      </div>

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: '0 22px', cursor: 'pointer' }}>{post.likes.length} Likes</h6>
        <h6 style={{ padding: '0 20px', cursor: 'pointer' }}>
          {post.comments.length} commentaires
        </h6>
      </div>

      {
        isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      }
    </div>
  )
}

export default CardFooter;