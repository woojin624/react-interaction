import React, { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage';
import './Section2.css';

const Section2 = () => {
  // json을 받아와 로딩하는 부분
  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState([]);
  useEffect(async function fetchData() {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts`).then((response) => response.json());
    postResponse.length = 60;
    setChatData(postResponse);
    setIsLoading(false);

    window.addEventListener('scroll', onScroll);
    setScrollTop(1);
  }, []);

  const onScroll = () => {
    setScrollTop(window.scrollY);
  };

  useEffect(() => {
    setChatsTop(chatRefs.map((chat) => window.pageYOffset + chat.current.getBoundingClientRect().top));
  }, [isLoading]);

  const [chatsTop, setChatsTop] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [chatReveal, setChatReveal] = useState([]);
  useEffect(() => {
    let arr = [...chatReveal];
    chatsTop.map((top, i) => {
      if (window.scrollY + (window.innerHeight * 4) / 5 > top && window.scrollY + window.innerHeight / 5 < top) {
        arr[i] = 'show';
      } else {
        arr[i] = 'hide';
      }
      return arr[i];
    });
    setChatReveal(arr);
  }, [scrollTop]);

  // ref를 통하여 해당 element의 배열값을 받아오는 방법
  const [chatRefs, setChatRefs] = useState([]);
  useEffect(() => {
    setChatRefs((chatRefs) =>
      Array(chatData.length)
        .fill()
        .map((_, i) => chatRefs[i] || React.createRef())
    );
  }, [chatData.length]);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className='chat-contain'>
          {chatData.map((post, i) => {
            return (
              <div ref={chatRefs[i]} className={`chat-balloon ${i % 3 === 0 ? 'right-balloon' : 'left-balloon'} ${chatReveal[i]}`} key={i}>
                {post.title}
              </div>
            );
          })}
          <div className='chat-balloon left-balloon show'>안녕하세요</div>
          <div className='chat-balloon left-balloon show'>누구세요?</div>
          <div className='chat-balloon right-balloon show'>갈퀴가 없어 슬픈 숫사자 라이언입니다!</div>
          <div className='chat-balloon right-balloon imoticon show'>
            <img src='http://newtype1f.synology.me/images/ryan-1.gif' alt='' />
          </div>
        </div>
      )}
    </>
  );
};

export default Section2;
