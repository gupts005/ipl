import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import React, { useContext, useState } from 'react';
import { Delete, Edit, SportsCricket, ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { Fab, TextField } from '@mui/material';
import { getComparator, TablePaginationActions } from '../../common/components/Utils';
import styled from 'styled-components';

const headCells = [
  { id: 'username', label: 'Username', disablePadding: true },
  { id: 'teamShortName', label: 'Team Name', disablePadding: false },
  { id: 'contestPoints', label: 'Points', disablePadding: false }
];

const ParentDiv = styled.div`
  display: flex;  
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const BetTable = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('username');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [selected, setSelected] = useState([]);

  console.log(props,' bet tableeeeeeeee');
  React.useEffect(() => {
    setSelected(props.allContestData);
  }, [props]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty selected.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - selected.length) : 0;

  return (
    <ParentDiv>
      <Box sx={{ width: '100%', paddingTop: '10px' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar>
            <Typography
              sx={{ flex: '1 1 auto' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Match Details
            </Typography>

            <TextField label="Search" color='secondary' sx={{ marginRight: '10px' }} onChange={(e) => setSearchTerm(e.target.value)} variant="outlined" />
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <TableHead>
                <TableRow>
                  {headCells.map((hc) => (
                    <TableCell
                      key={hc.id}
                      align='center'
                      padding={hc.disablePadding ? 'none' : 'normal'}
                      sortDirection={orderBy === hc.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === hc.id}
                        direction={orderBy === hc.id ? order : 'asc'}
                        onClick={() => handleRequestSort(hc.id)}
                      >
                        {hc.label}
                        {orderBy === hc.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 selected.slice().sort(getComparator(order, orderBy)) */}
                {selected
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .sort(getComparator(order, orderBy))
                  .filter((item) => {
                    if (searchTerm === '') {
                      return item;
                    } else if (item.teamShortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.contestPoints===searchTerm) {
                      return item;
                    }
                  })
                  .map((item, index) => {

                    return (
                      <TableRow
                        hover
                        key={index}
                      >
                        <TableCell style={{ width: 100 }} component="th" scope="row" align="center">
                          {item.username}
                        </TableCell>
                        <TableCell style={{ width: 160 }} component="th" scope="row" align="center">
                          {item.teamShortName}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="center">
                          {item.contestPoints}
                        </TableCell>                        
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={selected.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Paper>
        {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
      </Box>

    </ParentDiv>
  );
};

export default BetTable;