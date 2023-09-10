import * as React from 'react';
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
import { useContext, useState } from "react";
import ItemForm from "../forms/item_form/item_form";
import Icons from "../icons/add_icon";
import SvgMaterialIcons from "../icons/delete_icon";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { db } from "../../firebase";
import { MyContext } from "../providers/provider";
import CloseIcon from '@mui/icons-material/Close';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [addItemDetails, setAddItemDetails] = useState(false);
  const contextData = useContext(MyContext);

  const handleAddItem = () => {
    setAddItemDetails(prevState => !prevState)
  }

  const expandTableRow = () => {
    setOpen(!open);
    setAddItemDetails(false);
  }

  const handleRemoveItem = async () => {
    const itemRef = db.collection('roomItems');
    try {
      await itemRef.doc(row.id).delete();
      contextData.setRoomItems(prevState => prevState.filter(el => el.id !== row.id));
    } catch (error) {
      console.error('Błąd podczas usuwania obiektu: ', error);
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={ { '& > *': { borderBottom: 'unset' } } }>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={ expandTableRow }
          >
            { open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          { row.item }
        </TableCell>
        <TableCell align="center">{ row.shop }</TableCell>
        <TableCell>
          { row.items.length === 0 &&
            <DeleteSweepIcon style={ { color: 'red' } } onClick={ handleRemoveItem }>Cancel</DeleteSweepIcon> }
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={ { paddingBottom: 0, paddingTop: 0 } } colSpan={ 6 }>
          <Collapse in={ open } timeout="auto" unmountOnExit>
            <Box sx={ { margin: 1 } }>
              <div className="items_section">
                <Typography variant="h6" gutterBottom component="div">
                  Items
                </Typography>
                { !addItemDetails && <Icons addItem={ handleAddItem }/> }
                { addItemDetails && <CloseIcon onClick={ handleAddItem } style={ { color: 'red' } }/> }
              </div>
              { !addItemDetails && <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price (PLN)</TableCell>
                    <TableCell/>
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
                      <TableCell>
                        <SvgMaterialIcons itemsRow={ itemsRow } row={ row }/>
                      </TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table> }
              { addItemDetails && <ItemForm addItemDetails={ setAddItemDetails } row={ row }/> }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ roomItems }) {

  return (
    <TableContainer component={ Paper }>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="center">Room Items</TableCell>
            <TableCell align="center">Shop</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          { roomItems.map((row) => (
            <Row key={ row.id } row={ row }/>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}