import React, { useState } from 'react';
import Table from '../table/table'
import ColorButtons from "../button/button";
import Form from "../forms/form";

const Toilet = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <div className='room_container'>
      <h6>Toilet</h6>
      <ColorButtons text='ADD' handleClick={() => setAddItem(prevState => !prevState)}/>
      {addItem && <Form />}
      <Table/>
    </div>
  );
};

export default Toilet;