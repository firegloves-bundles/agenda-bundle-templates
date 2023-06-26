<script setup>

const emit = defineEmits(["delete-user", "cancel-delete-user"]);

const props = defineProps({
  userId: Number,
  showModal: Boolean
});

function confirmDeleteUser() {
  emit("delete-user", props.userId);
}

</script>

<template>
  <div class="modal" :class="{'modal-open': showModal }">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Delete User {{ userId }}</h3>
      <div class='w-full place-content-between'>
        <div class="modal-action w-full place-content-between pt-3tion">
          <label for="my-modal" class="btn" @click="emit('cancel-delete-user')">Cancel</label>
          <button class="btn btn-primary float-right" @click="confirmDeleteUser">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
