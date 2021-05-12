import React, { useEffect } from 'react';
import { ThemeProvider, Typography, useTheme } from '@material-ui/core';

import { useStyles } from './App.styles';
import { connectMT4 } from './providers/connectMT4';

export const App = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
    const getSsid = async () => {
      const connectMt4 = connectMT4();
      // console.log('connectMt4:', connectMt4);
      const streamSessionId = await connectMt4.connect();
      console.log('streamSessionId:', streamSessionId);
      // connectMt4.getBalance();
      // connectMt4.disconnect();
    };
    getSsid();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Typography className={classes.container}>My React Typescript Material-UI Boilerplate</Typography>
    </ThemeProvider>
  );
};
