import React from 'react';

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {
        result < 3 * (page - 1) ? '' :
        !load && <button onClick={handleLoadMore} className='mx-auto d-block text-white normal-case border border-0 btn-dark rounded-0 shadow-0 btn-sm'>Charger plus</button>
      }
    </>
  )
}

export default LoadMoreBtn;