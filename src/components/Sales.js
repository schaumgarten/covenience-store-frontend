import React from 'react';

const Sales = (props) => (
    <table className="table">
        <thead>
            <tr>
                <td><bold>Fecha</bold></td>
                <td><bold>Producto</bold></td>
                <td><bold>Cantidad</bold></td>
                <td><bold>Cliente</bold></td>
                <td><bold>Total</bold></td>
            </tr>
        </thead>
        <tbody>
            {props.sales.map(sale => 
                <tr>
                    <td>{sale.created_at}</td>
                    <td onClick={()=>props.showByProduct(sale)}>{sale._product.name}</td>
                    <td>{sale.quantity}</td>
                    <td onClick={()=>props.showByClient(sale)}>{sale._client.name}</td>
                    <td>${sale._product.price * sale.quantity}</td>
                </tr>
            )}
        </tbody>
    </table>
);


export default Sales;
