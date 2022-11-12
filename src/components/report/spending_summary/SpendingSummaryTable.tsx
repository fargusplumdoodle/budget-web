import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  TableBody,
} from '@mui/material';
import * as React from 'react';
import { SpendingSummaryData } from './types';

interface SpendingSummaryTableProps {
  data: SpendingSummaryData[];
}

const SpendingSummaryTable: React.FC<SpendingSummaryTableProps> = ({
  data,
}) => {
  const headers = ['Date', 'Income', 'Outcome'];
  return (
    <TableContainer sx={{ maxHeight: 574 }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((headerName) => (
              <TableCell key={headerName}>
                <Typography>{headerName}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.date}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.income}</TableCell>
              <TableCell>{row.outcome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpendingSummaryTable;
