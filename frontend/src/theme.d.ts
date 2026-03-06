import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    layout: {
      topbar: {
        bg: string
        text: string
      }
      sidebar: {
        bg: string
        text: string
        hover: string
      }
      main: {
        bg: string
      }
    }
  }

  interface ThemeOptions {
    layout?: {
      topbar?: {
        bg?: string
        text?: string
      }
      sidebar?: {
        bg?: string
        text?: string
        hover?: string
      }
      main?: {
        bg?: string
      }
    }
  }
}