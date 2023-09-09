import * as React from 'react';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

export default function Icons({addItem}) {

  const handleClickIcon = () => {
    if (typeof addItem === 'function') {
      addItem();
    }
  };

  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 2,
        },
      }}
    >
      <Icon sx={{ color: green[500] }} onClick={handleClickIcon}>add_circle</Icon>
    </Box>
  );
}