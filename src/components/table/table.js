import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// function createData(item, shop) {
//   return {
//     item,
//     shop,
//     items: [
//       {
//         date: '2020-01-05',
//         model: '11091700',
//         amount: 3,
//         price: 5.99,
//       },
//       {
//         date: '2020-01-02',
//         model: 'Anonymous',
//         amount: 1,
//         price: 7,
//       },
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={ { '& > *': { borderBottom: 'unset' } } }>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={ () => setOpen(!open) }
          >
            { open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          { row.item }
        </TableCell>
        <TableCell align="center">{ row.shop }</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={ { paddingBottom: 0, paddingTop: 0 } } colSpan={ 6 }>
          <Collapse in={ open } timeout="auto" unmountOnExit>
            <Box sx={ { margin: 1 } }>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { row.items.map((itemsRow) => (
                    <TableRow key={ itemsRow.model }>
                      <TableCell component="th" scope="row">
                        { itemsRow.date }
                      </TableCell>
                      <TableCell>{ itemsRow.model }</TableCell>
                      <TableCell>{ itemsRow.price }</TableCell>
                      <TableCell align="right">{ itemsRow.amount }</TableCell>
                      <TableCell align="right">
                        { Math.round(itemsRow.amount * itemsRow.price * 100) / 100 }
                      </TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     shop: PropTypes.string.isRequired,
//     items: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         model: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired
//       }),
//     ).isRequired,
//     item: PropTypes.string.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', '159'),
//   createData('Ice cream sandwich', '237'),
//   createData('Eclair', '262'),
//   createData('Cupcake', '305'),
//   createData('Gingerbread', '356')
// ];

export default function CollapsibleTable({ roomItems }) {
  const rows = roomItems;

  return (
    <TableContainer component={ Paper }>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="center">Item</TableCell>
            <TableCell align="center">Shop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((row) => (
            <Row key={ row.id } row={ row }/>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}