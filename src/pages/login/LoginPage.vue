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

definePageMeta({
  alias: ["/login"],
});
</script>

<style lang="scss"></style>
<script setup></script>
