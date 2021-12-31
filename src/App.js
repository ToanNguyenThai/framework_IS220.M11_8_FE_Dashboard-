import React, { Component } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import Section from './components/Section';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { DataContext } from './components/Context'
import './style.css';


class App extends Component {
    static contextType = DataContext;
    checkLogged = () => {
        if (typeof this.context.account.data !== 'undefined') {
            return true
        }
        else return false
    }
    render() {

        if (this.checkLogged() === true) {
            return (
                <div className="app">
                    <Router>
                        <Header></Header>
                        <Sidebar></Sidebar>
                        <Section></Section>
                    </Router>
                </div>
            )
        }
        else if (this.checkLogged() === false) {
            return (
                <div className="app">
                    <Router>
                        <Header></Header>
                        <Login></Login>
                    </Router>
                </div>
            );
        }

    }

}

export default App;
