import * as React from 'react';
import Grid from '@mui/material/Grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { db } from "../../firebase";
import { MyContext } from "../providers/provider";
import { useContext } from "react";

export default function SvgMaterialIcons({ itemsRow, row }) {
  const contextData = useContext(MyContext);


  const handleRemoveItem = async () => {
    const newRoomItems = row.items.filter(el => el.model !== itemsRow.model);
    const itemRef = db.collection('roomItems').doc(row.id);
    try {
      const object = await itemRef.get();
      if (object.exists) {
        const itemData = object.data();
        itemData.items = newRoomItems;
        await itemRef.update(itemData);
        contextData.setRoomItems(prevState => prevState.map(el => el.id === object.id ? {
          ...itemData,
          id: object.id
        } : el));
      }
    } catch (error) {
      console.error('Błąd podczas usuwania obiektu: ', error);
    }
  }

  return (
    <Grid container sx={ { color: 'red' } }>
      <Grid item xs={ 8 }>
        <DeleteForeverIcon onClick={ handleRemoveItem }/>
      </Grid>
    </Grid>
  );
}