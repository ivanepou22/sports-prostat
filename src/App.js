import Header from './Components/Header';
import Dashboard from './Pages/Dashboard';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { useStateValue } from './Context/StateProvider';
import { auth } from './firebase';
import { useEffect } from 'react';
import SportTypes from './Pages/SportTypes';
import CreateSportType from './Pages/CreateSportType';
import Positions from './Pages/Positions';
import InjuryTypes from './Pages/InjuryTypes';
import Players from './Pages/Players';

function App() {
  const [{user}, dispatch] = useStateValue();
  console.log(user);
  //piece of code which runs based on a given condition
  //useEfect hook
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

    return () => {
      unsubscribe();
    };

  }, [dispatch])

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Dashboard />
          </Route>
          <Route exact path="/sporttype">
            <Header />
            <SportTypes />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/createsporttype">
            <Header />
            <CreateSportType />
          </Route>
          <Route exact path="/positions">
            <Header />
            <Positions />
          </Route>
          <Route exact path="/injurytypes">
            <Header />
            <InjuryTypes />
          </Route>
          <Route exact path="/players">
            <Header />
            <Players />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
