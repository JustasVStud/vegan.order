import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import './App.scss';
import Home from './components/Home';
import HeaderNav from './components/HeaderNav';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Menu from './components/menu/Menu';
import MenuList from './components/menu/MenuList';
import MenuCreate from './components/menu/MenuCreate';
import MenuEdit from './components/menu/MenuEdit';
import MealCreate from './components/meal/MealCreate';
import MealEdit from './components/meal/MealEdit';

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
        <Route path='/menus/:id' element={<Menu/>}/>
        <Route path='/menus/create' element={<MenuCreate/>}/>
        <Route path='/menus/:id/edit' element={<MenuEdit/>}/>
        <Route path='/menus/:menuId/meals/create' element={<MealCreate/>}/>
        <Route path='/menus/:menuId/meals/:id' element={<MealEdit/>}/>
      </Routes>
    </div>
  </AuthProvider>
  );
}

export default App;


//<Route/>