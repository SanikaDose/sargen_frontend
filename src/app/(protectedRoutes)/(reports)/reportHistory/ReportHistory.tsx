'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, TextField, useMediaQuery, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { useGetAllReportsQuery } from './ReportHistoryApi';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { ReportData } from './ReportHistory.types';
import Loader from '@/components/Loader/Loader';

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
      const filtered = reportsData.filter((row) =>
        Object.values(row).some((field) => typeof field === 'string' && field.toLowerCase().includes(value)),
      );
      setFilteredRows(filtered);
    }
  };

  // Responsive columns based on screen size
  const getColumns = (): GridColDef[] => {
    if (isMobile) {
      // Mobile: Show only essential columns
      return [
        { field: 'srNo', headerName: 'Sr.', width: 60 },
        {
          field: 'reportName',
          headerName: 'Report Name',
          flex: 1,
          minWidth: 150,
          renderCell: (params: GridRenderCellParams) => <span>{`${params.row.plantName} Assessment Report`}</span>,
        },
        {
          field: 'actions',
          headerName: 'Action',
          width: 70,
          sortable: false,
          filterable: false,
          renderCell: (params: GridRenderCellParams) => (
            <IconButton
              color="primary"
              onClick={() => handleDownload(params.row.reportPath, params.row.plantName)}
              aria-label="download"
              disabled={!params.row.reportPath}
              size="small"
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          ),
        },
      ];
    } else if (isTablet) {
      // Tablet: Show more columns but still condensed
      return [
        { field: 'srNo', headerName: 'Sr. No.', width: 80 },
        {
          field: 'reportName',
          headerName: 'Report Name',
          flex: 1,
          minWidth: 180,
          renderCell: (params: GridRenderCellParams) => <span>{`${params.row.plantName} Assessment Report`}</span>,
        },
        {
          field: 'plantName',
          headerName: 'Plant Name',
          flex: 1,
          minWidth: 130,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 90,
          sortable: false,
          filterable: false,
          renderCell: (params: GridRenderCellParams) => (
            <IconButton
              color="primary"
              onClick={() => handleDownload(params.row.reportPath, params.row.plantName)}
              aria-label="download"
              disabled={!params.row.reportPath}
            >
              <DownloadIcon />
            </IconButton>
          ),
        },
      ];
    } else {
      // Desktop: Show all columns
      return [
        { field: 'srNo', headerName: 'Sr. No.', width: 90 },
        {
          field: 'reportName',
          headerName: 'Report Name',
          flex: 1,
          minWidth: 200,
          renderCell: (params: GridRenderCellParams) => <span>{`${params.row.plantName} Assessment Report`}</span>,
        },
        {
          field: 'version',
          headerName: 'Version',
          flex: 1,
          minWidth: 100,
          renderCell: () => <span>1.0</span>,
        },
        {
          field: 'plantName',
          headerName: 'Plant Name',
          flex: 1,
          minWidth: 150,
        },
        {
          field: 'createdAt',
          headerName: 'Report Creation Date',
          flex: 1,
          minWidth: 200,
          renderCell: (params) => {
            const date = new Date(params.value);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
            const year = date.getFullYear();
            return `${day} / ${month} / ${year}`;
          },
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
    }
  };

  // Add serial number to rows
  const rowsWithId = filteredRows.map((row, index) => ({
    ...row,
    srNo: index + 1,
  }));

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
      {isLoading ? (
        <Loader loading={true} />
      ) : (
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
          <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
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
              columns={getColumns()}
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
                minHeight: 400,
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
                // Ensure no horizontal scroll
                '& .MuiDataGrid-virtualScroller': {
                  overflowX: 'hidden',
                },
                '& .MuiDataGrid-main': {
                  overflowX: 'hidden',
                },
              }}
            />
          </Paper>
        </Paper>
      )}
    </>
  );
};

export default ReportHistory;
