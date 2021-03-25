import React, { useEffect, useRef, useState } from 'react';
import './Section1.css';
// import useScrollFadeIn from './useScrollFadeIn';
// import useScrollCount from './useScrollCount';

const Section1 = () => {
  // json을 받아와 로딩하는 부분
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  useEffect(async () => {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts`).then((response) => response.json());
    postResponse.length = 20;
    setPostData(postResponse);
    setIsLoading(false);

    // 처음 렌더되었을 때 onScroll 함수 추가
    window.addEventListener('scroll', onScroll);

    // 제목의 탑값 설정
    setTitleTop(window.pageYOffset + titleE.current.getBoundingClientRect().top);

    setScrollTop(1);
  }, []);

  // 데이터를 다 받아와 로딩이 완료된 후 탑값 설정
  useEffect(() => {
    setPostsTop(postRefs.map((post) => window.pageYOffset + post.current.getBoundingClientRect().top));
  }, [isLoading]);

  const titleE = useRef();
  const [titleTop, setTitleTop] = useState();
  const [postsTop, setPostsTop] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = () => {
    setScrollTop(window.scrollY);
  };

  useEffect(() => {
    // console.log(titleTop);
    // console.log(postsTop);
    console.log(scrollTop);

    if (scrollTop > titleTop) {
      titleE.current.style.color = 'white';
    }
    postsTop.map(
      (postTop, i) => {
        if (scrollTop + (window.innerHeight * 3) / 4 > postsTop[i] && scrollTop < postsTop[i]) {
          postRefs[i].current.style.opacity = 1;
          postRefs[i].current.getElementsByClassName('box')[0].style.width = 200 + (scrollTop / postTop) * 400 + 'px';
        } else if (scrollTop > postsTop[i]) {
          postRefs[i].current.getElementsByClassName('box')[0].style.width = 600 + 'px';
        } else {
          postRefs[i].current.style.opacity = 0;
          postRefs[i].current.getElementsByClassName('box')[0].style.width = 200 + 'px';
        }
      }
      // ? ((postRefs[i].current.style.opacity = 1), postRefs[i].current.getElementsByClassName('box')[0].style.width = (200 + (scrollTop * 100/scrollTop)))
    );
  }, [scrollTop]);

  // ref를 통하여 해당 element의 배열값을 받아오는 방법
  const [postRefs, setPostRefs] = useState([]);

  useEffect(() => {
    // add or remove refs
    setPostRefs((postRefs) =>
      Array(postData.length)
        .fill()
        .map((_, i) => postRefs[i] || React.createRef())
    );
  }, [postData.length]);

  //   console.log(postRefs);

  return (
    <>
      {isLoading ? (
        <div className='loading-page'>
          <img style={{ width: '180px', height: '180px' }} src='/images/ryan-loading.gif' alt='라이언로딩' />
        </div>
      ) : (
        <div className='contain'>
          <article className='section-title'>
            <h2 ref={titleE}>Section1 Interaction</h2>
          </article>

          <>
            {postData.map((post, i) => {
              return (
                <section ref={postRefs[i]} className='post-section' key={i}>
                  <article className='p-article'>
                    <div className={`box`} style={{ transition: '0.1s', backgroundColor: `rgb(${Math.floor(Math.random() * 250)}, ${Math.floor(Math.random() * 250)}, ${Math.floor(Math.random() * 250)})` }}></div>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </article>
                </section>
              );
            })}
            <div className='a box'></div>
            <article className='p-article'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
            </article>
            <div className='b box'></div>
            <article className='p-article'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
            </article>
            <div className='c box'></div>
            <article className='p-article'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
            </article>
            <div className='d box'></div>
            <article className='p-article'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
            </article>
            <div className='e box'></div>
            <article className='p-article'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
            </article>
            <div className='f box'></div>
            <article className='p-article'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos itaque obcaecati eius magni assumenda iusto nihil est quis, doloribus velit accusamus, illum quasi quod porro a facere, nisi numquam!</p>
            </article>
          </>
        </div>
      )}
    </>
  );
};

export default Section1;
