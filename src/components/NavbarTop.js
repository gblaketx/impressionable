import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { IoMdCreate, IoMdDownload } from 'react-icons/io';
import sigma from '../icons/sigma.svg';    

export default class NavbarTop extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
        };
    }
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }
    render() {
        const { onAddDraggable } = this.props;
        return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Impressions</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={() => onAddDraggable('math')}>
                                <img width={20} height={20} src={sigma} alt="sigma" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => onAddDraggable('canvas')}>
                                <IoMdCreate />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => window.TogetherJS(this)}>Start Collaboration</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => window.print()}>
                                <IoMdDownload />
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}
