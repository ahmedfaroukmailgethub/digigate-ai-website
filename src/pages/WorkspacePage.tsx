import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, ExternalLink, File, FileText, FileUp, FileVideo, Image, Trash2, UploadCloud } from 'lucide-react'
import { Link } from 'react-router-dom'

type WorkspaceDocument = {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
}

type StoredWorkspaceDocument = Omit<WorkspaceDocument, 'url'> & {
  file: Blob
}

const DATABASE_NAME = 'digigate-workspace'
const DATABASE_VERSION = 1
const DOCUMENT_STORE = 'documents'

const openWorkspaceDatabase = () => new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)

  request.onupgradeneeded = () => {
    const database = request.result

    if (!database.objectStoreNames.contains(DOCUMENT_STORE)) {
      database.createObjectStore(DOCUMENT_STORE, { keyPath: 'id' })
    }
  }

  request.onsuccess = () => resolve(request.result)
  request.onerror = () => reject(request.error)
})

const runDocumentStoreRequest = <T,>(
  mode: IDBTransactionMode,
  createRequest: (store: IDBObjectStore) => IDBRequest<T>,
) => new Promise<T>(async (resolve, reject) => {
  try {
    const database = await openWorkspaceDatabase()
    const transaction = database.transaction(DOCUMENT_STORE, mode)
    const store = transaction.objectStore(DOCUMENT_STORE)
    const request = createRequest(store)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => database.close()
    transaction.onerror = () => {
      database.close()
      reject(transaction.error)
    }
  } catch (error) {
    reject(error)
  }
})

const getStoredDocuments = () => runDocumentStoreRequest<StoredWorkspaceDocument[]>('readonly', (store) => store.getAll())
const saveStoredDocument = (document: StoredWorkspaceDocument) => runDocumentStoreRequest<IDBValidKey>('readwrite', (store) => store.put(document))
const deleteStoredDocument = (documentId: string) => runDocumentStoreRequest<undefined>('readwrite', (store) => store.delete(documentId))

const isPreviewable = (fileType: string) => fileType.startsWith('image/') || fileType.startsWith('video/') || fileType === 'application/pdf'

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image
  if (type.startsWith('video/')) return FileVideo
  if (type === 'application/pdf') return FileText
  return File
}

