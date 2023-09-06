import React, { useContext, useState } from 'react';
import Table from '../table/table'
import RoomForm from "../forms/room_form/room_form";
import ColorButtons from "../button/button";
import { MyContext } from "../providers/provider";

const Bedroom = () => {
  const [addItem, setAddItem] = useState(false);
  const contextData = useContext(MyContext);

  return (
    <div className='room_container'>
      <h6><strong>Bedroom</strong></h6>
      { !addItem &&
        <ColorButtons text='ADD' handleClick={ () => setAddItem(prevState => !prevState) }/>
      }
      { addItem && <RoomForm addItem={setAddItem} roomType='Bedroom'/> }
      <Table roomItems={ contextData.roomItems.filter(el => el.roomType === 'Bedroom') }/>
    </div>
  );
};

export default Bedroom;