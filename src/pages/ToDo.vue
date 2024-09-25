<template>
  <q-page>
    <!-- Верхние 
            кнопки 
                  страницы
    -->
    <div class="q-pa-md" style="max-width: 100vw">
      <div class="row no-wrap">
        <q-btn
          flat
          dense
          icon="list"
          label="Выбор Раздела"
          aria-label="Menu"
          no-caps
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-btn
          flat
          dense
          icon="add"
          label="Добавить раздел"
          aria-label="Menu"
          no-caps
          @click="prompt"
        />
        <q-btn icon="check_circle" @click="con" />
      </div>
      <!-- Панели 
              основного 
                  экрана 
      -->
      <q-tab-panels v-model="currentName">
        <q-tab-panel v-for="tab in getItems" :key="tab.id" v-bind="tab">
          <div class="q-my-sm column itemContainer">
            <div class="column itemCard" id="areasCon">
              <!-- <input
                v-for="tab in getItems"
                :key="tab.id"
                v-bind="tab"
                @input="changeArea($event)"
                wrap="off"
                class="input"
                rows="1"
              /> -->
              <input
                v-for="tab in getItems[currentItem]"
                :key="tab.id"
                v-bind="tab"
                @input="changeArea($event)"
                class="input"
                value=""
              />
            </div>
            <q-btn no-caps class="additionalItem" @click="newItem($event)"
              >Добавить новый пункт</q-btn
            >
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- Всплывающий 
            список 
                разделов-->
    <q-drawer v-model="leftDrawerOpen" bordered overlay>
      <q-list>
        <div
          class="row justify-between q-px-md"
          style="border-bottom: 1px solid gray"
        >
          <q-item-label header style="color: red"> ToDo Sheets </q-item-label>
          <q-btn
            flat
            dense
            icon="arrow_left"
            label="Свернуть"
            aria-label="Back"
            no-caps
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>
        <q-tabs shrink stretch vertical v-model="currentName">
          <q-tab
            v-for="tab in getItems"
            :key="tab.id"
            v-bind="tab"
            :label="tab.name"
            no-caps
            style="border-bottom: 1px solid gray"
            @click="
              {
                leftDrawerOpen = !leftDrawerOpen;
                changeCurrentItem(tab.id);
              }
            "
          />
        </q-tabs>
      </q-list>
    </q-drawer>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useStore } from "src/stores/example-store";
export default {
  methods: {
    changeArea: function (e) {
      e.target.addEventListener("input", resize, false);
      function resize() {
        e.target.style.width = "150px";
        e.target.style.width = this.scrollWidth + "px";
      }
    },
    newItem(e) {
      let div = document.getElementById("areasCon");
      let newItem =
        "<textarea @input='changeArea($event)' wrap='off' class='input' rows='1'/>";
      div.insertAdjacentHTML("beforeend", newItem);
    },
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const getItems = computed(() => {
      return store.getItems;
    });
    const getFirstName = computed(() => {
      return store.getFirstName;
    });
    const getCurrent = computed(() => {
      return store.getCurrent;
    });
    const ListItems = computed(() => {
      return store.items;
    });
    const { changeCurrentItem } = store;
    onMounted(() => {
      store.loadItems();
    });
    function prompt() {
      $q.dialog({
        title: "Prompt",
        message: "Как назвать новый раздел?",
        prompt: {
          model: "",
          type: "text", // optional
        },
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        tabs.push({ name: data, logs: [] });
        api.post("/todo_items", { name: data, logs: [] });
      });
    }
    function con() {
      // console.log(getItems.value[0].name);
      // console.log(getFirstName.value);
      console.log(getCurrent.value);
      console.log(getFirstName.value);
    }
    return {
      con,
      prompt,
      leftDrawerOpen: ref(false),
      getItems,
      ListItems,
      currentItem: ref(getCurrent.value),
      currentName: ref(getFirstName.value),
      changeCurrentItem,
    };
  },
};
</script>

<style>
.itemContainer {
  position: relative;
  width: fit-content;
  gap: 10px;
}

.itemCard {
  position: relative;
  width: fit-content;
}

.input {
  width: 150px;
  resize: none;
  overflow: hidden;
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(0, 119, 181, 0.7);
}

.additionalItem {
  width: fit-content;
}
/* .input::after {
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
  } */
</style>
