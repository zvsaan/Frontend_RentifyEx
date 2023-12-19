import React from 'react'
import { Routes, Route , Navigate} from 'react-router-dom'

import Home from './../pages/Home';
import Tours from './../pages/Tours';
import TourDetail from './../pages/TourDetail';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import AddProduct from '../components/product/AddProduct';
import User from '../components/Admin/User';
import Product from '../components/Admin/Product';
import Profil from '../components/product/Profile';
import ProductVendor from '../components/Vendor/ProductVendor';
import Payment from '../components/Admin/Payment';

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/product' element={<Tours/>} />
        <Route path='/product/:id' element={<TourDetail/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/product/search' element={<SearchResultList/>} />
        <Route path='/thank-you' element={<ThankYou/>} />

        <Route path='/admin/user' element={<User/>} />
        <Route path='/admin/product' element={<Product/>} />
        <Route path='/admin/payment' element={<Payment/>} />

        <Route path='/tokosaya' element={<ProductVendor/>} />
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/profile' element={<Profil/>} />
    </Routes>
  )
}

export default Routers