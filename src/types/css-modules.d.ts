// src/types/css-modules.d.ts

/**
 * CSS Modules type declarations for TypeScript
 * Обеспечивает типобезопасность при работе с CSS Modules
 */

// === CSS MODULES DECLARATIONS ===
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.styl" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// === POSTCSS MODULES ===
declare module "*.pcss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.pcss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// === STYLED-JSX SUPPORT ===
declare module "*.styled" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// === CSS-IN-JS TYPE HELPERS ===
export type CSSModuleClasses = { readonly [key: string]: string };

// === UTILITY TYPES FOR CSS MODULES ===
export type ClassNameValue = string | number | boolean | undefined | null;
export type ClassNameMapping = Record<string, any>;
export type ClassNameArgument = ClassNameValue | ClassNameMapping | ClassNameArgument[];

// === CSS VARIABLES SUPPORT ===
declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}

// === CSS MODULE PROPS INTERFACE ===
export interface WithCSSModules {
  classes?: CSSModuleClasses;
  className?: string;
}

// === CSS MODULE COMPONENT PROPS ===
export interface CSSModuleComponentProps {
  className?: string;
  classes?: CSSModuleClasses;
  style?: React.CSSProperties;
}

// === ENHANCED CLASS NAME HELPERS ===
export interface ClassNameFunction {
  (...args: ClassNameArgument[]): string;
}

// === CSS MODULE THEME SUPPORT ===
declare module "*.theme.css" {
  const theme: { readonly [key: string]: string };
  export default theme;
}

declare module "*.vars.css" {
  const vars: { readonly [key: string]: string };
  export default vars;
}

// === CSS MODULE ANIMATION SUPPORT ===
declare module "*.animations.css" {
  const animations: { readonly [key: string]: string };
  export default animations;
}

declare module "*.keyframes.css" {
  const keyframes: { readonly [key: string]: string };
  export default keyframes;
}

// === CSS MEDIA QUERIES MODULES ===
declare module "*.media.css" {
  const media: { readonly [key: string]: string };
  export default media;
}

declare module "*.responsive.css" {
  const responsive: { readonly [key: string]: string };
  export default responsive;
}

// === CSS MODULE COMPONENT SPECIFIC ===
declare module "*.component.css" {
  const component: { readonly [key: string]: string };
  export default component;
}

declare module "*.layout.css" {
  const layout: { readonly [key: string]: string };
  export default layout;
}

declare module "*.page.css" {
  const page: { readonly [key: string]: string };
  export default page;
}

// === CSS MODULE UTILITY CLASSES ===
declare module "*.utils.css" {
  const utils: { readonly [key: string]: string };
  export default utils;
}

declare module "*.helpers.css" {
  const helpers: { readonly [key: string]: string };
  export default helpers;
}

// === CSS MODULE VENDOR PREFIXES ===
declare module "*.vendor.css" {
  const vendor: { readonly [key: string]: string };
  export default vendor;
}

// === GLOBAL CSS MODULE AUGMENTATION ===
declare global {
  namespace CSSModules {
    interface LocalsMap {
      readonly [key: string]: string;
    }
  }
}

// === CSS MODULE RUNTIME TYPES ===
export interface CSSModuleLoader {
  locals: CSSModuleClasses;
  use(): void;
  unuse(): void;
}

// === CSS MODULE BUILD TYPES ===
export interface CSSModuleBuildInfo {
  hash: string;
  modules: CSSModuleClasses;
  exports: string[];
  dependencies: string[];
}

// === CSS MODULE CONFIGURATION ===
export interface CSSModuleConfig {
  localIdentName?: string;
  camelCase?: boolean;
  dashedIdents?: boolean;
  namedExport?: boolean;
  exportGlobals?: boolean;
}

// === CSS MODULE PLUGIN TYPES ===
export interface CSSModulePlugin {
  name: string;
  apply: (compiler: any) => void;
  options?: CSSModuleConfig;
}