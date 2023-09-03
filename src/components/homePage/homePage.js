import React from 'react';
import ColorButtons from "../button/button";
import { db } from "../../firebase.js";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../loadingSpinner/spinner";

const HomePage = () => {
  const [opeartions, setOperations] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit')
  }
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

  console.log(opeartions);

  // if (!opeartions.length) {
  //   return (
  //     <p>loading...</p>
  //   )
  // }

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
          <select>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <div className='inputs'>
            <input type="text" placeholder='Description'/>
            <input type="number" placeholder='00.00'/>
            <ColorButtons type='submit' text='ADD'/>
          </div>
        </div>
      </form>
      <div className='lowerMainPage'>
        <div className='list_of_movements'>
          <h1>LIST OF MOVEMENTS</h1>
          <ul>
            {/*{ ['Salary', 'Netflix', 'Spotify'].map((item) => (*/}
            {/*  <li key={ item }>*/}
            {/*    <div>{ item }</div>*/}
            {/*    <div*/}
            {/*      className='movement_date'>{ new Date().getDay() }-{ new Date().getMonth() }-{ new Date().getFullYear() }</div>*/}
            {/*    <div>2000$</div>*/}
            {/*  </li>*/}
            {/*)) }*/}
            {opeartions.map((operation) => (
              <li key={operation.id}>
                <div>{operation.title}</div>
                <div className='movement_date'>
                  {operation.date}
                </div>
                <div>{operation.price}</div>
              </li>
            ))}
            {!opeartions.length && <div className='spinner'><CircularIndeterminate /></div>}
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