<template>
  <header class="header">
    <div class="header__container">
      <nav class="header__nav">
        <div class="nav__menu">
          <a href="/" class="header__logo" aria-label="LanguageCards"
            ><Logo
          /></a>
          <ul class="header__menu">
            <li class="header__menu-item">
              <NuxtLink to="">Мои темы</NuxtLink>
            </li>
            <li class="header__menu-item">
              <NuxtLink to="">Поиск тем</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="header__account">
          <ul class="header__menu">
            <li class="header__menu-item">
              <NuxtLink to="">Войти</NuxtLink>
            </li>
            <li class="header__menu-item">
              <NuxtLink to="/registration">Регистрация</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
      <div class="header__mobile">
        <a href="/" class="header__logo" aria-label="Киберия"><Logo /></a>
        <div class="burger" :class="{ active: isActive }">
          <button
            class="burger__button"
            @click="toggleBurger"
            aria-label="Бургер-меню"
          >
            <span
              class="burger__line burger__line_top"
              :class="{ white: isActive }"
            ></span>
            <span
              class="burger__line burger__line_middle"
              :class="{ white: isActive }"
            ></span>
            <span
              class="burger__line burger__line_bottom"
              :class="{ white: isActive }"
            ></span>
          </button>
          <div class="burger__content">
            <div class="burger__menu">
              <p><NuxtLink to="/cases">Мои темы</NuxtLink></p>
              <p><NuxtLink to="/cases">Поиск тем</NuxtLink></p>
              <p><NuxtLink to="/cases">Войти</NuxtLink></p>
              <p><NuxtLink to="/cases">Регистрация</NuxtLink></p>
            </div>

            <hr />
            <div class="burger__contacts">
              <div class="contacts__head">
                <p></p>
              </div>
              <p></p>
              <p>
                <!-- <a href="mailto:hello@cyberia.studio">hello@cyberia.studio</a> -->
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import Logo from "@/shared/ui/Logo/TheLogo.vue";
import { ref } from "vue";

const isActive = ref(false);

const toggleBurger = () => {
  isActive.value = !isActive.value;
  document.body.classList.toggle("no-scroll", isActive.value);
};
</script>

<style lang="scss">
@import "styles/header";
</style>
