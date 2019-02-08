import React from 'react';



const ProductsBox = (props) => (
    <div className="column productsBox">
        <div className="box">
            <article className="media">
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{props.product.name}</strong> <br />
                            <small>${props.product.price}</small>
                        </p>
                    </div>
                </div>
                <div className="media-right">
                    <form id="foodBoxForm" onSubmit={e => props.onSubmit(e,props.product.name)}>
                    <div className="field has-addons productQuantity is-right">

                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    placeholder='0'
                                    name="quantity"


                                />
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-info">
                                    +
                                </button>
                            </div>


                    </div>
                    </form>
                </div>
            </article>
        </div>
    </div>

);

export default ProductsBox;