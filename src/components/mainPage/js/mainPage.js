import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Header from "../../header/js/header";
import Footer from "../../footer/js/footer";
import { BsFillBadgeWcFill } from 'react-icons/bs';
import { FaBed, FaBath, FaDesktop, FaBlender, FaHome } from 'react-icons/fa';
import { CiCalculator1 } from 'react-icons/ci';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Bedroom from "../../bedroom/bedroom";
import Office from "../../office/office";
import LivingRoom from "../../livingroom/livingRoom";
import Kitchen from "../../kitchen/kitchen";
import Bathroom from "../../bathroom/bathroom";
import Toilet from "../../toilet/toilet";
import HomePage from "../../homePage/homePage";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${ drawerWidth }px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${ drawerWidth }px)`,
    marginLeft: `${ drawerWidth }px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function MainPage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const navigateToPage = (path) => {
    path === 'Home' ? navigate('/') : navigate(path.toLowerCase().replace(' ', ''));
  }

  return (
    <Box sx={ { display: 'flex' } }>
      <CssBaseline/>
      <AppBar position="fixed" open={ open }>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            sx={ { mr: 2, ...(open && { display: 'none' }) } }
          >
            <MenuIcon/>
          </IconButton>
          <Header navigate={ navigateToPage }/>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={ {
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        } }
        variant="persistent"
        anchor="left"
        open={ open }
      >
        <DrawerHeader>
          <IconButton onClick={ handleDrawerClose }>
            { theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/> }
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
          { ['Home', 'Bedroom', 'Office', 'Living room', 'Kitchen'].map((text, index) => (
            <ListItem key={ text } disablePadding>
              <ListItemButton onClick={ () => navigateToPage(text) }>
                <ListItemIcon>
                  { index === 0 && <FaHome/> }
                  { index === 1 && <FaBed/> }
                  { index === 2 && <CiCalculator1/> }
                  { index === 3 && <FaDesktop/> }
                  { index === 4 && <FaBlender/> }
                </ListItemIcon>
                <ListItemText primary={ text }/>
              </ListItemButton>
            </ListItem>
          )) }
        </List>
        <Divider/>
        <List>
          { ['Bathroom', 'Toilet'].map((text, index) => (
            <ListItem key={ text } disablePadding>
              <ListItemButton onClick={ () => navigateToPage(text) }>
                <ListItemIcon>
                  { index === 0 && <FaBath/> }
                  { index === 1 && <BsFillBadgeWcFill/> }
                </ListItemIcon>
                <ListItemText primary={ text }/>
              </ListItemButton>
            </ListItem>
          )) }
        </List>
      </Drawer>
      <Main open={ open }>
        <DrawerHeader/>
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/Bedroom" element={ <Bedroom/> }/>
          <Route path="/Office" element={ <Office/> }/>
          <Route path="/livingroom" element={ <LivingRoom/> }/>
          <Route path="/kitchen" element={ <Kitchen/> }/>
          <Route path="/bathroom" element={ <Bathroom/> }/>
          <Route path="/toilet" element={ <Toilet/> }/>
        </Routes>
        <Footer/>
      </Main>
    </Box>
  );
}