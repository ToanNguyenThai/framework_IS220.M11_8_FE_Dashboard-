import React, { Component } from 'react'
import axios from 'axios';

class Add_product extends Component {
    state = {
        avatar: 'abc',
        avatarURL: '',
        detailImgage: [null],
        detailImgage_URL: [null],
        arr_Url_ID: [null], // id dẫn tới ảnh trên server tạm
        avatar_Url_Id: null,// id dẫn tới ảnh trên server tạm
        name: '',
        price: null,
        type: '',
    }
    fileObj = [];
    fileArray = [];
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
    avatarChange = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({
                    avatar: reader.result,
                    avatarURL: e.target.files[0]
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
        this.forceUpdate();
    }

    detailsImg_Upload = (e) => {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({
            detailImgage: this.fileArray, //dùng để render ảnh
            detailImgage_URL: e.target.files //dùng để POST
        })
        this.forceUpdate();
    }
    
    getAvatar = () =>{
        return this.state.avatar_Url_Id
    }
    getDetails = () =>{
        return this.state.arr_Url_ID
    }
    addProduct = (e) => {
        e.preventDefault()

        let formdata_avatar = new FormData();

        formdata_avatar.append("file", this.state.avatarURL)
        formdata_avatar.append("upload_preset", "i91vuqan")
        axios({
            url: "https://api.cloudinary.com/v1_1/dd0x1hbtf/image/upload",
            method: "POST",
            data: formdata_avatar
        }).then(res => {
            console.log(res.data);
            this.setState({
                avatar_Url_Id: res.data.url


            })
            console.log(this.state.avatar_Url_Id);
        })

        let list = this.state.detailImgage_URL
        let formdata = new FormData();
        var arr_Url = []
        for (let i = 0; i < list.length; i++) {
            formdata.append("file", list[i])
            formdata.append("upload_preset", "i91vuqan")
            axios({
                url: "https://api.cloudinary.com/v1_1/dd0x1hbtf/image/upload", // server tạm để lưu ảnh
                method: "POST",
                data: formdata
            }).then(res => {
                console.log(res);
                arr_Url.push(res.data.url) //FileID: ID dẫn đến ảnh
                this.setState({
                    arr_Url_ID: arr_Url
                })
                console.log(this.state.arr_Url_ID);
            })

        }
        //Đặt trong setInternal vì hàm này thực hiện trc khi upload ảnh, sẽ ko get đc url
        
        let timeId = setInterval(() =>{
            let newProduct = {
                id: '',
                product_name: this.state.name,
                product_price: parseInt(this.state.price),
                product_type: this.state.type,
                imageURL: this.getAvatar(),
                product_images: this.getDetails()
            }
            console.log(newProduct);
            axios({
                method: 'POST',
                url: 'https://localhost:44328/api/Products/Post3',
                data: newProduct
            });

            var form = document.querySelector("#addProduct-form");
            form.reset();  // Reset all form data
            alert("Thêm sản phẩm thành công")
            e.preventDefault();
            this.forceUpdate();  
        
        },4000)
        
        setTimeout(() => { clearInterval(timeId) }, 4700);
        
          
    }
    render() {
        const { avatar } = this.state
        return (

            <div className="Add_products inside-grid">
                <h1>Thêm sản phẩm</h1>
                <div className="Add_products_container">
                    <form id="addProduct-form" /* onSubmit={this.addProduct} */>
                        <div className="form-element">
                            <h3>Tên sản phẩm: </h3>
                            <input onChange={this.setName} type="text" placeholder="Type here" />
                        </div>



                        <div className="form-element">
                            <h3>Loại sản phẩm: </h3>
                            <input onChange={this.setType} type="text" placeholder="Type here" />
                        </div>

                        <div className="form-element">
                            <h3>Giá sản phẩm: </h3>
                            <input onChange={this.setPrice} type="text" placeholder="Type here" />
                        </div>

                        <div className="form-element">
                            <h3>Chọn ảnh đại diện: </h3>
                            <img src={avatar}></img>
                            <label  id="lb_inputImg_avatar" htmlFor="inputImg_avatar">Choose...</label>
                            <input onChange={this.avatarChange} type="file" name="image-upload" id="inputImg_avatar" accept="image/*" />
                        </div>

                        <div className="form-element">
                            <h3>Chọn ảnh chi tiết: </h3>
                            <div className="form-group multi-preview">
                                {(this.fileArray || []).map(url => (
                                    <img src={url} alt=".." />
                                ))}
                            </div>
                            <label id="lb_inputImg_details" htmlFor="inputImg_details">Choose...</label>
                            <input multiple onChange={this.detailsImg_Upload} type="file" name="image-upload" id="inputImg_details" accept="image/*" />
                        </div>



                        <div className="btn-area" >
                            <button onClick={this.addProduct}>Thêm sản phẩm</button>
                        </div>
                    </form>
                </div>

            </div>

        );
    }

}

export default Add_product;