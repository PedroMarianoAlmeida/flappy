// components/TableHighscores.js
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';
export default function TableHighscores() {
    const { fetchData, data } = useContext(FirebaseContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchData("Data");
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [fetchData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <TableContainer
            className='max-w-4xl'
            sx={{ backgroundColor: "transparent" }}
            component={Paper}
        >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: "#fff", fontSize: 18, fontWeight: "bold" }} align="center">
                            Position
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontSize: 18, fontWeight: "bold" }} align="center">
                            Name
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontSize: 18, fontWeight: "bold" }} align="center">
                            Score
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} align="center">No data available</TableCell>
                        </TableRow>
                    ) : (
                        data.map((user, index) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ color: "#fff", fontSize: 15, }} align="center">{index + 1}</TableCell>
                                <TableCell sx={{ color: "#fff", fontSize: 15, }} align="center">{user.name}</TableCell>
                                <TableCell sx={{ color: "#fff", fontSize: 15, }} align="center">{user.score}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
