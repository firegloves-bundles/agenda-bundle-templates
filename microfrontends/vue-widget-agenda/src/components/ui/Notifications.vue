<script setup>
import NotificationError from "./NotificationError.vue";
import NotificationSuccess from "./NotificationSuccess.vue";

const emit = defineEmits(["delete-notification"]);

defineProps({
  alerts: Object({
    id: Number,
    text: String,
    status: String
  })
});

const deleteNotification = id => {
  emit('delete-notification', id)
};
</script>

<template>
  <div class="toast toast-end">
    <div v-for="alert in alerts">
      <NotificationError v-if="alert.status==='error'" :id="alert.id" :text="alert.text" @delete-notification="deleteNotification(alert.id)"></NotificationError>
      <NotificationSuccess v-else :text="alert.text" :id="alert.id" @delete-notification="deleteNotification(alert.id)"></NotificationSuccess>
    </div>
  </div>
</template>
