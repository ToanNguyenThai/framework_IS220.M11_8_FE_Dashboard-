import React, { Component } from 'react'
import { DataContext } from './Context'

class Login extends Component {
    static contextType = DataContext;
    state = {
        username: '',
        password: '',
        error: 'abcdxyz',
        
    }
    setName = (val) => {
        this.setState({
            username: val.target.value
        })
        
    }

    setPassword = (val) => {
        this.setState({
            password: val.target.value
        })
        
    }

    checkLogged = () => {
        if (typeof this.context.account.data !== 'undefined') {
            return true
        }
        else return false
    }
    
    getAccount = (array) => {
        
        var errorElement = document.getElementById("error-area");
        const data = array.filter(item => {
            if (this.state.username === item.employee_phoneNumber || this.state.username === item.employee_email  && this.state.password === item.employee_password)
                return item
        })

        if (data.length === 0) {
            this.setState({
                error: "Sai tên đăng nhập hoặc mật khẩu",
            })
            errorElement.style.color = "red";
        }
        else {
            errorElement.style.color = "white";
            this.context.Login(this.state.username, this.state.password)
            alert("Đăng nhập thành công !")
        }

    }
    render() {
        const { employee} = this.context;
        
        return (
            <div className="overlay">
                <div className="signIn-container">
                    <h2>Đăng Nhập</h2>
                    <div className="login-name">
                        <i class="fas fa-user"></i>
                        <input onChange={this.setName} type="text" name id="loginName" placeholder="Email hoặc Số điện thoại" />
                    </div>
                    <div className="login-password">
                        <i class="fas fa-unlock-alt"></i>
                        <input onChange={this.setPassword} type="password" name id="loginPassword" placeholder="Mật khẩu" />
                    </div>
                    <div className="btn-area">
                        <button onClick={() => this.getAccount(employee)}>Đăng nhập</button>
                    </div>
                    <div id="error-area">{this.state.error}</div>
                
                </div>
            </div>

        )
    }

}

export default Login;