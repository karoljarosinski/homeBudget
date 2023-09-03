import React, { useState } from 'react';
import Table from '../table/table'
import Form from "../forms/form";
import ColorButtons from "../button/button";

const Bedroom = () => {

  const [addItem, setAddItem] = useState(false);

  return (
    <div className='room_container'>
      <h6><strong>Bedroom</strong></h6>
      <ColorButtons text='ADD' handleClick={() => setAddItem(prevState => !prevState)}/>
      {addItem && <Form />}
      <Table/>
    </div>
  );
};

export default Bedroom;