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
import { IoMdDownload } from 'react-icons/io';
    
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
                            <NavLink onClick={() => onAddDraggable('math')}>Insert Math</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => onAddDraggable('canvas')}>Insert Annotation</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => window.TogetherJS(this)}>Start Collaboration</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => window.print()}>
                                <IoMdDownload />
                            </NavLink>
                        </NavItem>
                        {/* <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                            </DropdownItem>
                            <DropdownItem>
                                Option 2
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Reset
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}
