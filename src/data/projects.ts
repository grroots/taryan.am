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
    }
  } as const;

  const baseProjects = [
    {
      id: "agga",
      image: "/assets/img/projects/agga.webp",
      tags: ["CMS"],
      url: "#"
    },
    {
      id: "stda",
      image: "/assets/img/projects/saint-twins.webp",
      tags: ["SMM", "Պրեզենտացիա"],
      url: "#"
    },
    {
      id: "innotek",
      image: "/assets/img/projects/tsiatsan-innotek.webp",
      tags: ["Քոնթենթ-մենեջմենթ", "E-commerce", "Բլոգ", "SMM"],
      url: "#"
    },
    {
      id: "anna-vartanova",
      image: "/assets/img/projects/wildberries-anna-vartanova.webp",
      tags: ["Wildberries", "Տեքստ-վիզուալ", "SEO"],
      url: "#"
    },
    {
      id: "eyva",
      image: "/assets/img/projects/eyva-atelier.webp",
      tags: ["SMM", "Wildberries"],
      url: "#"
    },
    {
      id: "turkaget",
      image: "/assets/img/projects/turkaget.webp",
      tags: ["CMS"],
      url: "#"
    }
  ];

  const projectTranslations = {
    hy: {
      agga: {
        title: "agga.am",
        description: "CMS կայքի ստեղծում։ Տեխնիկական սպասարկում:"
      },
      stda: {
        title: "Saint Twins Detective Armenia",
        description: "SMM (instagram, facebook, telegram), կորպորատիվ առաջարկի կազմում:"
      },
      innotek: {
        title: "ԾԻԱԾԱՆ (այժմ՝ ԻՆՆՈՏԵԿ)",
        description: "Իքոմերսի քոնթենթ-մենեջմենթ՝ ապրանքների նկարագրություններ, բլոգ, սոց.ցանցեր։"
      },
      "anna-vartanova": {
        title: "ԱՁ Աննա Վարտանովա",
        description: "«Վայլդբերրիս» մարքեթփլեյսում քարտերի ձևավորում, SEO-առաջխաղացում և վաճառք։"
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM (facebook, instagram), քոնթենթ-ստրատեգիա, Wildberries:"
      },
      turkaget: {
        title: "Թյուրքագետ Վարուժան Գեղամյան",
        description: "Կայք-այցեքարտի պատրաստում (CMS)"
      }
    },
    ru: {
      agga: {
        title: "agga.am",
        description: "Создание CMS сайта. Техническое обслуживание."
      },
      stda: {
        title: "Saint Twins Detective Armenia",
        description: "SMM (instagram, facebook, telegram), составление корпоративного предложения."
      },
      innotek: {
        title: "ЦИАЦАН (ныне - INNOTEK)",
        description: "Контент-менеджмент интернет-магазина: от описаний товаров до блога и текстов для соцсетей."
      },
      "anna-vartanova": {
        title: "ИП Анна Вартанова",
        description: "Оформление карточек на маркетплейсе Wildberries, SEO-продвижение и продажи."
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM (facebook, instagram), контент-стратегия, Wildberries."
      },
      turkaget: {
        title: "Тюрколог Варужан Гегамян",
        description: "Создание сайта-визитки (CMS)"
      }
    },
    en: {
      agga: {
        title: "agga.am",
        description: "CMS website development. Technical support."
      },
      stda: {
        title: "Saint Twins Detective Armenia",
        description: "SMM (instagram, facebook, telegram), corporate proposal development."
      },
      innotek: {
        title: "TSIATSAN (now INNOTEK)",
        description: "E-commerce content management: from product descriptions to blog and social media texts."
      },
      "anna-vartanova": {
        title: "IE Anna Vartanova",
        description: "Product card design on Wildberries marketplace, SEO promotion and sales."
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM (facebook, instagram), content strategy, Wildberries."
      },
      turkaget: {
        title: "Turkologist Varuzhan Geghamyan",
        description: "Business card website development (CMS)."
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