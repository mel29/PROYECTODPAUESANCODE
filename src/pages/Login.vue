<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="flex flex-center bg-img">
          <q-card class="q-pa-md shadow-2 my_card" bordered>
            <q-card-section class="text-center login-header">
              <img src="https://images.vexels.com/media/users/3/137617/isolated/lists/c45afb857e72b86e87baaf255f71ff37-resumen-logo-geometrico.png" alt="">
              <div class="title">FindMeJob</div>
              <div class="text-grey-9 text-h5 text-weight-bold">Iniciar sesión</div>
              <div class="text-grey-8">Inicie sesión a continuación para acceder a su cuenta</div>
            </q-card-section>

            <q-form @submit="onSubmit">
              <q-card-section>
                <q-input
                dense outlined
                v-model="email"
                label="Correo electrónico"
                lazy-rules :rules="[ val => val && val.length > 0 ]" />

                <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="password"
                type="password"
                label="Contraseña"
                lazy-rules :rules="[ val => val && val.length > 0 ]" />

              </q-card-section>
              <q-card-section>
                <q-btn :loading="loading" type="submit" style=" border-radius: 8px;" color="dark" rounded size="md" label="Ingresar" no-caps class="full-width"></q-btn>
              </q-card-section>
            </q-form>

            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">¿Aún no tienes una cuenta?
                <a @click="handleRegister" class="text-dark text-weight-bold cursor-pointer" style="text-decoration: none">Registrar</a>
              </div>
            </q-card-section>

          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>

    <RegisterTypeUser v-model="modalOptions" />

  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterTypeUser from '../components/RegisterTypeUser.vue'
import { useStore } from 'vuex'
import { api } from 'boot/axios'

const $q = useQuasar()
const $store = useStore();
const router = useRouter();

const loading = ref(false)
const email = ref('')
const password = ref('')
const modalOptions = ref(false)

const onSubmit = () => {
  loading.value = true;
  const payload = {
    correoElectronico: email.value,
    contrasena: password.value
  }

  api.post('/Login', payload)
    .then((response) => {
      const { data } = response;
      const values = {
        _id: data.id,
        email: data.correoElectronico,
        address: data.direccion,
        logo: data.logo ? data.logo : null,
        name: data.nombre ? data.nombre : data.nombreCompleto,
        ruc: data.ruc ? data.ruc : null,
        phone: data.telefono,
        jobs: data.ofertaTrabajo ? data.ofertaTrabajo : null,
        dni: data.dni ? data.dni : null,
        profesional: data.perfilProfesional ? data.perfilProfesional : null,
        postulation: data.postulacion ? data.postulacion : null,
      }

      $q.localStorage.set('dataUser', values)
      router.push('/home');

    })
    .catch((err) => {
      console.error(err)
      $q.notify({
        type: 'negative',
        position: 'top-right',
        message: 'Este usuario no existe'
      })
    }).finally(() => {
      loading.value = false
    })
}
const handleRegister = () => {
  modalOptions.value = true;
}
</script>

<style scoped lang="scss">
.login-header {
  img {
    width: 60px;
  }
  .title {
    color: #0463f7;
    font-size: 14px;
  }
}
.bg-img {
  background-image: url('https://www.bbvaapimarket.com/wp-content/uploads/2020/09/GettyImages-1165055243.jpg');
}
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.q-field__bottom {
  display: none;
}
.q-field {
  padding: 0;
}
</style>
