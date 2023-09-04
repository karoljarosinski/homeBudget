import MainPage from "../../mainPage/js/mainPage";
import { BrowserRouter as Router } from "react-router-dom";
import MyContextProvider from "../../providers/provider";

function App() {
  return (
    <MyContextProvider>
      <div className="App">
        {/*<Router>*/ }
        {/*  <MainPage/>*/ }
        {/*</Router>*/ }
        <Router>
          <MainPage/>
        </Router>
      </div>
    </MyContextProvider>
  );
}

export default App;
