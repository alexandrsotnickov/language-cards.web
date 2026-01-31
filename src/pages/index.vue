<script>
export default {
  name: "MainPage",
};
</script>

<template>
  <TheHeader />
  <main class="page-content">
    <LoginForm />
  </main>
</template>

<script setup>
import { definePageMeta } from "#imports";
import { TheHeader } from "@/widgets/header";
import { LoginForm } from "~/src/widgets/login-form";
</script>

<style lang="scss"></style>
<script setup></script>
