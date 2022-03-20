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
import { useDispatch, useSelector } from 'react-redux';
import classes from './users.module.scss';
import { Delete, Edit, SportsCricket } from '@mui/icons-material';
import { Fab, TextField } from '@mui/material';
import AuthContext from '../../../API/auth-context';
import UsersCrud from './components/Users_Crud';
import { getComparator, TablePaginationActions } from '../../common/components/Utils';
import Switch from '@mui/material/Switch';
import { userActions } from '../../../API/users/user-slice';
import { updateUserStatus } from '../../../API/users/user-actions';

const headCells = [
  { id: 'username', label: 'Username', disablePadding: true },
  { id: 'firstName', label: 'First Name', disablePadding: false },
  { id: 'lastName', label: 'Last Name', disablePadding: false },
  { id: 'genderName', label: 'Gender', disablePadding: false },
  { id: 'profilePicture', label: 'Picture', disablePadding: false },
  { id: 'role', label: 'Role', disablePadding: false },
  { id: 'availablePoints', label: 'Available Points', disablePadding: false },
  { id: 'status', label: 'Status', disablePadding: false },
  { id: 'mobileNumber', label: 'Cell No.', disablePadding: false },
  { id: 'email', label: 'Email', disablePadding: false }
];

const Users = () => {

  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.items);

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const updateActiveStatusHandler = (item) => {
    dispatch(
      userActions.updateActiveStatus({
        userId: item.userId,
        status: !item.status
      })
    );
    dispatch(updateUserStatus(item.userId,!item.status,authCtx.Header));
  }

  // Avoid a layout jump when reaching the last page with empty userData.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

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
                 userData.slice().sort(getComparator(order, orderBy)) */}
                  {userData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort(getComparator(order, orderBy))
                    .filter((item) => {
                      if (searchTerm === '') {
                        return item;
                      } else if (item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.genderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.availablePoints == searchTerm ||
                        item.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.email.toLowerCase().includes(searchTerm.toLowerCase())) {
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
                            {item.username}
                          </TableCell>
                          <TableCell style={{ width: 160 }} component="th" scope="row" align="center">
                            {item.firstName}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.lastName}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.genderId !== 1 ? 'Female' : 'Male'}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <img src={item.profilePicture} alt="error" />
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.roleId !== 1 ? 'User' : 'Admin'}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {item.availablePoints}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <Switch
                              color='secondary'
                              checked={item.status}
                              onChange={()=>updateActiveStatusHandler(item)}
                            />
                          </TableCell>
                          <TableCell style={{ width: 170 }} align="center">
                            {item.mobileNumber}
                          </TableCell>
                          <TableCell style={{ width: 170 }} align="center">
                            {item.email}
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
              count={userData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Paper>
          {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
        </Box>
        <UsersCrud update={selectedRow} delete={selectedRowDelete} open={openCrudModal} handleClose={() => setCrudModal(false)} />
      </div>
    </div >
  )
}

export default Users;
