import { list } from '@keystone-6/core';

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  file,
} from '@keystone-6/core/fields';

import { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
  }),

  Client: list({
    fields: {
      name: text({ validation: { isRequired: true }}),
      lists: relationship({
        ref: 'List.client',
        many:true,
      })
    },
    ui: {
      isHidden: true,
    }
  }),

  List: list({
    fields: {
      title: text(),
      client: relationship({
        ref: 'Client.lists',
        many: false,
      }),
      type: relationship({
        ref: 'ListType.lists',
        many: false,
      }),
      uploads: relationship({
        ref: "FileUpload.list",
        many: true,
      }),
    },
  }),

  // o frontend limita os uploads de uma lista aos tipos de arquivos
  // assossiados ao tipo da lista
  FileUpload: list({
    fields: {
      file: file(),
      fileType: relationship({
        ref: 'FileType.files'
      }),
      list: relationship({
        ref: 'List.uploads',
      }),
    },
    ui: {
      isHidden: true,
    }
  }),

  ListType: list({
    fields: {
      name: text({ validation: { isRequired: true }}),
      lists: relationship({
        ref: 'List.type',
        many: false,
      }),
      files: relationship({
        ref: 'FileType.listType',
        many: true,
      }),
    },
    ui: {
      isHidden: false,
    }
  }),

  FileType: list({
    fields: {
      name: text({ validation: { isRequired: true }}),
      extensions: text(),
      files: relationship({
        ref: "FileUpload.fileType",
        many: true,
      }),
      listType: relationship({
        ref: 'ListType.files',
        many: true,
      }),
    },
    ui: {
      isHidden: true,
    }
  }),
};
