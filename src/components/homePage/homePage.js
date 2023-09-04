import React, { useContext } from 'react';
import ColorButtons from "../button/button";
import { db } from "../../firebase.js";
import { useState } from "react";
import CircularIndeterminate from "../loadingSpinner/spinner";
import { MyContext } from "../providers/provider";
import { FcEmptyTrash, FcRefresh } from "react-icons/fc";

const HomePage = () => {
  const [transactionType, setTransactionType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [editElement, setEditElement] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState(0);

  const [objectToEdit, setObjectToEdit] = useState();
  const contextData = useContext(MyContext);

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
      setAmount(0);
    } catch (error) {
      console.error('Blad dodawania obiektu: ', error)
    }
  }

  const handleRemoveElement = async (id) => {
    try {
      const collectionRef = db.collection('operations');
      await collectionRef.doc(id).delete();
      contextData.setOperations(prevState => prevState.filter(el => el.id !== id));
    } catch (error) {
      console.error('Błąd podczas usuwania obiektu: ', error);
    }
  }

  const handleEditElement = (id) => {
    console.log('Edytujesz element o id', id);
    setEditElement(prevState => !prevState);
    setObjectToEdit(id);
    setNewAmount(contextData.operations.find(el => el.id === id).price);
    setNewTitle(contextData.operations.find(el => el.id === id).title)
  }

  const handleCancelEdit = () => {
    setNewTitle('');
    setNewAmount('');
    setEditElement(false);
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
          <p>{ 5000 }</p>
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
            <input value={ amount } type="number" placeholder='Amount' onChange={ e => setAmount(+e.target.value) }/>
            { (title !== '' && amount !== 0) && <ColorButtons type='submit' text='ADD'/> }
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
                  <p>{ operation.title }</p>
                  <p className='movement_date'>
                    { operation.date }
                  </p>
                  <p>{ operation.price }</p>
                  <FcEmptyTrash id={ operation.id } onClick={ event => handleRemoveElement(event.currentTarget.id) }/>
                  <FcRefresh id={ operation.id } onClick={ event => handleEditElement(event.currentTarget.id) }/>
                </li>
              )) }
              { !contextData.operations.length && <div className='spinner'><CircularIndeterminate/></div> }
            </ul>
          </div>
        }
        { editElement && <div className='edit_form'>
          <h1>{ contextData.operations.filter(el => el.id === objectToEdit)[0].title }</h1>
          <form>
            <input value={ newTitle } type="text"
                   onChange={ event => setNewTitle(event.target.value) }/>
            <input value={ newAmount } type="number"
                   onChange={ event => setNewAmount(+event.target.value)}/>
          </form>
          <div className="edit_buttons">
            <ColorButtons text='SAVE'/>
            <ColorButtons text='CANCEL' handleClick={ () => handleCancelEdit() }/>
          </div>
        </div> }
      </div>
    </div>
  );
};

export default HomePage;