import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import { backUri } from 'utils';
import Comment from './Comment';

const DetailPostView = () => {
  const [isComment, setIsComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [isLiked, setIsLiked] = useState(false);
  const { postId } = useParams();
  const [post, setPost] = useState({});
  console.log('post: ', post);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getSinglePost = async () => {
    try {
      const response = await fetch(`${backUri}/post/${postId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setPost(data);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const patchLike = async () => {
    const response = await fetch(`${backUri}/post/like/${postId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPosts = await response.json();
    console.log('updatedPosts: ', updatedPosts);
    if (updatedPosts.comment === 'Licked') {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const patchComment = async () => {
    try {
      console.log('commentText: ', commentText);
      const res = await fetch(`${backUri}/comment/commentOnPost/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentText,
          author: loggedInUserId,
        }),
      });
      const data = await res.json();
      console.log('data: ', data);
      setCommentText('');
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <Box>
      <Navbar />

      <Box display="flex" justifyContent="center">
        <WidgetWrapper m="1rem 0" width="600px">
          <Friend
            author={post.author}
            name={`${post.author?.firstName} ${post.author?.lastName}`}
          />
          <Typography color={main} sx={{ mt: '1rem' }}>
            {post.content}
          </Typography>

          <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton onClick={patchLike}>
                  {isLiked ? (
                    <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>

                <Typography>
                  {isLiked ? post.likes?.length + 1 : post.likes?.length}
                </Typography>
              </FlexBetween>

              <FlexBetween gap="0.3rem">
                <IconButton onClick={() => setIsComment(!isComment)}>
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{post.comments?.length}</Typography>
              </FlexBetween>
            </FlexBetween>

            <IconButton>
              <ShareOutlined />
            </IconButton>
          </FlexBetween>

          {isComment && (
            <Box mt="0.5rem">
              <FlexBetween gap="1.5rem" pb="1rem">
                <img
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                  width={40}
                  height={40}
                  src={'/assets/user.png'}
                  alt="User"
                />
                <InputBase
                  placeholder="What's on your mind..."
                  onChange={(e) => setCommentText(e.target.value)}
                  value={commentText}
                  sx={{
                    width: '100%',
                    backgroundColor: palette.neutral.light,
                    borderRadius: '2rem',
                    padding: '0.4rem 1.5rem',
                  }}
                />
                <Button
                  onClick={patchComment}
                  sx={{
                    color: 'black',
                    backgroundColor: palette.primary.main,
                    borderRadius: '3rem',
                  }}
                >
                  Post
                </Button>
              </FlexBetween>
              <Divider />
              {post.comments?.map((comt) => (
                <Box>
                  <Comment
                    key={comt._id}
                    commentId={comt._id}
                    content={comt.content}
                    postId={postId}
                    author={comt.author}
                    likes={comt.likes}
                    replies={comt.replies}
                  />
                  <Divider />
                </Box>
              ))}
            </Box>
          )}
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default DetailPostView;
