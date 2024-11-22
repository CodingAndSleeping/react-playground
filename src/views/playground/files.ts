import type { Files } from './playgroundContext'

import importMap from './template/import-map.json?raw'
import main from './template/main.tsx?raw'
import App from './template/App.tsx?raw'
import AppCss from './template/App.css?raw'

import { fileName2Language } from './utils'

export const APP_COMPONENT_FILE_NAME = 'App.tsx'
export const IMPORT_MAP_FILE_NAME = 'import-map.json'
export const ENTRY_FILE_NAME = 'main.tsx'
export const APP_CSS_FILE_NAME = 'App.css'

export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App,
  },
  [APP_CSS_FILE_NAME]: {
    name: APP_CSS_FILE_NAME,
    language: fileName2Language(APP_CSS_FILE_NAME),
    value: AppCss,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap,
  },
}
