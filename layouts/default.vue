<template>
  <div class="lg:h-screen flex flex-col lg:flex-row">
    <sidebar class="shadow-2xl" />
    <div class="content-size overflow-y-auto">
      <div class="md:p-8 p-2 pt-4 pb-12">
        <slot />
      </div>
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
