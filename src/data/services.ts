// src/data/services.ts
import { useTranslations } from 'next-intl';
import {
  FileText,
  TrendingUp,
  Users,
  Eye,
  BarChart3,
  Search,
} from "lucide-react";
import { createElement } from "react";
import type { Service } from "@/types";

export const useServices = (): Service[] => {
  const t = useTranslations('services');

  const services: Service[] = [
    {
      id: "copywriting",
      icon: createElement(FileText, { className: "w-8 h-8" }),
      title: t('items.copywriting.title'),
      description: t('items.copywriting.description'),
      features: [],
    },
    {
      id: "blog",
      icon: createElement(TrendingUp, { className: "w-8 h-8" }),
      title: t('items.blog.title'),
      description: t('items.blog.description'),
      features: [],
    },
    {
      id: "products",
      icon: createElement(Eye, { className: "w-8 h-8" }),
      title: t('items.products.title'),
      description: t('items.products.description'),
      features: [],
    },
    {
      id: "smm",
      icon: createElement(Users, { className: "w-8 h-8" }),
      title: t('items.smm.title'),
      description: t('items.smm.description'),
      features: [],
    },
    {
      id: "presentations",
      icon: createElement(BarChart3, { className: "w-8 h-8" }),
      title: t('items.presentations.title'),
      description: t('items.presentations.description'),
      features: [],
    },
    {
      id: "audit",
      icon: createElement(Search, { className: "w-8 h-8" }),
      title: t('items.audit.title'),
      description: t('items.audit.description'),
      features: [],
    },
  ];

  // Простое получение features для каждого сервиса
  services.forEach((service, index) => {
    try {
      const features = t.raw(`items.${service.id}.features`);
      services[index].features = Array.isArray(features) ? features : [];
    } catch {
      services[index].features = [];
    }
  });

  return services;
};