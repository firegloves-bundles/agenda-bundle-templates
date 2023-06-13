import * as React from 'react';
import {Controller} from 'react-hook-form';
import * as PropTypes from 'prop-types';

const InputField = ({name, label, control, errors, render}) => {
    return (
        <div className='form-control'>
            <label className='label'>
                <span className='label-text'>{label}</span>
            </label>
            <Controller
                name={name}
                control={control}
                render={render}
            />
            <label className='label'>
                <span className='text-red-500'>
                    {errors[name]?.message}
                </span>
            </label>
        </div>
    )
};

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    control: PropTypes.any,
    render: PropTypes.func,
    errors: PropTypes.any
};

export default InputField;