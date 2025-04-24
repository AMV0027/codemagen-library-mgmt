import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container className="text-center mt-5">
            <Row>
                <Col>
                    <h1 className="display-4 text-danger">Oops!</h1>
                    <p className="lead">Something went wrong. You will be redirected to the home page shortly.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>Go to Home</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Error;