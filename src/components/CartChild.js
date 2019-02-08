import React from 'react';

const CartChild = ({index,products,onClick}) => (
    <div>
        <li>{products[index].quantity} {products[index].name}: ${(products[index].price)*products[index].quantity} 
        <button onClick={e => onClick(e,index)}> Borrar </button>
        </li>

        {/*<i className="fa fa-trash" onClick={e => onClick(e,index)}/>*/}
    </div>

);

export default CartChild;