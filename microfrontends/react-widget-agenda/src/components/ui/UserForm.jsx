import InputField from "./InputField";
import {Button, Modal} from "react-daisyui";
import PropTypes from "prop-types";
import * as React from "react";


const UserForm = ({control, errors, onClickClose, onSubmit, render}) => {
    return <form onSubmit={onSubmit}>
        <InputField name='name' label='First Name'
                    control={control}
                    render={render}
                    errors={errors}/>
        <InputField name='lastname' label='Last Name'
                    control={control}
                    render={render}
                    errors={errors}/>
        <InputField name='address' label='Address'
                    control={control}
                    render={render}
                    errors={errors}/>
        <InputField name='phone' label='Phone'
                    control={control}
                    render={render}
                    errors={errors}/>
        <Modal.Actions className='place-content-between'>
            <div className='btn' onClick={onClickClose}>Close</div>
            <Button className='btn btn-primary'>Submit</Button>
        </Modal.Actions>
    </form>;
}

UserForm.propTypes = {
    onSubmit: PropTypes.func,
    control: PropTypes.any,
    render: PropTypes.func,
    errors: PropTypes.any,
    onClickClose: PropTypes.func
};
export default UserForm;