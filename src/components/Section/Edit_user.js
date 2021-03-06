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
        alert("C???p nh???t th??nh c??ng")
        
      
    }

    deleteUser = async() => {
        const employee_id = this.props.match.params.id  
        await axios({
            method: 'DELETE',      
            url: `https://localhost:44328/api/Employees/Delete/${employee_id}`         
        })
        alert("Xo?? nh??n vi??n th??nh c??ng") 
        
    }
    render() {
        const { employee } = this.state;
        
        return (
            <div className="Edit_user inside-grid">
                <h1>Ch???nh s???a nh??n vi??n</h1>
                <div className="Edit_user_container">
                    <form id="updateUser-form"  >
                    {
                        employee.map(item => (
                            <div>
                                <div className="form-element">
                                    <h3>T??n nh??n vi??n: </h3>
                                    {/* defaultValue: ch??? set gi?? tr??? m???c ?????nh khi render ????? c?? th??? thay ?????i*/}
                                    <input id="emp_name" disabled type="text" placeholder="Type here" defaultValue={item.employee_name} />
                                </div>

                                <div className="form-element">
                                    <h3>S??? ??i???n tho???i: </h3>
                                    <input id="emp_phone" onChange={this.setPhone} type="text" placeholder="Type here" defaultValue={item.employee_phoneNumber} />
                                </div>

                                <div className="form-element">
                                    <h3>Email: </h3>
                                    <input id="emp_email" disabled type="text" placeholder="Type here" defaultValue={item.employee_email} />
                                </div> 
                                
                                <div className="form-element">
                                    <h3>?????a ch??? nh??: </h3>
                                    <input id="emp_address" onInput={this.setAddress} type="text" placeholder="Type here" defaultValue={item.employee_address} />
                                </div>

                                <div className="form-element">
                                    <h3>Gi???i t??nh: </h3>
                                    <select  id="emp_gender" disabled name="gender" value={item.employee_sex}>
                                        <option value="">--Ch???n gi???i t??nh--</option>
                                        <option value="Nam">Nam</option>
                                        <option value="N???">N???</option>
                                    </select>
                                </div>

                                <div className="form-element">
                                    <h3>Ch???c v???: </h3>
                                    <select  id="emp_role" name="role" value={item.role}>
                                        {/* <option value="">--Ch???n ch???c v???--</option> */}
                                        <option value="admin">Admin</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                </div>

                                

                                <div className="form-element">
                                    <h3>M???t kh???u: </h3>
                                    <input id="emp_password" onChange={this.setPassword} type="text"  defaultValue={item.employee_password} />
                                </div>

                                <div className="btn-area">
                                    <div id="btn-edit" onClick={this.updateUser}>S???a nh??n vi??n</div>
                                    <div id="btn-delete" onClick={this.deleteUser}> Xo?? nh??n vi??n</div>
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