import React, {Component} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";


class DishDetail extends Component {

    renderComments(comments) {
        return comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <div>{comment.comment}</div>
                    <div>-- {comment.author}, {new Date(comment.date).toDateString()}</div>
                </li>
            )
        })
    }

    renderDish(dish) {
        if (dish != null) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-sm-12 col-md-5 col-lg-5 m-1">
                            <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle style={{fontWeight: "bold"}}>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                        </div>
                        <div className="col-sm-12 col-sm-12 col-md-5 col-lg-5 m-1">
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                {this.renderComments(dish.comments)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(<div/>);
        }
    }

    render() {
        return this.renderDish(this.props.dish)
    }
}

export default DishDetail;