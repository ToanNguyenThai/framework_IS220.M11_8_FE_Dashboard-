import React, { Component } from 'react'
import axios from 'axios';
import { DataContext } from '../Context'

class Edit_customer extends Component {
    static contextType = DataContext;
    state = {
        client: [],   
        address: '',
        phone: '',   
        email: '', 
        password: ''
    }
    getCustomer = () => {
        if (this.props.match.params.id) {
            const result = this.context.clients;
            const data = result.filter(item => {
                return item.id === this.props.match.params.id;
            })
            console.log(data);
            this.setState({
                client: data
            })
        }

    }
    componentDidMount = () => {
        this.getCustomer();
    }
    setAddress= (val) => {
        this.setState({
            address: val.target.value
        })
    }
    setEmail= (val) => {
        this.setState({
           email: val.target.value
        })
    }
    setPhone= (val) => {
        this.setState({
           phone: val.target.value
        })
    }
    setPassword = (val) => {
        this.setState({
           password: val.target.value
        })
    }
    updateCustomer = async() => {
        const newCustomer = {           
            id: this.props.match.params.id,
            customer_name: document.getElementById('cus_name').value,
            customer_address: document.getElementById('cus_address').value,        
            customer_phoneNumber: document.getElementById('cus_phone').value,      
            customer_email: document.getElementById('cus_email').value,     
            customer_password: document.getElementById('cus_password').value
        }
        console.log(newCustomer);
        await axios({
            method: 'PUT',
            url: `https://localhost:44328/api/Customers/Update`,      
            data: newCustomer,
 
        })
        alert("Cập nhật thành công")   
    }

    deleteCustomer = async() => {         
        const customer_id = this.props.match.params.id
        await axios({
            method: 'DELETE',
            url: `https://localhost:44328/api/Customers/Delete/${customer_id}`,      
 
        })
        alert("Xoá khách hàng thành công")   
    }
    render() {
        const { client } = this.state;
        return (
            <div className="Edit_customer inside-grid">
                <h1>Chỉnh sửa khách hàng</h1>
                <div className="Edit_customer_container">
                <form id="editCustomer-form" >
                    {
                        client.map(item => (
                            <div>
                                <div className="form-element">
                                    <h3>Tên khách hàng: </h3>
                                    <input id="cus_name" disabled  type="text" placeholder="Type here" defaultValue={item.customer_name} />
                                </div>

                                <div className="form-element">
                                    <h3>Số điện thoại: </h3>
                                    <input id="cus_phone" onChange={this.setPhone} type="text" placeholder="Type here" defaultValue={item.customer_phoneNumber} />
                                </div>

                                <div className="form-element">
                                    <h3>Địa chỉ nhà: </h3>
                                    <input id="cus_address" onChange={this.setAddress} type="text" placeholder="Type here" defaultValue={item.customer_address} />
                                </div>

                                <div className="form-element">
                                    <h3>Email: </h3>
                                    <input id="cus_email" onChange={this.setEmail} type="text" placeholder="Type here" defaultValue={item.customer_email} />
                                </div>

                                <div className="form-element">
                                    <h3>Mật khẩu: </h3>
                                    <input id="cus_password" onChange={this.setPassword} type="text" placeholder="Type here" defaultValue={item.customer_password}/>
                                </div>

                                <div className="btn-area">
                                    <div id="btn-edit" onClick={this.updateCustomer} >Sửa khách hàng</div>
                                    <div id="btn-delete" onClick={this.deleteCustomer}  > Xoá khách hàng</div>
                                </div>
                            </div>
                        ))
                    }
                    </form>
                </div>

            </div>
        );
    }
}

export default Edit_customer;