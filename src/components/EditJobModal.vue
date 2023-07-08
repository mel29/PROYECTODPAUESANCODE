<template>
  <q-dialog>
    <q-card>
      <q-card-section class="modal-size">
        <div class="text-h6">Editar</div>
        <!-- <pre>::::{{ dataItem }}</pre> -->

        <q-form @submit="onSubmit">
          <q-input dense outlined v-model.trim="dataItem.titulo" label="Título" lazy-rules :rules="[val => val && val.length > 0]" />

          <q-editor ref="editorRef" class="q-mt-md" v-model="dataItem.descripcion" lazy-rules :rules="[val => val && val.length > 0]" />

          <div class="q-mt-md">
            <span>Fecha de caducidad</span>
            <q-input dense outlined v-model="dataItem.fechaCaducidad">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dataItem.fechaCaducidad" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Aceptar" color="primary" flat></q-btn>
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <q-card-actions class="q-mt-md" align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
            <q-btn type="onSubmit" label="Crear" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script setup>
import { ref, defineEmits } from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const props = defineProps(['dataItem'])
const $q = useQuasar()
const loading = ref(false)
const emit = defineEmits(['closeModalEdit'])

// const date = ref('2023-07-08')
// const titulo = ref('');
// const descripcion = ref('');
// const cleanFields = () => {
//   titulo.value = '';
//   descripcion.value = '';
// }
// const closeModalEdit = () => {
//   emit('closeModalEdit')
// }

const onSubmit = () => {
  loading.value = true;
  const payload = {
    id: props.dataItem.id,
    titulo: props.dataItem.titulo,
    descripcion: props.dataItem.descripcion,
    empresaId: $q.localStorage.getItem('dataUser')._id,
    fechaPublicacion: props.dataItem.fechaPublicacion,
    fechaCaducidad: props.dataItem.fechaCaducidad
  }

  api.put('/OfertasTrabajo', payload)
    .then((response) => {
      if (response.status == 200) {
        $q.notify({
          type: 'positive',
          position: 'top-right',
          message: 'Se creó correctamente'
        })
        emit('closeModalEdit')
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
.modal-size {
  width: 500px;
}

.text-h6 {
  font-size: 18px;
  margin-bottom: .6rem;
}

.q-field__native {
  resize: none !important;
}
</style>
