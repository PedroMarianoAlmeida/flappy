import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const PageBasic = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }} className="overflow-x-hidden">
            <Navbar />
            <Box
                className='bg-slate-800 min-h-screen:'
                component="main"
                sx={{
                    flexGrow: 1, 
                    p: 0,
                    border: "none",
                    marginTop: window.innerWidth < 431 ? "3.5em": "2em", 
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default PageBasic;
