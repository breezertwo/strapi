import type { Core, Modules, UID } from '../../src';
import type { Equal, Expect } from './helpers';

// Document Service params keep develop's types.
type HasParam<TParams, TKey extends string> = TKey extends keyof TParams ? true : false;
type Documents = Modules.Documents.ServiceInstance<UID.ContentType>;
type FindManyParams = NonNullable<Parameters<Documents['findMany']>[0]>;
type CoreFind = Awaited<ReturnType<Core.CoreAPI.Service.CollectionType['find']>>;
type PublishParams = Parameters<Modules.Documents.DraftAndPublishExtension['publish']>[0];
declare const documentParamChecks: [
  // `update` takes no `status`.
  Expect<Equal<HasParam<Modules.Documents.ServiceParams['update'], 'status'>, false>>,
  // Methods take `lookup`.
  Expect<Equal<FindManyParams['lookup'], Record<string, unknown> | undefined>>,
  Expect<Equal<PublishParams['lookup'], Record<string, unknown> | undefined>>,
  // `clone` may resolve to `null`.
  Expect<Equal<null extends Awaited<ReturnType<Documents['clone']>> ? true : false, true>>,
  // The core service's `find` may resolve to `null` results, with no `total` in its pagination.
  Expect<Equal<CoreFind['results'], Modules.Documents.AnyDocument[] | null>>,
  Expect<Equal<HasParam<CoreFind['pagination'], 'total'>, false>>,
];
documentParamChecks satisfies unknown;
