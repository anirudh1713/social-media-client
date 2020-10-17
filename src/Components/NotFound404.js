import React from 'react';
import { Link as RLink } from 'react-router-dom';
import { Container, Typography, Link } from '@material-ui/core';

const NotFound404 = () => {
  return (
    <Container>
      <Typography variant="h3">
        Page Notfound
      </Typography>
      <Link component={RLink} to={'/'}>
        Go to home page
      </Link>
    </Container>
  );
};

export default NotFound404;