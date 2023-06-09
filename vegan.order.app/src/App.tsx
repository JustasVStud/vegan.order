import { Routes, Route} from 'react-router-dom';
import './App.scss';
import HeaderNav from './components/HeaderNav';
import MenuList from './components/menu/MenuList';
import MenuCreate from './components/menu/MenuCreate';
import MenuEdit from './components/menu/MenuEdit';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { AuthProvider } from './components/auth/AuthContext';
import Home from './components/Home';

function App() {
  return (
  <AuthProvider>
    <div className="App">
      <HeaderNav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/menus' element={<MenuList/>}/>
        <Route path='/menu/create' element={<MenuCreate/>}/>
        <Route path='menu/edit/:id' element={<MenuEdit/>}/>
      </Routes>
    </div>
  </AuthProvider>
  );
}

export default App;


//<Route/>