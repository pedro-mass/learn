import React, { Component } from "react";
// import { connect } from "react-redux";

import ShopContext from "../context/shop-context";
import MainNavigation from "../components/MainNavigation";
// import { addProductToCart } from "../store/actions";
import "./Products.css";
import { getCartItemCount } from "./getCartItemCount";

class ProductsPage extends Component {
  render() {
    return (
      <ShopContext.Consumer>
        {context => (
          <React.Fragment>
            <MainNavigation cartItemNumber={getCartItemCount(context.cart)} />
            <main className="products">
              <ul>
                {context.products.map(product => (
                  <li key={product.id}>
                    <div>
                      <strong>{product.title}</strong> - ${product.price}
                    </div>
                    <div>
                      <button
                        onClick={context.addProductToCart.bind(this, product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </main>
          </React.Fragment>
        )}
      </ShopContext.Consumer>
    );
  }
}

export default ProductsPage;
