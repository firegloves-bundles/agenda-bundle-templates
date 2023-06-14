import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, Modal} from 'react-daisyui'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useState} from 'react';
import {useKeycloak} from '../auth/Keycloak';
import {postUser} from '../api/users';
import PropTypes from 'prop-types';
import UserForm from './ui/UserForm';

const schema = yup.object({
    name: yup.string().required(),
    lastname: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required()
}).required();

const UserAddModal = ({config, handleAddToast, updateUsersTable}) => {
    const [visible, setVisible] = useState(false);
    const keycloak = useKeycloak();
    const toggleVisible = () => {
        setVisible(!visible);
        reset();
    }

    const {
        control,
        reset, handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            name: '',
            lastname: '',
            address: '',
            phone: '',
        },
        resolver: yupResolver(schema)
    });

    const onClickClose = () => {
        toggleVisible();
        reset();
    }

    const onSubmit = async (data) => {
        toggleVisible();
        try {
            const res = await postUser(config, keycloak.token, data);

            if (res.responseType === 'OK') {
                handleAddToast(`User ${res.data.id} ${res.data.name} ${res.data.lastname} added!`, 'success');
                updateUsersTable(res.data, 'add');
                reset();
            } else {
                handleAddToast(`Add contact failed!`, 'error');
            }
        }
        catch(error){
            handleAddToast(`Add contact failed!`, 'error');
        };
    }

    return (
        <div className="float-right">
            <Button onClick={toggleVisible} className="mb-3 mt-3">Add User</Button>
            <Modal open={visible}>
                <Modal.Header className="font-bold">
                    Add User
                </Modal.Header>
                <Modal.Body>
                    <UserForm onSubmit={handleSubmit(onSubmit)}
                              control={control}
                              render={({field}) => <Input {...field} />}
                              errors={errors}
                              onClickClose={onClickClose}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

UserAddModal.propTypes = {
    config: PropTypes.any.isRequired,
    handleAddToast: PropTypes.func.isRequired,
    updateUsersTable: PropTypes.func.isRequired,
}
export default UserAddModal;
