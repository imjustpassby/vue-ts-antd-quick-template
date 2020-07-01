<template>
  <a-row>
    <a-col :span="12">
      <a-button @click="click('child')">login</a-button>
      <a-button @click="logout">logout</a-button>
      <p>isLogin:{{ StateLoginSuccess }}</p>
      <router-link to="/my">click me to my page</router-link>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const userModule = namespace('user');
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  @userModule.State('loginSuccess') StateLoginSuccess!: string;

  @Emit('fromChild')
  click(msg: string) {
    this.ACTION_LOGIN();
    msg = msg + this.StateLoginSuccess;
    console.log(msg);
    // this.$emit('fromChild', msg);
  }

  logout() {
    this.ACTION_LOGOUT();
  }

  @userModule.Action('LOGIN') ACTION_LOGIN!: Function;
  @userModule.Action('LOGOUT') ACTION_LOGOUT!: Function;
}
</script>
