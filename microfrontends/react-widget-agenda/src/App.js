import {Container} from './components/ui/Container';
import {Loading} from './components/ui/Loading';
import UsersTable from './components/UsersTable';
import UserAddModal from './components/UserAddModal';
import {useUsers} from './hooks/useUsers';
import Notifications from './components/ui/Notifications';
import {useState} from 'react';
import EmptyAgenda from "./components/EmptyAgenda";


function App({config}) {
    const [notificationId, setNotificationId] = useState(0);
    const [users, setUsers] = useState([]);
    const {isLoading} = useUsers(config, users, setUsers);
    const [alerts, setAlerts] = useState([]);

    const handleAddToast = (text, status) => {
        setAlerts((alerts) => [
            ...alerts,
            {
                id: notificationId,
                text: text,
                status: status
            },
        ])
        setNotificationId(notificationId+1);
    }

    const handleRemoveToast = (index) => {
        setAlerts((alerts) => alerts.filter((val, i) => i !== index))
    }

    const updateUsersTable = (updatedUser, actionType) => {
        switch (actionType) {
            case 'add':
                setUsers(current => [...current, updatedUser]);
                break;
            case 'delete':
                setUsers((users) =>
                    users.filter(user => user.id !== updatedUser.id),
                );
                break;
            case 'edit':
                const updatedUsers = users.map((user) => {
                    return (user.id === updatedUser.id) ? updatedUser : user;
                });
                setUsers(updatedUsers);
                break;
            default:
                break;
        }
    }

    return (
        // NOTE: data-theme is for propagate the css variables theme through the shadow dom
        <div data-theme="light">
            <Container>
                {isLoading ? (
                    <Loading/>
                ) : (
                    <div>
                        <div className="pt-3">
                            <span className="text-2xl w-64 mt-3">Users Agenda</span>
                            <UserAddModal handleAddToast={handleAddToast} updateUsersTable={updateUsersTable}
                                          config={config}/>
                        </div>
                        {(users.length === 0) ? <EmptyAgenda/> :
                            <UsersTable users={users} config={config} handleAddToast={handleAddToast}
                                        updateUsersTable={updateUsersTable}/>
                        }
                        <Notifications alerts={alerts}
                                       handleRemoveToast={handleRemoveToast}></Notifications>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default App;
