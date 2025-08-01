'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps as NextThemeProviderProps } from 'next-themes'

interface ThemeProviderProps extends Omit<NextThemeProviderProps, 'children'> {
  children: React.ReactNode
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'dark',
  forcedTheme,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      forcedTheme={forcedTheme}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
