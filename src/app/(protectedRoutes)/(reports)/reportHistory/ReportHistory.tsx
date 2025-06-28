'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, TextField, useMediaQuery, CircularProgress, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { useGetAllReportsQuery } from './ReportHistoryApi';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { ReportData } from './ReportHistory.types';

const ReportHistory = () => {
  const tenantId = getValueLocalStorage('tenantId') ?? '';
  const [searchText, setSearchText] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState<ReportData[]>([]);

  // Fetch reports using the API
  const { data: reportsData, isLoading, error } = useGetAllReportsQuery({ tenantId });

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.reportHistory));

  // Update filtered rows when data changes
  React.useEffect(() => {
    if (reportsData) {
      setFilteredRows(reportsData);
    }
  }, [reportsData]);

  const handleDownload = async (reportPath: string, plantId: string) => {
    if (reportPath) {
      try {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = reportPath;
        link.download = `Report_${plantId}_${new Date().toISOString().split('T')[0]}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback to opening in new tab
        window.open(reportPath, '_blank');
      }
    } else {
      console.log(`No report path available for plant: ${plantId}`);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (reportsData) {
      const filtered = reportsData.filter((row) => row.plantId.toLowerCase().includes(value) || row.orgName.toLowerCase().includes(value));
      setFilteredRows(filtered);
    }
  };

  const columns: GridColDef[] = [
    { field: 'srNo', headerName: 'Sr. No.', width: 90 },
    {
      field: 'reportName',
      headerName: 'Report Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <span>{`Report_${params.row.plantId}`}</span>,
    },
    {
      field: 'version',
      headerName: 'Version',
      flex: 1,
      minWidth: 100,
      renderCell: () => <span>1.0</span>,
    },
    {
      field: 'plantId',
      headerName: 'Plant Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'orgName',
      headerName: 'Organisation Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="primary"
          onClick={() => handleDownload(params.row.reportPath, params.row.plantId)}
          aria-label="download"
          disabled={!params.row.reportPath}
        >
          <DownloadIcon />
        </IconButton>
      ),
    },
  ];

  // Add serial number to rows
  const rowsWithId = filteredRows.map((row, index) => ({
    ...row,
    srNo: index + 1,
  }));

  // Loading state
  if (isLoading) {
    return (
      <Paper
        elevation={2}
        sx={{
          borderRadius: '16px',
          p: 2,
          backgroundColor: 'white',
          border: '1px solid #D8D8D8',
          height: isMobile || isTablet ? 'auto' : '89vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress />
          <Typography>Loading reports...</Typography>
        </Box>
      </Paper>
    );
  }

  // Error state
  if (error) {
    return (
      <Paper
        elevation={2}
        sx={{
          borderRadius: '16px',
          p: 2,
          backgroundColor: 'white',
          border: '1px solid #D8D8D8',
          height: isMobile || isTablet ? 'auto' : '89vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color="error">Failed to load reports. Please try again.</Typography>
      </Paper>
    );
  }

  // Handle empty data - still show table structure
  const displayRows = !reportsData || reportsData.length === 0 ? [] : rowsWithId;

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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Reports ({filteredRows.length})</Typography>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by Plant ID or Organization..."
          />
        </Box>

        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={displayRows}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            // Show custom message when no rows
            slots={{
              noRowsOverlay: () => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: 1,
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No Reports Found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchText ? 'No reports match your search criteria.' : 'No reports have been generated yet.'}
                  </Typography>
                </Box>
              ),
            }}
            sx={{
              border: 0,
              minHeight: 400, // Ensure table has minimum height even when empty
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                color: '#000',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-cell': {
                cursor: 'default',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f9f9f9',
              },
            }}
          />
        </Paper>
      </Paper>
    </>
  );
};

export default ReportHistory;
