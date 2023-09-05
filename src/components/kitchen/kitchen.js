import React, { useContext, useState } from 'react';
import Table from '../table/table'
import ColorButtons from "../button/button";
import Form from "../forms/form";
import { MyContext } from "../providers/provider";

const Kitchen = () => {
  const [addItem, setAddItem] = useState(false);
  const contextData = useContext(MyContext);
  return (
    <div className='room_container'>
      <h6>Kitchen</h6>
      <ColorButtons text='ADD' handleClick={() => setAddItem(prevState => !prevState)}/>
      {addItem && <Form />}
      <Table roomItems={contextData.roomItems.filter(el => el.roomType === 'Kitchen')}/>
    </div>
  );
};

export default Kitchen;