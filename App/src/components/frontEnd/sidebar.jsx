
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/category';
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    componentDidMount() {
        this.props.actions.getList()
            .then(data => this.setState({ items: this.listToTree(data?.data?.items) }));
    }

    closeNav() {
        var closemyslide = document.getElementById("mySidenav");
        if (closemyslide)
            closemyslide.classList.remove('open-side');
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensub1'))
            event.target.nextElementSibling.classList.remove('opensub1')
        else {
            document.querySelectorAll('.opensub1').forEach(function (value) {
                value.classList.remove('opensub1');
            });
            event.target.nextElementSibling.classList.add('opensub1')
        }
    }
    handleSubTwoMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensub2'))
            event.target.nextElementSibling.classList.remove('opensub2')
        else {
            document.querySelectorAll('.opensub2').forEach(function (value) {
                value.classList.remove('opensub2');
            });
            event.target.nextElementSibling.classList.add('opensub2')
        }
    }
    handleSubThreeMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensub3'))
            event.target.nextElementSibling.classList.remove('opensub3')
        else {
            document.querySelectorAll('.opensub3').forEach(function (value) {
                value.classList.remove('opensub3');
            });
            event.target.nextElementSibling.classList.add('opensub3')
        }
    }
    handleSubFourMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensub4'))
            event.target.nextElementSibling.classList.remove('opensub4')
        else {
            document.querySelectorAll('.opensub4').forEach(function (value) {
                value.classList.remove('opensub4');
            });
            event.target.nextElementSibling.classList.add('opensub4')
        }
    }

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensidesubmenu'))
            event.target.nextElementSibling.classList.remove('opensidesubmenu')
        else {
            event.target.nextElementSibling.classList.add('opensidesubmenu')
        }
    }
    listToTree = (data) => {
        if(!data?.length)  return [];

        const newData = data.map(item => ({ ...item, ['children']: null }));
        var ID_KEY = 'id';
        var PARENT_KEY = 'parent_id';
        var CHILDREN_KEY = 'children';

        var tree = [],
            childrenOf = {};
        var item, id, parentId;

        for (var i = 0, length = newData.length; i < length; i++) {
            item = newData[i];
            id = item[ID_KEY];
            parentId = item[PARENT_KEY] || 0;
            // every item may have children
            childrenOf[id] = childrenOf[id] || [];
            // init its children
            item[CHILDREN_KEY] = childrenOf[id];
            if (parentId != 0) {
                // init its parent's children object
                childrenOf[parentId] = childrenOf[parentId] || [];
                // push it into its parent's children object
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        };
        return tree;
    }

    renderMenu = (items) => {
        if (items.length > 0) {
            return (
                items.map((item, index) => {
                    if (item.children.length > 0) {
                        return (
                            <li key={index}>
                                <Link to={`/categories/${item.id}`} onClick={(e) => this.handleSubmenu(e)}>
                                    {item.name}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul>
                                    {this.renderSubMenu(item.children)}
                                </ul>
                            </li>
                        )
                    } else {
                        return (
                            <li key={index}>
                                <Link to={`/categories/${item.id}`} >
                                    {item.name}
                                </Link>
                            </li>
                        )
                    }
                })
            )
        }
    }
    renderSubMenu = (items) => {
        return (
            items.map((item, index) => {
                if (item.children.length > 0) {
                    return (
                        <li key={index}>
                            <Link to={`/categories/${item.id}`} onClick={(e) => this.handleSubTwoMenu(e)} >
                                {item.name}
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                {this.renderSubTowMenu(item.children)}
                            </ul>
                        </li>
                    )
                } else {
                    return (
                        <li key={index}>
                            <Link to={`/categories/${item.id}`}  >
                                {item.name}
                            </Link>
                        </li>
                    )
                }
            })


        )
    }
    renderSubTowMenu = (items) => {
        return (
            items.map((item, index) => {
                if (item.children.length > 0) {
                    return (
                        <li key={index}>
                            <Link to={`/categories/${item.id}`} onClick={(e) => this.handleSubThreeMenu(e)} >
                                {item.name}
                                <span className="sub-arrow"></span>
                            </Link>
                        </li>
                    )
                } else {
                    return (
                        <li key={index}>
                            <Link to={`/categories/${item.id}`}  >
                                {item.name}
                            </Link>
                        </li>
                    )
                }
            })
        )
    }
    render() {
        const { items } = this.state;
        return (
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="sidebar-overlay" onClick={this.closeNav}></a>
                <nav>
                    <a onClick={this.closeNav}>
                        <div className="sidebar-back text-left">
                            <i className="fa fa-angle-left pr-2" aria-hidden="true"></i> Quay lại
                        </div>
                    </a>
                    <ul id="sub-menu" className="sidebar-menu">
                        {
                            items &&
                            this.renderMenu(items)
                        }
                    </ul>
                </nav>
            </div>

        )
    }
}


export default connect(SideBar, state => ({
    category: state.categoryHome
}), actions);
