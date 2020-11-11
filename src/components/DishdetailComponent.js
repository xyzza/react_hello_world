import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from 'react-router-dom';


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


export default function DishDetail({dish, comments}) {
    const dishDetail = (dish!= null) ? (<RenderDish dish={dish}/>): null;
    const dishDetailComments = (dish!= null && comments != null) ? (<RenderComments comments={comments}/>): null;
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