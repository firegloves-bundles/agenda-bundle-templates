import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Modal} from 'react-daisyui'
import {deleteUser} from '../api/users';
import {useKeycloak} from '../auth/Keycloak';
import PropTypes from 'prop-types';

const DeleteUserModal = ({visible, toggleVisible, userId, handleAddToast, updateUsersTable, config}) => {
    const keycloak = useKeycloak();

    const {handleSubmit} = useForm({});

    const onSubmit = () => {
        deleteUser(config, keycloak.token, userId).then(r => {
                if (r.responseType === 'OK') {
                    handleAddToast(`Contact ${userId} deleted!`, 'success');
                    updateUsersTable({'id': userId}, 'delete');
                } else {
                    handleAddToast(`Delete contact ${userId} failed!`, 'error');
                }
            }
        );
        toggleVisible();
    }

    return (
        <Modal open={visible}>
            <Modal.Header className="font-bold">
                Do you want to delete the user {userId}?
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Actions className="place-content-between">
                        <div className='btn' onClick={toggleVisible}>Cancel</div>
                        <Button>Confirm</Button>
                    </Modal.Actions>
                </form>
            </Modal.Body>
        </Modal>
    );
}

DeleteUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleVisible: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    handleAddToast: PropTypes.func.isRequired,
    updateUsersTable: PropTypes.func.isRequired,
    config: PropTypes.any.isRequired
}

export default DeleteUserModal;