import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, Modal} from 'react-daisyui'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useState} from 'react';
import InputField from './ui/InputField';
import {useKeycloak} from '../auth/Keycloak';
import {postUser} from '../api/users';
import PropTypes from 'prop-types';

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
        reset();
        setVisible(!visible);
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


    const onSubmit = (data) => {
        toggleVisible();
        postUser(config, keycloak.token, data).then(r => {
                if (r.responseType === 'OK') {
                    handleAddToast(`User ${r.data.id} ${r.data.name} ${r.data.lastname} added!`, 'success');
                    reset(); // reset the form after submit;
                    updateUsersTable(r.data, 'add');
                } else {
                    handleAddToast(`Add contact failed!`, 'error');
                }
            }
        );
    }
    return (
        <div className="float-right">
            <Button onClick={toggleVisible} className="mb-3 mt-3">Add User</Button>
            <Modal open={visible}>
                <Modal.Header className="font-bold">
                    Add User
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
                                    render={({field}) => <Input {...field} />}
                                    errors={errors}/>
                        <Modal.Actions className='place-content-between'>
                            <div className='btn' onClick={toggleVisible}>Close</div>
                            <Button className='btn btn-primary'>Submit</Button>
                        </Modal.Actions>
                    </form>
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