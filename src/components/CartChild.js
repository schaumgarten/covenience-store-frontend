import React from 'react';

const CartChild = ({index,products,onClick}) => (
    <div>
        <li>{products[index].quantity} {products[index].name}: ${(products[index].price)*products[index].quantity} 
        <button onClick={e => onClick(e,index)} className="delete is-medium"></button>
        </li>
    </div>

);

export default CartChild;