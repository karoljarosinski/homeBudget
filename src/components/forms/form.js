import React from 'react';
import ColorButtons from "../button/button";

const Form = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Save button clicked')
  }

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <input type="text" placeholder='firstInput'/>
      <input type="text" placeholder='secondInput'/>
      <input type="text" placeholder='thirdInput'/>
      <input type="text" placeholder='fourthInput'/>
      <input type="text" placeholder='fifth input'/>
      <ColorButtons type='submit' text='SAVE'/>
    </form>
  );
};

export default Form;