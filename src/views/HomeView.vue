<script setup lang="ts">
import { ref, onMounted } from "vue";
import PageTransition from "@/components/PageTransition.vue";
import { config } from "@/config";
import { siteConfig } from "@/config/site";
import avatarImg from "@/assets/images/fyping.cn.jpg";

const titles = ref(["C++客户端工程师", "热爱编程", "热爱生活"]);
const currentTitleIndex = ref(0);
const isWaving = ref(false);
const slogan = ref("");
const fullSlogan = siteConfig.slogan;
const typewriterSpeed = 80; // 稍微加快打字速度
const isTypingComplete = ref(false);

// 标题切换
setInterval(() => {
  currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.value.length;
}, 3000);

// 自动触发挥手动画
const startWaving = () => {
  if (!isWaving.value) {
    isWaving.value = true;
    setTimeout(() => {
      isWaving.value = false;
    }, 1200); // 延长挥手动画时间
  }
};

// 打字机效果函数
const typeWriter = () => {
  let currentIndex = 0;
  const timer = setInterval(() => {
    if (currentIndex <= fullSlogan.length) {
      slogan.value = fullSlogan.slice(0, currentIndex);
      currentIndex++;
      if (currentIndex > fullSlogan.length) {
        isTypingComplete.value = true;
        clearInterval(timer);
      }
    }
  }, typewriterSpeed);
};

// 在组件挂载时启动打字机效果
onMounted(() => {
  // 结构化数据
  const script = document.createElement("script");
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);

  // 调整动画时序
  setTimeout(startWaving, 500); // 更早开始挥手
  setTimeout(typeWriter, 1500); // 挥手后开始打字
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: config.siteUrl,
  jobTitle: siteConfig.title,
  description: siteConfig.siteDescription,
};
</script>

<template>
  <div class="min-h-screen">
    <section class="container mx-auto px-4 py-12 md:py-16">
      <div class="max-w-3xl mx-auto text-center">
        <div class="mb-6">
          <div class="relative inline-block avatar-container">
            <img
              :src="avatarImg"
              alt="头像"
              class="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-xl border-4 border-white dark:border-gray-700 transition-all duration-300 avatar"
            />
            <div class="glow-effect"></div>
            <div class="halo-effect"></div>
            <div class="rotating-border"></div>
          </div>
        </div>

        <PageTransition name="bounce">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            <span class="block mb-6 text-gray-900 dark:text-white">
              <span class="opacity-0 animate-fade-in">你好</span>
              <span
                class="inline-block ml-2 transform -rotate-12 opacity-0 animate-fade-in-delay"
                :class="{ 'animate-wave': isWaving }"
                >👋</span
              >
            </span>
            <span class="block opacity-0 animate-fade-in-delay-2">
              我是 <span class="gradient-name">方克铖</span>
            </span>
          </h1>
        </PageTransition>

        <div class="h-8 mb-8 overflow-hidden">
          <transition name="fade" mode="out-in">
            <p
              :key="currentTitleIndex"
              class="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200 opacity-0 animate-fade-in-delay-3"
            >
              {{ titles[currentTitleIndex] }}
            </p>
          </transition>
        </div>

        <PageTransition name="slide-right">
          <p
            class="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-loose typewriter"
          >
            {{ slogan
            }}<span
              class="cursor"
              :class="{
                'cursor-blink': isTypingComplete,
                'cursor-typing': !isTypingComplete,
              }"
              >|</span
            >
          </p>
        </PageTransition>

        <PageTransition name="slide-left">
          <div class="flex flex-col sm:flex-row gap-5 justify-center">
            <router-link
              to="/projects"
              class="btn-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              查看作品
            </router-link>
            <router-link
              to="/contact"
              class="btn-secondary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              联系我
            </router-link>
          </div>
        </PageTransition>

        <PageTransition name="scale">
          <div class="mt-20">
            <h2 class="text-xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              技能标签
            </h2>
            <div class="flex flex-wrap justify-center gap-3">
              <span
                v-for="skill in siteConfig.skills"
                :key="skill"
                class="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow hover:scale-105 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300 cursor-default border border-gray-100 dark:border-gray-700/50"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </PageTransition>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-20deg);
  }
  40% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(-10deg);
  }
  80% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.animate-wave {
  display: inline-block;
  transform-origin: 75% 75%;
  animation: wave 1.2s ease-in-out;
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

.animate-gradient {
  animation: gradient 3s linear infinite;
}

.animate-gradient-slow {
  animation: gradient 6s linear infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.gradient-text {
  @apply bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] bg-clip-text text-transparent bg-[length:200%_auto];
  animation: gradient 3s linear infinite;
}

.cursor {
  @apply inline-block w-0.5 h-5 ml-0.5 align-middle;
  background-color: currentColor;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* 优化打字光标动画 */
.cursor-typing {
  animation: typing 0.5s step-end infinite;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

@keyframes typing {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* 添加渐入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.3s forwards;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.8s ease-out 0.6s forwards;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 0.8s ease-out 0.9s forwards;
}

/* 优化波浪动画 */
@keyframes wave {
  0% {
    transform: rotate(-12deg);
  }
  20% {
    transform: rotate(-30deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  60% {
    transform: rotate(-25deg);
  }
  80% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(-12deg);
  }
}

.animate-wave {
  animation: wave 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 优化渐变动画 */
.animate-gradient {
  animation: gradient 6s linear infinite;
  background-size: 300% auto;
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

.gradient-name {
  @apply bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] bg-clip-text text-transparent;
  background-size: 300% auto;
  animation: gradient 6s linear infinite;
}

/* 简化头像容器样式 */
.avatar-container {
  position: relative;
  z-index: 1;
}

/* 简化头像基础样式 */
.avatar {
  position: relative;
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: float 6s ease-in-out infinite;
}

/* 保留柔和的悬浮动画 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 简化发光效果 */
.glow-effect {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, var(--color-primary), #c471ed, #f64f59);
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0.2;
  z-index: 1;
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  0%,
  100% {
    opacity: 0.15;
    filter: blur(15px);
  }
  50% {
    opacity: 0.25;
    filter: blur(18px);
  }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .glow-effect {
    filter: blur(20px);
    animation: glowDark 3s ease-in-out infinite;
  }

  @keyframes glowDark {
    0%,
    100% {
      opacity: 0.2;
      filter: blur(20px);
    }
    50% {
      opacity: 0.3;
      filter: blur(22px);
    }
  }
}

/* 光晕效果 - 持续存在 */
.halo-effect {
  position: absolute;
  inset: -4px;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(var(--color-primary-rgb), 0.15),
    transparent 70%
  );
  border-radius: 50%;
  z-index: 1;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

/* 旋转边框效果 - 持续旋转 */
.rotating-border {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--color-primary), transparent 60%);
  opacity: 0.2;
  z-index: 1;
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .halo-effect {
    background: radial-gradient(
      circle at 50% 50%,
      rgba(var(--color-primary-rgb), 0.2),
      transparent 70%
    );
  }

  .rotating-border {
    opacity: 0.25;
    background: linear-gradient(45deg, var(--color-primary), transparent 70%);
  }
}
</style>
