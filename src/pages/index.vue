<script>
export default {
  name: "MainPage",
};
</script>

<template>
  <TheHeader />
  <main class="page-content">
    <section>
      <h1 class="title">Добро пожаловать в Language Cards!</h1>
      <div class="title__invite">
        Начни пополнять свой словарный запас уже сейчас!
      </div>
      <div class="title__invite-auth">Входи, регистрируйся!</div>
    </section>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
</style>

<style lang="scss">
@import "styles/title";
</style>

<script setup>
import { TheHeader } from "@/widgets/header";
</script>
