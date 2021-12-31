import React, { Component } from 'react'
import { DataContext } from '../Context'
import { Link } from 'react-router-dom';
class Inventory extends Component {
    static contextType = DataContext;
    state = {
        products: [],
        find_value: ""
    }
    componentDidMount() {
        this.setState({
            products: this.context.products
        })
    }
    getValue = (val) => {
        this.setState({
            find_value: val.target.value
        })

    }

    findProduct = value => {
        const thisProduct = this.context.products.filter(item => {
            if (item.name.toUpperCase().includes(value.toUpperCase()))
                return item;
        })
        this.setState({
            products: thisProduct
        })
    }
    render() {
        const { products } = this.state;
        return (
            <div className="Inventory inside-grid">
                <div className="Inventory-header">
                    <h1>Inventory</h1>
                    <div className="Inventory-control">
                        <input type="text" placeholder="Tìm tên sản phẩm..." onChange={this.getValue} />
                        <button id="search" onClick={() => this.findProduct(this.state.find_value)}>Tìm kiếm</button>

                        <Link to="/Add_product">
                            <button id="add">Thêm sản phẩm</button>
                        </Link>

                    </div>
                </div>

                <div className="Inventory-container">
                    {
                        products.map(product => (
                            <div className="item" key={product.id}>
                                <img src={product.imageURL}></img>
                                <div className="item-information">
                                    <div className="item-name"> {product.product_name} </div>
                                    <div className="item-price">{this.context.getPrice(product.id)}đ</div>
                                </div>
                                <div className="btn-area">
                                    <Link to={`/Edit_product/${product.id}`}>
                                        <div className="btn-edit">
                                            <i class="fas fa-pencil-alt"></i>
                                            <span>Edit </span>
                                        </div>
                                    </Link>

                                    <div className="btn-delete">
                                        <i class="fas fa-trash"></i>
                                        <span>Delete</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }

}

export default Inventory;