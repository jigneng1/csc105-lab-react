import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button } from 'reactstrap';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentForm extends Component {
    
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handdleInputChange = this.handleInputChange.bind(this);
        this.state = {
            isModalOpen: false,
            name : ''
        };
    }
    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        this.setState(
            {[name] : name}
        )
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    render(){
        return(
            <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        
                    <Form>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="number" id="rating" name="raing"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup className='p-0'>
                            <Label  htmlFor="message" >Comment</Label>
                            <Input type="textarea" id="message" name="message"
                                 rows="6"></Input>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">submmit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <div className='mt-2'>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submmit Comment</Button>
                </div>
            </div>
        );
    }
}

class DishDetail extends Component {
    renderDish() {
        const dish = this.props.dishes[this.props.selectedDish];
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
    }

    renderComments() {
        const dish = this.props.dishes[this.props.selectedDish];
        const comments = this.props.comments.filter( comment => comment.dishId === dish.id );
        if(dish != null)
            return (
                <div>
                <Card>
                    <CardTitle>
                        <h4>Comments</h4>
                    </CardTitle>
                    <CardBody className="ps-0 m-0">
                        <ul className="list-group list-group-flush list-unstyled">
                            {comments.map((comment) => {
                                return (
                                    <li key={comment.id} className="list-group-item list-untiled ps-0 m-0">
                                        {comment.comment}
                                        <br />
                                        {"--" + comment.author + ", "}
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </li>
                                );
                                }
                            )}
                        </ul>
                    </CardBody>
                </Card>
                <CommentForm />
                </div>
            );
    }

    render() {
        const dish = this.props.dishes[this.props.selectedDish];
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish()}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;