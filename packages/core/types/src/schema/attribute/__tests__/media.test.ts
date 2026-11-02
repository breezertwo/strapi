// Media types with strict types (this program loads `@strapi/types/strict`). Without strict types,
// `tests/strict-off.ts` pins develop's loose types.
import type * as Attribute from '..';

type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;

// Blocks image nodes hold a copy of some file fields, taken when the image was inserted: not a
// populated media value.
type ImageBlockNode = Extract<Attribute.BlocksValue[number], { type: 'image' }>;

declare const blocksChecks: [Assert<IsAny<ImageBlockNode['image']>>];
blocksChecks satisfies unknown;
