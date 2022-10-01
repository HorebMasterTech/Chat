import React, { useState } from 'react';
import InputEmoji from "react-input-emoji";
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../redux/actions/commentAction';

const InputComment = ({ children, post, onReply, setOnReply }) => {

    const [content, setContent] = useState("");

    const { auth, socket, theme } = useSelector(state => state)
    const dispatch = useDispatch();

    const handleSubmit = (content) => {
        if(!content.trim()) {
          if(setOnReply) return setOnReply(false);
          return ;
        }

        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }
        console.log(newComment);
        
        dispatch(createComment({post, newComment, auth, socket}))
        setContent('')
        if(setOnReply) return setOnReply(false);
    }

  return (
    <form className='card-footer comment_input'
      style={{ filter: theme ? 'invert(1)' : 'invert(0)', 
        color: theme ? 'white' : '#111',
      }}
    >
        {children}
        <InputEmoji
            value={content}
            onChange={setContent}
            placeholder='Merci de laisser votre commentaire...'
            onEnter={handleSubmit}
          />
    </form>
  )
}
 
export default InputComment;