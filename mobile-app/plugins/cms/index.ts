import { registerPlugin } from '@capacitor/core';

export const CMS = registerPlugin('CMS', {
  web: () => import('./web').then(m => new m.CMSWeb())
});