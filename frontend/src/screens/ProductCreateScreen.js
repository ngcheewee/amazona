import React, { useContext, useEffect, useReducer, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../Utils';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};

const ProductCreateScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setNumReviews] = useState('');
  const [{ loadingCreate, error }, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/products',
        {
          name,
          slug,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
          rating,
          numReviews
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('product created successfully');
      dispatch({ type: 'CREATE_SUCCESS' });
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
  };

  return (
    <div>
      <Container className="small-container">
        <Helmet>
          <title>Create product</title>
        </Helmet>
        <h1>Create Product</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setSlug(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Form.Group>          
          <Form.Group className="mb-3" controId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controId="countinstock">
            <Form.Label>Count in stock</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setCountInStock(e.target.value);
              }}
            />
            <Form.Text>* available stock</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controId="numreviews">
            <Form.Label>Num of reviews</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setNumReviews(e.target.value);
              }}
            />
            <Form.Text defaultValue={0} />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductCreateScreen;
