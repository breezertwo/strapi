// Compile-only assertions. The server tsconfig includes this file; declaration builds exclude it.
import type createStagesService from '../services/stages';
import type { Equal, Expect } from './assert.test';
import type { StagesService } from './services';

type Implementation = ReturnType<typeof createStagesService>;

// With strict types, the members take the parameters of the contract.
export type StagesImplementationAssertions = [
  Expect<Equal<Parameters<Implementation['find']>, Parameters<StagesService['find']>>>,
  Expect<Equal<Parameters<Implementation['findById']>, Parameters<StagesService['findById']>>>,
  Expect<Equal<Parameters<Implementation['delete']>, Parameters<StagesService['delete']>>>,
  Expect<Equal<Parameters<Implementation['deleteMany']>, Parameters<StagesService['deleteMany']>>>,
  Expect<
    Equal<
      Parameters<Implementation['deleteStagePermissions']>,
      Parameters<StagesService['deleteStagePermissions']>
    >
  >,
  Expect<Equal<Parameters<Implementation['count']>, Parameters<StagesService['count']>>>,
];
