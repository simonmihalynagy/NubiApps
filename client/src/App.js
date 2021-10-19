import React from "react";
//import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App(props) {
  //*state to manage currently logged in user*/
  //const [currentUser, setCurrentUser] = useState(props.user);

  // <Router>
  //   <Route exact path="/" component={Home} />
  //   <Route exact path="/signup" component={Signup} />
  //   <Route exact path="/login" render={()=><Login ></Login>} />
  // </Router>

  return (
    <React.Fragment>
      <Navbar />
      <Home currentUser={props.user} />;
    </React.Fragment>
  );
}

export default App;
