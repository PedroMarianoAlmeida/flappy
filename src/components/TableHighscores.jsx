
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';
import { useTranslation } from 'react-i18next';

export default function TableHighscores() {
    const { fetchData, data } = useContext(FirebaseContext);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation()
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
        return <div className='font-press-start mt-20 text-[#fff] w-full h-full flex items-center justify-center'>{t("Loading")}...</div>;
    }

    return (
        <TableContainer
            className='max-w-4xl '
            sx={{ backgroundColor: "transparent" }}
            component={Paper}
        >
            <Table aria-label="simple table"
                sx={{ height: "auto",
                    marginBottom: 3
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: "#fff", fontSize: 18, fontWeight: "bold" }} align="center">
                            {t("Position")}
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontSize: 18, fontWeight: "bold" }} align="center">
                            {t("Name")}
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontSize: 18, fontWeight: "bold" }} align="center">
                            {t("Score")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell  sx={{ color: "#fff"}}colSpan={3} align="center">{t("No data available")}</TableCell>
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
