import * as React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import {Input, Modal} from 'react-daisyui'
import {yupResolver} from '@hookform/resolvers/yup';
import {putUser} from '../api/users';
import {useKeycloak} from '../auth/Keycloak';

import UserForm from './ui/UserForm';

const schema = yup.object({
    name: yup.string().required(),
    lastname: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required()
}).required();


const UserEditModal = ({user, visible, toggleVisible, config, handleAddToast, updateUsersTable}) => {

    const keycloak = useKeycloak();

    const {
        control,
        reset, handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            name: user.name,
            lastname: user.lastname,
            address: user.address,
            phone: user.phone,
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const res = await putUser(config, keycloak.token, user.id, data);
            if (res.responseType === 'OK') {
                handleAddToast(`User ${user.id} edited!`, 'success');
                updateUsersTable(res.data, 'edit');
                reset();
            } else {
                handleAddToast(`Add contact failed!`, 'error');
            }
        } catch (error) {
            handleAddToast(`Add contact failed!`, 'error');
        };
        toggleVisible();
        reset({
            name: data.name,
            lastname: data.lastname,
            address: data.address,
            phone: data.phone,
        });
    }

    const onClickClose = () => {
        toggleVisible();
        reset();
    }

    return (
        <Modal open={visible}>
            <Modal.Header className="font-bold">
                Edit User {user.id}
            </Modal.Header>
            <Modal.Body>
                <UserForm onSubmit={handleSubmit(onSubmit)}
                          control={control}
                          render={({field}) => <Input {...field} />}
                          errors={errors}
                          onClickClose={onClickClose}/>
            </Modal.Body>
        </Modal>
    );
}

UserEditModal.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        lastName: PropTypes.string,
        address: PropTypes.string,
        phone: PropTypes.string,
    }).isRequired,
    visible: PropTypes.bool.isRequired,
    toggleVisible: PropTypes.func.isRequired,
    config: PropTypes.any.isRequired,
    handleAddToast: PropTypes.func.isRequired,
    updateUsersTable: PropTypes.func.isRequired
}
export default UserEditModal;
