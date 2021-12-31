import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { DataContext } from './Context'
class Sidebar extends Component {
    static contextType = DataContext;
    state = {
        role: ""
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
    render() {
        const { account } = this.context;
        
        if (this.getRole(account) === true) { /* là admin */
            return (
                <div className="Sidebar">
                    <Link to="/">

                        <div className="Sidebar_options">
                            <i class="fas fa-chart-line"></i>
                            <span> Dashboard </span>

                        </div>
                    </Link>

                    <Link to="/Inventory">
                        <div className="Sidebar_options">
                            <i style={{ marginRight: '5px' }} class="fas fa-shopping-bag"></i>
                            <span style={{ marginRight: '9px' }}> Inventory </span>

                        </div>
                    </Link>

                    <Link to="/Invoices">
                        <div className="Sidebar_options">

                            <i style={{ marginRight: '3px' }} class="fas fa-cart-arrow-down"></i>
                            <span style={{ marginRight: '25px' }}> Invoices </span>

                        </div>
                    </Link>

                    <Link to="/Customers">
                        <div className="Sidebar_options">

                            <i class="fas fa-users"></i>
                            <span > Customers </span>

                        </div>
                    </Link>

                    <Link to="/Users">
                        <div className="Sidebar_options">

                            <i class="fas fa-users-cog"></i>
                            <span style={{ marginRight: '42px' }}> Users </span>

                        </div>
                    </Link>

                    <div className="btn-logOut">
                        <button onClick={() => this.context.Logout()}>Đăng xuất</button>
                    </div>
                </div>
            );
        }
        else if (this.getRole(account) === false) { /* là emp */
            return (
                <div className="Sidebar">
                    <Link to="/">

                        <div className="Sidebar_options">
                            <i class="fas fa-chart-line"></i>
                            <span> Dashboard </span>

                        </div>
                    </Link>

                    <Link to="/Inventory">
                        <div className="Sidebar_options">
                            <i style={{ marginRight: '5px' }} class="fas fa-shopping-bag"></i>
                            <span style={{ marginRight: '9px' }}> Inventory </span>

                        </div>
                    </Link>

                    <Link to="/Invoices">
                        <div className="Sidebar_options">

                            <i style={{ marginRight: '3px' }} class="fas fa-cart-arrow-down"></i>
                            <span style={{ marginRight: '25px' }}> Invoices </span>

                        </div>
                    </Link>

                    <Link to="/Customers">
                        <div className="Sidebar_options">

                            <i class="fas fa-users"></i>
                            <span > Customers </span>

                        </div>
                    </Link>


                    <div className="btn-logOut">
                        <button onClick={() => this.context.Logout()}>Đăng xuất</button>
                    </div>



                </div>
            );
        }
    }

}

export default Sidebar;