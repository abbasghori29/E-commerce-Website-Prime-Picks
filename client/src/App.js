import './App.css';
import { Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/protectedRoutes/private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminPrivateRoute from './components/protectedRoutes/AdminRoutes';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import UserProfile from './pages/user/UserProfile';
import UserOrders from './pages/user/UserOrders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Cart from './pages/Cart';
import AdminOrders from './pages/Admin/AdminOrders';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/product/:slug' element={<ProductDetail />}></Route>
        <Route path='/categories' element={<Categories />}></Route>
        <Route path='/category/:slug' element={<CategoryProduct />}></Route>
        <Route path='/cart' element={<Cart />}></Route>

        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />}></Route>
          <Route path='user/profile' element={<UserProfile />}></Route>
          <Route path='user/orders' element={<UserOrders />}></Route>
        </Route>

        <Route path='/dashboard' element={<AdminPrivateRoute />}>
          <Route path='admin' element={<AdminDashboard />}></Route>
          <Route path='admin/create-category' element={<CreateCategory />}></Route>
          <Route path='admin/create-product' element={<CreateProduct />}></Route>
          <Route path='admin/product/:slug' element={<UpdateProduct />}></Route>
          <Route path='admin/products' element={<Products />}></Route>
          <Route path='admin/users' element={<Users />}></Route>
          <Route path='admin/orders' element={<AdminOrders />}></Route>
        </Route>

        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/policy' element={<Policy />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>

      </Routes>

    </>
  );
}

export default App;
