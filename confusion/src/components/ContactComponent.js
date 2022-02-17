import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


function Contact(props) {

    const [state, setState] = useState({ firstname: "", lastname: "", email: "", telnum: "", agree: false, contactType: "Tel.", message: "" });
    const [touched, setTouched] = useState({
        firstname: false,
        lastname: false,
        telnum: false,
        email: false
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({ ...state, [name]: value });
    }

    const handleSubmit = (event) => {
        console.log('Current State is: ' + JSON.stringify(state));
        alert('Current State is: ' + JSON.stringify(state));
        event.preventDefault();
    }

    const validate = (firstname, lastname, telnum, email) => {
        const error = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        }
    
        if (touched.firstname && firstname.length < 3)
            error.firstname = 'First Name should be >= 3 characters!';
        else if (touched.firstname && firstname.length > 10)
            error.firstname = 'First Name should be <= 10 characters!';
    
        if (touched.lastname && lastname.length < 3)
            error.lastname = 'Last Name should be >= 3 characters!';
        else if (touched.lastname && lastname.length > 10)
            error.lastname = 'Last Name should be <= 10 characters!';
    
        const reg = /^\d+$/;
        if (touched.telnum && !reg.test(telnum))
            error.telnum = 'Tel. Number should contain only numbers!';
    
        if (touched.email && email.split('').filter(x => x === '@').length !== 1)
            error.email = 'Email should contain a @!';

        return error;
    }

    const errors = validate(state.firstname, state.lastname, state.telnum, state.email);

    const handleBlur = (field) => (evt) => {
        setTouched({ ...touched, [field]: true });
    }

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
            </div>   
            <div className='row row-content'>
                <div className='col-12 col-md-9'>
                    <h3><strong>Send us your Feedback</strong></h3>
                </div>
                <div className='col-12 col-md-9 m-1'>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row className='space'>
                            <Label htmlFor='firstname' md={2}>First Name</Label>
                            <Col md={10}>
                                <Input type='text' id='firstname' name='firstname'
                                    placeholder='First Name'
                                    value={state.firstname}
                                    valid={errors.firstname === ''}
                                    invalid={errors.firstname !== ''}
                                    onBlur={handleBlur('firstname')}
                                    onChange={handleInputChange} />
                                <FormFeedback className='red'>{errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='space'>
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Input type="text" id="lastname" name="lastname"
                                    placeholder="Last Name"
                                    value={state.lastname}
                                    valid={errors.lastname === ''}
                                    invalid={errors.lastname !== ''}
                                    onBlur={handleBlur('lastname')}
                                    onChange={handleInputChange} />
                                <FormFeedback className='red'>{errors.lastname}</FormFeedback>
                            </Col>                        
                        </FormGroup>
                        <FormGroup row className='space'>
                            <Label htmlFor='telnum' md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Input type='tel' id='telnum' name='telnum'
                                    placeholder='Tel. number'
                                    value={state.telnum}
                                    valid={errors.telnum === ''}
                                    invalid={errors.telnum !== ''}
                                    onBlur={handleBlur('telnum')}
                                    onChange={handleInputChange} />
                                <FormFeedback className='red'>{errors.telnum}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='space'>
                            <Label htmlFor='email' md={2}>Email</Label>
                            <Col md={10}>
                                <Input type='email' id='email' name='email'
                                    placeholder='Email'
                                    value={state.email}
                                    valid={errors.email === ''}
                                    invalid={errors.email !== ''}
                                    onBlur={handleBlur('email')}
                                    onChange={handleInputChange} />
                                <FormFeedback className='red'>{errors.email}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='space-center space'>
                            <Col md={{size: 6, offset: 2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox"
                                            name="agree"
                                            checked={state.agree}
                                            onChange={handleInputChange} /> {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{size: 3, offset: 1}}>
                                <Input type="select" name="contactType"
                                    value={state.contactType}
                                    onChange={handleInputChange}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='space'>
                            <Label htmlFor="message" md={2}>Your Feedback</Label>
                            <Col md={10}>
                                <Input type="textarea" id="message" name="message"
                                    rows="12"
                                    value={state.message}
                                    onChange={handleInputChange}></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='space'>
                            <Label md={2}></Label>
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Send Feedback
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1 ">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;