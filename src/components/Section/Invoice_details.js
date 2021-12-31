import React, { Component } from 'react'
import axios from 'axios';
import { DataContext } from '../Context'


class Invoice_details extends Component {
    static contextType = DataContext;
    state = {
        orders: [],
        list_cart: []
    }
    componentDidMount() {
        axios({
            method: 'GET',
            url: `https://localhost:44328/api/Orders/GetOrder/${this.props.match.params.id}`,
            data: null
        }).then(res => {
            this.setState({
                orders: res.data,
                list_cart: res.data.list_cart
            })
        })

    }
    render() {
        const { orders, list_cart } = this.state

        return (
            <div className="Invoice_details inside-grid">
                <h1>CHI TIẾT HOÁ ĐƠN</h1>
                <div className="main-container">             
                        <div className="order-products">
                            {
                                list_cart.map(item => (
                                    <div className="cartItem_mainContainer" key={orders.id}>
                                        <div className="img-main">
                                            <img src={this.context.getImgbyID(item.id)}></img>
                                        </div>
                                        <div className="information">
                                            <h3 className="name">{this.context.getNamebyID(item.id)}</h3>
                                            <div className="separate"></div>
                                            <h2 className="price">{this.context.getMultiplePrice(item.id, item.quantity)}đ</h2>
                                            <h3 className="color">Màu sắc: {item.product_detail_color}</h3>
                                            <h3 className="size">Kích cỡ: {item.product_detail_size}</h3>
                                            <div className="amount">
                                                <span> Số lượng: {item.quantity} </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <h3 className="order_total">Tổng tiền: {orders.order_total}</h3>
                </div>
            </div>
        );
    }

}

export default Invoice_details;