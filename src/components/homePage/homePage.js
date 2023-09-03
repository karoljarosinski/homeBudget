import React from 'react';
import ColorButtons from "../button/button";
import { db } from "../../firebase.js";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../loadingSpinner/spinner";

const HomePage = () => {
  const [operations, setOperations] = useState([]);
  const [transactionType, setTransactionType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const collectionRef = db.collection('operations');
    collectionRef.get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() })
        })
        setOperations(data);
      })
      .catch(error => {
        console.error('Blad pobierania danych: ', error);
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOperation = {
      date: new Date().toLocaleDateString(),
      price: amount,
      title,
      type: transactionType
    }
    const collectionRef = db.collection('operations');
    collectionRef.add(newOperation)
      // .then((docRef) => {
      //   console.log('Dodano obiekt z ID: ', docRef.id);
      // })
      .catch((error) => {
        console.error('Blad dodawania obiektu: ', error)
      })
    setOperations(prevState => [...prevState, newOperation])
    setTitle('');
    setAmount(0);
  }

  return (
    <div className='homePage'>
      <div className='upperMainPage'>
        <div>
          <h1>Welcome, <strong>Karol Jarosinski</strong></h1>
          <p>
            Data: { new Date().getDate() }/{ new Date().getMonth() + 1 }/{ new Date().getFullYear() }
          </p>
          <div>
            <p><strong>BALANCE</strong></p>
            <p>{ 150000 }</p>
          </div>
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
            <input type="text" placeholder='Title' onChange={ e => setTitle(e.target.value) }/>
            <input type="number" placeholder='00.00' onChange={ e => setAmount(+e.target.value) }/>
            <ColorButtons type='submit' text='ADD'/>
          </div>
        </div>
      </form>
      <div className='lowerMainPage'>
        <div className='list_of_movements'>
          <h1>LIST OF MOVEMENTS</h1>
          <ul>
            { operations.map((operation) => (
              <li key={ operation.title } style={ { borderColor: operation.type === 'expense' ? 'red' : 'blue' } }>
                <div>{ operation.title }</div>
                <div className='movement_date'>
                  { operation.date }
                </div>
                <div>{ operation.price }</div>
              </li>
            )) }
            { !operations.length && <div className='spinner'><CircularIndeterminate/></div> }
          </ul>
        </div>
        <div className='board_picture'>
          <img src={ require('./images/board_picture.png') } alt="board picture"/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;