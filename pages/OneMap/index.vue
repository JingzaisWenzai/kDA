<template>
  <section class="container">
    <div class="head">
      <span class="tit"></span>
      <div class="head-btn">
        <span>你好 哈喽</span>
      </div>
    </div>
    <div class="context">
      <div></div>
    </div>
  </section>
</template>

<script>

export default {
  mounted(){
    this.$router.push('/portal-comp/')
  },
    data(){
        return{

        }
    },
    components: {
    }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>

