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
import { useSelector } from 'react-redux';
import classes from './update-winner.module.scss';
import { Delete, Edit, SportsCricket } from '@mui/icons-material';
import { Fab, TextField } from '@mui/material';
import AuthContext from '../../../API/auth-context';
import WinnerCrud from './components/Winner_Crud';
import { getComparator, TablePaginationActions } from '../../common/components/Utils';
import moment from 'moment';

const headCells = [
  { id: 'matchId', numeric: true, label: 'ID', disablePadding: true },
  { id: 'name', numeric: false, label: 'Name', disablePadding: false },
  { id: 'resultStatus', numeric: true, label: 'Result', disablePadding: false },
  { id: 'team1Short', numeric: false, label: 'Team 1', disablePadding: false },
  { id: 'team2Short', numeric: false, label: 'Team 2', disablePadding: false },
  { id: 'team1Logo', numeric: false, label: 'Team1 Logo', disablePadding: false },
  { id: 'team2Logo', numeric: false, label: 'Team2 Logo', disablePadding: false },
  { id: 'venue', numeric: false, label: 'Venue', disablePadding: false },
  { id: 'minimumPoints', numeric: true, label: 'Min Points', disablePadding: false },
  { id: 'startDatetime', numeric: true, label: 'Date', disablePadding: false }
];


const Winner = () => {

  const authCtx = useContext(AuthContext);
  const oldMatchesData = useSelector((state) => state.oldMatches.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('userId');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [openCrudModal, setCrudModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowDelete, setSelectedRowDelete] = useState([]);

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

  // Avoid a layout jump when reaching the last page with empty oldMatchesData.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - oldMatchesData.length) : 0;

  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        <Box sx={{ width: '100%', paddingTop: '10px' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Toolbar>
              <Typography
                sx={{ flex: '1 1 auto' }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                User Details
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
                    <TableCell align="center">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 oldMatchesData.slice().sort(getComparator(order, orderBy)) */}
                  {oldMatchesData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort(getComparator(order, orderBy))
                    .filter((item) => {
                      if (searchTerm === '') {
                        return item;
                      } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.team1Short.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.team2Short.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.minimumPoints === searchTerm ||
                        item.startDatetime.toLowerCase().includes(searchTerm.toLowerCase())) {
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
                            {item.matchId}
                          </TableCell>
                          <TableCell style={{ width: 160 }} component="th" scope="row" align="center">
                            {item.name}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.resultStatus !== 0 ? 'Declared' : 'TBD'}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.team1Short}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.team2Short}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <img src={item.team1Logo} alt="error" />
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <img src={item.team2Logo} alt="error" />
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.venue}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.minimumPoints}
                          </TableCell>
                          <TableCell style={{ width: 170 }} align="center">
                            {moment(item.startDatetime).format('MMM Do, h:mm')}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <Fab onClick={() => { setSelectedRow(item); setSelectedRowDelete(false); setCrudModal(true); }} size={authCtx.screenSize.dynamicWidth > 600 ? '' : 'small'} color='secondary'>
                              <Edit fontSize={authCtx.screenSize.dynamicWidth > 600 ? 'medium' : 'small'} />
                            </Fab>
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
              count={oldMatchesData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Paper>
        </Box>
        <WinnerCrud update={selectedRow} delete={selectedRowDelete} open={openCrudModal} handleClose={() => setCrudModal(false)} />
      </div>
    </div >
  );
};

export default Winner;