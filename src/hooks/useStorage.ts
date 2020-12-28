import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import imageCompression from 'browser-image-compression'

import { projectStorage } from '../firebase/config'

type StorageError = firebase.storage.FirebaseStorageError

interface ICompressionOptions {
  maxSizeMB?: number
  maxWidthOrHeight?: number
}

const defaultOptions: ICompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
}

const useStorage = (
  fileName: string,
  file?: File,
  onDone?: () => void,
  startUpload: boolean = true,
  compressionOptions?: ICompressionOptions
) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<StorageError>()
  const [url, setUrl] = useState<string>()

  const handleError = (err: StorageError) => {
    setError(err)
    setProgress(0)
  }

  useEffect(() => {
    let unsub: Function = () => {}

    const upload = async () => {
      if (!file || !startUpload) return

      const storageRef = projectStorage.ref(fileName)

      const compressedFile = file.type.startsWith('image/')
        ? await imageCompression(file, compressionOptions || defaultOptions)
        : file

      unsub = storageRef.put(compressedFile).on(
        'state_changed',
        snap => setProgress((snap.bytesTransferred / snap.totalBytes) * 100),
        handleError,
        async () => {
          setUrl(await storageRef.getDownloadURL())
          onDone && onDone()
        }
      )
    }

    upload()

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, startUpload, JSON.stringify(compressionOptions)])

  return { progress, url, error }
}

export default useStorage
