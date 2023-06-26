<script setup>
import {onMounted, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const name = ref('')
const lastname = ref('')
const address = ref('')
const phone  = ref('')

const props = defineProps({
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
      }),
      showModal: Boolean
    }
)

const emit = defineEmits(["edit-user", "cancel-edit-user"]);

// Validation Logics
const rules = {
  name: { required },
  lastname: {required},
  address: { required },
  phone: { required }
};

const $v = useVuelidate(
    rules,
    { name, lastname, address, phone }
);

const updateUserProps = () => {
  props.user.name=name.value;
  props.user.lastname=lastname.value;
  props.user.address=address.value;
  props.user.phone=phone.value;
};

function handleSubmit() {
  let data = {
    id: props.user.id,
    name: name.value,
    lastname: lastname.value,
    address: address.value,
    phone: phone.value
  };
  emit('edit-user', data);
  updateUserProps();
}

const setInitialValues = () => {
  name.value = props.user.name;
  lastname.value = props.user.lastname;
  address.value = props.user.address;
  phone.value = props.user.phone;
};

const validate = (key) =>{
  $v.value[key].$dirty = true;
};

onMounted(()=>{
  setInitialValues();
})

</script>
<template>
  <div class="modal" :class="{'modal-open': showModal }">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Edit User {{user.id}}</h3>
      <form v-on:submit.prevent="handleSubmit">
        <div>
          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Name</span>
            </label>
            <input name="name" v-model="name" type="text" class="input input-bordered focus:outline-offset-0" @blur="validate('name')">
            <div v-if="$v.name.$error">
              <label class='label text-red-500' v-for="$error in $v.name.$errors" :key="$error.$property">
                Name {{ $error.$message }}
              </label>
            </div>
          </div>
          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Last Name</span>
            </label>
            <input name="lastname"
                   v-model="lastname" type="text" class="input input-bordered focus:outline-offset-0"
                   @blur="validate('lastname')"/>
            <div v-if="$v.lastname.$error">
              <label class='label text-red-500' v-for="$error in $v.lastname.$errors" :key="$error.$property">
                Lastname {{ $error.$message }}
              </label>
            </div>
          </div>
          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Address</span>
            </label>
            <input name="address"
                   v-model="address" type="text" class="input input-bordered focus:outline-offset-0"
                   @blur="validate('address')"/>
            <div v-if="$v.address.$error">
              <label class='label text-red-500' v-for="$error in $v.address.$errors" :key="$error.$property">
                Address {{ $error.$message }}
              </label>
            </div>
          </div>
          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Phone</span>
            </label>
            <input
                name="phone"
                v-model="phone" type="text" class="input input-bordered focus:outline-offset-0"
                @blur="validate('phone')" />
            <div v-if="$v.phone.$error">
              <label class='label text-red-500' v-for="$error in $v.phone.$errors" :key="$error.$property">
                Phone {{ $error.$message }}
              </label>
            </div>
          </div>
        </div>
        <div class='"modal-action w-full place-content-between pt-3'>
          <label for="my-modal" class="btn" @click="emit('cancel-edit-user')">Cancel</label>
          <button class="btn btn-primary float-right" :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
