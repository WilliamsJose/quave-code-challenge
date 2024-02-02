import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { usePeopleTable } from '../../hook/datagrid/usePeopleTable';

export const PeopleTable = ({ community, ...styles }) => {
  const { columns, rows } = usePeopleTable(community);
  return (
    <Box className={`mt-4 ${styles}`}>
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
      />
    </Box>
  );
};
