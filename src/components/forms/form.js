import React, { useContext, useState } from 'react';
import ColorButtons from "../button/button";
import { db } from "../../firebase";
import { MyContext } from "../providers/provider";

const Form = ({ addItem, roomType }) => {
  const [item, setItem] = useState('');
  const [shop, setShop] = useState('');
  const contextData = useContext(MyContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (typeof addItem === 'function') {
      addItem(false);
      const newItem = {
        item,
        shop,
        roomType,
        items: [],
      }
      try {
        const collectionRef = db.collection('roomItems');
        const data = await collectionRef.add(newItem);
        contextData.setRoomItems(prevState => [...prevState, {...newItem, id: data.id}]);
        setItem('');
        setShop('')
      } catch (error) {
        console.error('Błąd dodawania obiektu: ', error);
      }
    }
  }

  const handleCancel = () => {
    if (typeof addItem === "function") {
      addItem(false);
    }
  }

  return (
    <form onSubmit={ event => handleSubmit(event) }>
      <input value={item} type="text" placeholder='Item' onChange={event => setItem(event.target.value)}/>
      <input value={shop} type="text" placeholder='Shop' onChange={event => setShop(event.target.value)}/>
      <div className="form_buttons">
        <ColorButtons type='submit' text='SAVE'/>
        <ColorButtons text='CANCEL' handleClick={ handleCancel }/>
      </div>
    </form>
  );
};

export default Form;