<template>
  <header class="header">
    <div class="header__container">
      <nav class="header__nav">
        <div class="nav__menu">
          <a href="/" class="header__logo" aria-label="LanguageCards"
            ><Logo
          /></a>
          <ul v-if="auth.userName" class="header__menu">
            <li class="header__menu-item">
              <NuxtLink to="">Мои темы</NuxtLink>
            </li>
            <li class="header__menu-item">
              <NuxtLink to="/themes-search">Поиск тем</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="header__account">
          <ul v-if="!auth.userName" class="header__menu">
            <li class="header__menu-item">
              <NuxtLink to="/login">Войти</NuxtLink>
            </li>
            <li class="header__menu-item">
              <NuxtLink to="/registration">Регистрация</NuxtLink>
            </li>
          </ul>
          <div v-if="auth.userName" class="header__menu">
            <span class="user-bar__name">
              Пользователь: <br />
              {{ auth.userName }}
            </span>
            <button class="header__logout-button" @click="logout">Выйти</button>
          </div>
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
              <p><NuxtLink to="/themes-search">Поиск тем</NuxtLink></p>
              <p><NuxtLink to="/login">Войти</NuxtLink></p>
              <p><NuxtLink to="/registration">Регистрация</NuxtLink></p>
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
import { useAuthStore } from "~/src/shared/api/stores/useAuthStore";
import { navigateTo } from "#app";

const auth = useAuthStore();

const logout = () => {
  auth.logout();
  navigateTo("/login");
};

const isActive = ref(false);

const toggleBurger = () => {
  isActive.value = !isActive.value;
  document.body.classList.toggle("no-scroll", isActive.value);
};
</script>

<style lang="scss">
@import "styles/header";
</style>
