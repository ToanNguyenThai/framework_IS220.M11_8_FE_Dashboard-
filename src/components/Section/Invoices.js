import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context'
class Invoices extends Component {
    static contextType = DataContext;
    state = {
        orders: [],
        id_forEdit: '',
        role: "",
        find_value: ""
    }
    componentDidMount() {
        this.setState({
            orders: this.context.orders
        })

    }
    getValue = (val) => { /* value trong input tìm kiếm */
        this.setState({
            find_value: val.target.value
        })
    }
    findInvoice = value => {

        const find_obj = this.context.orders.filter(item => {
            if (item.customer.customer_phoneNumber.includes(value))
                return item
        })

        this.setState({
            orders: find_obj
        })
    }
    getRole = (array) => {
        let flag;
        array.data.filter(item => {
            if (item.role === "admin")
                flag = true
            else if (item.role === "employee")
                flag = false
        })
        return flag
    }
    getInvoice = e => {
        this.state.orders.forEach((element, index) => {
            if (e.target.value == index + 1) {
                this.setState({
                    id_forEdit: element.id
                })
            }
        });
    }
    cancelInvoice = async () => {
        const thisOrder = this.state.orders.filter(item => {
            return item.id === this.state.id_forEdit
        })
        if (thisOrder[0].order_status === "Đã giao")
            alert("Đơn hàng đã hoàn thành trước đó !")
        else if (thisOrder[0].order_status === "Đã huỷ")
            alert("Đơn hàng đã huỷ trước đó !")
        else {
            await axios({
                method: 'PUT',
                url: `https://localhost:44328/api/Orders/OrderStatus/${this.state.id_forEdit}`,
                data: {
                    order_id: this.state.id_forEdit,
                    status: "Đã huỷ"
                }
            })
            alert("Huỷ thành công")
        }

    }
    completeInvoice = async () => {

        const thisOrder = this.state.orders.filter(item => {
            return item.id === this.state.id_forEdit
        })
        if (thisOrder[0].order_status === "Đã giao")
            alert("Đơn hàng đã hoàn thành trước đó !")
        else if (thisOrder[0].order_status === "Đã huỷ")
            alert("Đơn hàng đã huỷ trước đó !")

        else {
            await axios({
                method: 'PUT',
                url: `https://localhost:44328/api/Orders/OrderStatus/${this.state.id_forEdit}`,
                data:
                {
                    order_id: this.state.id_forEdit,
                    status: "Đã giao"
                }

            })
            alert("Hoàn thành thành công")
        }

    }
    render() {
        const { orders } = this.state
        const { account } = this.context;
        if (this.getRole(account) === true) {
            return (
                <div className="Invoices inside-grid">
                    <div className="Invoices-header">
                        <h1>Hoá đơn</h1>
                        <div className="Invoices-control">
                            <input type="text" placeholder="Tìm hoá đơn..." onChange={this.getValue} />
                            <button onClick={() => this.findInvoice(this.state.find_value)} id="search">Tìm kiếm</button>
                        </div>
                    </div>
                    <div className="Invoices-container">
                        <table>
                            <tr className="Invoices-container-title">
                                <td> <input type="checkbox" id="hidden-checkbox" /></td>
                                <td className="title_stt">No</td>
                                <td className="title_id">Mã hoá đơn</td>
                                <td className="title_name">Tên khách hàng</td>
                                <td className="title_phone">Số điện thoại</td>
                                <td className="title_total">Tổng tiền</td>
                                <td className="title_status">Trạng thái</td>
                            </tr>
                            {
                                orders.map((item, index) => (

                                    <tr className="Invoices-container-content">
                                        <td> <input onChange={this.getInvoice} type="checkbox" id="cb-customer" value={index + 1} /></td>
                                        <td className="stt">{index + 1}</td>
                                        <td className="id">{item.id}</td>
                                        <td className="name">{item.customer.customer_name}</td>
                                        <td className="date">{item.customer.customer_phoneNumber}</td>
                                        <td className="total">{item.order_total}</td>
                                        <td className="status">{item.order_status}</td>
                                    </tr>

                                ))
                            }
                        </table>


                    </div>

                    <div className="btn-area">
                        <Link to={`/Invoice_details/${this.state.id_forEdit}`}>
                            <div className="btn-edit">Chi tiết</div>
                        </Link>
                        <div className="btn-delete" onClick={this.cancelInvoice}>Huỷ hoá đơn</div>
                        <div className="btn-complete" onClick={this.completeInvoice}>Hoàn thành</div>
                    </div>

                </div>
            );
        }
        else if (this.getRole(account) === false) {
            return (
                <div className="Invoices inside-grid">
                    <div className="Invoices-header">
                        <h1>Hoá đơn</h1>
                        <div className="Invoices-control">
                            <input type="text" placeholder="Tìm hoá đơn..." onChange={this.getValue} />
                            <button onClick={() => this.findInvoice(this.state.find_value)} id="search">Tìm kiếm</button>
                        </div>
                    </div>
                    <div className="Invoices-container">
                        <div className="Invoices-container-title">
                            <input type="checkbox" id="hidden-checkbox" />
                            <div className="title_stt">STT</div>
                            <div className="title_id">Mã hoá đơnn</div>
                            <div className="title_name">Tên khách hàng</div>
                            <div className="title_phone">Số điện thoại</div>
                            <div className="title_total">Tổng tiền</div>
                        </div>
                        {
                            orders.map((item, index) => (

                                <div className="Invoices-container-content">
                                    <input onChange={this.getInvoice} type="checkbox" id="cb-customer" value={index + 1} />
                                    <div className="stt">{index + 1}</div>
                                    <div className="id">{item.id}</div>
                                    <div className="name">{item.customer.customer_name}</div>
                                    <div className="date">{item.customer.customer_phoneNumber}</div>
                                    <div className="total">{item.order_total}</div>
                                </div>

                            ))
                        }

                    </div>

                    <div className="btn-area">
                        <Link to={`/Invoice_details/${this.state.id_forEdit}`}>
                            <div className="btn-edit">Chi tiết</div>
                        </Link>
                    </div>

                </div>
            );
        }
    }

}

export default Invoices;