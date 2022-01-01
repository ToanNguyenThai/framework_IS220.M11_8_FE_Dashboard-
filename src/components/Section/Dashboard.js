import React, { Component } from 'react'
import { DataContext } from '../Context'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

class Dashboard extends Component {
    static contextType = DataContext;
    state = {
        str_total: '',
        count_order: null,
        count_product: null,
        all_Order: []
    }
    componentDidMount() {
        this.getStat();
        this.getSale()
        this.setState({
            all_Order: [
                {
                    name: '01-12-2021',
                    sales: this.getSale("2021-12-01")
                },
                {
                    name: '02-12-2021',
                    sales: this.getSale("2021-12-02")
                },
                {
                    name: '03-12-2021',
                    sales: this.getSale("2021-12-03")
                },
                {
                    name: '04-12-2021',
                    sales: this.getSale("2021-12-04")
                },
                {
                    name: '05-12-2021',
                    sales: this.getSale("2021-12-05")
                },
                {
                    name: '06-12-2021',
                    sales: this.getSale("2021-12-06")
                },
                {
                    name: '07-12-2021',
                    sales: this.getSale("2021-12-07")
                },
                {
                    name: '08-12-2021',
                    sales: this.getSale("2021-12-08")
                },
                {
                    name: '09-12-2021',
                    sales: this.getSale("2021-12-09")
                },
                {
                    name: '10-12-2021',
                    sales: this.getSale("2021-12-10")
                },
                {
                    name: '11-12-2021',
                    sales: this.getSale("2021-12-11")
                },
                {
                    name: '12-12-2021',
                    sales: this.getSale("2021-12-12")
                },
                {
                    name: '13-12-2021',
                    sales: this.getSale("2021-12-13")
                },
                {
                    name: '14-12-2021',
                    sales: this.getSale("2021-12-14")
                },
                {
                    name: '15-12-2021',
                    sales: this.getSale("2021-12-15")
                },
                {
                    name: '16-12-2021',
                    sales: this.getSale("2021-12-16")
                },
                {
                    name: '17-12-2021',
                    sales: this.getSale("2021-12-17")
                },
                {
                    name: '18-12-2021',
                    sales: this.getSale("2021-12-18")
                },
                {
                    name: '19-12-2021',
                    sales: this.getSale("2021-12-19")
                },
                {
                    name: '20-12-2021',
                    sales: this.getSale("2021-12-20")
                },
                ,
                {
                    name: '21-12-2021',
                    sales: this.getSale("2021-12-21")
                },
                {
                    name: '22-12-2021',
                    sales: this.getSale("2021-12-22")
                },
                {
                    name: '23-12-2021',
                    sales: this.getSale("2021-12-23")
                },
                {
                    name: '24-12-2021',
                    sales: this.getSale("2021-12-24")
                },
                ,
                {
                    name: '25-12-2021',
                    sales: this.getSale("2021-12-25")
                },
                {
                    name: '26-12-2021',
                    sales: this.getSale("2021-12-26")
                },
                {
                    name: '27-12-2021',
                    sales: this.getSale("2021-12-27")
                },
                {
                    name: '28-12-2021',
                    sales: this.getSale("2021-12-28")
                },
                {
                    name: '29-12-2021',
                    sales: this.getSale("2021-12-29")
                },
                {
                    name: '30-12-2021',
                    sales: this.getSale("2021-12-30")
                },
                {
                    name: '31-12-2021',
                    sales: this.getSale("2021-12-31")
                },


            ]
        })
    }
    getStat = () => {
        var total = 0;
        this.context.orders.forEach(item => {
            if (item.order_status === 'Đã giao')
                total = total + item.order_total
        })
        var tmp_total = total.toString()
        if (tmp_total.length === 7) {
            //Chuõi giá tiền = 7 thì chèn , vô chỗ số 1 và 5
            tmp_total = tmp_total.slice(0, 1) + "," + tmp_total.slice(1)
            tmp_total = tmp_total.slice(0, 5) + "," + tmp_total.slice(5)
        }
        else if (tmp_total.length > 7) {
            //Chuỗi giá tiền > 7 thì chèn , vô chỗ số 1 + i và 5 + i
            let i = tmp_total.length - 7
            tmp_total = tmp_total.slice(0, 1 + i) + "," + tmp_total.slice(1 + i)
            tmp_total = tmp_total.slice(0, 5 + i) + "," + tmp_total.slice(5 + i)
        }
        var total = 0;
        this.context.orders.forEach(element => {
            if (element.order_status === 'Đã giao')
                total = total + 1;
        });

        this.setState({
            str_total: tmp_total,
            count_order: total,
            count_product: this.context.products.length
        })
    }
    getSale = (date) => {
        var total = 0;
        this.context.orders.forEach(element => {
            if (element.order_date.includes(date) && element.order_status === 'Đã giao')
                total = total + element.order_total
        });
        return total;
    }

    render() {
        console.log(this.state.all_Order);
        return (
            <div className="Dashboard inside-grid">
                <h1 className="Dashboard-header">Dashboard</h1>
                <div className='stat'>
                    <div className='stat-item money'>
                        <div className='icon-overlay'>
                            <div className='icon-container'>
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                        <div className='stat-information'>
                            <h3>Total Sales</h3>
                            <h2>$ {this.state.str_total}</h2>
                        </div>
                    </div>
                    <div className='stat-item orders'>
                        <div className='icon-overlay'>
                            <div className='icon-container'>
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                        </div>
                        <div className='stat-information'>
                            <h3>Total Orders</h3>
                            <h2>{this.state.count_order}</h2>
                        </div>
                    </div>
                    <div className='stat-item products'>
                        <div className='icon-overlay'>
                            <div className='icon-container'>
                                <i class="fas fa-shopping-basket"></i>
                            </div>
                        </div>
                        <div className='stat-information'>
                            <h3>Total Products</h3>
                            <h2>{this.state.count_product}</h2>
                        </div>
                    </div>
                </div>
                <h1 className='chart_title'>THỐNG KÊ DOANH SỐ</h1>
                <BarChart
                    width={1200}
                    height={500}
                    data={this.state.all_Order}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#3167eb" />
                </BarChart>
            </div>
        );
    }

}

export default Dashboard;