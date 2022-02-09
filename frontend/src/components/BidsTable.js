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




const BidsTable = ({id }) => {
    const [bids,setBids]=useState([]);
  
  
  const getBids=async()=>{
    const {data}=await axios.get(`/api/bids/${id}`);
    console.log(data);
    setBids(data);
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
    
    
    getBids();
   
  }, []);

  
  return (
    <>
    <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>user</th>
            <th>email</th>
            <th>bid</th>
             <th>bidded at</th>
          </tr>
          </thead>
          {
            !bids?"":
            <tbody>
              {bids.map((bid,index)=>(
                  <tr>
                  <td>sno</td>
                  <td > {index===0? "HIGHEST - "+bid.user.name:bid.user.name}</td>
                  <td>{bid.user.email}</td>
                  <td>{bid.bidPrice}</td>
                  <td>{bid.updatedAt}</td>
                </tr>
          ))}
            </tbody>
            
            
            
          
          }
          
  
          </Table>
    </>
        );
};

export default BidsTable;
