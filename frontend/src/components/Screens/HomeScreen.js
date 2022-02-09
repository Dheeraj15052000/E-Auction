import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import Loader from "../Loader";
import Message from '../Message';
import axios from 'axios';
const HomeScreen = () => {
  const [items,setItems]=useState([]);
  const listItems=async()=>{
    const { data } = await axios.get("/api/items");
    setItems(data);
  }
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    listItems();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        
        <Message variant="danger" children={error}/>
      ) : (
        <Row>
          {items.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
