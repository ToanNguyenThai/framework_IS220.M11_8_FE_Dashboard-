import axios from 'axios';
import React, { Component } from 'react'
import { DataContext } from '../Context'

class Edit_product extends Component {
    static contextType = DataContext;
    state = {
        product_details: [],
        product_overall: [],
        updateQuantity: 0,
        color: '',
        size: '',
        quantity: '',
        name: '',
        price: null,
        type: '',
    }
    getOverall = () => {
        if (this.props.match.params.id) {
            const result = this.context.products;
            const data = result.filter(item => {
                return item.id === this.props.match.params.id;
            })
            result.map(item =>{
                this.setState({
                    name: item.product_name,
                    price: parseInt(item.product_price) ,
                    type: item.product_type
                })
            })
            this.setState({
                product_overall: data
            })
        }
    }
    getDetails = () => {
        axios({
            method: "GET",
            url: `https://localhost:44328/api/ProductDetails/${this.props.match.params.id}/GetAll`,
        }).then(res => {
            this.setState({
                product_details: res.data
            })
        })
    }
    componentDidMount() {
        this.getOverall();
        this.getDetails();
    }
    addForm = () => { /* Thêm form update số lượng */
        var obj = document.getElementsByClassName('add_product_details')
        obj[0].classList.add('add_product_details_show')

        var obj_text = document.getElementsByClassName('add_details')
        obj_text[0].classList.add('inactive')
    }

    

    setSize = (val) => {
        this.setState({
            size: val.target.value
        })

    }
    setColor = (val) => {
        this.setState({
            color: val.target.value
        })

    }
    setQuantity = (val) => {
        this.setState({
            quantity: val.target.value
        })
    }

    setName = (val) => {
        this.setState({
            name: val.target.value
        })

    }
    setPrice = (val) => {
        this.setState({
            price: val.target.value
        })

    }
    setType = (val) => {
        this.setState({
            type: val.target.value
        })
    }
   
    updateValue = (val) => {
        this.setState({ /* lấy số lượng mới */
            updateQuantity: val.target.value
        })
    }
    updateDetails = async (id) => {

        const updateValue = {
            product_id: this.props.match.params.id,
            product_detail_id: id.toString(),
            quantity: parseInt(this.state.updateQuantity)
        }
        console.log(updateValue);
        await axios({
            method: 'PUT',
            url: `https://localhost:44328/api/ProductDetails/${this.props.match.params.id}/Update2`,
            data: updateValue
        })
        alert("Cập nhật số lượng thành công")
    }
    
    addDetails = () => {        
    
        const newValue = {
            id: '',
            product_detail_color: this.state.color,
            product_detail_size: this.state.size,
            product_detail_quantity: this.state.quantity
        }
        console.log(newValue);
         axios({
            method: 'POST',
            url: `https://localhost:44328/api/ProductDetails/${this.props.match.params.id}/Post`,
            data: newValue
        })
    }
    updateOverall = async () =>{
        let Product = {
            id: this.props.match.params.id,
            product_name: this.state.name,
            product_price: parseInt(this.state.price),
            product_type: this.state.type,
        }
        console.log(Product);
        axios({
            method: 'PUT',
            url: 'https://localhost:44328/api/Products/Update',
            data: Product
        });
    }

    updateEverything = () =>{
        this.addDetails()
        this.updateOverall()
        alert("Cập nhật thành công")
    }
    render() {
        const { product_overall, product_details } = this.state

        return (
            <div className="Edit_products inside-grid">
                <h1>Chỉnh sửa sản phẩm</h1>
                <div className="Edit_products_container">
                    <form className='form' >
                        {
                            product_overall.map(overall_item => (
                                <div className='Edit_form'>
                                    <h2>Thông tin tổng quan</h2>
                                    <div className="form-element">
                                        <h3>Tên sản phẩm: </h3>
                                        <input onChange={this.setName} type="text" placeholder="Type here" defaultValue={overall_item.product_name} />
                                    </div>

                                    <div className="form-element">
                                        <h3>Giá sản phẩm: </h3>
                                        <input onChange={this.setPrice} type="text" placeholder="Type here" defaultValue={overall_item.product_price} />
                                    </div>

                                    <div className="form-element">
                                        <h3>Loại sản phẩm: </h3>
                                        <input onChange={this.setType} type="text" placeholder="Type here" defaultValue={overall_item.product_type} />
                                    </div>


                                </div>

                            ))
                        }
                        <h2>Chi tiết sản phẩm</h2>
                        {
                            product_details.map(details_item => (
                                <div className='product_details'>

                                    <div className='product_details_item'>
                                        <h3 className='edit_color'>Màu: </h3>
                                        <input disabled className='edit_form_color' type='text' value={details_item.product_detail_color} />
                                    </div>
                                    <div className='product_details_item'>
                                        <h3 className='edit_size'>Size: </h3>
                                        <input disabled className='edit_form_size' type='text' value={details_item.product_detail_size} />
                                    </div>
                                    <div className='product_details_item '>
                                        <h3 className='edit_quantity'>Số lượng: </h3>
                                        <input onChange={this.updateValue} className='edit_form_quantity' type='text' defaultValue={details_item.product_detail_quantity} />
                                    </div>
                                    <div onClick={() => this.updateDetails(details_item.id)} className='btn-save'>
                                        <i class="fas fa-save"></i>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='add_product_details'>

                            <div className='product_details_item details_color'>
                                <h3 className='edit_color'>Màu: </h3>
                                <input onChange={this.setColor} className='edit_form_color' type='text' />
                            </div>
                            <div className='product_details_item details_size'>
                                <h3 className='edit_size'>Size: </h3>
                                <input onChange={this.setSize} className='edit_form_size' type='text' />
                            </div>
                            <div className='product_details_item details_quantity'>
                                <h3 className='edit_quantity'>Số lượng: </h3>
                                <input onChange={this.setQuantity} className='edit_form_quantity' type='text' />
                            </div>

                        </div>

                        <div className="add_details" onClick={() => this.addForm()}><u>Thêm chi tiết sản phẩm</u></div>
                        <div className="btn-area">
                            <div className="btn" onClick={() => this.updateEverything()}>Sửa sản phẩm</div >
                        </div>
                    </form>
                </div>

            </div>
        );
    }

}

export default Edit_product;