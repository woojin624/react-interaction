import React, { useEffect, useRef, useState } from 'react';
import './Section1.css';
import LoadingPage from '../LoadingPage';

const Section1 = () => {
  // json을 받아와 로딩하는 부분
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  useEffect(async function fetchData() {
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
    // console.log(postsTop);
    // console.log(scrollTop);

    if (scrollTop > titleTop) {
      titleE.current.style.color = 'white';
    }
    postsTop.map((postTop, i) => {
      if (scrollTop + (window.innerHeight * 3) / 4 > postsTop[i] && scrollTop < postsTop[i]) {
        postRefs[i].current.style.opacity = 1;
        postRefs[i].current.getElementsByClassName('box')[0].style.width = 200 + (scrollTop / postTop) * 400 + 'px';
      } else if (scrollTop > postsTop[i]) {
        postRefs[i].current.getElementsByClassName('box')[0].style.width = 600 + 'px';
      } else {
        postRefs[i].current.style.opacity = 0;
        postRefs[i].current.getElementsByClassName('box')[0].style.width = 200 + 'px';
      }
      return;
    });
  }, [scrollTop]);

  // ref를 통하여 해당 element의 배열값을 받아오는 방법
  const [postRefs, setPostRefs] = useState([]);
  useEffect(() => {
    setPostRefs((postRefs) =>
      Array(postData.length)
        .fill()
        .map((_, i) => postRefs[i] || React.createRef())
    );
  }, [postData.length]);

  const alpaArr = ['a', 'b', 'c', 'd', 'e', 'f'];

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className='contain'>
          <article className='section-title'>
            <h2 ref={titleE}>Section1 Interaction</h2>
          </article>
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
          {alpaArr.map((alpa, i) => {
            return (
              <section key={i}>
                <div className={`${alpa} box`}></div>
                <article className='p-article'>
                  <p>{postData[i].body}</p>
                </article>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Section1;
