import React, { useContext, useState } from 'react';
import ColorButtons from "../../button/button";
import { db } from "../../../firebase";
import { MyContext } from "../../providers/provider";

const ItemForm = ({ addItemDetails, row }) => {
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const contextData = useContext(MyContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (typeof addItemDetails === 'function') {
      addItemDetails(false);
      const newItem = {
        date: new Date().toLocaleDateString(),
        model,
        price,
        amount,
      }
      const itemRef = db.collection('roomItems').doc(row.id);
      try {
        const object = await itemRef.get();
        if (object.exists) {
          const itemData = object.data();
          itemData.items = [...itemData.items, newItem];
          await itemRef.update(itemData);
          contextData.setRoomItems(prevState => prevState.map(el => el.id === object.id ? {
            ...itemData,
            id: object.id
          } : el))
        }
      } catch (error) {
        console.error('Błąd podczas pobierania dokumentu', error);
      }
    }
  }

  return (
    <form className='add_item_form' onSubmit={ event => handleSubmit(event) }>
      <input value={ model } type="text" placeholder='model' onChange={ event => setModel(event.target.value) }/>
      <input value={ price } type="number" placeholder='price' onChange={ event => setPrice(+event.target.value) }/>
      <input value={ amount } type="number" placeholder='amount' onChange={ event => setAmount(+event.target.value) }/>
      {((model !== '') && (price !== '') && (amount !== '' && amount !== 0)) &&
      <ColorButtons text='Save' type='submit'/>
      }
    </form>
  );
};

export default ItemForm;