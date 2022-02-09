import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import { USER_UPDATE_PROFILE_RESET } from "../../reducers/userConstants";
import { listMyOrders } from "../../actions/orderActions";
import axios from 'axios';

const ProfileScreen = ({ history }) => {
  const [myBids,setBids]=useState([]);
  const[bidLoader,setBidLoader]=useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const getMyBids=async()=>{
    setBidLoader(true);
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log(config);
    const { data } = await axios.get("/api/bids/user",config);
    console.log(data);
    
    setBids(data);
    setBidLoader(false);
  }
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
        getMyBids();
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}

        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Enter Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Bids</h2>
        {bidLoader ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>item name</th>
                <th>bid price</th>
                <th>date</th>
                
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myBids.map((order) => (
                <tr key={order._id}>
                  <td>{order.item.name}</td>
                  <td>{order.bidPrice}</td>
                  <td>{order.createdAt}</td>
                  
                  
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
