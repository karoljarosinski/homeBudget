import React, { useContext, useState } from 'react';
import Table from '../table/table'
import ColorButtons from "../button/button";
import Form from "../forms/form";
import { MyContext } from "../providers/provider";

const Bathroom = () => {
  const [addItem, setAddItem] = useState(false);
  const contextData = useContext(MyContext);

  return (
    <div className='room_container'>
      <h6>Bathroom</h6>
      <ColorButtons text='ADD' handleClick={() => setAddItem(prevState => !prevState)}/>
      {addItem && <Form />}
      <Table roomItems={contextData.roomItems.filter(el => el.roomType === 'Bathroom')}/>
    </div>
  );
};

export default Bathroom;