import React, { Component } from "react";
// import { connect } from "react-redux";

import ShopContext from "../context/shop-context";
import MainNavigation from "../components/MainNavigation";
// import { removeProductFromCart } from "../store/actions";
import "./Cart.css";
import { getCartItemCount } from "./getCartItemCount";

class CartPage extends Component {
  static contextType = ShopContext;

  render() {
    return (
      <React.Fragment>
        <MainNavigation cartItemNumber={getCartItemCount(this.context.cart)} />
        <main className="cart">
          {this.context.cart.length <= 0 && <p>No Item in the Cart!</p>}
          <ul>
            {this.context.cart.map(cartItem => (
              <li key={cartItem.id}>
                <div>
                  <strong>{cartItem.title}</strong> - ${cartItem.price} (
                  {cartItem.quantity})
                </div>
                <div>
                  <button
                    onClick={this.context.removeProductFromCart.bind(
                      this,
                      cartItem.id
                    )}
                  >
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </React.Fragment>
    );
  }
}

export default CartPage;
