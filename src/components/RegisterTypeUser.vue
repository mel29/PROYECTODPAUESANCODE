<template>
  <q-dialog persistent transition-show="scale" transition-hide="scale">
    <q-card class="text-white" style="width: 400px; background-color: var(--q-dark);">
      <q-card-section>
        <div>Registrar nuevo</div>
      </q-card-section>

      <q-card class="row justify-center" style="column-gap: 2rem;">
        <q-item clickable v-ripple class="column" @click="handleCreateAccount('company')">
          <q-item-section side class="q-pr-none">
            <q-avatar rounded size="60px">
              <img src="https://cdn-icons-png.flaticon.com/256/2761/2761008.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-center" caption>Empresa</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple class="column"  @click="handleCreateAccount('user')">
          <q-item-section side class="q-pr-none">
            <q-avatar rounded size="60px">
              <img src="https://cdn-icons-png.flaticon.com/128/8245/8245638.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-center" caption>Usuario</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn class="text-weight-regular" color="primary" flat label="Cerrar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleCreateAccount = (type) => {
  if(type === 'company') router.push('/registrar-empresa');
  if(type === 'user') router.push('/registrar-usuario');
}
</script>
