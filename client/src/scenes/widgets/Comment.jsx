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
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'store';
import { backUri } from 'utils';

const Comment = ({
  commentId,
  content,
  postId,
  author,
  likes,
  replies,
  fetchAgain,
  setFetchAgain,
}) => {
  console.log('author: ', author);
  const [isComment, setIsComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [isLiked, setIsLiked] = useState(false);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${backUri}/comment/like/${commentId}`, {
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
  };

  const patchComment = async () => {
    const response = await fetch(
      `${backUri}/comment/commentOnComment/${commentId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentText, author: loggedInUserId }),
      }
    );
    const updatedPosts = await response.json();
    setCommentText('');
    setFetchAgain(!fetchAgain);
  };

  return (
    <WidgetWrapper m="1rem 0">
      <Typography variant="h5">
        {author.firstName} {author.lastName}
      </Typography>
      <Typography color={main} sx={{ mt: '1rem' }}>
        {content}
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

            <Typography>{isLiked ? likes.length + 1 : likes.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{replies.length}</Typography>
          </FlexBetween>
        </FlexBetween>
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
          {replies.map((cmt) => (
            <Comment
              key={cmt._id}
              commentId={cmt._id}
              content={cmt.content}
              postId={postId}
              author={cmt.author}
              likes={cmt.likes}
              replies={cmt.replies}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default Comment;
// friendId, name, subtitle, userpicturePath
