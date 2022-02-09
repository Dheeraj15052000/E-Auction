import React,{useEffect,useState} from 'react';
import Loader from '../Loader';
import {resetPassword} from '../../actions/userActions';
import FormContainer from '../FormContainer';
import {Link} from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../Message';;


const ResetPasswordScreen = ({location,history,match}) => {
    const [confirmPassword,setConfirmPassword]=useState('');
    const [password,setPassword]=useState('')
    const [message1,setMessage]=useState('');
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userResetPassword = useSelector((state) => state.userResetPassword)
    const { loading, error,message} = userResetPassword
  
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const resetToken=match.params.token
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
        dispatch(resetPassword(password,resetToken))
      }
      
    }
    return (
        <FormContainer>
        <h2>Sign Up</h2>
        {message && <Message variant='success'>{message}</Message>}
        {message1 && <Message variant='danger'>{message1}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            
            
         
  
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <p color={"grey"} style={{fontWeight:"revert",fontSize:"0.8rem"}}>password should be greater than 8 characters</p>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Button type='submit' variant='primary'>
            Change Password
          </Button>
        </Form>
  
        <Row className='py-3'>
          <Col>
            Go to login{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    )
}

export default ResetPasswordScreen
