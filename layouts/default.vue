<template>
  <div class="lg:h-screen flex flex-col lg:flex-row">
    <sidebar />
    <div class="content-size overflow-y-auto">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
.content-size {
  @media (min-width: 1024px) {
    width: calc(100% - 250px);
    height: 100svh;
  }
  height: calc(100svh - 50px);
  width: 100%;
}
</style>
