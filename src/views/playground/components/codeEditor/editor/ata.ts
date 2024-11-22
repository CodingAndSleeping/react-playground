import { setupTypeAcquisition } from '@typescript/ata'
import typescript from 'typescript'

interface OnDownloadFile {
  (code: string, path: string): void
}

export function createATA(onDownloadFile: OnDownloadFile) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        onDownloadFile(code, path)
      },
    },
  })

  return ata
}
