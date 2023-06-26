<script setup>

import EmptyAgenda from './EmptyAgenda.vue';
import UserTableRowActions from "./UserTableRowActions.vue";

const emit = defineEmits(["delete-user","edit-user"]);

defineProps({
  users: Array[{
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  }]
});

function deleteUser(userId) {
  emit('delete-user', userId);
}
function editUser(user) {
  emit('edit-user', user);
}
</script>

<template>
  <table v-if="users.length>0" class="table table-zebra w-full">
    <thead>
    <tr>
      <th>ID</th>
      <th>NAME</th>
      <th>LASTNAME</th>
      <th>ADDRESS</th>
      <th>PHONE</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user.id" class="hover">
      <th>{{ user.id }}</th>
      <td>{{ user.name }}</td>
      <td>{{ user.lastname }}</td>
      <td>{{ user.address }}</td>
      <td>{{ user.phone }}</td>
      <td>
        <UserTableRowActions :key="user.id" :user="user" :userId=user.id @edit-user="editUser" @delete-user="deleteUser(user.id)"/>
      </td>
    </tr>
    </tbody>
  </table>
  <EmptyAgenda v-else/>
</template>
