import React, { Component } from 'react'

import './style.css'
import Header from '../../components/header'
import Footer from '../../components/footer'
import sticker from '../../assets/images/sticker.png'
import Navigation from '../../components/navigation'
import Slider from '../../components/home/sliders'
import Banner from '../../components/home/banner'
import ProductPopular from '../../components/home/productPopular'
import HotProduct from '../../components/home/hotProduct'
import NewProduct from '../../components/home/newProduct'
import OutdoorProduct from '../../components/home/outdoorProduct'
import Blog from '../../components/home/blog'
import Newsletter from '../../components/home/newsletter'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Slider/>
                <Banner/>
                <ProductPopular/>
                <HotProduct/>
                <NewProduct/>
                <OutdoorProduct/>
                <NewProduct/>
                <Blog/>
                <Newsletter/>
                <Footer/>
            </div>
        )
    }
}
