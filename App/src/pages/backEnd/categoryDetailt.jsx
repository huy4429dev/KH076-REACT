import React, { Component } from 'react';

class CategoryDetailt extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        console.log(id);
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default CategoryDetailt;