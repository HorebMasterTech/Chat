import React from 'react';
import CardBody from './accueil/postCard/CardBody';
import CardFooter from './accueil/postCard/CardFooter';
import CardHeader from './accueil/postCard/CardHeader';

import Comments from './accueil/Comments'
import InputComment from './accueil/InputComment'

const PostCard = ({ post, theme }) => {
  return (
    <div key={post._id} className="my-3 card">
        <CardHeader post={post} />
        <CardBody post={post} theme={theme} />
        <CardFooter post={post} />

        <Comments post={post} />
        <InputComment post={post} />
    </div>
  )
}

export default PostCard;