import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SuccessButton({ text, type, handleClick }) {

  const handleClickButton = () => {
    if (typeof handleClick === 'function') {
      handleClick();
    }
  };

  return (
    <Stack direction="row" spacing={ 2 }>
      { type === 'submit' &&
        <Button variant="contained" color="success" type={ type }>
          {text}
        </Button>
      }
      { (type === undefined && text !== 'CANCEL') &&
        <Button variant="contained" color="success" onClick={handleClickButton}>
          { text }
        </Button>
      }
      { (type === undefined && text === 'CANCEL') &&
        <Button variant="contained" color="secondary" onClick={handleClickButton} style={{backgroundColor: 'grey'}}>
          { text }
        </Button>
      }
    </Stack>
  );
}