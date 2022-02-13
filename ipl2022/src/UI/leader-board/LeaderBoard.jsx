import React, { useEffect, useState } from 'react';
import classes from './LeaderBoard.module.scss';
import { LooksOne, LooksTwo, Looks3 } from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
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
import { TextField } from '@mui/material';
import { getComparator, stringAvatar, TablePaginationActions } from '../common/components/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { allUserStatsActions } from '../../API/all-users-stats/allUserStats-slice';
import { useNavigate } from 'react-router-dom';

const headCells = [
  { id: 'rank', label: 'Rank', disablePadding: false },
  { id: 'userName', label: 'User Name', disablePadding: false },
  { id: 'availableavailablePoints', label: 'Available Points', disablePadding: false }
];

const LeaderBoard = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsersFutureBets = useSelector((state) => state.allUsersFutureBets.items);
  const isUserFutureStatsChanged = useSelector((state) => state.allUsersFutureBets.changed);
  const allUserStats = useSelector((state) => state.allUserStats.items);
  const isUserStatsChanged = useSelector((state) => state.allUserStats.changed);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('rank');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  // console.log(allUserStats, ' data');

  useEffect(() => {
    if (isUserStatsChanged === false && isUserFutureStatsChanged === true) {
      dispatch(
        allUserStatsActions.replaceData(allUsersFutureBets)
      );
    }
  }, [isUserFutureStatsChanged]);

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

  const viewUser = (ud) => {
    navigate(`/other-user/${ud.userId}`,{state: ud});
  }

  // Avoid a layout jump when reaching the last page with empty allUserStatsState.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUserStats.length) : 0;

  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        <div className={classes.child_1}>
          <div className={classes.line}></div>
          <div className={classes.vl}></div>
          <div className={classes.container1}>
            <div className={classes.item1}>
              <div className={classes.innerr1}>
                <Fab color="action">
                  <LooksOne color="secondary" fontSize="large" />
                </Fab>
                <p className={classes.card_name + ' ' + classes.txtbg}>
                  {allUserStats[0]?.firstName} {allUserStats[0]?.lastName}
                </p>
                <Avatar
                  {...stringAvatar(`${allUserStats[0]?.firstName} ${allUserStats[0]?.lastName}`)}
                  src={allUserStats[0]?.profilePicture} />
                <p className={classes.txtbg}>
                  {allUserStats[0]?.availablePoints}
                </p>
              </div>
            </div>
            <div className={classes.item2}>
              <div className={classes.innerr2}>
                <Fab color="action">
                  <LooksTwo color="secondary" fontSize="large" />
                </Fab>
                <p className={classes.card_name + ' ' + classes.txtbg}>
                  {allUserStats[1]?.firstName} {allUserStats[1]?.lastName}
                </p>
                <Avatar
                  {...stringAvatar(`${allUserStats[1]?.firstName} ${allUserStats[1]?.lastName}`)}
                  src={allUserStats[1]?.profilePicture} />
                <p className={classes.txtbg}>
                  {allUserStats[1]?.availablePoints}
                </p>
              </div>
            </div>
            <div className={classes.item3}>
              <div className={classes.innerr3}>
                <Fab color="action">
                  <Looks3 color="secondary" fontSize="large" />
                </Fab>
                <p className={classes.card_name + ' ' + classes.txtbg}>
                  {allUserStats[2]?.firstName} {allUserStats[2]?.lastName}
                </p>
                <Avatar
                  {...stringAvatar(`${allUserStats[2]?.firstName} ${allUserStats[2]?.lastName}`)}
                  src={allUserStats[2]?.profilePicture} />
                <p className={classes.txtbg}>
                  {allUserStats[2]?.availablePoints}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.vl1}></div>
          <div className={classes.line}></div>

        </div>
        <div className={classes.child_2}>
          <Box sx={{ width: '100%', paddingTop: '30px' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Toolbar>
                <Typography
                  sx={{ flex: '1 1 auto' }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  LeaderBoard
                </Typography>

                <TextField
                  label="Search"
                  color='secondary'
                  sx={{ marginRight: '10px' }}
                  onChange={(e) => setSearchTerm(e.target.value)} variant="outlined" />
              </Toolbar>
              <TableContainer>
                <Table
                  sx={{ minWidth: 'auto' }}
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
                 allUserStatsState.slice().sort(getComparator(order, orderBy)) */}
                    {allUserStats
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .sort(getComparator(order, orderBy))
                      .filter((item) => {
                        if (searchTerm === '') {
                          return item;
                        } else if (item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.availablePoints == searchTerm) {
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
                              {index + 1}
                            </TableCell>
                            <TableCell style={{ width: 100, cursor: 'pointer' }} component="th" scope="row" align="center" onClick={()=>viewUser(item)}>
                              {item.firstName} {item.lastName}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="center">
                              {item.availablePoints}
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
                count={allUserStats.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </Paper>
            {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
          </Box>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard;