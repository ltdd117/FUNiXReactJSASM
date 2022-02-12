import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDish: null
        };
    }

    onDishSelect(dish) {
      this.setState({ selectedDish: dish });
    }

    renderDish(dish) {
      if (dish != null)
        return(
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        );
      else
        return(
          <div></div>
        );
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div className="col-12 col-md-5 m-1">
                {/* <RenderMenuItem dish={dish} /> */}
                <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        const DishWithId = ({match}) => {
          return(
            this.props.auth.isAuthenticated
            ?
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
              favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
              postFavorite={this.props.postFavorite}
              />
            :
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
              favorite={false}
              postFavorite={this.props.postFavorite}
              />
          );
        }

        return (
          <div className="container">
            <div className="row">
              {menu}
            </div>
            <div className='row'>
              <div className='col-12 col-md-5 m-1'>
                {this.renderDish(this.state.selectedDish)}
                {/* {DishWithId(dishId)} */}
              </div>
            </div>
          </div>
        );
    }
}



export default Menu;