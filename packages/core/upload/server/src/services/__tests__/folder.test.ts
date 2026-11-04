import folderService from '../folder';

const folderUID = '1';
const rootPathRegex = /^\/[0-9]*$/i;
const folderPathRegex = new RegExp(`^/${folderUID}/[0-9]*$`, 'i');

describe('folder', () => {
  describe('setPathIdAndPath', () => {
    beforeAll(() => {
      global.strapi = {
        db: {
          queryBuilder: () => ({
            max: () => ({
              first: () => ({
                execute: () => ({ max: 2 }),
              }),
            }),
          }),
          query() {
            return {
              findOne: jest.fn(() => ({ path: `/${folderUID}` })),
            };
          },
        },
      } as any;
    });

    test.each([
      [{ parent: 1 }, folderPathRegex],
      [{}, rootPathRegex],
      [{ parent: null }, rootPathRegex],
    ])('inputs %s', async (folder, expectedPath) => {
      const clonedFolder = { ...folder };
      const result = await folderService.setPathIdAndPath(clonedFolder);

      expect(result).toBe(clonedFolder);
      expect(result).toMatchObject({
        ...folder,
        pathId: expect.any(Number),
        path: expect.stringMatching(expectedPath),
      });
    });

    test('keeps the fields of the folder it is given', async () => {
      const folder = { name: 'photos', parent: 1 };
      const result = await folderService.setPathIdAndPath(folder);

      expect(result).toEqual({
        name: 'photos',
        parent: 1,
        pathId: 3,
        path: `/${folderUID}/3`,
      });
    });
  });

  describe('getStructure', () => {
    beforeAll(() => {
      const rows = [
        { id: 2, name: 'b', parent: 1 },
        { id: 1, name: 'a', parent: null },
      ];
      const qb = {
        alias: 't0',
        getAlias: () => 't1',
        select: () => qb,
        join: () => qb,
        execute: async () => rows,
      };

      global.strapi = {
        db: {
          metadata: {
            get: () => ({
              attributes: {
                parent: {
                  joinTable: {
                    name: 'upload_folders_parent_lnk',
                    joinColumn: { name: 'folder_id', referencedColumn: 'id' },
                    inverseJoinColumn: { name: 'inv_folder_id' },
                  },
                },
              },
            }),
          },
          queryBuilder: () => qb,
        },
      } as any;
    });

    test('resolves to the folder tree, each node with its id, name and children', async () => {
      const structure = await folderService.getStructure();

      expect(structure).toEqual([
        { id: 1, name: 'a', children: [{ id: 2, name: 'b', children: [] }] },
      ]);
    });
  });
});
