import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AuthState from './context/auth/AuthState';
import UserState from './context/user/UserState';
import Profile from './pages/Profile';
import PrivateRoute from './utils/PrivateRoute';
import PostState from './context/post/PostState';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure({ position: toast.POSITION.BOTTOM_CENTER, limit: 3 })
function App() {
  return (
    <AuthState>
      <UserState>
        <PostState>
          <Router>
            <div className="App">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />  
                <Route exact path="/login" component={Login} />  
                <Route exact path="/register" component={Register} />  
                <PrivateRoute exact path="/profile" component={Profile} />  
              </Switch>
            </div>
          </Router>
        </PostState>
      </UserState>
    </AuthState>
  );
}

export default App;
