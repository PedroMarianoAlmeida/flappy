import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/flappy-bird.svg';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/GameContext';

const drawerWidth = 240;

const navItems = ['Game', 'Highscores'];
function Navbar(props) {

    const { t } = useTranslation();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { setScore } = React.useContext(GameContext);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box
            className="bg-gray-800 h-[100vh] overflow-hidden"
            onClick={handleDrawerToggle}
            sx={{ textAlign: 'center' }}>
            <Typography
                className='flex items-center justify-center '
                variant="h6"
                sx={{ my: 2 }}>
                <Link
                    onClick={() => setScore(0)}
                    href="/"><img
                        className='w-36'
                        src={Logo}
                        alt="" /></Link>
            </Typography>
            <Divider
                className='bg-slate-600'
            />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center', fontFamily: "Press Start 2P", color: "#fff" }}>
                            <Link onClick={() => setScore(0)} to={`/${item}`} className='w-full h-full '><ListItemText primary={t(item)} /></Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar className='bg-gray-800'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to="/"
                            onClick={() => setScore(0)}
                        >

                            <img
                                src={Logo}
                                alt="Logo"
                                className='w-36'
                            />
                        </Link>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link
                                onClick={() => setScore(0)}
                                to={`/${item}`}
                                key={item}
                                className='p-2 text-white hover:text-blue-400 hover:underline transition duration-300'
                            >
                                {t(item)}
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

Navbar.propTypes = {
    window: PropTypes.func,
};

export default Navbar;
