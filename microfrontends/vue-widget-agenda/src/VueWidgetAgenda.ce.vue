<script setup>
import UsersTable from "./components/UsersTable.vue";
import Container from "./components/ui/Container.vue";
import UserAddModal from "./components/UserAddModal.vue";
import {onMounted, reactive, ref} from "vue";
import {postUser, putUser, deleteUser, fetchUsers} from "./api/users.js";
import Loading from "./components/ui/Loading.vue";
import {useKeycloak} from "./keycloak.js";
import Notifications from "./components/ui/Notifications.vue";

const {instance: keycloak} = useKeycloak();
const props = defineProps({
      config: String
    }
);

let isLoading = ref(false);
let users = reactive([]);
let notifications = reactive([]);
let notificationId= ref(0);

const updateUserTableAdd = data => {
  users.unshift(data);
}

const updateUserTableEdit = user =>{
  const index = users.findIndex(u => u.id === user.id);
  if (index > -1) {
    users.splice(index, 1, user);
  }
}

const updateUserTableDelete = userId => {
  const index = users.findIndex(user => user.id === userId);
  if (index > -1) {
    users.splice(index, 1);
  }
}

const handleAddToast = (text, status) => {
  const alert = {
    id: notificationId.value,
    text: text,
    status: status
  }
  notifications.push(alert);
  notifications.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
  notificationId.value++;
};

const handleRemoveToast = index => {
  const notificationIndex = notifications.findIndex(n => n.id === index);
  if (index > -1) {
    notifications.splice(notificationIndex, 1);
  }
};

const deleteUserClick = async userId => {
  isLoading = true;
  if (keycloak.value.authenticated) {
    const res = await deleteUser(props.config, userId);
    if (res.responseType === "OK") {
      handleAddToast(`User ${userId} deleted `,'success');
      updateUserTableDelete(userId);

    }else{
      handleAddToast(`Delete User ${userId} failed`,'error');
    }
  } else {
    handleAddToast(`Delete User ${userId} failed. Not authenticated`,'error');
    console.warn("Not authenticated");
  }
  isLoading = false;
};

const addUserClick = async user => {
  isLoading = true;
  if (keycloak.value.authenticated) {
    const res = await postUser(props.config, user);
    if (res.responseType === "OK") {
      handleAddToast(`User ${res.data.id} - ${res.data.name} ${res.data.lastname} added`,'success');
      updateUserTableAdd(res.data);
    } else {
      handleAddToast(`Add contact ${user.id} failed!`,'error');
    }
  } else {
    console.warn("Not authenticated")
    handleAddToast(`Add contact ${user.id} failed! Not authenticated`,'error');
  }
  isLoading = false;
};

const editUserClick = async (user) => {
  isLoading = true;

  if (keycloak.value.authenticated) {
    const res = await putUser(props.config, user.id, user);
    if (res.responseType === "OK") {
      updateUserTableEdit(user);
      handleAddToast(`User ${user.id} edited!`,'success');
    } else  {
      handleAddToast(`Edit user ${user.id} failed!`,'error');
    }
  } else {
    console.warn("keycloak not authenticated")
    handleAddToast(`Edit user ${user.id} failed! Not authenticated`,'error');
  }
  isLoading = false;
};

const loadUsers = () => {
  isLoading = true;
  if (keycloak.value.authenticated) {
    const req = async () => {
      const u = await fetchUsers(props.config);
      users.push(...u.data);
      users.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
    };
    req();
  } else {
    console.warn("Not authenticated")
  }
  isLoading = false;
};;

onMounted(() => {
  loadUsers();
});

</script>

<template>
  <!-- NOTE: data-theme is for propagate the css variables theme through the shadow dom -->
  <div data-theme="light">
    <Loading v-if="isLoading"></Loading>
    <div v-else>
      <Container v-if="keycloak && keycloak.initialized">
        <div>
          <div class="pt-3">
            <span class="text-2xl w-64 mt-3">Users Agenda</span>
            <UserAddModal @add-user="addUserClick"/>
          </div>
        </div>
        <UsersTable :users="users" @edit-user="editUserClick" @delete-user="deleteUserClick"/>
      </Container>
      <p v-else>Keycloak is not initialized</p>
    </div>
    <Notifications :alerts="notifications" @delete-notification="handleRemoveToast" />
  </div>
</template>

<style>
@import "./style.css";
</style>
