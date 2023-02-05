<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

useHead({
  title: "About",
  meta: [
    { name: "description", content: "About smolneko 🌸." || "" },
    { property: "og:title", content: `smolneko — About` },
    {
      property: "og:description",
      content:
        "smolneko is a fully open source project about anime figures." || "",
    },
    { property: "og:image", content: `${config.public.appURL}/favicon.png` },
    { property: "og:url", content: config.public.appURL + route.path },
  ],
});
</script>

<template>
  <div
    class="container mx-auto mb-8 h-full w-full max-w-screen-2xl px-4 md:px-8"
  >
    <div class="mb-4 mt-2 flex md:mb-6">
      <h1
        class="text-smol-header dark:text-smol-dark-header text-4xl font-bold !leading-tight md:text-[48px] lg:text-6xl 2xl:text-[64px]"
      >
        About
      </h1>
    </div>
    <div class="grid gap-4">
      <div>
        <div class="mb-4 flex items-center justify-center">
          <IconsIconPaw
            class="h-40 fill-smol-header dark:fill-smol-dark-header"
            v-motion
            :initial="{
              y: -10,
            }"
            :enter="{
              y: 10,
              opacity: 1,
              transition: {
                duration: 2000,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
              },
            }"
          />
        </div>
        <p class="text-smol-text dark:text-smol-dark-text text-base">
          <span class="text-smol-primary dark:text-smol-dark-primary font-bold"
            >smolneko</span
          >
          is a fully open source project about anime figures. Launched in
          December 2022.
        </p>
        <br />
        <ul
          class="text-smol-text dark:text-smol-dark-text list-inside list-none leading-loose"
        >
          <li>
            <span
              class="text-smol-primary dark:text-smol-dark-primary font-bold"
              >smol</span
            >
            — something small and cute. :3 This word is intentionally misspelled
            “small”, also an internet meme ("explain your smollness — am
            potat").
          </li>
          <li>
            <span
              class="text-smol-primary dark:text-smol-dark-primary font-bold"
              >neko</span
            >
            — short for catgirl (in Japanese: “猫娘”, nekomusume) or cat (in
            Japanese: “ネコ”, neko).
          </li>
          <li>
            <span
              class="text-smol-primary dark:text-smol-dark-primary font-bold"
              >moe</span
            >
            — a slang word (in Japanese: “萌え”; pronounced as “moh-ay”) rooted
            deep in the Japanese Otaku culture. It has often been used to mean a
            particular type of “adorable” or “cute” towards fictional
            characters, people, animals, etc. “Moe” is a very versatile word
            used to express a deep feeling or passion for something you love.
            Moe can be used as a noun, a verb, and even an adjective. (<NuxtLink
              to="https://nic.moe/en/"
              target="_blank"
              :external="true"
              class="hover:text-smol-primary font-semibold hover:underline hover:underline-offset-4"
              >source</NuxtLink
            >)
          </li>
        </ul>
        <div class="mt-2 flex flex-wrap gap-4">
          <NuxtLink
            class="text-smol-body-bg dark:text-smol-dark-body-bg bg-smol-primary dark:bg-smol-dark-primary inline-flex cursor-pointer items-center rounded-md py-3 px-6 outline-none hover:bg-[#4700AB] focus:outline-none dark:hover:bg-[#BFBEFC]"
            to="https://github.com/smolneko-team"
            target="_blank"
            :external="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="h-6 w-6"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.2-.3 6.5-1.5 6.5-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 20 1s-1.3-.3-4 1.5a13.4 13.4 0 0 0-7 0C6.3.6 5 1 5 1a5 5 0 0 0 0 3.8 5.4 5.4 0 0 0-1.5 3.7c0 5.5 3.3 6.7 6.4 7a3.4 3.4 0 0 0-.9 2.6V22"
              />
            </svg>
            <span class="ml-3 text-base font-medium">GitHub</span>
          </NuxtLink>
          <NuxtLink
            class="text-smol-body-bg dark:text-smol-dark-body-bg bg-smol-primary dark:bg-smol-dark-primary inline-flex cursor-pointer items-center rounded-md py-3 px-6 outline-none hover:bg-[#4700AB] focus:outline-none dark:hover:bg-[#BFBEFC]"
            to="https://t.me/smolneko"
            target="_blank"
            :external="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              class="h-6 w-6"
              viewBox="0 0 48 48"
            >
              <path
                d="M41.4 7.3s3.9-1.5 3.6 2.2c-.1 1.5-1.1 6.8-2 12.5l-2.5 17s-.3 2.5-2.2 3c-2 .4-4.9-1.6-5.4-2-.4-.3-8-5.2-10.8-7.6-.7-.6-1.6-2 .1-3.4l11.4-11c1.3-1.3 2.6-4.3-2.8-.6l-15 10.3s-1.8 1-5 0l-7-2S1.2 24 5.6 22.4c10.8-5.1 24-10.3 35.8-15.2Z"
              />
            </svg>
            <span class="ml-2 text-base font-medium">Telegram</span>
          </NuxtLink>
        </div>
      </div>
      <div class="w-full">
        <div class="flex w-full flex-col gap-y-4 rounded-2xl">
          <DisclosureStyled title="Project support"
            >Create an issue on GitHub if you have a question, a new feature or
            a problem with the site.</DisclosureStyled
          >
          <DisclosureStyled title="Inspiration and ideas">🌸</DisclosureStyled>
          <DisclosureStyled title="Open Source libraries"
            >A complete list of used libraries can be found in the
            <NuxtLink
              to="https://github.com/smolneko-team"
              target="_blank"
              :external="true"
              class="hover:text-smol-primary font-semibold hover:underline hover:underline-offset-4"
              >project repositories</NuxtLink
            >.</DisclosureStyled
          >
        </div>
      </div>
    </div>
  </div>
</template>
