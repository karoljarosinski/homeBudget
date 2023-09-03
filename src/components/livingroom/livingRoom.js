import React, { useState } from 'react';
import Table from '../table/table'
import ColorButtons from "../button/button";
import Form from "../forms/form";

const LivingRoom = () => {

  const [addItem, setAddItem] = useState(false);

  return (
    <div className='room_container'>
      <h6>Living room</h6>
      <ColorButtons text='ADD' handleClick={() => setAddItem(prevState => !prevState)}/>
      {addItem && <Form />}
      <Table/>
    </div>
  );
};

export default LivingRoom;