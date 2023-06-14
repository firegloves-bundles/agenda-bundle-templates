import * as React from 'react';
import {useState} from 'react';
import {Dropdown} from 'react-daisyui';
import DeleteUserModal from './DeleteUserModal';
import UserEditModal from './UserEditModal';
import PropTypes from 'prop-types';
import {deleteUser} from '../api/users';
import {useKeycloak} from '../auth/Keycloak';


const UsersTableRowActions = ({config, handleAddToast, updateUsersTable, user}) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const keycloak = useKeycloak();

    const toggleEditModalVisible = () =>{
        setEditModalVisible(!editModalVisible);
    }

    const toggleDeleteModalVisible= () => {
        setDeleteModalVisible(!deleteModalVisible);
    }

    const handleConfirmDelete = async (event) => {
        event.preventDefault();
        try {
            const res = await deleteUser(config, keycloak.token, user.id)

            if (res.responseType === 'OK') {
                handleAddToast(`Contact ${user.id} deleted!`, 'success');
                updateUsersTable({'id': user.id}, 'delete');
            } else {
                handleAddToast(`Delete contact ${user.id} failed!`, 'error');
            }

        } catch (err) {
            handleAddToast(`Delete contact ${user.id} failed!`, 'error');
        }
        toggleDeleteModalVisible()
    }

    return (
        <div className="float-right">
            <Dropdown>
                <Dropdown.Toggle>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        className='inline-block w-5 h-5 stroke-current'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                        />
                    </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className='dropdown-content menu p-2 shadow bg-base-100 rounded-box"'>
                    <Dropdown.Item onClick={toggleEditModalVisible}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={toggleDeleteModalVisible}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <UserEditModal visible={editModalVisible}
                           toggleVisible={toggleEditModalVisible}
                           user={user}
                           config={config}
                           handleAddToast={handleAddToast}
                           updateUsersTable={updateUsersTable}/>
            <DeleteUserModal visible={deleteModalVisible}
                             toggleVisible={toggleDeleteModalVisible}
                             userId={user.id}
                             handleConfirmDelete={handleConfirmDelete}  />
        </div>
    )
}

UsersTableRowActions.propTypes = {
    config: PropTypes.any.isRequired,
    handleAddToast: PropTypes.func.isRequired,
    updateUsersTable: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        lastName: PropTypes.string,
        address: PropTypes.string,
        phone: PropTypes.string,
    }).isRequired
}

export default UsersTableRowActions;
