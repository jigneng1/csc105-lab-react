import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} selectedDish={this.state.selectedDish} onClick={(dishId) => this.onDishSelect(dishId)} />
      </div>
    );
  }
}

export default Main;
