import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/Screens/HomeScreen";
import CartScreen from './components/Screens/CartScreen';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./components/Screens/ProductScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreen";
import ProfileScreen from "./components/Screens/ProfileScreen";
import ShippingScreen from "./components/Screens/ShippingScreen";
import ResetMailScreen from "./components/Screens/ResetMailScreen";
import ResetPasswordScreen from "./components/Screens/ResetPasswordScreen";
import PaymentScreen from "./components/Screens/PaymentScreen";
import PlaceOrderScreen from "./components/Screens/PlaceOrderScreen";
import OrderScreen from "./components/Screens/OrderScreen";
import UserListScreen from "./components/Screens/UserListScreen";
import UserEditScreen from "./components/Screens/UserEditScreen";
import ProductListScreen from "./components/Screens/ProductListScreen";
import ProductEditScreen from "./components/Screens/ProductEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/cart/:id?'component={CartScreen}/>
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/shipping' component={ShippingScreen}/>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/resetmail' component={ResetMailScreen}/>
          <Route path='/resetpassword/:token' component={ResetPasswordScreen}/>
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
