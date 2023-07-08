<template>
  <q-layout view="lHh Lpr lFf" class="container-gray">

    <q-page-container>

      <q-card class="my-card" flat bordered>
        <div class="q-pa-md">
          <q-breadcrumbs class="q-arrow">
            <q-breadcrumbs-el label="Login" icon="arrow_back_ios" to="/" />
          </q-breadcrumbs>

          <h3 class="title q-title">Registrarse como <b>usuario</b></h3>

          <q-form @submit="onSubmit">
            <q-card-section>
              <q-input
              dense outlined
              v-model="nombreCompleto"
              class="hoola"
              label="nombreCompleto"
              lazy-rules :rules="[ val => val && val.length > 0 ]" />

              <q-input
              dense outlined
              class="q-mt-md"
              v-model="correoElectronico"
              label="Correo electrónico"
              lazy-rules :rules="[ val => val && val.length > 0 ]" />

              <q-input
              dense outlined
              class="q-mt-md"
              v-model="contrasena" type="password" label="Contraseña"
              lazy-rules :rules="[ val => val && val.length > 0 ]" />

              <q-input
              dense outlined
              class="q-mt-md"
              v-model="telefono" label="Número de teléfono / celular"
              lazy-rules :rules="[ val => val && val.length > 0 ]" />

              <q-input
              dense outlined
              class="q-mt-md"
              v-model="direccion" label="Dirección"
              lazy-rules :rules="[ val => val && val.length > 0 ]" />

              <q-input
              dense outlined
              class="q-mt-md"
              v-model="dni" label="Número de DNI"
              lazy-rules :rules="[ val => val && val.length > 0 ]" />

            </q-card-section>
            <q-card-section>
              <q-btn :loading="loading" type="submit" style=" border-radius: 8px;" color="dark" rounded size="md" label="Registrar" no-caps
                class="full-width"></q-btn>
            </q-card-section>
          </q-form>
        </div>
      </q-card>
    </q-page-container>
  </q-layout>
</template>


<script setup>
import { ref } from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

const $q = useQuasar()
const router = useRouter();

const loading = ref(false)
const nombreCompleto = ref('');
const correoElectronico = ref('');
const contrasena = ref('');
const telefono = ref('');
const direccion = ref('');
const dni = ref('');

const onSubmit = () => {
  loading.value = true;
  const payload = {
    nombreCompleto: nombreCompleto.value,
    correoElectronico: correoElectronico.value,
    contrasena: contrasena.value,
    telefono: telefono.value,
    direccion: direccion.value,
    dni: dni.value
  }

  api.post('/Usuarios', payload)
    .then((response) => {
      if(response.status == 200) {
        $q.notify({
          type: 'positive',
          position: 'top-right',
          message: 'Usuario creado correctamente'
        })
        router.push('/');
      }
    })
    .catch((err) => {
      console.error(err)
    }).finally(() => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.my-card {
  max-width: 500px;
  margin: 2rem auto;

  .q-arrow {
    padding: 0 0 1rem 1rem;
    color: $primary;

    a {
      font-weight: 300;
    }
  }
  .q-title {
    padding: 0 1rem;
  }
}
.q-field__bottom {
  display: none;
}
.q-field {
  padding: 0;
}
</style>
