<template>
  <div class="page-layout">
    <section class="page-layout-main">
      <slot name="default"></slot>
    </section>
    <section class="page-layout-side">
      <slot name="side"></slot>
    </section>
  </div>
</template>
