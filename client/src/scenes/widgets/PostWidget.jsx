import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { backUri } from 'utils';
import Comment from './Comment';
import { Link } from 'react-router-dom';

const PostWidget = ({
  postId,
  content,
  author,
  likes,
  comments,
  fetchAgain,
  setFetchAgain,
}) => {
  const [isComment, setIsComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLikedByLoggedInUser = likes.find((like) => like._id === author._id);
  const [isLiked, setIsLiked] = useState(isLikedByLoggedInUser ? true : false);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

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
    if (updatedPosts.comment === 'Licked') {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    setFetchAgain(!fetchAgain);
  };

  const patchComment = async () => {
    try {
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

      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const linkCopy = async (uri) => {
    try {
      await navigator.clipboard.writeText(uri);
      alert('Post uri coppied: ' + uri);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <WidgetWrapper m="1rem 0">
      <Friend author={author} name={`${author.firstName} ${author.lastName}`} />
      <Link to={`/detailpost/${postId}`} style={{ textDecoration: 'none' }}>
        <Typography color={main} sx={{ mt: '1rem' }}>
          {content}
        </Typography>
      </Link>

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

            <Typography>{likes.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton
          onClick={() => {
            const uri = `https://effulgent-pika-2b08e4.netlify.app/detailpost/${postId}`;
            linkCopy(uri);
          }}
        >
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
          {comments.map((comt) => (
            <Box>
              <Comment
                key={comt._id}
                commentId={comt._id}
                content={comt.content}
                postId={postId}
                author={comt.author}
                likes={comt.likes}
                replies={comt.replies}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
