import type { PropertyPath } from 'lodash';
import type { Core } from '../../src';
import type { Equal, Expect } from './helpers';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Strapi {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Registries {
      interface AppConfigs {
        'api::legacy': { limit: number };
      }
    }
  }
}

declare const moduleStrapi: Core.Strapi;

// Module config keeps develop's signature, even for an API with a registered config contract.
type DevelopModuleConfig = <T = unknown>(key: PropertyPath, defaultVal?: T) => T;
const apiLimit = moduleStrapi.api('legacy').config('limit');
const apiLabel = moduleStrapi.api('legacy').config('label', 'fallback');
declare const moduleConfigChecks: [
  Expect<Equal<Core.Module['config'], DevelopModuleConfig>>,
  Expect<Equal<Core.Module<'api::legacy'>['config'], DevelopModuleConfig>>,
  Expect<Equal<ReturnType<Core.Strapi['api']>['config'], DevelopModuleConfig>>,
  Expect<Equal<typeof apiLimit, unknown>>,
  Expect<Equal<typeof apiLabel, 'fallback'>>,
];
moduleConfigChecks satisfies unknown;
