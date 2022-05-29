import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button } from 'reactstrap';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label,FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments({comments,addComment,dishId}) {
    if(comments != null)
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
            <CommentForm  dishId={dishId} addComment={addComment}/>
            </div>
        );
}

function RenderDish(props) {
    if (props.dishes != null){
        return (
            <Card>
                <CardImg top src={props.dishes.image} alt={props.dishes.name} />
                <CardBody>
                  <CardTitle>{props.dishes.name}</CardTitle>
                  <CardText>{props.dishes.description}</CardText>
                </CardBody>
            </Card>
        );
    }

}
class CommentForm extends Component {
    
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            isModalOpen: false,
            username : "",
            touched:{
                username:false
            }
        };
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    handleInput(event){
        this.setState({username:event.target.value})
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    validate(username){
        const error = {
             username:'',
        };
        if(this.state.touched.username &&username.length <2)
            error.username = "Must be greater than 2 characters";
        else if (this.state.touched.username && username.length >15)
            error.username = "Must be 15 characters or less";
        return error;
    }
    handleSubmit(event){
        event.preventDefault();
        // alert(`${this.rating.value} ${this.state.username} ${this.comment.value}`);
        this.props.addComment(this.props.dishId,this.rating.value,this.state.username,this.comment.value);
        console.log(this.props.dishId,this.rating.value,this.state.username,this.comment.value);
    }
    render(){
        const errors = this.validate(this.state.username);
        return(
            <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        
                    <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="number" id="rating" name="raing"
                                innerRef={(input) => this.rating = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" id="name" name="name"
                                value={this.state.username}
                                valid={errors.username === ''}
                                invalid={errors.username !== ''}
                                onBlur={this.handleBlur('username')}
                                onChange={this.handleInput}
                                  />
                                  <FormFeedback>{errors.username}</FormFeedback>
                            </FormGroup>
                            <FormGroup className='p-0'>
                            <Label  htmlFor="message" >Comment</Label>
                            <Input type="textarea" id="message" name="message"
                                 rows="6" innerRef={(input) => this.comment = input} ></Input>
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

const DishDetail = (props) => {
    if(props.dishes !=null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dishes.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dishes.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dishes={props.dishes}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dishes.id}/>
                    </div>
                </div>
            </div>
        );
    }
export default DishDetail;