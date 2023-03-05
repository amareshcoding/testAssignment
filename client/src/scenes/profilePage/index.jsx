import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidgets';
import { backUri } from 'utils';
import { setLogin } from 'store';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');

  const getUser = async () => {
    const res = await fetch(`${backUri}/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const [values, setValues] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    occupation: user?.occupation || '',
    email: user?.email || '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const updateProfile = async () => {
    try {
      const res = await fetch(`${backUri}/auth/update/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      setUser(data);
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreen ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? '46%' : undefined}>
          <UserWidget userId={userId} />
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? '46%' : undefined}
          backgroundColor={palette.background.alt}
          p={2}
          borderRadius={3}
        >
          <Box
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': {
                gridColumn: isNonMobileScreen ? undefined : 'span 4',
              },
            }}
          >
            <TextField
              label="First Name"
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              label="Last Name"
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              sx={{ gridColumn: 'span 2' }}
            />

            <TextField
              label="Occupation"
              onChange={handleChange}
              value={values.occupation}
              name="occupation"
              sx={{ gridColumn: 'span 4' }}
            />

            <TextField
              label="Email"
              onChange={handleChange}
              value={values.email}
              name="email"
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Password"
              type="password"
              onChange={handleChange}
              value={values.password}
              name="password"
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>
          {/* BUTTON  */}
          <Box>
            <Button
              fullWidth
              type="submit"
              onSubmit={updateProfile}
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': {
                  color: palette.primary.main,
                },
              }}
            >
              {'UPDATE'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
