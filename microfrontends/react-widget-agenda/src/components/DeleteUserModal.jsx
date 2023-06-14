import * as React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-daisyui'


const DeleteUserModal = ({visible, toggleVisible, userId, handleConfirmDelete}) => {
    return (
        <Modal open={visible}>
            <Modal.Header className="font-bold">
                Do you want to delete the user {userId}?
            </Modal.Header>
            <Modal.Body>
                <Modal.Actions className="place-content-between">
                    <div className='btn' onClick={toggleVisible}>Cancel</div>
                    <Button onClick={handleConfirmDelete}>Confirm</Button>
                </Modal.Actions>
            </Modal.Body>
        </Modal>
    );
}

DeleteUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleVisible: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired
}

export default DeleteUserModal;
