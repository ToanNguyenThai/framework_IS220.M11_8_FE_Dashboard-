import React, { Component } from 'react'
import { DataContext } from '../Context'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
    static contextType = DataContext;
    state = {
        employee: [],
        find_value: "",
        id_forEdit: ""
    }
    componentDidMount() {        

        this.setState({
            employee: this.context.employee
        })
        
    }
   
    /* componentWillUpdate(){
        
        axios({
            method: 'GET',
            url: 'https://localhost:44328/api/Employees/GetAll',
            data: null
        }).then(res =>{
            this.state.employee= res.data         
        })
    } */
    getValue = (val) => {
        this.setState({
            find_value: val.target.value
        })
    }

    findEmployee = value => {
        const thisEmployee = this.context.employee.filter(item => {
            if (item.employee_email.toUpperCase().includes(value.toUpperCase()) || item.employee_phoneNumber.includes(value))
                return item;
        })
        this.setState({
            employee: thisEmployee
        })
    }

    getEmployee = e => {
        this.context.employee.forEach((element, index) => {
            if (e.target.value == index + 1) {
                this.setState({
                    id_forEdit: element.id
                })
            }
        });

    }
    render() {
        
        const { employee } = this.state;
        return (
            <div className="Users inside-grid">
                <div className="Users-header">
                    <h1>Users</h1>
                    <div className="Users-control">
                        <input type="text" placeholder="Tìm nhân viên..." onChange={this.getValue} />
                        <button onClick={() => this.findEmployee(this.state.find_value)} id="search">Tìm kiếm</button>
                        <Link to="/Add_user">
                            <button id="add_emp">Thêm nhân viên</button>
                        </Link>
                    </div>
                </div>
                <div className="Users-container">
                    <div className="Users-container-title">
                        <input type="checkbox" id="hidden-checkbox" />
                        <div className="id">STT</div>
                        <div className="name">Tên nhân viên</div>
                        <div className="address">Địa chỉ</div>
                        <div className="email">Email</div>
                        <div className="phone">Số điện thoại </div>
                    </div>
                    {
                        employee.map((item, index) => (
                            <div className="Users-container-content">
                                <input onChange={this.getEmployee} type="checkbox" id="cb-customer" value={index + 1} />
                                <div className="id">{index + 1}</div>
                                <div className="name">{item.employee_name}</div>
                                <div className="address">{item.employee_address}</div>
                                <div className="gender">{item.employee_email}</div>
                                <div className="phone">{item.employee_phoneNumber}</div>
                            </div>
                        ))
                    }

                </div>
                <Link to={`/Edit_user/${this.state.id_forEdit}`}>
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

export default Users;