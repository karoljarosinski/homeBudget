import React, { useContext } from 'react';
import ColorButtons from "../button/button";
import { db } from "../../firebase.js";
import { useState } from "react";
import CircularIndeterminate from "../loadingSpinner/spinner";
import { MyContext } from "../providers/provider";

const HomePage = () => {
  // const [operations, setOperations] = useState([]);
  const [transactionType, setTransactionType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);

  const contextData = useContext(MyContext);

  // useEffect(() => {
  //   const collectionRef = db.collection('operations');
  //   collectionRef.get()
  //     .then((querySnapshot) => {
  //       const data = [];
  //       querySnapshot.forEach((doc) => {
  //         data.push({ id: doc.id, ...doc.data() })
  //       })
  //       setOperations(data);
  //     })
  //     .catch(error => {
  //       console.error('Blad pobierania danych: ', error);
  //     })
  // }, [])

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
              </li>
            )) }
            { !contextData.operations.length && <div className='spinner'><CircularIndeterminate/></div> }
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