export default function WorkspacePage() {
  const [documents, setDocuments] = useState<WorkspaceDocument[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [storageError, setStorageError] = useState('')
  const objectUrls = useRef<string[]>([])

  const selectedDocument = useMemo(
    () => documents.find((document) => document.id === selectedId) ?? documents[0],
    [documents, selectedId],
  )

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const storedDocuments = await getStoredDocuments()
        const restoredDocuments = storedDocuments
          .sort((first, second) => second.uploadedAt.localeCompare(first.uploadedAt))
          .map((document) => {
            const url = URL.createObjectURL(document.file)
            objectUrls.current.push(url)

            return {
              id: document.id,
              name: document.name,
              size: document.size,
              type: document.type,
              uploadedAt: document.uploadedAt,
              url,
            }
          })

        setDocuments(restoredDocuments)
        setSelectedId(restoredDocuments[0]?.id ?? null)
      } catch {
        setStorageError('Saved files could not be loaded in this browser.')
      }
    }

    loadDocuments()

    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const addFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList)

    if (!files.length) return

    const uploadedDocuments = files.map((file) => {
      const url = URL.createObjectURL(file)
      objectUrls.current.push(url)
      const uploadedAt = new Date().toISOString()

      return {
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        url,
        uploadedAt,
        file,
      }
    })

    try {
      await Promise.all(uploadedDocuments.map((document) => saveStoredDocument({
        id: document.id,
        name: document.name,
        size: document.size,
        type: document.type,
        uploadedAt: document.uploadedAt,
        file: document.file,
      })))
      setStorageError('')
    } catch {
      setStorageError('Files were added for this session, but could not be saved permanently.')
    }

    setDocuments((current) => uploadedDocuments.map(({ file, ...document }) => document).concat(current))
    setSelectedId(uploadedDocuments[0].id)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files)
      event.target.value = ''
    }
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(false)
    addFiles(event.dataTransfer.files)
  }

  const removeDocument = (documentId: string) => {
    deleteStoredDocument(documentId).catch(() => {
      setStorageError('The file was removed from this session, but could not be removed from saved storage.')
    })

    setDocuments((current) => {
      const documentToRemove = current.find((document) => document.id === documentId)

      if (documentToRemove) {
        URL.revokeObjectURL(documentToRemove.url)
        objectUrls.current = objectUrls.current.filter((url) => url !== documentToRemove.url)
      }

      const nextDocuments = current.filter((document) => document.id !== documentId)
      setSelectedId((selected) => (selected === documentId ? nextDocuments[0]?.id ?? null : selected))
      return nextDocuments
    })
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] pt-28 pb-16 lg:pt-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition hover:text-brand-100">
              <ArrowLeft className="h-4 w-4" />
              Back to platform
            </Link>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-brand-300">My workspace</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">Document repository</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
              Upload documents and files, preview supported media, and download anything that cannot be opened in the browser.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:shadow-brand-500/40">
            <UploadCloud className="h-4 w-4" />
            Upload files
            <input type="file" multiple className="sr-only" onChange={handleFileChange} />
          </label>
        </div>

        <div className="mt-8">
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition ${
              isDragging ? 'border-brand-300 bg-brand-400/10' : 'border-white/15 bg-white/[0.04] hover:bg-white/[0.06]'
            }`}
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-400/10 text-brand-200">
              <FileUp className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-white">Drop files here</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Upload PDFs, images, videos, documents, spreadsheets, archives, or any file needed in your workspace.
            </p>
            <span className="mt-6 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200">
              Browse files
            </span>
            <input type="file" multiple className="sr-only" onChange={handleFileChange} />
          </motion.label>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[30%_minmax(0,1fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-slate-950/58 p-5 shadow-2xl shadow-black/20"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Repository</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">Uploaded files</h2>
              </div>
              <span className="rounded-lg bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-300">
                {documents.length} {documents.length === 1 ? 'file' : 'files'}
              </span>
            </div>

            <div className="mt-5 max-h-[455px] space-y-3 overflow-y-auto pr-1">
              {documents.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 text-sm text-slate-400">
                  No files uploaded yet.
                </div>
              ) : (
                documents.map((document) => {
                  const Icon = getFileIcon(document.type)
                  const canPreview = isPreviewable(document.type)

                  return (
                    <article
                      key={document.id}
                      className={`rounded-xl border p-4 transition ${
                        selectedDocument?.id === document.id ? 'border-brand-300/50 bg-brand-400/10' : 'border-white/10 bg-white/[0.035] hover:bg-white/[0.055]'
                      }`}
                    >
                      <button type="button" onClick={() => setSelectedId(document.id)} className="flex w-full items-start gap-3 text-left">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-950/70 text-brand-200">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1 overflow-hidden">
                          <span className="block max-w-full truncate font-semibold text-white" title={document.name}>{document.name}</span>
                          <span className="mt-1 block text-xs text-slate-500">
                            {formatFileSize(document.size)} • {new Intl.DateTimeFormat('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            }).format(new Date(document.uploadedAt))}
                          </span>
                        </span>
                      </button>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {canPreview ? (
                          <a
                            href={document.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Open
                          </a>
                        ) : (
                          <a
                            href={document.url}
                            download={document.name}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => removeDocument(document.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-300/10 bg-red-400/10 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-400/15"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Preview</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">{selectedDocument?.name ?? 'Select a file'}</h2>
              </div>
              {selectedDocument && (
                isPreviewable(selectedDocument.type) ? (
                  <a href={selectedDocument.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                    <ExternalLink className="h-4 w-4" />
                    Open full size
                  </a>
                ) : (
                  <a href={selectedDocument.url} download={selectedDocument.name} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                    <Download className="h-4 w-4" />
                    Download file
                  </a>
                )
              )}
            </div>

            <div className="mt-5 min-h-[520px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/65">
              {!selectedDocument ? (
                <div className="grid min-h-[520px] place-items-center px-6 text-center text-sm text-slate-500">
                  Upload a file to preview PDFs, videos, and images here.
                </div>
              ) : selectedDocument.type.startsWith('image/') ? (
                <img src={selectedDocument.url} alt={selectedDocument.name} className="max-h-[620px] w-full object-contain" />
              ) : selectedDocument.type.startsWith('video/') ? (
                <video src={selectedDocument.url} controls className="max-h-[620px] w-full bg-black" />
              ) : selectedDocument.type === 'application/pdf' ? (
                <iframe src={selectedDocument.url} title={selectedDocument.name} className="h-[620px] w-full" />
              ) : (
                <div className="grid min-h-[520px] place-items-center px-6 text-center">
                  <div>
                    <File className="mx-auto h-10 w-10 text-brand-300" />
                    <p className="mt-4 font-semibold text-white">Preview is not available for this file type.</p>
                    <p className="mt-2 text-sm text-slate-500">Download the file to open it with a compatible application.</p>
                  </div>
                </div>
              )}
            </div>
            {storageError && <p className="mt-4 text-sm text-red-200" role="alert">{storageError}</p>}
          </motion.div>
        </div>
      </div>
    </section>
  )
}