<template>
  <section class="profile-wrapper">
    <h3 class="title">Editar mis datos</h3>

    <div class="q-mt-sm">
      <q-form @submit="onSubmit">
        <q-card-section>
          <q-input dense outlined v-model="nombreCompleto" class="hoola" label="nombreCompleto" lazy-rules
            :rules="[val => val && val.length > 0]" />

          <q-input dense outlined class="q-mt-md" v-model="correoElectronico" label="Correo electrónico" lazy-rules
            :rules="[val => val && val.length > 0]" />

          <q-input dense outlined class="q-mt-md" v-model="contrasena" type="password" label="Contraseña" lazy-rules
            :rules="[val => val && val.length > 0]" />

          <q-input dense outlined class="q-mt-md" v-model="telefono" label="Número de teléfono / celular" lazy-rules
            :rules="[val => val && val.length <= 9]" />

          <q-input dense outlined class="q-mt-md" v-model="direccion" label="Dirección" lazy-rules
            :rules="[val => val && val.length > 0]" />

          <q-input dense outlined class="q-mt-md" v-model="ruc" :label="`Número de  ${value.ruc  ? 'RUC' : 'DNI'}` " lazy-rules
            :rules="[val => val && val.length > 0]" />

        </q-card-section>
        <q-card-section>
          <q-btn :loading="loading" type="submit" style=" border-radius: 8px;" color="dark" rounded size="md"
            label="Actualizar datos" no-caps class="full-width"></q-btn>
        </q-card-section>
      </q-form>

    </div>

  </section>
</template>

<script setup>
import { compile, ref } from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'


const $q = useQuasar()
const value = $q.localStorage.getItem('dataUser');

const loading = ref(false);
const nombreCompleto = ref('');
const correoElectronico = ref('');
const contrasena = ref('');
const telefono = ref('');
const direccion = ref('');
const ruc = ref('');

const setMyData = () => {
  nombreCompleto.value = value.name
  correoElectronico.value = value.email
  telefono.value = value.phone
  direccion.value = value.address
  ruc.value = value.ruc ? value.ruc : value.dni
}

setMyData()

const onSubmit = () => {
  loading.value = true;
  const payload = {
    id: value._id,
    ...(value.dni && { nombreCompleto: nombreCompleto.value }),
    ...(value.ruc && { nombre: nombreCompleto.value }),
    ...(value.dni && { dni: ruc.value }),
    ...(value.ruc && { ruc: ruc.value }),
    correoElectronico: correoElectronico.value,
    contrasena: contrasena.value,
    telefono: telefono.value,
    direccion: direccion.value,
  }

  const typeUser = value.ruc ? '/Empresas' : '/Usuarios'

  api.put(`${typeUser}`, payload)
    .then((response) => {
      if (response.status == 200) {
        resetStorage(payload)
        $q.notify({
          type: 'positive',
          position: 'top-right',
          message: 'Usuario editado correctamente'
        })
      }
    })
    .catch((err) => {
      console.error(err)
    }).finally(() => {
      loading.value = false
    })
}

const resetStorage = (data) => {
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
  setTimeout(() => {
    location.reload();
  }, 1000)
}
</script>

<style lang="scss" scoped>
.profile-wrapper {
  max-width: 600px;

  h3 {
    padding-left: 1rem;
    height: 30px;
  }
}
</style>
