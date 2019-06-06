import React, { PureComponent } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
    IoIosCamera,
    IoMdCreate,
    IoMdDownload,
    IoIosInformationCircleOutline } from 'react-icons/io';
import PropTypes from 'prop-types';
import sigma from '../../icons/sigma.svg'; 
import collab from '../../icons/collab.png';
import './WebCamModal.css'; 
import WebCamAndCrop from '../WebCamAndCrop';


class InstructionsModal extends PureComponent {
  render() {
    const { isOpen, toggle } = this.props;
    // const alignedImage = { position: 'absolute', 'marginTop': 10 };
    // const alignedSpan = { display: 'inline-block', paddingLeft: '40px', whiteSpace: 'normal' };

    return (
      <Modal
        isOpen={isOpen}
        style={{ maxWidth: '1000px', width: '90%'}}
      >
        <ModalHeader toggle={toggle}>Webcam Capture</ModalHeader>
        <ModalBody>
          <WebCamAndCrop />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>Done!</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

InstructionsModal.propTypes = {
  /** Whether or not the modal is open */
  isOpen: PropTypes.bool.isRequired,

  /** Callback that toggles modal display */
  toggle: PropTypes.func.isRequired  
};

export default InstructionsModal;