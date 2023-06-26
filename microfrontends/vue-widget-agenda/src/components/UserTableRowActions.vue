<script setup>
import UserEditModal from "./UserEditModal.vue";
import DeleteUserModal from "./DeleteUserModal.vue";
import {ref} from "vue";

const showDeleteModal = ref(false);
const showEditModal = ref(false);

const emit = defineEmits(["delete-user","edit-user"]);

defineProps({
      userId: Number,
      user: Object({
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
      })
    }
);

const toggleDeleteModal = () => {
  showDeleteModal.value = !showDeleteModal.value;
};

const toggleEditModal = () => {
  showEditModal.value = !showEditModal.value;
};

const deleteUser = userId => {
  emit("delete-user",userId);
  toggleDeleteModal();
};

const editUser = user => {
  emit("edit-user",user);
  toggleEditModal();
};

</script>

<template>
  <div class="dropdown float-right">
    <label tabindex="0" class="btn m-1">
      <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          class='inline-block w-5 h-5 stroke-current'
      >
        <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width="{2}"
            d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
        />
      </svg>
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li><label @click="toggleEditModal">Edit</label></li>
      <li><label @click="toggleDeleteModal">Delete</label></li>
    </ul>
  </div>

  <UserEditModal :user="user" :showModal=showEditModal
                   @cancel-edit-user="toggleEditModal" @edit-user="editUser"/>

  <DeleteUserModal :userId="userId" :showModal=showDeleteModal
                   @cancel-delete-user="toggleDeleteModal" @delete-user="deleteUser(userId)"/>

</template>
