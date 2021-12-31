import React, { Component } from 'react'
import { DataContext } from './Context'

class Header extends Component {
    static contextType = DataContext;
    checkLogged = () => {
        if (typeof this.context.account.data !== 'undefined') {
            return true
        }
        else return false
    }
    render() {
        const { account } = this.context
        if (this.checkLogged() === true) {
            return (
                <header>
                    <div className="header-container grid">
                        <img src="/img/logo.png" alt="" />
                        {
                            account.data.map(item => (
                                <div className="account">
                                    <div>Xin chào</div>
                                    <div className="recent-employee">{item.employee_name}</div>
                                </div>
                            ))
                        }

                    </div>
                </header>

            );
        }
        else if (this.checkLogged() === false) {
            return (
                <header>
                    <div className="header-container grid">
                        <img src="/img/logo.png" alt="" />
                    </div>
                </header>

            );
        }

    }

}

export default Header;