export const hasPlayedIntro = () => {
  if (typeof window === 'undefined') return false

  return sessionStorage.getItem('introPlayed') === 'true'
}

export const setIntroPlayed = () => {
  if (typeof window === 'undefined') return

  sessionStorage.setItem('introPlayed', 'true')
  sessionStorage.setItem('welcomeAudioPlayed', 'true')
}

export const hasPlayedWelcomeAudio = () => {
  if (typeof window === 'undefined') return false

  return (
    sessionStorage.getItem('welcomeAudioPlayed') === 'true' ||
    sessionStorage.getItem('introPlayed') === 'true'
  )
}

export const resetIntro = () => {
  if (typeof window === 'undefined') return

  sessionStorage.removeItem('introPlayed')
}

const RETURN_PROJECT_KEY = 'portfolioReturnProjectId'
const NAV_ORIGIN_KEY = 'handledNavOrigin'

export const peekReturnToPortfolio = () => {
  if (typeof window === 'undefined') return false

  return (
    sessionStorage.getItem('returnToPortfolio') === 'true' ||
    sessionStorage.getItem(RETURN_PROJECT_KEY) !== null
  )
}

export const setReturnToPortfolio = (projectId?: string) => {
  if (typeof window === 'undefined') return

  sessionStorage.setItem('returnToPortfolio', 'true')
  sessionStorage.setItem('introPlayed', 'true')
  sessionStorage.setItem('heroPlayed', 'true')

  if (projectId) {
    sessionStorage.setItem(RETURN_PROJECT_KEY, projectId)
  }
}

export const consumeReturnToPortfolio = () => {
  if (typeof window === 'undefined') return false

  const shouldReturn = sessionStorage.getItem('returnToPortfolio') === 'true'
  if (shouldReturn) {
    sessionStorage.removeItem('returnToPortfolio')
  }
  return shouldReturn
}

export const consumePortfolioReturnProjectId = (): string | null => {
  if (typeof window === 'undefined') return null

  const projectId = sessionStorage.getItem(RETURN_PROJECT_KEY)
  if (projectId) {
    sessionStorage.removeItem(RETURN_PROJECT_KEY)
  }
  return projectId
}

export const shouldSkipWelcome = () => {
  if (typeof window === 'undefined') return false

  return peekReturnToPortfolio() || hasPlayedIntro()
}

export const handleFreshDocumentLoad = () => {
  if (typeof window === 'undefined') return false

  const currentOrigin = String(performance.timeOrigin)
  const isNewDocument = sessionStorage.getItem(NAV_ORIGIN_KEY) !== currentOrigin

  if (!isNewDocument) return false

  sessionStorage.setItem(NAV_ORIGIN_KEY, currentOrigin)
  return true
}