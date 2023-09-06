import React, { useContext, useState } from 'react';
import Table from '../table/table'
import ColorButtons from "../button/button";
import RoomForm from "../forms/room_form/room_form";
import { MyContext } from "../providers/provider";

const Kitchen = () => {
  const [addItem, setAddItem] = useState(false);
  const contextData = useContext(MyContext);

  return (
    <div className='room_container'>
      <h6><strong>Kitchen</strong></h6>
      { !addItem &&
        <ColorButtons text='ADD' handleClick={ () => setAddItem(prevState => !prevState) }/>
      }
      { addItem && <RoomForm addItem={setAddItem} roomType='Kitchen'/> }
      <Table roomItems={contextData.roomItems.filter(el => el.roomType === 'Kitchen')}/>
    </div>
  );
};

export default Kitchen;