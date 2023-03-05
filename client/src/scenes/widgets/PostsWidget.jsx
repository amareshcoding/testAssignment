import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'store';
import { backUri } from 'utils';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${backUri}/post`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    getPosts();
  }, [fetchAgain]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(({ _id, content, author, likes, comments }) => (
        <PostWidget
          key={_id}
          postId={_id}
          content={content}
          author={author}
          likes={likes}
          comments={comments}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      ))}
    </>
  );
};

export default PostsWidget;
