'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { reportRows } from './ReportData';
import { Box, TextField, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';

const ReportHistory = () => {
  const [searchText, setSearchText] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState(reportRows);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

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
  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.reportHistory));

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
      <Paper
        elevation={2}
        sx={{
          borderRadius: '16px',
          p: 2,
          backgroundColor: 'white',
          border: '1px solid #D8D8D8',
          height: isMobile || isTablet ? 'auto' : '89vh',
        }}
      >
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
      </Paper>
    </>
  );
};

export default ReportHistory;
