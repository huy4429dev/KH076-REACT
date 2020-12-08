import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import SlideToggle from 'react-slide-toggle';


class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openFilter: false,
            price: 0
        }
    }

    closeFilter = () => {
        document.querySelector(".collection-filter").style = "left: -365px";
    }

    clickBrandHendle(event, brands) {

        var index = brands.indexOf(event.target.value);
        if (event.target.checked)
            brands.push(event.target.value); // push in array checked value
        else
            brands.splice(index, 1); // removed in array unchecked value

        this.props.filterBrand(brands);
    }

    colorHandle(event, color) {
        var elems = document.querySelectorAll(".color-selector ul li");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        event.target.classList.add('active');
        this.props.filterColor(color)
    }

    render() {
        // const filteredBrands = this.props.filters.brand;
        const filteredBrands = "xxx";
        console.log(this.state);
        const brands = [];
        const colors = [];
        return (
            <div className="collection-filter-block">
                {/*brand filter start*/}
                <div className="collection-mobile-back">
                    <span className="filter-back" onClick={(e) => this.closeFilter(e)} >
                        <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                </div>
                <SlideToggle>
                    {({ onToggle, setCollapsibleElement }) => (
                        <div className="collection-collapse-block">
                            <h3 className="collapse-block-title" onClick={onToggle}>brand</h3>
                            <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                                <div className="collection-brand-filter">
                                    {brands.map((brand, index) => {
                                        return (
                                            <div className="custom-control custom-checkbox collection-filter-checkbox" key={index}>
                                                <input type="checkbox" onClick={(e) => this.clickBrandHendle(e, filteredBrands)} value={brand} defaultChecked={filteredBrands.includes(brand) ? true : false} className="custom-control-input" id={brand} />
                                                <label className="custom-control-label"
                                                    htmlFor={brand}>{brand}</label>
                                            </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </SlideToggle>

                {/*color filter start here*/}
                <SlideToggle>
                    {({ onToggle, setCollapsibleElement }) => (
                        <div className="collection-collapse-block">
                            <h3 className="collapse-block-title" onClick={onToggle}>colors</h3>
                            <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                                <div className="color-selector">
                                    <ul>
                                        {colors.map((color, index) => {
                                            return (
                                                <li className={color} title={color} onClick={(e) => this.colorHandle(e, color)} key={index}></li>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </SlideToggle>
                {/*price filter start here */}
                <SlideToggle>
                    {({ onToggle, setCollapsibleElement }) => (
                        <div className="collection-collapse-block open">
                            <h3 className="collapse-block-title" onClick={onToggle}>price</h3>
                            <div className="collection-collapse-block-content block-price-content" ref={setCollapsibleElement}>
                                <div className="collection-brand-filter">
                                    <div className="custom-control custom-checkbox collection-filter-checkbox">
                                        <InputRange
                                            maxValue={1000000}
                                            minValue={0}
                                            value={this.state.price}
                                            onChange={value => {
                                                this.setState({ price: value })
                                                this.props.filterPrice(value)
                                            }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </SlideToggle>
            </div>
        )
    }
}


export default Filter;