import React, { Component } from 'react';
import HomeComponent from './HomeComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import AboutComponent from './AboutComponent'
import {DISHES} from "../shared/dishes";
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import { Switch, Route, Redirect} from 'react-router-dom';


class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS,
        };
    }

    render() {
        const HomePage = () => {
            return (
                <HomeComponent
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        };

        const DishWithId = ({match}) => {
            const dishId = parseInt(match.params.dishId, 10);
            return(
                <DishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === dishId)[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === dishId)}
                />
            );
        };

        return (
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/aboutus" component={() => <AboutComponent leaders={this.state.leaders}/>}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Redirect to="/home"/>
                </Switch>
                <FooterComponent/>
            </div>
        )
    }
}

export default MainComponent;