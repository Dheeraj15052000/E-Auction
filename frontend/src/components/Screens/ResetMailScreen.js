import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetMail } from "../../actions/userActions";
import Message from "../Message";

const ResetMailScreen = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  

  const userResetEmail = useSelector((state) => state.userResetEmail);
  const { error, loading,message} = userResetEmail;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(resetMail(email));
    setEmail('');
    
    
  };
  return (
    <FormContainer>
      {message && <Message variant="primary">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          reset password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetMailScreen;
