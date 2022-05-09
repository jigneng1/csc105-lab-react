import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Menu extends Component {

    constructor(props) { //สร้าง prop กับ state มารับ data
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {  //method 1 มา set state
        this.setState({ selectedDish: dish});
    }

    renderDish(dish) { //method 2 มา get state
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
        const menu = this.props.dishes.map((dish) => { //map มาออกมาใส่ function menu
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                  <div  className="col-12 col-md-5 m-1"> 
                    {this.renderDish(this.props.dishes[this.props.selectedDish])}
                  </div>
                </div>
            </div>
        );
    }
}

export default Menu;