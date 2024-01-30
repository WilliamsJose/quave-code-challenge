import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const BoxDataGrid = ({ rows, columns, classes }) => (
  <Box className={classes}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>
);
