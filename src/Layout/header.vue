<template>
  <div class="outer">
    <div class="top_two" @click="logout">
      <img src="@/assets/images/退出.png" style="margin-left: 26px;margin-top: 30px;" />
      <span style="color:rgba(255,255,255,1);font-size: 14px; ">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.outer {
    height: 60px;
    width: 100%;
    background-color: rgb(50, 153, 127);
  }
</style>
