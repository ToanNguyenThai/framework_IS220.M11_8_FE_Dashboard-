import React, { Component } from 'react'
import callApi from './Callapi';
import axios from 'axios';
export const DataContext = React.createContext("1");
export const AccountContext = React.createContext("2");


export class DataProvider extends Component {

    state = {
        products: [],       
        employee: [],
        clients: [],
        account:{},
        orders: []
    }

    componentDidMount(){
        this.forceUpdate();
        axios({
            method: 'GET',
            url: 'https://localhost:44328/api/Products/GetAll',
            data: null
        }).then(res =>{
            this.setState({
                products: res.data
            })
        })

        axios({
            method: 'GET',
            url: 'https://localhost:44328/api/Customers/GetAll',
            data: null
        }).then(res =>{
            this.setState({
                clients: res.data
            })
        })

        axios({
            method: 'GET',
            url: 'https://localhost:44328/api/Employees/GetAll',
            data: null
        }).then(res =>{
            this.setState({
                employee: res.data
            })
        })

        axios({
            method: 'GET',
            url: `https://localhost:44328/api/Orders/GetAllOrders`,
            data: null
        }).then(res => {
            this.setState({
                orders: res.data
            })
        })
    }

   /*  componentWillUpdate() { // immmediately update employee after add & update  &  without refreshing
        axios({
            method: 'GET',
            url: 'https://localhost:44328/api/Employees/GetAll',
            data: null
        }).then(res =>{
            this.setState({
                employee: res.data
            })
        })

        axios({
            method: 'GET',
            url: 'https://localhost:44328/api/Customers/GetAll',
            data: null
        }).then(res =>{
            this.setState({
                clients: res.data
            })
        })
    } */


 
    Login = (username, password) => {
        const { employee} = this.state
        const data = employee.filter(item => {
            if  ( username === item.employee_phoneNumber || username === item.employee_email  && password===item.employee_password )
                return item
        })
        this.setState({
            account: {data}
        })
    
    }
    Logout = () =>{
        const { account} = this.state
        this.setState({
            account : {}
        })
        
    }
    getNamebyID = (id) => {
        let name = ''
        this.state.products.forEach((item) => {
            if (item.id === id)
                name = item.product_name
        })
        return name
    }
    getMultiplePrice = (id, quantity) =>{
        let str_price = "";
        this.state.products.forEach((item) => {
            if (item.id === id)
                str_price = (item.product_price*quantity).toString()
        })
        if (str_price.length === 7) {
            //Chuõi giá tiền = 7 thì chèn , vô chỗ số 1 và 5
            str_price = str_price.slice(0, 1) + "," + str_price.slice(1)
            str_price = str_price.slice(0, 5) + "," + str_price.slice(5)
        }
        else  if (str_price.length > 7){
            //Chuỗi giá tiền > 7 thì chèn , vô chỗ số 1 + i và 5 + i
            let i = str_price.length - 7
            str_price = str_price.slice(0, 1+i) + "," + str_price.slice(1+i)
            str_price = str_price.slice(0, 5+i) + "," + str_price.slice(5+i)
        } 

        return str_price;
    }
    getImgbyID = (id) => {
        let url = ''
        this.state.products.forEach((item) => {
            if (item.id === id)
                url = item.imageURL
        })
        return url
    }
    getPrice = (id) => {
        let str_price = "";
        this.state.products.forEach((item) => {
            if (item.id === id)
                str_price = item.product_price.toString()
        })
        str_price = str_price.slice(0, 1) + "," + str_price.slice(1)
        str_price = str_price.slice(0, 5) + "," + str_price.slice(5)
        return str_price;
    }
    render() {
        const { products, employee, account, clients, orders } = this.state;  
        const { Login, Logout, getPrice, getNamebyID, getImgbyID, getMultiplePrice } = this;
        return (
            <DataContext.Provider value={{ products,  employee, account, clients, orders, Logout, Login, getPrice, getNamebyID, getImgbyID, getMultiplePrice }}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

