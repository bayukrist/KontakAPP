import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateContact from './CreateContact';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import { ReactSession } from 'react-client-session';

function App() {
  ReactSession.setStoreType("sessionStorage");

  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/create' element={<CreateContact/>}/>
        <Route path='/edit/:id' element={<CreateContact/>}/>
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
