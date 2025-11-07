<template>
  <TheHeader />
  <main class="page-content">
    <RegistrationForm />
  </main>
</template>

<script setup>
import { definePageMeta } from "#imports";
import { TheHeader } from "@/widgets/header";
import { RegistrationForm } from "@/widgets/registration-form";

definePageMeta({
  alias: ["/registration"],
});
</script>

<style lang="scss"></style>
<script setup></script>
