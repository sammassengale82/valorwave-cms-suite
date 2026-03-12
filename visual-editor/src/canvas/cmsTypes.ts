// src/canvas/cmsTypes.ts
export type CmsStyleVariant = {
  padding?: string;
  margin?: string;
  background?: string;
  color?: string;
  textAlign?: string;
  height?: string;
  width?: string;
  [key: string]: any;
};

export type CmsStyles = {
  desktop?: CmsStyleVariant;
  tablet?: CmsStyleVariant;
  mobile?: CmsStyleVariant;
};

export type CmsContent = {
  text?: string;
  src?: string;
  alt?: string;
  href?: string;
  [key: string]: any;
};

export type CmsNode = {
  id: string;
  type: string;
  content?: CmsContent;
  styles?: CmsStyles;
  children?: CmsNode[];
};

export type CmsTemplate = {
  id: string;
  name: string;
  tree: CmsNode[];
};
