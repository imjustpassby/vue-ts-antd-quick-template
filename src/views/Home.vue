<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" @fromChild="fromChild" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
@Component({
  components: { HelloWorld }
})
export default class Home extends Vue {
  fromChild(msg: string) {
    console.log(msg);
  }
}
</script>
