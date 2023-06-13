import {Toast} from 'react-daisyui';
import NotificationSuccess from './NotificationSuccess';
import NotificationError from './NotificationError';
import PropTypes from 'prop-types';

const Notifications = ({alerts, handleRemoveToast}) => {
    return <Toast>
        {alerts.map((alert, index) => (
            alert.status === 'error' ?
                <NotificationError key={index} alert={alert} onClick={() => handleRemoveToast(index)}/>
                :
                <NotificationSuccess key={index} alert={alert} onClick={() => handleRemoveToast(index)}/>
        ))}
    </Toast>
}

Notifications.propTypes = {
    alerts: PropTypes.arrayOf(
        PropTypes.shape({
                text: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
            }
        )),
    handleRemoveToast: PropTypes.func.isRequired,
}

export default Notifications;