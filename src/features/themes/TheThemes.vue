<template>
  <div class="themes">
    <div class="themes__item">
      v-for="project of searchStore.items" :key="project.id" :project="project"
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSearchStore } from "../shared/api/stores/ProjectsStore";
import { useCategoriesStore } from "@/shared/api/stores/CategoriesStore";

const searchStore = useSearchStore();

onMounted(() => {
  searchStore.getProjects();
});

const categoriesStore = useCategoriesStore();

onMounted(() => {
  categoriesStore.getCategories();
});

const filteredProjects = ref([]);
function filterProjects(categoryId) {
  filteredProjects.value = searchStore.getByCategory(categoryId);
}
</script>

<style lang="scss">
@import "styles/themes";
</style>
