import React, { createContext, useEffect, useState } from 'react';
import { db } from "../../firebase";

export const MyContext = createContext(null);

const MyContextProvider = ({ children }) => {

  const [operations, setOperations] = useState([]);
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
  },[]);

  return (
    <MyContext.Provider value={ { operations, setOperations } } >
      { children }
    </MyContext.Provider>
  );
};

export default MyContextProvider;