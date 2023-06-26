<script setup>
const emit = defineEmits(["delete-notification"]);

const props = defineProps({
  id: Number,
  text: String
});

const deleteNotification = () => {
  emit('delete-notification', props.id);
};

</script>

<template>
  <div class='alert alert-success flex items-start'>
    <svg xmlns='http://www.w3.org/2000/svg' class='stroke-current shrink-0 h-6 w-6 '
         fill='none'
         viewBox='0 0 24 24'>
      <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
    </svg>
    <div class="flex flex-col w-full ">
      <span class='font-bold min-w-full'>Success!</span>
      <span class='text-xs w-full'>{{text}}</span>
    </div>
    <button class='btn btn-sm float-right' @click="deleteNotification">x</button>
  </div>
</template>
