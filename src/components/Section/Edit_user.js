import React, { Component } from 'react'
import axios from 'axios';

import { DataContext } from '../Context'

class Edit_user extends Component {
    static contextType = DataContext;
    state = {
        employee: [],
        employee_name: '',
        employee_gender:'',
        employee_address: '',
        employee_phone: '',
        employee_username: '',
        employee_password: ''
    }

  
    setAddress = (val) => {
        this.setState({
            employee_address: val.target.value
        })
    
    }
    setGender = (val) => {
        this.setState({
            employee_gender: val.target.value
        })
    }
    setPhone = (val) => {
        this.setState({
            employee_phone: val.target.value
        })
    }

    setPassword = (val) => {
        this.setState({
            employee_password: val.target.value
        })

    }

    getUser = () => {
        
        if (this.props.match.params.id) {
            const result = this.context.employee;
            const data = result.filter(item => {
                return item.id === this.props.match.params.id;
            })
          
            this.setState({
                employee: data
            })
         
        }

    }
    componentDidMount = () => {
        /* callApi('employee', "GET", null).then(res=>{
            this.setState({
                employee: res.data
            })
        }) */
        this.getUser();
    }
    

    updateUser = async() => {
        const newEmployee = {
            id: this.props.match.params.id,
            employee_name: document.getElementById('emp_name').value,
            employee_sex: document.getElementById('emp_gender').value,
            employee_address: document.getElementById('emp_address').value,
            employee_phoneNumber: document.getElementById('emp_phone').value,  
            employee_email: document.getElementById('emp_email').value,         
            employee_password: document.getElementById('emp_password').value,
            role: document.getElementById('emp_role').value,
        }
        console.log(newEmployee);
        await axios({
            method: 'PUT',      
            url: "https://localhost:44328/api/Employees/Update"  ,
            data: newEmployee
        })
        alert("Cập nhật thành công")
        
      
    }

    deleteUser = async() => {
        const employee_id = this.props.match.params.id  
        await axios({
            method: 'DELETE',      
            url: `https://localhost:44328/api/Employees/Delete/${employee_id}`         
        })
        alert("Xoá nhân viên thành công") 
        
    }
    render() {
        const { employee } = this.state;
        
        return (
            <div className="Edit_user inside-grid">
                <h1>Chỉnh sửa nhân viên</h1>
                <div className="Edit_user_container">
                    <form id="updateUser-form"  >
                    {
                        employee.map(item => (
                            <div>
                                <div className="form-element">
                                    <h3>Tên nhân viên: </h3>
                                    {/* defaultValue: chỉ set giá trị mặc định khi render để có thể thay đổi*/}
                                    <input id="emp_name" disabled type="text" placeholder="Type here" defaultValue={item.employee_name} />
                                </div>

                                <div className="form-element">
                                    <h3>Số điện thoại: </h3>
                                    <input id="emp_phone" onChange={this.setPhone} type="text" placeholder="Type here" defaultValue={item.employee_phoneNumber} />
                                </div>

                                <div className="form-element">
                                    <h3>Email: </h3>
                                    <input id="emp_email" disabled type="text" placeholder="Type here" defaultValue={item.employee_email} />
                                </div> 
                                
                                <div className="form-element">
                                    <h3>Địa chỉ nhà: </h3>
                                    <input id="emp_address" onInput={this.setAddress} type="text" placeholder="Type here" defaultValue={item.employee_address} />
                                </div>

                                <div className="form-element">
                                    <h3>Giới tính: </h3>
                                    <select  id="emp_gender" disabled name="gender" value={item.employee_sex}>
                                        <option value="">--Chọn giới tính--</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>

                                <div className="form-element">
                                    <h3>Chức vụ: </h3>
                                    <select  id="emp_role" name="role" value={item.role}>
                                        {/* <option value="">--Chọn chức vụ--</option> */}
                                        <option value="admin">Admin</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                </div>

                                

                                <div className="form-element">
                                    <h3>Mật khẩu: </h3>
                                    <input id="emp_password" onChange={this.setPassword} type="text"  defaultValue={item.employee_password} />
                                </div>

                                <div className="btn-area">
                                    <div id="btn-edit" onClick={this.updateUser}>Sửa nhân viên</div>
                                    <div id="btn-delete" onClick={this.deleteUser}> Xoá nhân viên</div>
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

export default Edit_user;