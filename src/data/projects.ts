// src/data/projects.ts
import { useLocale } from 'next-intl';
import type { PortfolioItem } from "@/types";

export const useProjects = (): PortfolioItem[] => {
  const locale = useLocale();
  const tagTranslations = {
    hy: {
      "CMS": "CMS",
      "SMM": "SMM", 
      "Պրեզենտացիա": "Պրեզենտացիա",
      "Քոնթենթ-մենեջմենթ": "Քոնթենթ-մենեջմենթ",
      "E-commerce": "E-commerce",
      "Բլոգ": "Բլոգ",
      "Wildberries": "Wildberries",
      "Տեքստ-վիզուալ": "Տեքստ-վիզուալ",
      "SEO": "SEO"
      ,"Domus": "Domus"
      ,"Ozon": "Ozon"
      ,"eBay": "eBay"
      ,"Աուդիտ": "Աուդիտ"
      ,"Կատալոգ": "Կատալոգ"
      ,"Ստանդարտներ": "Ստանդարտներ"
    },
    ru: {
      "CMS": "CMS",
      "SMM": "SMM",
      "Պրեզենտացիա": "Презентация", 
      "Քոնթենթ-մենեջմենթ": "Контент-менеджмент",
      "E-commerce": "E-commerce",
      "Բլոգ": "Блог",
      "Wildberries": "Wildberries",
      "Տեքստ-վիզուալ": "Тексты-инфографики",
      "SEO": "SEO"
      ,"Domus": "Domus"
      ,"Ozon": "Ozon"
      ,"eBay": "eBay"
      ,"Աուդիտ": "Аудит"
      ,"Կատալոգ": "Каталог"
      ,"Ստանդարտներ": "Стандарты"
    },
    en: {
      "CMS": "CMS",
      "SMM": "SMM",
      "Պրեզենտացիա": "Presentation",
      "Քոնթենթ-մենեջմենթ": "Content Management", 
      "E-commerce": "E-commerce",
      "Բլոգ": "Blog",
      "Wildberries": "Wildberries",
      "Տեքստ-վիզուալ": "Text-Infographics",
      "SEO": "SEO"
      ,"Domus": "Domus"
      ,"Ozon": "Ozon"
      ,"eBay": "eBay"
      ,"Աուդիտ": "Audit"
      ,"Կատալոգ": "Catalog"
      ,"Ստանդարտներ": "Standards"
    }
  } as const;

  const baseProjects = [
    {
      id: "innotek",
      image: "/assets/img/projects/tsiatsan-innotek.webp",
      category: "web" as const,
      tags: ["Քոնթենթ-մենեջմենթ", "Կատալոգ", "Ստանդարտներ"],
      url: "#"
    },
    {
      id: "anna-vartanova",
      image: "/assets/img/projects/wildberries-anna-vartanova.webp",
      category: "design" as const,
      tags: ["Wildberries", "Տեքստ-վիզուալ", "SEO"],
      url: "#"
    },
    {
      id: "eyva",
      image: "/assets/img/projects/eyva-atelier.webp",
      category: "design" as const,
      tags: ["SMM", "Wildberries"],
      url: "#"
    },
    {
      id: "domus",
      image: "/assets/img/projects/agga.webp",
      category: "web" as const,
      tags: ["Domus", "Կատալոգ", "Ստանդարտներ"],
      url: "#"
    },
    {
      id: "ozon-partner",
      image: "/assets/img/logos/ozon.webp",
      category: "web" as const,
      tags: ["Ozon", "E-commerce", "Քոնթենթ-մենեջմենթ"],
      url: "#"
    },
    {
      id: "aec-ebay",
      image: "/assets/img/projects/turkaget.webp",
      category: "web" as const,
      tags: ["eBay", "E-commerce", "Աուդիտ"],
      url: "#"
    }
  ];

  const projectTranslations = {
    hy: {
      innotek: {
        title: "ԻՆՆՈԹԵԿ",
        description: "2023-2025 · 10 000 SKU · հայերեն, անգլերեն և ռուսերեն քոնթենթ։"
      },
      "anna-vartanova": {
        title: "ԱՁ Աննա Վարտանովա",
        description: "2023-2024 · 500 SKU · 2000+ ինֆոգրաֆիկա և տեքստեր Wildberries-ի համար։"
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM · $20 բյուջե՝ 80+ լիդ · Wildberries՝ 10+ SKU տեղական արտադրողից։"
      },
      domus: {
        title: "ԴՈՄՈՒՍ",
        description: "2025+ · 30 000+ SKU համակարգում · Bitrix24 ERP Smart Process ինտեգրում։"
      },
      "ozon-partner": {
        title: "Ozon տեխնիկական գործընկեր",
        description: "Տեխնիկական և քոնթենթային աջակցություն Ozon ուղղությամբ՝ քարտեր, կառուցվածք և աշխատանքային պրոցես։"
      },
      "aec-ebay": {
        title: "Armenian Export Center eBay նախագիծ",
        description: "2021-2022 · 30+ գործընկեր Հայաստանից · 3 վաճառք մեկնարկային 2 շաբաթում։"
      }
    },
    ru: {
      innotek: {
        title: "INNOTEK",
        description: "2023-2025 · 10 000 SKU · контент на армянском, английском и русском."
      },
      "anna-vartanova": {
        title: "ИП Анна Вартанова",
        description: "2023-2024 · 500 SKU · 2000+ инфографик и текстов для Wildberries."
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM · бюджет $20 принес 80+ лидов · Wildberries: 10+ SKU от локального производителя."
      },
      domus: {
        title: "DOMUS",
        description: "2025+ · 30 000+ SKU в системе · интеграция Bitrix24 ERP Smart Process."
      },
      "ozon-partner": {
        title: "Технический партнер Ozon",
        description: "Техническая и контентная поддержка Ozon-направления: карточки, структура и рабочий процесс."
      },
      "aec-ebay": {
        title: "Armenian Export Center eBay project",
        description: "2021-2022 · 30+ партнеров из Армении · 3 продажи за первые 2 недели."
      }
    },
    en: {
      innotek: {
        title: "INNOTEK",
        description: "2023-2025 · 10,000 SKU · content in Armenian, English and Russian."
      },
      "anna-vartanova": {
        title: "IE Anna Vartanova",
        description: "2023-2024 · 500 SKU · 2,000+ infographics and texts for Wildberries."
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM · $20 budget generated 80+ leads · Wildberries: 10+ SKU from a local producer."
      },
      domus: {
        title: "DOMUS",
        description: "2025+ · 30,000+ SKU in the system · Bitrix24 ERP Smart Process integration."
      },
      "ozon-partner": {
        title: "Ozon technical partner",
        description: "Technical and content support for Ozon: product cards, structure and working process."
      },
      "aec-ebay": {
        title: "Armenian Export Center eBay project",
        description: "2021-2022 · 30+ partners from Armenia · 3 sales in the first 2 weeks."
      }
    }
  } as const;

  const currentLang = locale as keyof typeof projectTranslations;
  const translations = projectTranslations[currentLang] || projectTranslations.hy;
  const tagTrans = tagTranslations[currentLang] || tagTranslations.hy;
  const translateTags = (tags: string[]) => {
    return tags.map(tag => tagTrans[tag as keyof typeof tagTrans] || tag);
  };

  return baseProjects.map(project => ({
    ...project,
    title: translations[project.id as keyof typeof translations]?.title || project.id,
    description: translations[project.id as keyof typeof translations]?.description || "",
    tags: translateTags(project.tags)
  }));
};
