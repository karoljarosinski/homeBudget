import MainPage from "../../mainPage/js/mainPage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <MainPage/>
      </Router>
    </div>
  );
}

export default App;
