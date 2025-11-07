<template>
  <artcile>
    <div class="registration-form">
      <h2 class="registration-form__title">Регистрация</h2>
      <form novalidate class="form" method="post">
        <div class="registration-form__group">
          <label class="registration-form__label">Придумайте никнейм:*</label>
          <input class="registration-form__input" type="text" />
          <label class="registration-form__label">Придумайте пароль*</label>
          <input class="registration-form__input" type="text" />
          <button class="registration-form__button" type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  </artcile>
</template>

<script setup lang="ts">
// import { ref } from "vue";
// import { validateFeedbackForm } from '@/shared/models/validation'
// import { useFeedback } from '@/widgets/feedback-form/api/useFeedback'

// const form = ref({
//   name: '',
//   message: '',
//   phone: '',
//   email: '',
//   agree: false
// })

// const frontErrors = ref<Record<string, string>>({})
// const {
//   successMessage,
//   loading,
//   isSuccessResponse,
//   error,
//   validationErrors,
//   submit
// } = useFeedback()

// async function onSubmit() {
//   const errors = validateFeedbackForm(form.value)
//   frontErrors.value = errors
//   if (Object.keys(errors).length > 0) {
//     isSuccessResponse.value = false
//     return
//   }

//   await submit(form.value)
//   if (isSuccessResponse.value) {
//     form.value = {
//       name: '',
//       message: '',
//       phone: '',
//       email: '',
//       agree: false
//     }
//   }
// }
</script>

<style lang="scss">
@import "styles/registration-form";
</style>
