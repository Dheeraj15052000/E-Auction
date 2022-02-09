import React,{useEffect,useState} from 'react';
import Loader from '../Loader';
import {register} from '../../actions/userActions';
import FormContainer from '../FormContainer';
import {Link} from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../Message';;

const RegisterScreen = ({location,history}) => {
    const [name,setName]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [message,setMessage]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    
    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister
  
    const redirect = location.search ? location.search.split('=')[1] : '/'
  
    useEffect(() => {
      if (userInfo) {
        history.push(redirect)
      }
    }, [history, userInfo, redirect])
  
    const submitHandler = (e) => {
      e.preventDefault()
      if(password!==confirmPassword){
          setMessage('Passwords do not match')
      }
      else if(password.length<8){
          setMessage('Password length should be greater than 8 characters')
      }
      else{
        dispatch(register(name,email,password))
      }
      
    }
    return (
        <FormContainer>
      <h2>Sign Up</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
          <Form.Label>Enter Full Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter full name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <p color={"grey"} style={{fontWeight:"revert",fontSize:"0.8rem"}}>password should be greater than 8 characters</p>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already a Customer?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
    )
}

export default RegisterScreen
