import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, Modal} from 'react-daisyui'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './ui/InputField';
import {putUser} from '../api/users';
import {useKeycloak} from '../auth/Keycloak';
import PropTypes from 'prop-types';

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

    const onSubmit = (data) => {
        putUser(config, keycloak.token, user.id, data).then(r => {
                if (r.responseType === 'OK') {
                    handleAddToast(`User ${user.id} edited!`, 'success');
                    updateUsersTable(r.data, 'edit');
                    reset(); // reset after form submit);
                } else {
                    handleAddToast(`Add contact failed!`, 'error');
                }
            }
        );
        toggleVisible();
    }

    return (
        <Modal open={visible}>
            <Modal.Header className="font-bold">
                Edit User {user.id}
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField name='name' label='First Name'
                                control={control}
                                render={({field}) => <Input {...field} />}
                                errors={errors}/>
                    <InputField name='lastname' label='Last Name'
                                control={control}
                                render={({field}) => <Input {...field} />}
                                errors={errors}/>
                    <InputField name='address' label='Address'
                                control={control}
                                render={({field}) => <Input {...field} />}
                                errors={errors}/>
                    <InputField name='phone' label='Phone'
                                control={control}
                                render={({field}) => <Input {...field} maxLength={20}/>}
                                errors={errors}/>
                    <Modal.Actions className='place-content-between'>
                        <div className='btn' onClick={toggleVisible}>Close</div>
                        <Button className='btn btn-primary'>Submit</Button>
                    </Modal.Actions>
                </form>
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