import React from 'react';
import ColorButtons from "../button/button";

const HomePage = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit')
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
            <p>{150000}</p>
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
            <input type="text" placeholder='Wydatek'/>
            <input type="number" placeholder='00.00'/>
            <ColorButtons/>
          </div>
        </div>
      </form>
      <div className='lowerMainPage'>
        <div className='list_of_movements'>
          <h1>LIST OF MOVEMENTS</h1>
          <ul>
            { ['Salary', 'Netflix', 'Spotify'].map((item) => (
              <li key={ item }>
                <div>{ item }</div>
                <div
                  className='movement_date'>{ new Date().getDay() }-{ new Date().getMonth() }-{ new Date().getFullYear() }</div>
                <div>2000$</div>
              </li>
            )) }
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