import React,{useState} from "react";
import { Card } from "react-bootstrap";
import Rating from '../components/Rating';
import {Link} from 'react-router-dom';
import Loader from "./Loader";

const Product = ({ product }) => {
  

  return (
  
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.imageUrl} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        
       <Card.Text as='h6'>
           Initial Price :{product.price}
           </Card.Text> 
           <Card.Text as='h6'>
           Status :{product.isCompleted?"Ended":"Open"}
           </Card.Text> 
      </Card.Body>
    </Card>
  );
};

export default Product;
