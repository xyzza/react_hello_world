import React, {Component} from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    ModalHeader, ModalBody, Label, Button, Modal, Row, Col
} from "reactstrap";
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

//TODO: move to shared file to avoid copy-paste on ContactComponent.js
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModalCommentForm = this.toggleModalCommentForm.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    toggleModalCommentForm() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    handleCommentSubmit(values) {
        this.toggleModalCommentForm();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    };

    render() {
        const DEFAULT_RATING_MAX_VALUE = 5;
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModalCommentForm}>
                    <span className="fa fa-edit fa-lg">Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModalCommentForm}>
                    <ModalHeader toggle={this.toggleModalCommentForm}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor=".rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select
                                        model=".rating"
                                        name="rating"
                                        id="rating"
                                        defaultValue={DEFAULT_RATING_MAX_VALUE}
                                        className="form-control"
                                    >
                                        { Array(DEFAULT_RATING_MAX_VALUE).fill().map((_, value) => <option key={value+1} value={value+1}>{value+1}</option>) }
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor=".author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".author"
                                        name="author"
                                        id="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Author is required',
                                            minLength: 'Author name must be more than 2 symbols',
                                            maxLength: 'Author name must be less than 15 symbols'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor=".comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea
                                        model=".comment"
                                        name="comment"
                                        id="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{required}}
                                    />
                                    <Errors
                                        model=".comment"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: 'comment is required'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2 }}>
                                    <Button type="submit" className="btn btn-primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }

}


function RenderDish({dish}) {
    return(
        <div className="col-sm-12 col-sm-12 col-md-5 col-lg-5 m-1">
            <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle style={{fontWeight: "bold"}}>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
    );
}


function RenderComments({comments, addComment, dishId}) {

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat(
                'en-US',
                { year: 'numeric', month: 'short', day: '2-digit'}
            ).format(new Date(Date.parse(dateString))
        )
    };

    const commentsList = comments.map((comment) => {
        return (
            <li key={comment.id}>
                <div>{comment.comment}</div>
                <div>-- {comment.author}, {formatDate(comment.date)}</div>
            </li>
        )
    });

    return (
        <div className="col-sm-12 col-sm-12 col-md-5 col-lg-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {commentsList}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
    )
}


export default function DishDetail({dish, comments, addComment}) {
    const dishDetail = (dish!= null) ? (<RenderDish dish={dish}/>): null;
    const dishDetailComments = (dish!= null && comments != null) ? (<RenderComments comments={comments} addComment={addComment} dishId={dish.id}/>): null;
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to={'/menu'}>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
            {dishDetail}
            {dishDetailComments}
            </div>
        </div>
    )
}