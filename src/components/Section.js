import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import Dashboard from './Section/Dashboard';
import Customers from './Section/Customers';

import Invoices from './Section/Invoices';
import Inventory from './Section/Inventory';
import Users from './Section/Users';
import Add_user from './Section/Add_user'
import Add_product from './Section/Add_product'
import Edit_product from './Section/Edit_product'
import Edit_user from './Section/Edit_user'
import Edit_customer from './Section/Edit_customer'
import Invoice_details from './Section/Invoice_details'
class Section extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Dashboard}></Route>
                <Route path="/Dashboard" component={Dashboard}></Route>
                <Route path="/Customers" component={Customers}></Route>
                <Route path="/Invoices" component={Invoices}></Route>
                <Route path="/Inventory" component={Inventory}></Route>
                <Route path="/Users" component={Users}></Route>
                <Route path="/Add_user" component={Add_user}></Route>
                <Route path="/Add_product" component={Add_product}></Route>
                <Route path="/Edit_product/:id" component={Edit_product}></Route>
                <Route path="/Edit_user/:id" component={Edit_user}></Route>
                <Route path="/Edit_customer/:id" component={Edit_customer}></Route>
                <Route path="/Invoice_details/:id" component={Invoice_details}></Route>
            </Switch>
        );
    }

}

export default Section;