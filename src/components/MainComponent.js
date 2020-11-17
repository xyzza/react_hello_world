import React from 'react';
import HomeComponent from './HomeComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import AboutComponent from './AboutComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment} from "../redux/ActionCreators";


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,
    }
};


const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});


function MainComponent(props) {

    const HomePage = () => {
        return (
            <HomeComponent
                dish={props.dishes.filter((dish) => dish.featured)[0]}
                promotion={props.promotions.filter((promo) => promo.featured)[0]}
                leader={props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    };

    const DishWithId = ({match}) => {
        const dishId = parseInt(match.params.dishId, 10);
        return(
            <DishDetail
                dish={props.dishes.filter((dish) => dish.id === dishId)[0]}
                comments={props.comments.filter((comment) => comment.dishId === dishId)}
                addComment={props.addComment}
            />
        );
    };

    return (
        <div>
            <HeaderComponent/>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={() => <Menu dishes={props.dishes}/>}/>
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path="/aboutus" component={() => <AboutComponent leaders={props.leaders}/>}/>
                <Route exact path="/contactus" component={Contact}/>
                <Redirect to="/home"/>
            </Switch>
            <FooterComponent/>
        </div>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));