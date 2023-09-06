import React, { useContext, useState } from 'react';
import Table from '../table/table'
import ColorButtons from "../button/button";
import Form from "../forms/form";
import { MyContext } from "../providers/provider";

const Office = () => {
  const [addItem, setAddItem] = useState(false);
  const contextData = useContext(MyContext);

  return (
    <div className='room_container'>
      <h6><strong>Office</strong></h6>
      { !addItem &&
        <ColorButtons text='ADD' handleClick={ () => setAddItem(prevState => !prevState) }/>
      }
      { addItem && <Form addItem={setAddItem} roomType='Office'/> }
      <Table roomItems={contextData.roomItems.filter(el => el.roomType === 'Office')}/>
    </div>
  );
};

export default Office;