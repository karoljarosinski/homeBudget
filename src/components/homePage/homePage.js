import React, { useContext } from 'react';
import SuccessButton from "../button/button";
import { db } from "../../firebase.js";
import { useState } from "react";
import CircularIndeterminate from "../loadingSpinner/spinner";
import { MyContext } from "../providers/provider";
import { FcEmptyTrash, FcRefresh } from "react-icons/fc";

const HomePage = () => {
  const [transactionType, setTransactionType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [editElement, setEditElement] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState(0);

  const [objectToEdit, setObjectToEdit] = useState();
  const contextData = useContext(MyContext);

  const updateBalance = async (amount, transactionType) => {
    let actualBalance = contextData.balance[0].balance;
    actualBalance = transactionType === 'expense' ? actualBalance-= amount : actualBalance += amount;
    try {
      const balanceRef = db.collection('balance').doc(contextData.balance[0].id);
      const balanceObject = await balanceRef.get();
      if (balanceObject.exists) {
        const balanceData = balanceObject.data();
        balanceData.balance = actualBalance;
        await balanceRef.update(balanceData);
        contextData.setBalance([{
          ...balanceData,
          id: balanceObject.id
        }])
      }
    } catch (error) {
      console.error('Błąd odczytu danych', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newOperation = {
      date: new Date().toLocaleDateString(),
      price: amount,
      title,
      type: transactionType
    }
    try {
      const collectionRef = db.collection('operations');
      const data = await collectionRef.add(newOperation);
      contextData.setOperations(prevState => [...prevState, { ...newOperation, id: data.id }])
      setTitle('');
      setAmount('');
      await updateBalance(amount, transactionType);
    } catch (error) {
      console.error('Blad dodawania obiektu: ', error)
    }
  }

  const handleRemoveElement = async (id) => {
    try {
      const collectionRef = db.collection('operations');
      const deletedObjectRef = collectionRef.doc(id);
      const deletedObjectSnapshot = await deletedObjectRef.get();
      const deletedObjectData = deletedObjectSnapshot.data();
      await deletedObjectRef.delete();
      contextData.setOperations(prevState => prevState.filter(el => el.id !== id));
      const type = deletedObjectData.type === 'expense' ? 'income' : 'expense'
      await updateBalance(deletedObjectData.price, type);
    } catch (error) {
      console.error('Błąd podczas usuwania obiektu: ', error);
    }
  }

  const handleEditElement = (id) => {
    setEditElement(prevState => !prevState);
    setObjectToEdit(id);
    setNewAmount(contextData.operations.find(el => el.id === id).price);
    setNewTitle(contextData.operations.find(el => el.id === id).title)
  }

  const handleCancelEdit = () => {
    setNewTitle('');
    setNewAmount(0);
    setEditElement(false);
  }

  const handleUpdateOperation = async () => {
    setEditElement(false);
    const itemRef = db.collection('operations').doc(objectToEdit);
    try {
      const object = await itemRef.get();
      if (object.exists) {
        const itemData = object.data();
        itemData.title = newTitle;
        itemData.price = newAmount;
        await itemRef.update(itemData)
        contextData.setOperations(prevState => prevState.map(el => el.id === object.id ? {
          ...itemData,
          id: object.id
        } : el));
      } else {
        console.log('Dokument nie istnieje');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania dokumentu', error);
    }
  }

  return (
    <div className='homePage'>
      <div className='upperMainPage'>
        <div className='data_container'>
          <h1>Welcome, <strong>Karol Jarosinski</strong></h1>
          <p>
            Data: { new Date().getDate() }/{ new Date().getMonth() + 1 }/{ new Date().getFullYear() }
          </p>
          <p><strong>BALANCE</strong></p>
          <p>{ contextData.balance !== undefined && contextData.balance[0].balance }</p>
        </div>
        <div className='home-picture'>
          <img src={ require('./images/homeImage.png') } alt="homePicture"/>
        </div>
      </div>
      <form onSubmit={ (event) => handleSubmit(event) }>
        <div className='inputs_group'>
          <select onChange={ (e) => {
            setTransactionType(e.target.value)
          } }>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <div className='inputs'>
            <input value={ title } type="text" placeholder='Title' onChange={ e => setTitle(e.target.value) }/>
            <input value={ amount } type="number" placeholder='Cost' onChange={ e => setAmount(+e.target.value) }/>
            { (title !== '' && amount !== '') && <SuccessButton type='submit' text='ADD'/> }
          </div>
        </div>
      </form>
      <div className='lowerMainPage'>
        { !editElement &&
          <div className='list_of_movements'>
            <h1>LIST OF MOVEMENTS</h1>
            <ul>
              { contextData.operations.map((operation) => (
                <li key={ operation.id } style={ { borderColor: operation.type === 'expense' ? 'red' : 'blue' } }>
                  <p className='operation_title'>{ operation.title }</p>
                  <p className='operation_date'>
                    { operation.date }
                  </p>
                  <p className='operation_price'>{ operation.price }</p>
                  <div className='edit_icons'>
                    <FcEmptyTrash className='trash_icon' id={ operation.id }
                                  onClick={ event => handleRemoveElement(event.currentTarget.id) }/>
                    <FcRefresh className='edit_icon' id={ operation.id }
                               onClick={ event => handleEditElement(event.currentTarget.id) }/>
                  </div>
                </li>
              )) }
            </ul>
            { !contextData.operations.length && <div className='spinner'><CircularIndeterminate/></div> }
          </div>
        }
        { editElement && <div className='edit_form'>
          <h1>{ contextData.operations.find(el => el.id === objectToEdit).title }</h1>
          <form>
            <input value={ newTitle } type="text"
                   onChange={ event => setNewTitle(event.target.value) }/>
            <input value={ newAmount } type="number"
                   onChange={ event => setNewAmount(+event.target.value) }/>
            <div className="edit_buttons">
              <SuccessButton text='SAVE' handleClick={ handleUpdateOperation }/>
              <SuccessButton text='CANCEL' handleClick={ handleCancelEdit }/>
            </div>
          </form>
        </div> }
        <div className='board_picture'>
          <img src={ require('./images/board_picture.png') } alt="boardPicture"/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;