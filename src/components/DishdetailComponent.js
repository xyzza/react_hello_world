import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";


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


function RenderComments({comments}) {

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
        </div>
    )
}


export default function DishDetail({dish}) {
    const dishDetail = (dish!= null) ? (<RenderDish dish={dish}/>): (<div/>);
    const dishDetailComments = (dish!= null && dish.comments != null) ? (<RenderComments comments={dish.comments}/>): (<div/>);
    return (
        <div className="container">
            <div className="row">
            {dishDetail}
            {dishDetailComments}
            </div>
        </div>
    )
}