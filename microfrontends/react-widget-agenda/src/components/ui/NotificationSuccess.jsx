import {Button} from 'react-daisyui';
import * as PropTypes from 'prop-types';

const NotificationSuccess = ({alert, onClick}) => {
    return <div className='alert alert-success flex items-start'>
        <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6 '
             fill='none'
             viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
        </svg>
        <div className="flex flex-col w-full ">
            <span className='font-bold min-w-full'>Success!</span>
            <span className='text-xs w-full'>{alert.text}</span>
        </div>
        <Button className='btn btn-sm float-right' onClick={onClick}>x</Button>
    </div>;
}

NotificationSuccess.propTypes = {
    alert: PropTypes.shape({
        text: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default NotificationSuccess;
