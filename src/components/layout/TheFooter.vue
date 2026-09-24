<template>
  <footer
    class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    ref="footerRef"
  >
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- 左侧版权信息 -->
        <div
          class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
          ref="copyrightRef"
        >
          <span>© {{ currentYear }}</span>
          <a
            href="https://fingerecho.com/"
            target="_blank"
            class="font-medium hover:text-blue-500 transition-colors"
          >
            Fingerecho
          </a>
          <span>. All rights reserved.</span>
        </div>

        <!-- 右侧链接和服务商信息 -->
        <div
          class="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <!-- 导航链接 -->
          <div class="flex items-center gap-4">
            <template v-for="link in footerConfig.links" :key="link.text">
              <router-link
                v-if="link.to"
                :to="link.to"
                class="hover:text-blue-500 transition-colors"
              >
                {{ link.text }}
              </router-link>
              <a
                v-else-if="link.href"
                :href="link.href"
                :target="link.target"
                class="hover:text-blue-500 transition-colors"
              >
                {{ link.text }}
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import type { RouterLinkProps } from "vue-router";
import { useRouter } from "vue-router";
import { footerConfig } from "@/config/footer";
import { createCopyrightGuard } from "@/utils/copyright";
import { siteConfig } from "@/config/site";

const router = useRouter();
const footerRef = ref<HTMLElement | null>(null);
const copyrightRef = ref<HTMLElement | null>(null);

const guard = createCopyrightGuard;

// 定期检查版权信息
let intervalId: number;
let randomInterval: number;

const currentYear = computed(() => new Date().getFullYear());

onMounted(() => {
  // 初始检查
  guard(copyrightRef.value);

  // 随机间隔检查
  const check = () => {
    guard(copyrightRef.value);
    randomInterval = window.setTimeout(check, Math.random() * 2000 + 1000);
  };
  check();

  // 固定间隔检查
  intervalId = window.setInterval(() => guard(copyrightRef.value), 1000);

  // 添加DOM变化监听
  const observer = new MutationObserver(() => guard(copyrightRef.value));
  if (copyrightRef.value) {
    observer.observe(copyrightRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });
  }
});

onBeforeUnmount(() => {
  if (intervalId) {
    window.clearInterval(intervalId);
  }
  if (randomInterval) {
    window.clearTimeout(randomInterval);
  }
});
</script>
