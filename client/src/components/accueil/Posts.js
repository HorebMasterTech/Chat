import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadMoreBtn from '../LoadMoreBtn';
import PostCard from '../PostCard';

import {getDataAPI} from '../../utils/fetchData';
import Loading from '../../components/alert/Loading';
import { POST_TYPES } from '../../redux/actions/postAction';

const Posts = () => {
  const { homePosts, auth, theme } = useSelector(state => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)

  const handleLoadMore = async () => {
      setLoad(true)
      const res = await getDataAPI(`posts?limit=${homePosts.page * 3}`, auth.token)

      dispatch({
          type: POST_TYPES.GET_POSTS, 
          payload: {...res.data, page: homePosts.page + 1}
      })

      setLoad(false)
  }

  return (
    <div className='posts'>
      {
          homePosts.posts.map(post => (
              <PostCard key={post._id} post={post} theme={theme} />
          ))
      }
       {
        load && <Loading />
      }
      
      <LoadMoreBtn result={homePosts.result} page={homePosts.page}
            load={load} handleLoadMore={handleLoadMore} />
    </div>
  )
}

export default Posts;