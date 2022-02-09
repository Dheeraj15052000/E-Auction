import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import axios  from "axios";
import Rating from "../Rating";
import { listProductDetails } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";
import { getUserDetails } from "../../actions/userActions";
import BidsTable from "../BidsTable";

const ProductScreen = ({history, match }) => {
  const [highestBid,setHighest]=useState(0);
  const [itemId,setId]=useState(null);
  const [item,setItem]=useState([]);
  const [loader,setLoader]=useState(false);
  const getItem=async()=>{
    setLoader(true);
    const { data } = await axios.get(`/api/items/${match.params.id}`);
    console.log(data);
    setItem(data);
    setId(data._id);
    setLoader(false);
  }
 
  const addBid=async()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const bid={
      bidPrice:qty,
      item:item._id
    }
    console.log(bid)
    const {data}=await axios.post('/api/bids',bid,config);
  }
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0)
  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;
  useEffect(() => {
    console.log(userInfo)
    
    getItem();
   
  }, [dispatch,match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loader ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <>
        <Row>
          <Col md={6}>
            <Image src={item.imageUrl} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{item.name}</h2>
              </ListGroup.Item>
              
              <ListGroup.Item>Initial Price: {item.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {item.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
               
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <span
                        style={{
                          color: !item.isCompleted ? "green" : "red",
                        }}
                      >
                        {!item.isCompleted  ? "Open" : "Closed"}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!item.isCompleted && (
                  <ListGroup.Item>
                     <Row>
                        <Col>Bid Amount</Col>
                        <Col>
                          <Form.Control
                            as='input'
                            type='number'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            
                          >
                            
                          </Form.Control>
                        </Col>
                      </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={!userInfo || item.isCompleted}
                    onClick={()=>addBid()}
                  >
                    Bid
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <h3>Bids</h3>
           <BidsTable id={itemId}/>
        </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
