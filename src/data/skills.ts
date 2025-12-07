// src/data/skills.ts
import { useTranslations } from 'next-intl';
import { createElement } from "react";
import type { SkillCategory } from "@/types";

// React Icons импорты
import {
  SiWordpress,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGoogleanalytics,
  SiYoutube,
  SiInstagram,
  SiFacebook,
  SiTelegram,
  SiLinkedin,
  SiGrammarly,
  SiEbay,
  SiOpenai,
  SiAdobephotoshop,
  SiFigma
} from "react-icons/si";

export const useSkills = (): SkillCategory[] => {
  const t = useTranslations('skills');

  return [
    {
      id: "web-tech",
      title: t('categories.web_tech'),
      skills: [
        {
          id: "wordpress",
          name: "WordPress",
          icon: createElement(SiWordpress, { className: "w-8 h-8" }),
          color: "#21759B",
          level: 4,
        },
        {
          id: "tilda",
          name: "Tilda",
          icon: createElement("img", {
            src: "/assets/img/logos/tilda.webp",
            alt: "Tilda",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#000",
          level: 4,
        },
        {
          id: "wix",
          name: "WIX",
          icon: createElement("img", {
            src: "/assets/img/logos/wix.webp",
            alt: "WIX",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#fcbe73",
          level: 4,
        },
        {
          id: "html",
          name: "HTML5",
          icon: createElement(SiHtml5, { className: "w-8 h-8" }),
          color: "#E34F26",
          level: 4,
        },
        {
          id: "css",
          name: "CSS3",
          icon: createElement(SiCss3, { className: "w-8 h-8" }),
          color: "#1572B6",
          level: 4,
        },
        {
          id: "javascript",
          name: "JavaScript",
          icon: createElement(SiJavascript, { className: "w-8 h-8" }),
          color: "#F7DF1E",
          level: 3,
        },
        {
          id: "wildberries",
          name: "Wildberries",
          icon: createElement("img", {
            src: "/assets/img/logos/wildberries.webp",
            alt: "Wildberries",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#CB11AB",
          level: 4,
        },
        {
          id: "ozon",
          name: "Ozon",
          icon: createElement("img", {
            src: "/assets/img/logos/ozon.webp",
            alt: "Ozon",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#005BFF",
          level: 4,
        },
        {
          id: "ebay",
          name: "eBay",
          icon: createElement(SiEbay, { className: "w-8 h-8" }),
          color: "#E53238",
          level: 3,
        },
      ],
    },
    {
      id: "creative",
      title: t('categories.creative'),
      skills: [
        {
          id: "photoshop",
          name: "Photoshop",
          icon: createElement(SiAdobephotoshop, { className: "w-8 h-8" }),
          color: "#31A8FF",
          level: 3,
        },
        {
          id: "premiere-pro",
          name: "Premiere Pro",
          icon: createElement("img", {
            src: "/assets/img/logos/premiere-pro.webp",
            alt: "Premiere Pro",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#9999FF",
          level: 3,
        },
        {
          id: "illustrator",
          name: "Illustrator",
          icon: createElement("img", {
            src: "/assets/img/logos/illustrator.webp",
            alt: "Illustrator",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#FF9A00",
          level: 3,
        },
        {
          id: "figma",
          name: "Figma",
          icon: createElement(SiFigma, { className: "w-8 h-8" }),
          color: "#F24E1E",
          level: 4,
        },
        {
          id: "canva",
          name: "Canva",
          icon: createElement("img", {
            src: "/assets/img/logos/canva.webp",
            alt: "Canva",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#00C4CC",
          level: 5,
        },
        {
          id: "capcut",
          name: "CapCut",
          icon: createElement("img", {
            src: "/assets/img/logos/capcut-logo.webp",
            alt: "CapCut",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#000000",
          level: 4,
        },
      ],
    },
    {
      id: "writing",
      title: t('categories.writing'),
      skills: [
        {
          id: "microsoft-office",
          name: "MS Office",
          icon: createElement("img", {
            src: "/assets/img/logos/office.webp",
            alt: "Microsoft Office",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#D83B01",
          level: 5,
        },
        {
          id: "notepad-plus",
          name: "Notepad+",
          icon: createElement("img", {
            src: "/assets/img/logos/notepadplusplus.webp",
            alt: "Notepad++",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#90E59A",
          level: 4,
        },
        {
          id: "vscode",
          name: "VS Code",
          icon: createElement("img", {
            src: "/assets/img/logos/vs-code.webp",
            alt: "VS Code",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#007ACC",
          level: 4,
        },
      ],
    },
    {
      id: "analytics",
      title: t('categories.analytics'),
      skills: [
        {
          id: "google-analytics",
          name: "GA",
          icon: createElement(SiGoogleanalytics, { className: "w-8 h-8" }),
          color: "#E37400",
          level: 4,
        },
        {
          id: "yandex-metrika",
          name: "Я.Метрика",
          icon: createElement("img", {
            src: "/assets/img/logos/ya-metrika.webp",
            alt: "Яндекс.Метрика",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#FF6B35",
          level: 4,
        },
        {
          id: "text-ru",
          name: "text.ru",
          icon: createElement("img", {
            src: "/assets/img/logos/text-ru.webp",
            alt: "text.ru",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#4A90E2",
          level: 5,
        },
      ],
    },
    {
      id: "social",
      title: t('categories.social'),
      skills: [
        {
          id: "youtube",
          name: "YouTube",
          icon: createElement(SiYoutube, { className: "w-8 h-8" }),
          color: "#FF0000",
          level: 3,
        },
        {
          id: "instagram",
          name: "Instagram",
          icon: createElement(SiInstagram, { className: "w-8 h-8" }),
          color: "#E4405F",
          level: 5,
        },
        {
          id: "facebook",
          name: "Facebook",
          icon: createElement(SiFacebook, { className: "w-8 h-8" }),
          color: "#1877F2",
          level: 5,
        },
        {
          id: "telegram",
          name: "Telegram",
          icon: createElement(SiTelegram, { className: "w-8 h-8" }),
          color: "#26A5E4",
          level: 4,
        },
        {
          id: "linkedin",
          name: "LinkedIn",
          icon: createElement(SiLinkedin, { className: "w-8 h-8" }),
          color: "#0A66C2",
          level: 4,
        },
      ],
    },
    {
      id: "ai",
      title: t('categories.ai'),
      skills: [
        {
          id: "chatgpt",
          name: "ChatGPT",
          icon: createElement(SiOpenai, { className: "w-8 h-8" }),
          color: "#10A37F",
          level: 5,
        },
        {
          id: "claude",
          name: "Claude",
          icon: createElement("img", {
            src: "/assets/img/logos/claude.webp",
            alt: "Claude",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#CC785C",
          level: 5,
        },
        {
          id: "deepseek",
          name: "DeepSeek",
          icon: createElement("img", {
            src: "/assets/img/logos/deepseek.webp",
            alt: "DeepSeek",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#1E3A8A",
          level: 4,
        },
        {
          id: "qwen",
          name: "QwenLM",
          icon: createElement("img", {
            src: "/assets/img/logos/qwen.webp",
            alt: "QwenLM",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#FF6A00",
          level: 4,
        },
        {
          id: "copy-ai",
          name: "Copy.ai",
          icon: createElement("img", {
            src: "/assets/img/logos/copy-ai.webp",
            alt: "Copy.ai",
            className: "w-8 h-8",
            loading: "lazy"
          }),
          color: "#8B5CF6",
          level: 4,
        },
        {
          id: "grammarly",
          name: "Grammarly",
          icon: createElement(SiGrammarly, { className: "w-8 h-8" }),
          color: "#15C39A",
          level: 4,
        },
      ],
    },
  ];
};