'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { reportRows } from './ReportData';
import { Box, Typography, TextField } from '@mui/material';

const ReportHistory = () => {
  const [searchText, setSearchText] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState(reportRows);

  const handleDownload = (reportName: string) => {
    console.log(`Downloading report: ${reportName}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filtered = reportRows.filter((row) =>
      Object.values(row).some((field) => typeof field === 'string' && field.toLowerCase().includes(value)),
    );
    setFilteredRows(filtered);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Sr. No.', width: 90 },
    { field: 'reportName', headerName: 'Report Name', flex: 1 },
    { field: 'version', headerName: 'Version', flex: 1 },
    { field: 'plantName', headerName: 'Plant Name', flex: 1 },
    { field: 'organisationName', headerName: 'Organisation Name', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton color="primary" onClick={() => handleDownload(params.row.reportName)} aria-label="download">
          <DownloadIcon />
        </IconButton>
      ),
    },
  ];

  const rowsWithId = filteredRows.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  return (
    <>
      <Typography variant="h5" fontSize={20} fontWeight="bold" mt={2} mb={2}>
        Report History
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={1}>
        <TextField label="Search" variant="outlined" size="small" value={searchText} onChange={handleSearch} />
      </Box>

      <Paper sx={{ width: '100%' }}>
        <DataGrid
          rows={rowsWithId}
          columns={columns}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              color: '#000',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              cursor: 'default',
            },
          }}
        />
      </Paper>
    </>
  );
};

export default ReportHistory;
