import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Question from '../images/question.png';

const PostThumb = ({posts, result}) => {

    const { theme } = useSelector(state => state);

    if(result === 0) return (
    <div className='text-center'>
        <h6 className='text-center pt-5 text-danger'>Aucun post disponible pour le moment</h6>
        <img className='img-fluid' src={Question} alt='qustion' style={{ height: 'auto', width: '20%', opacity: '.5' }} />
    </div>
 )
  return ( 
    <div className='post_thumb container'>
        {
            posts.map(post => (
                <Link key={post._id} to={`/post/${post._id}`}>
                    <div className='post_thumb_display'>
                        <img className='rounded-md' src={post.images[0].url} alt={post.images[0].url} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                        <div className='post_thumb_menu'>
                            <i className="far fa-heart">{post.likes.length}</i>
                            <i className="far fa-comment">{post.comments.length}</i>
                        </div>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default PostThumb;