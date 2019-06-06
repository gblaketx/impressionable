import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import ReactTooltip from 'react-tooltip'
import {
    IoMdCreate,
    IoMdDownload,
    IoIosInformationCircleOutline,
    IoIosPersonAdd } from 'react-icons/io';
import sigma from '../icons/sigma.svg';
import logo from '../icons/contract.svg';

export default class NavbarTop extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { isOpen: false };
    }
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }
    render() {
        const { onAddDraggable, toggleModal } = this.props;
        return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                    <div>
                        <img width={25} height={25} src={logo} alt="logo" />
                        {' '}
                        Impressions
                    </div>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem data-tip="Insert an equation">
                            <NavLink onClick={() => onAddDraggable('math')}>
                                <img width={25} height={25} src={sigma} alt="sigma" />
                            </NavLink>
                        </NavItem>
                        <NavItem data-tip="Insert a drawing canvas">
                            <NavLink onClick={() => onAddDraggable('canvas')}>
                                <IoMdCreate style={{ width: 30, height: 30 }} />
                            </NavLink>
                        </NavItem>
                        <NavItem data-tip="Toggle collaboration">
                            <NavLink onClick={() => window.TogetherJS(this)}>
                                <IoIosPersonAdd style={{ width: 30, height: 30 }} />
                            </NavLink>
                        </NavItem>
                        <NavItem data-tip="Save your notes to a PDF">
                            <NavLink onClick={() => window.print()}>
                                <IoMdDownload style={{ width: 30, height: 30 }} />
                            </NavLink>
                        </NavItem>
                        <NavItem data-tip="Help">
                            <NavLink onClick={toggleModal}>
                                <IoIosInformationCircleOutline style={{ width: 30, height: 30 }} />
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <ReactTooltip />
        </div>
        );
    }
}
