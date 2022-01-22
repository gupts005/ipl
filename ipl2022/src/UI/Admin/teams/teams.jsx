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
import classes from './teams.module.scss';
import { Delete, Edit, SportsCricket } from '@mui/icons-material';
import { Fab, TextField } from '@mui/material';
import AuthContext from '../../../API/auth-context';
import TeamsCrud from './components/Teams_Crud';
import { getComparator, TablePaginationActions } from '../../common/components/Utils';

const headCells = [
  { id: 'name', label: 'Name', disablePadding: true },
  { id: 'shortName', label: 'Short Name', disablePadding: false },
  { id: 'teamLogo', label: 'Team Logo', disablePadding: false },
];

const Teams = () => {

  const authCtx = useContext(AuthContext);
  const teamData = useSelector((state) => state.team.items);

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

  // Avoid a layout jump when reaching the last page with empty teamData.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teamData.length) : 0;

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
              <Fab onClick={() => { setSelectedRow(''); setSelectedRowDelete(false); setCrudModal(true) }} color='secondary'><SportsCricket /></Fab>
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
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 teamData.slice().sort(getComparator(order, orderBy)) */}
                  {teamData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort(getComparator(order, orderBy))
                    .filter((item) => {
                      if (searchTerm === '') {
                        return item;
                      } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.teamLogo.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return item;
                      }
                    })
                    .map((item, index) => {

                      return (
                        <TableRow
                          hover
                          key={index}
                        >
                          <TableCell style={{ width: 160 }} component="th" scope="row" align="center">
                            {item.name}
                          </TableCell>
                          <TableCell style={{ width: 160 }} component="th" scope="row" align="center">
                            {item.shortName}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <img src={item.teamLogo} alt="error" />
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <Fab onClick={() => { setSelectedRow(item); setSelectedRowDelete(false); setCrudModal(true); }} size={authCtx.screenSize.dynamicWidth > 600 ? '' : 'small'} color='secondary'>
                              <Edit fontSize={authCtx.screenSize.dynamicWidth > 600 ? 'medium' : 'small'} />
                            </Fab>
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <Fab onClick={() => { setSelectedRow(false); setSelectedRowDelete(item); setCrudModal(true); }} size={authCtx.screenSize.dynamicWidth > 600 ? '' : "small"} color='secondary'>
                              <Delete fontSize={authCtx.screenSize.dynamicWidth > 600 ? 'medium' : 'small'} />
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
              count={teamData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Paper>
          {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
        </Box>
        <TeamsCrud update={selectedRow} delete={selectedRowDelete} open={openCrudModal} handleClose={() => setCrudModal(false)} />
      </div>
    </div >
  )
}

export default Teams;