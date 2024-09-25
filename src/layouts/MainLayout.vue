<template>
  <q-layout view="hhh lpr fff">
    <q-header elevated>
      <q-toolbar style="justify-content: space-between">
        <q-toolbar-title>QuasarApp</q-toolbar-title>
        <div>
          <q-btn clickable to="/" flat label="Main" no-caps size="1.5em" />
          <q-btn clickable to="/todo" flat label="ToDo" no-caps size="1.5em" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});
</script>
