import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon { ...props }>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </SvgIcon>
  );
}

const Header = ({ navigate }) => {
  return (
    <h6 className='header_text' onClick={ () => {
      if (typeof navigate === 'function') {
        navigate('/');
      }
    } }>
      <HomeIcon color="success"/>Home budget</h6>
  );
};

export default Header;