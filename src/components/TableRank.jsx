import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useConnect from '../hooks/useConnect';
import { useTranslation } from 'react-i18next';

export default function TableRank() {
    const { data } = useConnect('Data');
    const { t } = useTranslation();

    return (
        <div className="table-responsive">
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='title-table' align="center">{t("Position")}</TableCell>
                            <TableCell className='title-table'align="center">E-mail</TableCell>
                            <TableCell className='title-table'align="center">{t("Score")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
