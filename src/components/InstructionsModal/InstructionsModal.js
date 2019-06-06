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
import './InstructionsModal.css'; 

class InstructionsModal extends PureComponent {
  render() {
    const { isOpen, toggle } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        style={{ maxWidth: '1000px', width: '90%'}}
      >
        <ModalHeader toggle={toggle}>Welcome to Impressions!</ModalHeader>
        <ModalBody>
          Impressions is your one-stop shop for remote tutoring. Whether you want
          to write an equation or draw some notes on a picture, we've got you covered!
          <br />
          <br />
          Here's a quick tour:
          <div className="noWrap">
            <img width={25} height={25} src={collab} alt="collab" />
            <span className="alignedSpan">
              Start collaborating: Use the blue toolbar to invite someone to join the
              session via a link. Whatever you type, draw, and drag will be visible
              to everyone you've invited!
            </span>
          </div>
          <div className="noWrap">
            <img width={30} height={30} src={sigma} alt="sigma" />
            <span className="alignedSpan">
              Make some math: Use the Sigma button to insert an equation. Use LaTeX
              syntax like \sum for some math magic! You can also drag the equation
              around to your heart's content.
            </span>
          </div>
          <div className="noWrap">
            <IoMdCreate style={{ width: 30, height: 30 }} />
            <span className="alignedSpan">
              Doodle a bit: Tap on the pencil to get a draggable canvas perfect
              for a quick sketch or annotating a picture.
            </span>
          </div>
          <div className="noWrap">
            <IoIosCamera style={{ width: 30, height: 30 }} />
            <span className="alignedSpan">
              Snap a picture: Click the camera to use your laptop camera to take a 
              picture, which will be added to your notes.
            </span>
          </div>
          <div className="noWrap">
            <IoMdDownload style={{ width: 30, height: 30 }} />
            <span className="alignedSpan">
              Save your work: Print your session notes or save them to PDF.
            </span>
          </div>
          <br />
          Need a refresher? Just press <IoIosInformationCircleOutline style={{ width: 30, height: 30 }} /> to see this page again!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Got it!</Button>
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