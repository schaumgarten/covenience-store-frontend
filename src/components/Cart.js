import React from 'react';
import CartChild from "./CartChild";

const Cart = ({productsInCart, products,total,onClick, handlePay}) => (
    <div>
        <h2 className="subtitle is-3">Tu compra</h2>
        <ul>
            {productsInCart.map((index,i) => <CartChild onClick={onClick} index={index} key={i} products={products}/>)}
        </ul>
    <span>Total: ${total}</span>
    <div>
        <button className="button is-primary" onClick={handlePay}>Pagar</button>
    </div>
    </div>
);


export default Cart