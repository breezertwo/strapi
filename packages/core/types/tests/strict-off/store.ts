import type { Core, Modules } from '../../src';
import type { Equal, Expect } from './helpers';

// The core store keeps develop's types, even for registered keys.
declare const storeStrapi: Core.Strapi;
const storeRead = storeStrapi.store.get({ type: 'plugin', name: 'legacy', key: 'settings' });
declare const storeChecks: [
  Expect<Equal<Core.Strapi['store'], Modules.CoreStore.CoreStore>>,
  Expect<Equal<typeof storeRead, Promise<unknown>>>,
];
storeChecks satisfies unknown;
storeStrapi.store.set({ type: 'plugin', name: 'legacy', key: 'settings', value: 'any' });
