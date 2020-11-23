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
import {postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders} from "../redux/ActionCreators";
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,
    }
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});

function MainComponent({
        dishes,
        comments,
        leaders,
        promotions,
        postComment,
        fetchDishes,
        resetFeedbackForm,
        fetchComments,
        fetchPromos,
        fetchLeaders,
        location,
    }
    ) {
    //instead of componentDidMount class method I use Hook 'useEffect'
    useEffect(() => {
        fetchDishes();
        fetchComments();
        fetchPromos();
        fetchLeaders();
    }, [fetchDishes, fetchComments, fetchPromos, fetchLeaders]); //it is crucial to pass
    // a dependency as a second arg,
    // to use effect only once, because fetchDishes & etc doesn't change,
    // but it is a hack

    const HomePage = () => {
        return (
            <HomeComponent
                dish={dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={dishes.isLoading}
                dishesErrMess={dishes.errMess}
                promotion={promotions.promotions.filter((promo) => promo.featured)[0]}
                promosLoading={promotions.isLoading}
                promosErrMess={promotions.errMess}
                leader={leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading={leaders.isLoading}
                leadersErrMess={leaders.errMess}
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
                comments={comments.comments.filter((comment) => comment.dishId === dishId)}
                commentsErrMess={comments.errMess}
                postComment={postComment}
            />
        );
    };

    return (
        <div>
            <HeaderComponent/>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="page" timeout={300}>
                    <Switch location={location}>
                        <Route path="/home" component={HomePage}/>
                        <Route exact path="/menu" component={() => <Menu dishes={dishes}/>}/>
                        <Route path="/menu/:dishId" component={DishWithId}/>
                        <Route exact path="/aboutus" component={() => <AboutComponent leaders={leaders}/>}/>
                        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={resetFeedbackForm}/>}/>
                        <Redirect to="/home"/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <FooterComponent/>
        </div>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));