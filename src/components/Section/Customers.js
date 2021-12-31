import React, { Component } from 'react'
import { DataContext } from '../Context'
import { Link } from 'react-router-dom';
class Customers extends Component {
    static contextType = DataContext;
    state = {
        clients: [],
        find_value: "",
        id_forEdit: ""
    }
    componentDidMount() {

        this.setState({
            clients: this.context.clients
        })
    }
    getValue = (val) => {
        this.setState({
            find_value: val.target.value
        })

    }

    findCustomer = value => {
        const thisCustomer = this.context.clients.filter(item => {
            if (item.customer_email.toUpperCase().includes(value.toUpperCase()) || item.customer_phoneNumber.includes(value))
                return item;
        })
        this.setState({
            clients: thisCustomer
        })
    }
    getCustomer = e => {
        this.context.clients.forEach((element, index) => {
            if (e.target.value == index + 1) {
                this.setState({
                    id_forEdit: element.id
                })
            }
        });

    }
    render() {

        const { clients } = this.state;
        return (
            <div className="Customers inside-grid">
                <div className="Customers-header">
                    <h1>Customers</h1>
                    <div className="Customers-control">
                        <input type="text" placeholder="Tìm khách hàng..." onChange={this.getValue} />
                        <button onClick={() => this.findCustomer(this.state.find_value)} id="search">Tìm kiếm</button>
                    </div>
                </div>
                <div className='Customers-container' >
                    <table className="table">
                        <thead>
                            <tr className="Customers-container-title">
                                <td> <input type="checkbox" id="hidden-checkbox" /> </td>
                                <td className="id">id</td>
                                <td className="name">Tên khách hàng</td>
                                <td className="address">Địa chỉ</td>
                                <td className="email">Email</td>
                                <td className="phone">Số điện thoại </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.map((item, index) => (
                                    <tr className="Customers-container-content">
                                        <td> <input onChange={this.getCustomer} type="checkbox" id="cb-customer" value={index + 1} /></td>
                                        <td className="id">{index + 1}</td>
                                        <td className="name">{item.customer_name}</td>
                                        <td className="address">{item.customer_address}</td>
                                        <td className="email">{item.customer_email}</td>
                                        <td className="phone">{item.customer_phoneNumber}</td>
                                    </tr>
                                ))
                            }
                        </tbody>


                    </table>
                </div>

                <Link to={`/Edit_customer/${this.state.id_forEdit}`}>
                    <div className="btn-area">
                        <div className="btn-edit">
                            <i class="fas fa-pencil-alt"></i>
                            <span>Chỉnh sửa </span>
                        </div>
                    </div>
                </Link>


            </div>
        );
    }

}

export default Customers;