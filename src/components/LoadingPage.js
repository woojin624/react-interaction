import React from 'react';
import './section1/Section1.css';

const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <img style={{ width: '180px', height: '180px' }} src='https://coding-woojin.s3.ap-northeast-2.amazonaws.com/ryan-loading.gif' alt='라이언로딩' />
    </div>
  );
};

export default LoadingPage;
