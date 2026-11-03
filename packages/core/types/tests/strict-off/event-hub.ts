import type { Core, Modules } from '../../src';
import type { Equal, Expect } from './helpers';

// The event hub keeps develop's types, even for registered names.
declare const eventStrapi: Core.Strapi;
declare const eventChecks: [
  Expect<Equal<Core.Strapi['eventHub'], Modules.EventHub.EventHub>>,
  Expect<
    Equal<Parameters<Core.Strapi['eventHub']['emit']>, [eventName: string, ...args: unknown[]]>
  >,
];
eventChecks satisfies unknown;
eventStrapi.eventHub.emit('legacy.event', { off: 'contract' });
