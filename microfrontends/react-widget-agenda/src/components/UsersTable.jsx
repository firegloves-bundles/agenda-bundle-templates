import * as React from 'react';
import UsersTableRowActions from './UsersTableRowActions';
import {Table} from 'react-daisyui';
import PropTypes from 'prop-types';

const UsersTable = ({config, handleAddToast, updateUsersTable, users}) => {
    const sortedUsers = users.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
    return (
        <Table className="table w-full mb-3" zebra={true}>
            <Table.Head>
                <span>ID</span>
                <span>NAME</span>
                <span>LAST NAME</span>
                <span>ADDRESS</span>
                <span>PHONE NUMBER</span>
                <span></span>
            </Table.Head>
            <Table.Body>
                {sortedUsers.map((user) => (

                    <Table.Row key={user.id} className="hover">
                        <span>{user.id}</span>
                        <span>
                {user.name}
              </span>
                        <span>{user.lastname}</span>
                        <span>{user.address}</span>
                        <span>{user.phone}</span>
                        <span>
                <UsersTableRowActions user={user}
                                      config={config}
                                      handleAddToast={handleAddToast}
                                      updateUsersTable={updateUsersTable}/>
              </span>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

UsersTable.propTypes = {
    config: PropTypes.any.isRequired,
    handleAddToast: PropTypes.func.isRequired,
    updateUsersTable: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string,
                lastName: PropTypes.string,
                address: PropTypes.string,
                phone: PropTypes.string,
            }
        )).isRequired
}
export default UsersTable;