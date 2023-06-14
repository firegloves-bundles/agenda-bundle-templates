import {Toast} from 'react-daisyui';
import NotificationSuccess from './NotificationSuccess';
import NotificationError from './NotificationError';
import PropTypes from 'prop-types';

const Notifications = ({alerts, handleRemoveToast}) => {
    return <Toast>
        {alerts.map((alert, index) => (
            alert.status === 'error' ?
                <NotificationError key={alert.id} alert={alert} onClick={() => handleRemoveToast(index)}/>
                :
                <NotificationSuccess key={alert.id} alert={alert} onClick={() => handleRemoveToast(index)}/>
        ))}
    </Toast>
}

Notifications.propTypes = {
    alerts: PropTypes.arrayOf(
        PropTypes.shape({
                id: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
            }
        )),
    handleRemoveToast: PropTypes.func.isRequired,
}

export default Notifications;