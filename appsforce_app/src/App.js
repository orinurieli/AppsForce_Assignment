// App.js
import React from 'react';
import UserList from './components/UserList';
import { Grid, Typography } from '@mui/material';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Ori's Library App
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Welcome to Ori's Library App! This application allows you to manage and interact with a list of users.
        You can view, edit, and delete user information as needed. Explore the features and enjoy the user management experience.
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={12} lg={12}>
          <UserList />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
