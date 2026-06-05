export type ApplicationSubmission = {
  id: string
  role: string
  fullName: string
  email: string
  phone: string
  location: string
  profile: string
  resume: string
  message: string
  submittedAt: string
}

const APPLICATION_SUBMISSIONS_KEY = 'digigate:application-submissions'
const APPLICATION_SUBMISSIONS_EVENT = 'digigate:application-submissions-updated'

const isBrowser = () => typeof window !== 'undefined'

const parseSubmissions = (value: string | null): ApplicationSubmission[] => {
  if (!value) {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const getApplicationSubmissions = () => {
  if (!isBrowser()) {
    return []
  }

  return parseSubmissions(window.localStorage.getItem(APPLICATION_SUBMISSIONS_KEY))
}

export const saveApplicationSubmission = (submission: Omit<ApplicationSubmission, 'id' | 'submittedAt'>) => {
  const savedSubmission: ApplicationSubmission = {
    ...submission,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  }

  const submissions = [savedSubmission, ...getApplicationSubmissions()]
  window.localStorage.setItem(APPLICATION_SUBMISSIONS_KEY, JSON.stringify(submissions))
  window.dispatchEvent(new Event(APPLICATION_SUBMISSIONS_EVENT))

  return savedSubmission
}

export const subscribeToApplicationSubmissions = (callback: () => void) => {
  if (!isBrowser()) {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === APPLICATION_SUBMISSIONS_KEY) {
      callback()
    }
  }

  window.addEventListener(APPLICATION_SUBMISSIONS_EVENT, callback)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(APPLICATION_SUBMISSIONS_EVENT, callback)
    window.removeEventListener('storage', handleStorage)
  }
}
