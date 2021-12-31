import React, { Component } from 'react'
import axios from 'axios';
class Add_user extends Component {
    state = {
        employee_name: '',
        employee_address: '',
        employee_email: '',
        employee_phone: '',
        employee_sex: '',
        employee_password: '',
        role: ''
    }
    setName = (val) => {
        this.setState({
            employee_name: val.target.value
        })

    }

    setAddress = (val) => {
        this.setState({
            employee_address: val.target.value
        })

    }

    setGender = (val) => {
        this.setState({
            employee_sex: val.target.value
        })

    }
    setRole = (val) => {
        this.setState({
            role: val.target.value
        })

    }
    setPhone = (val) => {
        this.setState({
            employee_phone: val.target.value
        })
        console.log(this.state.employee_phone);
    }

    setEmail = (val) => {
        this.setState({
            employee_email: val.target.value
        })

    }



    setPassword = (val) => {
        this.setState({
            employee_password: val.target.value
        })

    }

    addUser = event => {
        const newEmployee = {
            id: '',
            employee_name: this.state.employee_name,
            employee_sex: this.state.employee_sex,
            employee_address: this.state.employee_address,
            employee_phoneNumber: this.state.employee_phone,
            employee_email: this.state.employee_email,
            employee_password: this.state.employee_password,
            role: this.state.role
        }
        console.log(newEmployee);
        axios({
            method: 'POST',
            url: 'https://localhost:44328/api/Employees',
            data: newEmployee
        });

        var form = document.querySelector("#addUser-form");
        form.reset();  // Reset all form data
        alert("Đăng kí thành công")
        event.preventDefault();
        this.forceUpdate();
    }
    render() {
        return (
            <div className="Add_user inside-grid">
                <h1>Thêm nhân viên</h1>
                <div className="Add_user_container">
                    <form id="addUser-form" onSubmit={this.addUser} >
                        <div className="form-element">
                            <h3>Tên nhân viên: </h3>
                            <input onChange={this.setName} type="text" placeholder="Type here" />
                        </div>

                        <div className="form-element">
                            <h3>Số điện thoại: </h3>
                            <input onChange={this.setPhone} type="text" placeholder="Type here" />
                        </div>

                        <div className="form-element">
                            <h3>Email: </h3>
                            <input onChange={this.setEmail} type="text" placeholder="Type here" />
                        </div>

                        <div className="form-element">
                            <h3>Địa chỉ nhà: </h3>
                            <input onChange={this.setAddress} type="text" placeholder="Type here" />
                        </div>

                        <div className="form-element">
                            <h3>Giới tính: </h3>
                            <select onChange={this.setGender} name="gender" id="gender">
                                <option value="">--Chọn giới tính--</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>

                        <div className="form-element">
                            <h3>Chức vụ: </h3>
                            <select onChange={this.setRole} id="emp_role" name="role">
                                <option value="">--Chọn chức vụ--</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>

                        <div className="form-element">
                            <h3>Mật khẩu: </h3>
                            <input onChange={this.setPassword} type="text" placeholder="Type here" />
                        </div>

                        <div className="btn-area">
                            <button id="btn-signUp" type="submit"  >Thêm nhân viên</button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }

}

export default Add_user;