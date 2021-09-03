import { createContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Login from './component/Login';
import Home from './component/Home'
import Error from './component/Error'
import PrivateRoute from './component/PrivateRoute';

export const UserContext = createContext();
export const authContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    success: false,
    error: false,
  });
  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
      <authContext.Provider value={[user, setUser]}>
        <Header />
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
        </Switch>
        <Switch>
          <Route exact path="/login" >
            <Login />
          </Route>
        </Switch>
        <Switch>
          <Route path="/" >
            <Error />
          </Route>
        </Switch>
      </authContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
