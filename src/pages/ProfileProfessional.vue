<template>
  <section class="row">
    <div class="profile-wrapper col-sm-12 col-md-4 col-12">
      <h3 class="title">Perfil profesional</h3>

      <div class="q-mt-sm">
        <q-form @submit="onSubmit">
          <q-card-section>
            <span>Descripción:</span>
            <q-editor ref="editorRef" class="q-mt-md" v-model="descripcion" lazy-rules
              :rules="[val => val && val.length > 0]" />
            <div>
              <span>¿pregunta?</span>
              <q-checkbox v-model="estado" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn :loading="loading" type="submit" style=" border-radius: 8px;" color="dark" rounded size="md"
              label="CREAR SKILL" no-caps class="full-width"></q-btn>
          </q-card-section>
        </q-form>
      </div>
    </div>
<!-- <pre>{{ skills }}</pre> -->

    <div class="q-pa-md col-12 col-sm-6 list-skils">
      <div class="q-pl-md">Mis skills</div>
      <q-card-section class="q-pt-xs" v-for="(item,key) in skills" :key="key">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ item.estado ? 'Trabajando' : 'Sin vigencia' }}</div>
              <div class="text-caption text-grey" v-html="item.descripcion">

              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-card-section>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'


const $q = useQuasar()
const value = $q.localStorage.getItem('dataUser');

const loading = ref(false);
const descripcion = ref('');
const estado = ref(false);
const skills = ref([]);

const onSubmit = () => {
  loading.value = true;
  const payload = {
    usuarioId: value._id,
    descripcion: descripcion.value,
    estado: estado.value
  }

  api.post(`/PerfilProfesional`, payload)
    .then((response) => {
      if (response.status == 200) {
        $q.notify({
          type: 'positive',
          position: 'top-right',
          message: 'Perfil profesional creado'
        })
        getSkills()
        descripcion.value = ''
        estado.value = false
      }
    })
    .catch((err) => {
      console.error(err)
    }).finally(() => {
      loading.value = false
    })
}
const getSkills = () => {
  api.get(`/PerfilProfesional`)
    .then((response) => {
      if (response.status == 200) {
        skills.value = response.data
      }
    })
    .catch((err) => {
      console.error(err)
    }).finally(() => {
      loading.value = false
    })
}

getSkills()

</script>

<style lang="scss" scoped>
.profile-wrapper {
  // width: 400px;

  h3 {
    padding-left: 1rem;
    height: 30px;
  }
}

.example-item {
  width: 200px;
  // height: 290px;
}

.list-skils {
  // height: 50vh;
  // overflow: auto;
}
</style>
