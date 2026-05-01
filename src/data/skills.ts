// src/data/skills.ts
import { useTranslations } from 'next-intl';
import { createElement } from "react";
import {
  BarChart3,
  Bot,
  Boxes,
  Braces,
  ClipboardCheck,
  ClipboardList,
  FileText,
  Languages,
  LayoutTemplate,
  ListChecks,
  Search,
  Users,
} from "lucide-react";
import type { SkillCategory } from "@/types";

const iconClassName = "w-8 h-8";

export const useSkills = (): SkillCategory[] => {
  const t = useTranslations('skills');

  return [
    {
      id: "web-tech",
      title: t('categories.web_tech'),
      skills: [
        {
          id: "product-cards",
          name: t('items.product_cards'),
          icon: createElement(FileText, { className: iconClassName }),
          color: "#3A8C82",
          level: 5,
        },
        {
          id: "category-content",
          name: t('items.category_content'),
          icon: createElement(Boxes, { className: iconClassName }),
          color: "#2D7A70",
          level: 5,
        },
        {
          id: "sku-structure",
          name: t('items.sku_structure'),
          icon: createElement(Boxes, { className: iconClassName }),
          color: "#D7B98E",
          level: 5,
        },
        {
          id: "multilingual-content",
          name: t('items.multilingual_content'),
          icon: createElement(Languages, { className: iconClassName }),
          color: "#6B7B8D",
          level: 4,
        },
        {
          id: "content-qa",
          name: t('items.content_quality_control'),
          icon: createElement(ClipboardCheck, { className: iconClassName }),
          color: "#3A8C82",
          level: 5,
        },
      ],
    },
    {
      id: "creative",
      title: t('categories.creative'),
      skills: [
        {
          id: "workflows",
          name: t('items.workflows'),
          icon: createElement(ClipboardList, { className: iconClassName }),
          color: "#3A8C82",
          level: 5,
        },
        {
          id: "team-coordination",
          name: t('items.team_coordination'),
          icon: createElement(Users, { className: iconClassName }),
          color: "#D7B98E",
          level: 5,
        },
        {
          id: "task-standards",
          name: t('items.task_standards'),
          icon: createElement(ListChecks, { className: iconClassName }),
          color: "#6B7B8D",
          level: 5,
        },
        {
          id: "qa-processes",
          name: t('items.qa_processes'),
          icon: createElement(ClipboardCheck, { className: iconClassName }),
          color: "#2D7A70",
          level: 5,
        },
      ],
    },
    {
      id: "writing",
      title: t('categories.writing'),
      skills: [
        {
          id: "seo-structure",
          name: t('items.seo_structure'),
          icon: createElement(Search, { className: iconClassName }),
          color: "#3A8C82",
          level: 5,
        },
        {
          id: "search-intent",
          name: t('items.search_intent'),
          icon: createElement(Search, { className: iconClassName }),
          color: "#2D7A70",
          level: 5,
        },
        {
          id: "product-cards-seo",
          name: t('items.product_cards'),
          icon: createElement(LayoutTemplate, { className: iconClassName }),
          color: "#D7B98E",
          level: 5,
        },
        {
          id: "content-review",
          name: t('items.content_review'),
          icon: createElement(ClipboardCheck, { className: iconClassName }),
          color: "#6B7B8D",
          level: 5,
        },
      ],
    },
    {
      id: "analytics",
      title: t('categories.analytics'),
      skills: [
        {
          id: "ga4",
          name: t('items.admin_panels'),
          icon: createElement(BarChart3, { className: iconClassName }),
          color: "#2D7A70",
          level: 4,
        },
        {
          id: "gtag",
          name: t('items.catalog_systems'),
          icon: createElement(BarChart3, { className: iconClassName }),
          color: "#D7B98E",
          level: 4,
        },
        {
          id: "gsc",
          name: t('items.google_search_console'),
          icon: createElement(Search, { className: iconClassName }),
          color: "#6B7B8D",
          level: 4,
        },
        {
          id: "yandex-metrica",
          name: t('items.yandex_metrica'),
          icon: createElement(BarChart3, { className: iconClassName }),
          color: "#3A8C82",
          level: 4,
        },
      ],
    },
    {
      id: "ai",
      title: t('categories.ai'),
      skills: [
        {
          id: "gemini",
          name: t('items.gemini'),
          icon: createElement(Bot, { className: iconClassName }),
          color: "#3A8C82",
          level: 5,
        },
        {
          id: "chatgpt",
          name: t('items.chatgpt'),
          icon: createElement(Bot, { className: iconClassName }),
          color: "#D7B98E",
          level: 5,
        },
        {
          id: "claude",
          name: t('items.claude'),
          icon: createElement(Bot, { className: iconClassName }),
          color: "#6B7B8D",
          level: 5,
        },
        {
          id: "prompt-systems",
          name: t('items.prompt_systems'),
          icon: createElement(ListChecks, { className: iconClassName }),
          color: "#2D7A70",
          level: 5,
        },
        {
          id: "automation-scripts",
          name: t('items.automation_scripts'),
          icon: createElement(Braces, { className: iconClassName }),
          color: "#3A8C82",
          level: 4,
        },
        {
          id: "ai-audits",
          name: t('items.ai_audits'),
          icon: createElement(ClipboardCheck, { className: iconClassName }),
          color: "#D7B98E",
          level: 4,
        },
      ],
    },
  ];
};
