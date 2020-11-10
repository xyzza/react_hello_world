import React, { Component } from 'react';
import HomeComponent from './HomeComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from "../shared/dishes";
import { Switch, Route, Redirect} from 'react-router-dom';


class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            // selectedDish: null
        };
    }

    // onDishSelect(dishId) {
    //     this.setState({selectedDish: dishId});
    // }

    render() {
        const HomePage = () => {
            return (
                <HomeComponent/>
            );
        };
        return (
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
                    <Redirect to="/home"/>
                </Switch>
                {/*<Menu*/}
                    {/*dishes={this.state.dishes}*/}
                    {/*onClick={(dishId) => this.onDishSelect(dishId)}*/}
                {/*/>*/}
                {/*<DishDetail*/}
                    {/*dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}*/}
                {/*/>*/}
                <FooterComponent/>
            </div>
        )
    }
}

export default MainComponent;