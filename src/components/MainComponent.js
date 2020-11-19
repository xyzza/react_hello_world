import React, {useEffect} from 'react';
import HomeComponent from './HomeComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import AboutComponent from './AboutComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment, fetchDishes} from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,
    }
};

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())}
});

function MainComponent({dishes, comments, leaders, promotions, addComment, fetchDishes}) {
    //instead of componentDidMount class method I use Hook 'useEffect'
    useEffect(() => {
        fetchDishes();
    }, [fetchDishes]); //it is crucial to pass a dependency as a second arg,
    // to use effect only once, because fetchDishes doesn't change,
    // but it is a hack

    const HomePage = () => {
        return (
            <HomeComponent
                dish={dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={dishes.isLoading}
                dishesErrMess={dishes.errMess}
                promotion={promotions.filter((promo) => promo.featured)[0]}
                leader={leaders.filter((leader) => leader.featured)[0]}
            />
        );
    };

    const DishWithId = ({match}) => {
        const dishId = parseInt(match.params.dishId, 10);
        return(
            <DishDetail
                dish={dishes.dishes.filter((dish) => dish.id === dishId)[0]}
                isLoading={dishes.isLoading}
                errMess={dishes.errMess}
                comments={comments.filter((comment) => comment.dishId === dishId)}
                addComment={addComment}
            />
        );
    };

    return (
        <div>
            <HeaderComponent/>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={() => <Menu dishes={dishes}/>}/>
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path="/aboutus" component={() => <AboutComponent leaders={leaders}/>}/>
                <Route exact path="/contactus" component={Contact}/>
                <Redirect to="/home"/>
            </Switch>
            <FooterComponent/>
        </div>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));