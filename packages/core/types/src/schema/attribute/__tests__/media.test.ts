// Media types with strict types (this program loads `@strapi/types/strict`). Without strict types,
// `tests/strict-off.ts` pins develop's loose types.
import type * as Documents from '../../../modules/documents';
import type * as Attribute from '..';

type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;

// Blocks image nodes hold a copy of some file fields, taken when the image was inserted: not a
// populated media value.
type ImageBlockNode = Extract<Attribute.BlocksValue[number], { type: 'image' }>;

declare const blocksChecks: [Assert<IsAny<ImageBlockNode['image']>>];
blocksChecks satisfies unknown;

// Inputs take the relation input formats. Runtime evidence: `mapRelation` in the entity manager,
// `tests/api/core/upload/content-api/upload.test.api.js`.
type SingleMediaInput = Documents.Params.Attribute.GetValue<Attribute.Media<'images'>>;
type MultipleMediaInput = Documents.Params.Attribute.GetValue<Attribute.Media<'images', true>>;
type GenericMediaInput = Documents.Params.Attribute.GetValue<
  Attribute.Media<Attribute.MediaKind | undefined, boolean>
>;

declare const inputChecks: [Assert<IsAny<GenericMediaInput>>];
inputChecks satisfies unknown;

12 satisfies SingleMediaInput;
'abc123' satisfies SingleMediaInput;
({ id: 12 }) satisfies SingleMediaInput;
({ documentId: 'abc123', locale: 'fr' }) satisfies SingleMediaInput;
null satisfies SingleMediaInput;
// @ts-expect-error A single media takes one file, not an array.
[12] satisfies SingleMediaInput;
// @ts-expect-error A single media takes no `connect`.
({ connect: [12] }) satisfies SingleMediaInput;
// @ts-expect-error A file input holds an ID or a document ID, no other file field.
({ id: 12, url: '/a.png' }) satisfies SingleMediaInput;

[12, 13] satisfies MultipleMediaInput;
['abc123'] satisfies MultipleMediaInput;
[{ id: 12 }, { documentId: 'abc123' }] satisfies MultipleMediaInput;
null satisfies MultipleMediaInput;
({ set: [12] }) satisfies MultipleMediaInput;
({ set: null }) satisfies MultipleMediaInput;
({ connect: [{ documentId: 'abc123' }], disconnect: [13] }) satisfies MultipleMediaInput;
({ connect: [12] }) satisfies MultipleMediaInput;
({ disconnect: [{ id: 13 }] }) satisfies MultipleMediaInput;
// @ts-expect-error An array holds IDs or objects, not both.
[12, { id: 13 }] satisfies MultipleMediaInput;
// @ts-expect-error A multiple media takes an array, not a single ID.
12 satisfies MultipleMediaInput;
// @ts-expect-error `connect` takes no `position`: the runtime always appends the file.
({ connect: [{ id: 12, position: { end: true } }] }) satisfies MultipleMediaInput;
// @ts-expect-error A file input holds an ID or a document ID, no other file field.
[{ id: 12, url: '/a.png' }] satisfies MultipleMediaInput;
