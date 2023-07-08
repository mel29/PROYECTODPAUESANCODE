<template>
  <q-page>
    <div class="welcome">
      <h4>FindMeJob</h4>
      <span>Bienvenid@: <span class="name">{{ value.name }}</span></span>
      <img v-if="value.ruc"
        src="https://images.vexels.com/media/users/3/144883/isolated/lists/09a503901819e475a3c352ddd3e528b3-carrera-de-construccion-de-la-empresa.png"
        alt="">
      <img v-if="value.dni"
        src="https://images.vexels.com/media/users/3/127303/isolated/preview/d2d88005bdd8195bb5930634e712c8de-dibujos-animados-de-profesion-de-empresario.png"
        alt="">
        <div class="welcome-info">
        <h5>¡No esperes más!</h5>
        <p class="aligned"><span class="bullet">&#8226;</span> Completa la información principal de tu perfil</p>
        <p class="aligned"><span class="bullet">&#8226;</span> Postúlate a los trabajos que más te interesen y sigue el proceso de tus postulaciones.</p>
        <p class="aligned"><span class="bullet">&#8226;</span> Recuerda mantener tu información actualizada desde la sección de tu perfil.</p>
      </div>
      <div class="welcome-info" v-if="value.ruc">
        <h5>Tu candidato ideal esta en nuestra Base de Datos</h5>
        <p>Encuentra el talento que necesitas, publica tu aviso gratis del mes y atrae a los mejores candidatos para tu empresa.</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar'

const $store = useStore();
const $q = useQuasar()

const value = $q.localStorage.getItem('dataUser')

const getUser = computed(() => {
  return $store.getters.getUserData
})
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    margin: 1rem 0;
    color: #56a0be;
    font-weight: 500;
  }

  img {
    width: 200px;
  }

  .name {
    text-transform: capitalize;
  }

  &-info {
    max-width: 500px;
    text-align: center;
    margin-bottom: 2rem;

    h5 {
      margin: .3rem 0;
      font-size: 20px;
      line-height: 1.3;
    }

    p {
      color: gray;
    }
  }
}</style>
