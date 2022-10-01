import React from 'react';
import Posts from '../components/accueil/Posts';
import Status from '../components/accueil/Status';
import { useSelector } from 'react-redux';
import Loading from '../components/alert/Loading';
import RightSideBar from '../components/accueil/RightSideBar';
import question from '../images/question.png';

const Accueil = () => {

  const { homePosts } = useSelector(state => state)


  return (
    <div className="container">

    
    <div className='home padding row'>
      <div className='col-md-8'>
        <Status />
        {
          homePosts.loading ? (<Loading />)
          : (homePosts.result === 0 && homePosts.posts.length === 0) 
          ? (<div className='text-center'>
            Aucun post pour disponible le moment <br />
            <img style={{ width: 'auto', height:'60px', opacity: '.5' }} className='img-fluid' src={question} alt='question' />
            </div>)
          : <Posts />
        }
        
      </div>

      <div className='col-md-4'>
        <RightSideBar />
      </div>

    </div>
    </div>
  )
}

export default Accueil;