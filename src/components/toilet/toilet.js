import React, { useContext, useState } from 'react';
import Table from '../table/table'
import SuccessButton from "../button/button";
import RoomForm from "../forms/room_form/room_form";
import { MyContext } from "../providers/provider";

const Toilet = () => {
  const [addItem, setAddItem] = useState(false);
  const contextData = useContext(MyContext);

  return (
    <div className='room_container'>
      <h6><strong>Toilet</strong></h6>
      { !addItem &&
        <SuccessButton text='ADD' handleClick={ () => setAddItem(prevState => !prevState) }/>
      }
      { addItem && <RoomForm addItem={setAddItem} roomType='Toilet'/> }
      <Table roomItems={contextData.roomItems.filter(el => el.roomType === 'Toilet')}/>
    </div>
  );
};

export default Toilet;