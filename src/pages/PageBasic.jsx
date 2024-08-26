import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const PageBasic = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar />
            <Box
                className='bg-slate-800 min-h-screen:'
                component="main"
                sx={{
                    flexGrow: 1, // Ocupa o restante do espaço
                    p: 2,
                    border: "none",
                    marginTop: '0px', // Ajuste a altura conforme necessário para o Navbar
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default PageBasic;
