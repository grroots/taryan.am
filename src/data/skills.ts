// src/data/skills.ts
import { useTranslations } from 'next-intl';
import { createElement } from "react";
import {
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  ClipboardCheck,
  Database,
  FileText,
  Languages,
  ListChecks,
  Search,
  Tags,
  Users,
  Workflow,
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
          color: "#2B7A8A",
          level: 5,
        },
        {
          id: "category-content",
          name: t('items.category_content'),
          icon: createElement(Tags, { className: iconClassName }),
          color: "#1A6B7A",
          level: 5,
        },
        {
          id: "sku-structure",
          name: t('items.sku_structure'),
          icon: createElement(Boxes, { className: iconClassName }),
          color: "#CD7F32",
          level: 5,
        },
        {
          id: "multilingual-content",
          name: t('items.multilingual_content'),
          icon: createElement(Languages, { className: iconClassName }),
          color: "#B8453F",
          level: 4,
        },
        {
          id: "content-qa",
          name: t('items.content_quality_control'),
          icon: createElement(ClipboardCheck, { className: iconClassName }),
          color: "#2B7A8A",
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
          icon: createElement(Workflow, { className: iconClassName }),
          color: "#2B7A8A",
          level: 5,
        },
        {
          id: "team-coordination",
          name: t('items.team_coordination'),
          icon: createElement(Users, { className: iconClassName }),
          color: "#CD7F32",
          level: 5,
        },
        {
          id: "task-standards",
          name: t('items.task_standards'),
          icon: createElement(ListChecks, { className: iconClassName }),
          color: "#B8453F",
          level: 5,
        },
        {
          id: "qa-processes",
          name: t('items.qa_processes'),
          icon: createElement(ClipboardCheck, { className: iconClassName }),
          color: "#1A6B7A",
          level: 5,
        },
      ],
    },
    {
      id: "writing",
      title: t('categories.writing'),
      skills: [
        {
          id: "chatgpt",
          name: "ChatGPT",
          icon: createElement(Bot, { className: iconClassName }),
          color: "#10A37F",
          level: 5,
        },
        {
          id: "claude",
          name: "Claude",
          icon: createElement(BrainCircuit, { className: iconClassName }),
          color: "#CC785C",
          level: 5,
        },
        {
          id: "prompt-systems",
          name: t('items.prompt_systems'),
          icon: createElement(ListChecks, { className: iconClassName }),
          color: "#2B7A8A",
          level: 5,
        },
        {
          id: "bulk-generation",
          name: t('items.bulk_generation'),
          icon: createElement(Database, { className: iconClassName }),
          color: "#CD7F32",
          level: 4,
        },
        {
          id: "content-review",
          name: t('items.content_review'),
          icon: createElement(ClipboardCheck, { className: iconClassName }),
          color: "#B8453F",
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
          name: "GA4",
          icon: createElement(BarChart3, { className: iconClassName }),
          color: "#E37400",
          level: 4,
        },
        {
          id: "gsc",
          name: "Google Search Console",
          icon: createElement(Search, { className: iconClassName }),
          color: "#4285F4",
          level: 4,
        },
        {
          id: "yandex-metrica",
          name: "Yandex Metrica",
          icon: createElement(BarChart3, { className: iconClassName }),
          color: "#FF6B35",
          level: 4,
        },
        {
          id: "seo-structure",
          name: t('items.seo_structure'),
          icon: createElement(Tags, { className: iconClassName }),
          color: "#2B7A8A",
          level: 5,
        },
        {
          id: "search-intent",
          name: t('items.search_intent'),
          icon: createElement(Search, { className: iconClassName }),
          color: "#B8453F",
          level: 4,
        },
      ],
    },
    {
      id: "social",
      title: t('categories.social'),
      skills: [
        {
          id: "wordpress",
          name: "WordPress",
          icon: createElement(Database, { className: iconClassName }),
          color: "#21759B",
          level: 4,
        },
        {
          id: "marketplace-tools",
          name: t('items.marketplace_tools'),
          icon: createElement(Boxes, { className: iconClassName }),
          color: "#CB11AB",
          level: 4,
        },
        {
          id: "admin-panels",
          name: t('items.admin_panels'),
          icon: createElement(Database, { className: iconClassName }),
          color: "#2B7A8A",
          level: 5,
        },
        {
          id: "catalog-systems",
          name: t('items.catalog_systems'),
          icon: createElement(Workflow, { className: iconClassName }),
          color: "#CD7F32",
          level: 5,
        },
      ],
    },
    {
      id: "ai",
      title: t('categories.ai'),
      skills: [
        {
          id: "training",
          name: t('items.training'),
          icon: createElement(Users, { className: iconClassName }),
          color: "#2B7A8A",
          level: 5,
        },
        {
          id: "checklists",
          name: t('items.checklists'),
          icon: createElement(ListChecks, { className: iconClassName }),
          color: "#CD7F32",
          level: 5,
        },
        {
          id: "error-review",
          name: t('items.error_review'),
          icon: createElement(ClipboardCheck, { className: iconClassName }),
          color: "#B8453F",
          level: 5,
        },
        {
          id: "ai-training",
          name: t('items.ai_training'),
          icon: createElement(Bot, { className: iconClassName }),
          color: "#10A37F",
          level: 5,
        },
      ],
    },
  ];
};
