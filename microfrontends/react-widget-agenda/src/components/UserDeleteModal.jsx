import * as React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-daisyui'


const UserDeleteModal = ({visible, toggleVisible, userId, handleConfirmDelete}) => {
    return (
        <Modal open={visible}>
            <Modal.Header className="font-bold">
                Do you want to delete the user {userId}?
            </Modal.Header>
            <Modal.Body>
                <Modal.Actions className="place-content-between">
                    <div className='btn btn-secondary' onClick={toggleVisible}>Cancel</div>
                    <Button className='btn btn-primary'onClick={handleConfirmDelete}>Confirm</Button>
                </Modal.Actions>
            </Modal.Body>
        </Modal>
    );
}

UserDeleteModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleVisible: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired
}

export default UserDeleteModal;
