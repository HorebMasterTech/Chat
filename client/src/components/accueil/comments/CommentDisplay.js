import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({ comment, post, replyCm }) => {

  const [showRep, setShowRep] = useState([]);
  const [next, setNext ] = useState(2)

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next))
  }, [replyCm, next])

  return (
    <div className="comment_display">
        <CommentCard comment={comment} post={post} commentId={comment._id}  >
          <div className='pl-10 '>
            {
              showRep.map((item, index) => (
                item.reply && 
                <CommentCard 
                  key={index} 
                  comment={item} 
                  post={post} 
                  commentId={comment._id}  />
              ))
            }
            {
              replyCm.length - next > 0
              ? (<div className='cursor-pointer' style={{ color: 'crimson' }} onClick={() => setNext(next + 10)}>
                Voir plus...
              </div>)
              : replyCm.length > 1 && (<div className='cursor-pointer' style={{ color: 'crimson' }} onClick={() => setNext(1)}>
              Cacher...
            </div>)
            }
          </div>
        </CommentCard>
    </div>
    
  )
}

export default CommentDisplay;