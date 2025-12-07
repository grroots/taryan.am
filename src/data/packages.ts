// src/data/packages.ts
import { useTranslations } from 'next-intl';
import type { Package } from "@/types";

export const usePackages = (): Package[] => {
  const t = useTranslations('pricing');

  try {
    const packages: Package[] = [
      {
        id: "small",
        name: t('packages.small.name'),
        title: t('packages.small.name'),
        price: t('packages.small.price'),
        annual: t('packages.small.annual'),
        period: t('packages.small.period'),
        description: t('packages.small.description'),
        features: [] as string[],
        buttonText: t('packages.small.button')
      },
      {
        id: "large",
        name: t('packages.large.name'),
        title: t('packages.large.name'),
        price: t('packages.large.price'),
        annual: t('packages.large.annual'),
        period: t('packages.large.period'),
        description: t('packages.large.description'),
        features: [] as string[],
        popular: true,
        buttonText: t('packages.large.button'),
      },
      {
        id: "project",
        name: t('packages.project.name'),
        title: t('packages.project.name'),
        price: t('packages.project.price'),
        annual: t('packages.project.annual'),
        period: t('packages.project.period'),
        description: t('packages.project.description'),
        features: [] as string[],
        buttonText: t('packages.project.button'),
      },
    ];

    try {
      const smallFeatures = t.raw('packages.small.features');
      const largeFeatures = t.raw('packages.large.features');
      const projectFeatures = t.raw('packages.project.features');

      packages[0].features = Array.isArray(smallFeatures) ? smallFeatures : [];
      packages[1].features = Array.isArray(largeFeatures) ? largeFeatures : [];
      packages[2].features = Array.isArray(projectFeatures) ? projectFeatures : [];
    } catch (error) {
      console.warn('Error loading package features:', error);
      packages.forEach(pkg => {
        if (!Array.isArray(pkg.features)) {
          pkg.features = [];
        }
      });
    }

    return packages;
  } catch (error) {
    console.error('Error loading packages:', error);
    return [];
  }
};