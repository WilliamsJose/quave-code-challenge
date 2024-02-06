import { Alert, Slide, Snackbar } from '@mui/material';
import React, { useContext } from 'react';
import { HomeContext } from '../../hook/context/HomeContext';

const SlideTransition = (props) => <Slide {...props} direction='down' />;

export const MUISnack = () => {
  const { homeState, updateHomeState } = useContext(HomeContext);

  const handleClose = () => {
    updateHomeState({ ...homeState, snack: { open: false } });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={homeState.snack?.open ?? false} 
      onClose={handleClose}
      autoHideDuration={homeState.snack?.duration ?? 2000}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity='success'
        variant='filled'
      >{homeState.snack?.message}</Alert>
    </Snackbar>
  );
};
