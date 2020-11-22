import React, { Component } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'
import Navigation from '../../components/navigation'
import Map from '../../components/contact/map'

export default class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                    <Header />
                    <div className="contact">
                       <Map/>
                    </div>
                
                    <Footer />
            </React.Fragment>
        )
    }
}