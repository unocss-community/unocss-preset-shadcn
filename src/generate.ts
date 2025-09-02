import { mergeDeep } from 'unocss'

import type { ThemeCSSVarKey, ThemeCSSVars, ThemeCSSVarsVariant, themes } from './themes/v3'
import { themeCSSVarKeys } from './themes/v3'
import type { ColorOptions, PresetShadcnThemeOptions } from './types'

function generateColorCSSVars(color: ThemeCSSVars) {
  return Object.entries(color)
    .map(([key, value]) => {
      if (!themeCSSVarKeys.includes(key as ThemeCSSVarKey))
        return ''
      return `  --${key}: ${value};`
    })
    .filter(Boolean)
    .join('\n')
}

function colorCSSVarsStyles(lightVars: string, darkVars: string, { radius, themeName, darkSelector }: { radius?: number | false, themeName?: string | false, darkSelector: string }) {
  return `
${themeName ? `.theme-${themeName}` : ':root'} {
${lightVars}
${radius ? generateRadiusCSSVars(radius) : ''}
}
${themeName ? `${darkSelector} .theme-${themeName}` : darkSelector} {
${darkVars}
}`
}

function generateRadiusCSSVars(radius: number) {
  return `  --radius: ${radius}rem;`
}

function radiusCSSVarsStyles(radius: number) {
  return `
:root {
${generateRadiusCSSVars(radius)}
}
`
}

export function generateGlobalStylesV3() {
  return `
* {
  border-color: hsl(var(--border));
}

body {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
}
`
}

export function generateGlobalStyles() {
  return `
* {
  border-color: oklch(var(--border));
}

body {
  color: oklch(var(--foreground));
  background: oklch(var(--background));
}
  `
}

function getBuiltInTheme(name: string, themesRaw: typeof themes): ThemeCSSVarsVariant {
  const theme = themesRaw.find(t => t.name === name)
  if (!theme)
    throw new Error(`Unknown color: ${name}`)
  return {
    name,
    ...theme.cssVars,
  }
}

function getColorTheme(color: ColorOptions, themesRaw: typeof themes) {
  let light: ThemeCSSVars
  let dark: ThemeCSSVars
  let name: string

  if (typeof color === 'string') {
    name = color
    ;({ light, dark } = getBuiltInTheme(color, themesRaw))
  }
  else if ('base' in color) {
    name = color.base
    ;({ light, dark } = mergeDeep(getBuiltInTheme(color.base, themesRaw), color))
  }
  else {
    name = color.name
    ;({ light, dark } = color)
  }
  return { light, dark, name }
}

export function generateCSSVars(
  theme: PresetShadcnThemeOptions,
  themesRaw: typeof themes,
  onlyOne = true,
): string {
  if (Array.isArray(theme))
    return theme.map(t => generateCSSVars(t, themesRaw, false)).join('\n')

  const { color = 'zinc', radius = 0.5, darkSelector = '.dark' } = theme

  let cssStyle = ''

  if (!color) {
    if (radius)
      cssStyle += radiusCSSVarsStyles(radius)
  }
  else {
    const { light, dark, name } = getColorTheme(color, themesRaw)
    const lightVars = generateColorCSSVars(light)
    const darkVars = generateColorCSSVars(dark)

    cssStyle += colorCSSVarsStyles(lightVars, darkVars, { radius, themeName: !onlyOne && name, darkSelector })
  }

  return cssStyle
}
