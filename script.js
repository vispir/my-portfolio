console.log("Карточка загружена");

// Кнопка "Связаться"
const contact = document.querySelector(".profile-card .btn-primary");
if (contact) {
  contact.addEventListener("click", () => {
    window.location.href = "mailto:ananumys.viktor2015@gmail.com?subject=Привет%2C%20Виктор!";
  });
}

/* ===================== THEME (GIF) ===================== */
console.log("Переключатель темы с GIF-иконками активен");

const themeBtn  = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

// предзагрузка (чтобы не мигало)
["icons/sun.gif", "icons/moon.gif", "icons/sun.png", "icons/moon.png"].forEach(src => {
  const i = new Image(); i.src = src;
});

// восстановление темы
const savedTheme = localStorage.getItem("theme"); // 'dark' | 'light' | null
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn?.setAttribute("aria-pressed", "true");
}

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// текущий язык
let currentLang = "ru";

/* === Обновление иконки темы и подсказки === */
function updateThemeIcon(i18nDict) {
  const dark = document.body.classList.contains("dark");
  const usePng = prefersReduced; // если не нужно — поставь false

  themeIcon.src = dark
    ? (usePng ? "icons/moon.png" : "icons/moon.gif")
    : (usePng ? "icons/sun.png"  : "icons/sun.gif");
  themeIcon.alt = dark ? i18nDict.themeDark : i18nDict.themeLight;

  const tooltipText = dark ? i18nDict.themeTooltipToLight : i18nDict.themeTooltipToDark;
  if (themeBtn) {
    themeBtn.setAttribute("data-tooltip", tooltipText);
    themeBtn.setAttribute("title", tooltipText);
  }
}

themeBtn?.addEventListener("click", () => {
  const willBeDark = !document.body.classList.contains("dark");
  document.body.classList.toggle("dark", willBeDark);
  themeBtn.setAttribute("aria-pressed", willBeDark ? "true" : "false");
  localStorage.setItem("theme", willBeDark ? "dark" : "light");
  updateThemeIcon(i18n[currentLang]);
});

/* ===================== I18N (переводы) ===================== */
const i18n = {
  ru: {
    themeTooltipToDark: "Включить тёмную тему",
    themeTooltipToLight: "Включить светлую тему",
    name: "Виктор",
    role: "Начинающий веб-разработчик",
    profession: "Начинающий веб-разработчик",
    contact: "Связаться",
    telegramTitle: "Мой Telegram",
    githubTitle: "Мой GitHub",
    vkTitle: "Мой VK",
    photoAlt: "Фото Виктора",
    themeLight: "Светлая тема",
    themeDark: "Тёмная тема",
    aboutBtn: "Обо мне",
    aboutTitle: "Узнать обо мне",
    aboutHeading: "Обо мне",
    /* ✅ Заменено на твой текст */
    bio:
      "Спиридонов Виктор Александрович, д. р. 20.08.2003г, родился  в Астраханской области, Лиманский район, р.п Лиман.\n\n" +
      "Виктор закончил “Лиманская СОШ №1” в 2019г.\n" +
      "В сентябре 2019г, Виктор поступил в АКВТ на специалитет “Информационная безопасность автоматизированых систем”\n" +
      "В 2023г. успешно окончил обучение, получив диплом специалиста\n\n" +
      "В 2023г, в октябре, Виктор устроился работать системным администратором в ГБУЗ АО “Лиманская РБ”\n" +
      "В настоящий момент, Виктор работает специалистом по информационной безопасности в ГБУЗ АО “Наримановская РБ”",
  },
  en: {
    themeTooltipToDark: "Enable dark theme",
    themeTooltipToLight: "Enable light theme",
    name: "Victor",
    role: "Junior Web Developer",
    profession: "Junior Web Developer",
    contact: "Contact",
    telegramTitle: "My Telegram",
    githubTitle: "My GitHub",
    vkTitle: "My VK",
    photoAlt: "Victor's photo",
    themeLight: "Light theme",
    themeDark: "Dark theme",
    aboutBtn: "About me",
    aboutTitle: "Learn more about me",
    aboutHeading: "About me",
    bio:
      "Spiridonov Viktor Alexandrovich, born on August 20, 2003, in Astrakhan region, Liman district, Liman settlement.\n\n" +
      "In 2019, Viktor graduated from 'Liman Secondary School No.1'.\n" +
      "In September 2019, he entered AKVT to study the specialty 'Information Security of Automated Systems'.\n" +
      "In 2023, he successfully completed his studies and received a Specialist diploma.\n\n" +
      "In October 2023, Viktor started working as a system administrator at GBUZ AO 'Liman Regional Hospital'.\n" +
      "At present, Viktor works as an Information Security Specialist at GBUZ AO 'Narimanov Regional Hospital'."  }
};

// Кнопки выбора языка
const langButtons = document.querySelectorAll(".lang-toggle");

// восстановим язык
const savedLang = localStorage.getItem("lang");
if (savedLang === "ru" || savedLang === "en") {
  currentLang = savedLang;
} else {
  currentLang = navigator.language && navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

// применяем язык при загрузке
setLanguage(currentLang);

// обработчики на кнопках RU/EN
langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    setLanguage(lang);
  });
});

function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;

  // отметить активную кнопку
  langButtons.forEach(b => b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false"));

  // html lang
  document.documentElement.setAttribute("lang", lang);

  // применить переводы
  applyTranslations(i18n[lang]);

  // сохранить язык
  localStorage.setItem("lang", lang);

  // обновить иконку/подсказку с учётом текущей темы и языка
  updateThemeIcon(i18n[lang]);
}

function applyTranslations(dict) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key]) el.setAttribute("title", dict[key]); // для tooltip у кнопки «Обо мне»
  });

  document.querySelectorAll("[data-i18n-alt]").forEach(el => {
    const key = el.getAttribute("data-i18n-alt");
    if (dict[key]) el.setAttribute("alt", dict[key]);
  });
}

/* ===================== КНОПКА "ОБО МНЕ" ===================== */
const aboutBtn = document.querySelector(".btn-about");
if (aboutBtn) {
  aboutBtn.addEventListener("click", () => {
    const target = document.getElementById("about");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
