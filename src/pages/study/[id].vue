<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <TheHeader />
  <main class="study-panel">
    <div class="study-panel__container">
      <div class="study-panel__card">
        <div class="study-panel__word">
          <div v-if="responseRandomCard?.success" class="study-panel__writing">
            {{ responseRandomCard.data?.word }}
          </div>
          <div
            v-if="responseRandomCard?.success"
            class="study-panel__transcription"
          >
            {{ responseRandomCard.data?.transcription }}
          </div>
        </div>
        <div
          v-if="responseRandomCard?.success && isShowAnswer"
          class="study-panel__translation"
        >
          {{ responseRandomCard.data?.translation }}
        </div>
      </div>
      <div class="study-panel__tools">
        <TheButton
          @click="showAnswer"
          v-if="!isShowAnswer"
          class="study-panel__button"
          >Показать ответ</TheButton
        >
        <TheButton
          @click="updateCardStatus"
          v-if="isShowAnswer"
          class="study-panel__button"
          >Верный ответ</TheButton
        >
        <TheButton v-if="isShowAnswer" class="study-panel__button"
          >Ответ неверный</TheButton
        >
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import TheButton from "@/shared/ui/button/TheButton.vue";
import { useTheme } from "~/src/entities/Theme/model/useTheme";
import { ref, onMounted } from "vue";
import { useUserCardStatus } from "~/src/entities/UserCardStatus/model/useUserCardStatus";

const { responseRandomCard, getRandomCard } = useTheme();
const { responseUserCardStatus, updateUserCardStatus } = useUserCardStatus();
let isShowAnswer = ref<boolean>(false);

function showAnswer() {
  isShowAnswer.value = true;
}

async function updateCardStatus() {
  if (responseRandomCard.value?.data?.id) {
    await updateUserCardStatus({
      cardId: responseRandomCard.value?.data?.id,
      status: 1,
    });
  }

  if (responseUserCardStatus.value?.success) {
    isShowAnswer.value = false;
    getRandomCard();
  }
}

onMounted(() => {
  getRandomCard();
});
</script>

<style lang="scss">
@import "styles/study-panel";
</style>
