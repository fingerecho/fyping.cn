<script setup lang="ts">
import { ref } from "vue";
import { siteConfig } from "@/config/site";

interface ContactItem {
  id: string;
  label: string;
  value: string;
  description: string;
  type: "phone" | "wechat" | "qq" | "email";
}

const contactItems = ref<ContactItem[]>([
  {
    id: "phone",
    label: "电话号码",
    value: "+86 175-2009-2105",
    description: "工作日 9:00 - 18:00 可致电",
    type: "phone",
  },
  {
    id: "wechat",
    label: "微信",
    value: "fingerecho",
    description: "添加好友请备注来意",
    type: "wechat",
  },
  {
    id: "qq",
    label: "QQ",
    value: "283285356",
    description: "随时在线，欢迎交流",
    type: "qq",
  },
  {
    id: "email",
    label: "邮箱",
    value: "fingerecho@163.com",
    description: "72 小时内回复",
    type: "email",
  },
]);

const copiedId = ref<string | null>(null);

const copyToClipboard = async (item: ContactItem) => {
  try {
    await navigator.clipboard.writeText(item.value);
    copiedId.value = item.id;
    setTimeout(() => {
      if (copiedId.value === item.id) {
        copiedId.value = null;
      }
    }, 2000);
  } catch {
    alert("复制失败，请手动复制");
  }
};

const openLink = (item: ContactItem) => {
  if (item.type === "email") {
    window.location.href = `mailto:${item.value}`;
  } else if (item.type === "phone") {
    window.location.href = `tel:${item.value.replace(/\s|-/g, "")}`;
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 md:py-12">
    <div class="max-w-2xl mx-auto">
      <h1
        class="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient"
      >
        联系我
      </h1>
      <p
        class="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center mb-8 md:mb-12"
      >
        有任何问题或合作意向？欢迎通过以下方式与我联系。
      </p>

      <!-- 联系方式列表 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div
          v-for="item in contactItems"
          :key="item.id"
          class="group flex items-center p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
        >
          <!-- 图标 -->
          <div
            class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-purple-500"
          >
            <svg
              v-if="item.type === 'phone'"
              class="w-6 h-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
              />
            </svg>
            <svg
              v-else-if="item.type === 'wechat'"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M8.5 4C4.91 4 2 6.58 2 9.76c0 1.8.94 3.41 2.41 4.47L3.7 16.9c-.09.27.22.48.44.34l2.7-1.68c.53.13 1.08.2 1.66.2.17 0 .33-.01.5-.02A5.71 5.71 0 018 13.9c0-3.2 2.91-5.8 6.5-5.8.27 0 .54.01.8.04C14.68 5.9 11.82 4 8.5 4zm-1.7 6.3a.9.9 0 110-1.8.9.9 0 010 1.8zm4.4 0a.9.9 0 110-1.8.9.9 0 010 1.8z"
              />
              <path
                d="M22 13.9c0-2.76-2.69-5-6-5s-6 2.24-6 5 2.69 5 6 5c.58 0 1.14-.07 1.67-.2l2.32 1.44c.22.14.53-.07.44-.34l-.52-2.17A4.72 4.72 0 0022 13.9zm-7.3-.6a.8.8 0 110-1.6.8.8 0 010 1.6zm3.6 0a.8.8 0 110-1.6.8.8 0 010 1.6z"
              />
            </svg>
            <svg
              v-else-if="item.type === 'qq'"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.05 5.2c.33.19.45.61.26.94l-1.13 1.96c.96.49 1.64 1.25 1.64 2.15 0 1.66-2.15 3-4.82 3s-4.82-1.34-4.82-3c0-.9.68-1.66 1.64-2.15L7.69 8.14a.7.7 0 011.2-.68l1.2 2.1c.6-.18 1.24-.28 1.91-.28s1.31.1 1.91.28l1.2-2.1a.7.7 0 01.94-.26zM12 15.5c-1.9 0-3.3-.9-3.3-2s1.4-2 3.3-2 3.3.9 3.3 2-1.4 2-3.3 2zm0 1.3c2.2 0 3.7-.9 3.7-2.1 0-.07 0-.13-.01-.2.7.46 1.11 1.03 1.11 1.65 0 1.66-2.15 3-4.8 3s-4.8-1.34-4.8-3c0-.62.41-1.19 1.11-1.65-.01.07-.01.13-.01.2 0 1.2 1.5 2.1 3.7 2.1z"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
              />
              <path
                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
              />
            </svg>
          </div>

          <!-- 信息 -->
          <div class="ml-4 min-w-0 flex-1">
            <div
              class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1"
            >
              {{ item.label }}
            </div>
            <div
              class="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 truncate"
            >
              {{ item.value }}
            </div>
            <div
              class="text-xs text-gray-400 dark:text-gray-500 mt-1 hidden sm:block"
            >
              {{ item.description }}
            </div>
          </div>

          <!-- 操作按钮 -->
          <button
            v-if="item.type === 'email' || item.type === 'phone'"
            @click="openLink(item)"
            class="flex-shrink-0 ml-2 p-2 text-gray-400 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :aria-label="`打开${item.label}`"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            v-else
            @click="copyToClipboard(item)"
            class="flex-shrink-0 ml-2 p-2 text-gray-400 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :aria-label="`复制${item.label}`"
          >
            <svg
              v-if="copiedId !== item.id"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path
                d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-gradient {
  background-size: 200% auto;
  animation: gradient 4s linear infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
