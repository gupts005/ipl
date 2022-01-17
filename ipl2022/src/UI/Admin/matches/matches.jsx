
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './matches.module.scss';
import { Delete, Edit, SportsCricket, ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { Fab, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthContext from '../../../API/auth-context';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import MatchesCrud from './components/Matches_Crud';
import { deleteMatchData, sendMatchData, sendUpdatedMatchData } from '../../../API/matches/matches-actions';

let isInitial = true;

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        // style={{ color: 'white' }}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        // style={{ color: 'white' }}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        // style={{ color: 'white' }}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        // style={{ color: 'white' }}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Matches = (props) => {

  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);
  const matchData = useSelector((state) => state.matches.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('matchId');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [openCrudModal, setCrudModal] = useState(false);
  // const [openDeleteModal, setDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowDelete, setSelectedRowDelete] = useState([]);
  const [selected, setSelected] = React.useState({
    matchId: '',
    minimumPoints: '',
    name: '',
    resultStatus: '',
    startDatetime: new Date(),
    team1: '',
    team1Id: '',
    team1Logo: '',
    team1Short: '',
    team2: '',
    team2Id: '',
    team2Logo: '',
    team2Short: '',
    tournamentId: '',
    venue: '',
    venueId: '',
    winnerTeamId: ''
  });

  const setIncomingData = (data) => {
    setSelected(data);
  }

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    const z = matchData.find((y) => y.matchId === selected.matchId)
    if (!z) {
      dispatch(sendMatchData({
        matchId: selected.matchId,
        minimumPoints: selected.minimumPoints,
        name: selected.name,
        startDatetime: selected.startDatetime.toString(),
        team1: selected.team1Id,
        team2: selected.team2Id,
        tournamentId: selected.tournamentId,
        venueId: selected.venueId
      }));
    }
    if (z) {
      dispatch(sendUpdatedMatchData({
        matchId: selected.matchId,
        minimumPoints: selected.minimumPoints,
        name: selected.name,
        startDatetime: selected.startDatetime.toString(),
        team1: selected.team1Id,
        team2: selected.team2Id,
        tournamentId: selected.tournamentId,
        venueId: selected.venueId
      }));
    }
  }, [selected, dispatch]);


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

  // Avoid a layout jump when reaching the last page with empty matchData.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - matchData.length) : 0;

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
                Match Details
              </Typography>

              <TextField label="Search" color='secondary' sx={{ marginRight: '10px' }} onKeyUp={(e) => setSearchTerm(e.target.value)} variant="outlined" />
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
                 matchData.slice().sort(getComparator(order, orderBy)) */}
                  {matchData
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
                          key={item.matchId}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {item.matchId}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
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
              count={matchData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Paper>
          {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
        </Box>
        <MatchesCrud onClick={setIncomingData} update={selectedRow} delete={selectedRowDelete} open={openCrudModal} handleClose={() => setCrudModal(false)} />
      </div>
    </div >

  );
};

export default Matches;