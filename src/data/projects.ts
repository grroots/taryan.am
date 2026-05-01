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
        description: "2023-2025․ ստանդարտների բացակայության և կատեգորիզացիայի քաոսի ուղղում թիմային ճշգրտումներով։"
      },
      "anna-vartanova": {
        title: "ԱՁ Աննա Վարտանովա",
        description: "«Վայլդբերրիս» մարքեթփլեյսում քարտերի ձևավորում, SEO-առաջխաղացում և վաճառք։"
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM (facebook, instagram), քոնթենթ-ստրատեգիա, Wildberries:"
      },
      domus: {
        title: "ԴՈՄՈՒՍ",
        description: "2025+․ քոնթենթ-լիդ, օպերացիոն համակարգում, շաբլոններ, արշավներ, լեյաութներ և ստանդարտիզացիա։"
      },
      "ozon-partner": {
        title: "Ozon տեխնիկական գործընկեր",
        description: "Տեխնիկական և քոնթենթային աջակցություն Ozon ուղղությամբ՝ քարտեր, կառուցվածք և աշխատանքային պրոցես։"
      },
      "aec-ebay": {
        title: "Armenian Export Center eBay նախագիծ",
        description: "eBay ուղղությամբ կատալոգի, ապրանքների քարտերի և քոնթենթային ներկայացման աշխատանքային նախագիծ։"
      }
    },
    ru: {
      innotek: {
        title: "INNOTEK",
        description: "2023-2025: исправление хаоса в стандартах и категоризации через командную настройку процессов."
      },
      "anna-vartanova": {
        title: "ИП Анна Вартанова",
        description: "Оформление карточек на маркетплейсе Wildberries, SEO-продвижение и продажи."
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM (facebook, instagram), контент-стратегия, Wildberries."
      },
      domus: {
        title: "DOMUS",
        description: "2025+: контент-лид, операционная система, шаблоны, кампании, layouts и стандартизация."
      },
      "ozon-partner": {
        title: "Технический партнер Ozon",
        description: "Техническая и контентная поддержка Ozon-направления: карточки, структура и рабочий процесс."
      },
      "aec-ebay": {
        title: "Armenian Export Center eBay project",
        description: "Проект по каталогу, карточкам товаров и контентному представлению в eBay-направлении."
      }
    },
    en: {
      innotek: {
        title: "INNOTEK",
        description: "2023-2025: fixing standardization gaps and categorization chaos through team-level process alignment."
      },
      "anna-vartanova": {
        title: "IE Anna Vartanova",
        description: "Product card design on Wildberries marketplace, SEO promotion and sales."
      },
      eyva: {
        title: "EYVA atelier & more",
        description: "SMM (facebook, instagram), content strategy, Wildberries."
      },
      domus: {
        title: "DOMUS",
        description: "2025+: content lead role, operating system, templates, campaigns, layouts and standardization."
      },
      "ozon-partner": {
        title: "Ozon technical partner",
        description: "Technical and content support for Ozon: product cards, structure and working process."
      },
      "aec-ebay": {
        title: "Armenian Export Center eBay project",
        description: "Project around catalog, product cards and content presentation for eBay."
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
