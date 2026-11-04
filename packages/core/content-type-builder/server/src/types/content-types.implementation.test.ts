// Compile-only assertions. The server tsconfig includes this file; declaration builds exclude it.
import type { Equal, Expect } from './assert.test';
import type { ContentTypeHandler, ContentTypesService } from './services';
import type * as contentTypes from '../services/content-types';

type ContentTypes = typeof contentTypes;

export type Assertions = [
  Expect<
    Equal<
      Parameters<ContentTypes['formatContentType']>,
      Parameters<ContentTypesService['formatContentType']>
    >
  >,
  Expect<
    Equal<
      Parameters<ContentTypes['createContentTypes']>,
      Parameters<ContentTypesService['createContentTypes']>
    >
  >,
  Expect<Equal<Awaited<ReturnType<ContentTypes['createContentTypes']>>, ContentTypeHandler[]>>,
  // The payload stays `any` while the body reads `contentType.info`, which the contract lacks.
  // `options` keeps its own annotation, which adds the internal `defaultBuilder`.
  Expect<
    Equal<
      Omit<NonNullable<Parameters<ContentTypes['createContentType']>[1]>, 'defaultBuilder'>,
      Omit<NonNullable<Parameters<ContentTypesService['createContentType']>[1]>, never>
    >
  >,
];
