import type { Core } from '../../src';
import type { Equal, Expect } from './helpers';

// Plural accessors keep the legacy records, even for registered keys.
declare const mapChecks: [
  Expect<Equal<Core.Strapi['services'], Record<string, Core.Service>>>,
  Expect<Equal<Core.Strapi['controllers'], Record<string, Core.Controller>>>,
  Expect<Equal<Core.Strapi['policies'], Record<string, Core.Policy>>>,
  Expect<Equal<Core.Strapi['plugins'], Record<string, Core.Plugin>>>,
  Expect<Equal<Core.Strapi['apis'], Record<string, Core.Module>>>,
  Expect<Equal<Core.Plugin<'legacy'>['services'], Record<string, Core.Service>>>,
  Expect<Equal<Core.Plugin<'legacy'>['controllers'], Record<string, Core.Controller>>>,
  Expect<Equal<Core.Plugin<'legacy'>['policies'], Record<string, Core.Policy>>>,
  Expect<Equal<Core.Module<'api::legacy'>['services'], Record<string, Core.Service>>>,
  Expect<Equal<Core.Strapi['services']['plugin::legacy.example'], Core.Service>>,
  Expect<Equal<Core.Strapi['controllers']['plugin::legacy.example'], Core.Controller>>,
  Expect<Equal<Core.Strapi['policies']['plugin::legacy.hasRole'], Core.Policy>>,
  Expect<Equal<Core.Strapi['middlewares'], Record<string, Core.MiddlewareFactory>>>,
  Expect<Equal<Core.Plugin<'legacy'>['middlewares'], Record<string, Core.Middleware>>>,
  Expect<Equal<Core.Module<'api::legacy'>['middlewares'], Record<string, Core.Middleware>>>,
  Expect<Equal<Core.Strapi['middlewares']['plugin::legacy.timer'], Core.MiddlewareFactory>>,
];
mapChecks satisfies unknown;
