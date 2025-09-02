import type { DeepPartial } from 'unocss'

import type { Theme as ShadcnTheme, ThemeCSSVarsVariant } from './themes/v3'

export type ShadcnThemeColor = ShadcnTheme['name']

type ArrayOrSingle<T> = T | T[]

export type ColorOptions =
  | ShadcnThemeColor
  | ThemeCSSVarsVariant
  | ({ base: ShadcnThemeColor } & DeepPartial<ThemeCSSVarsVariant>)

export interface ThemeOptions {
  /**
   * @default 'zinc'
   */
  color?: ColorOptions | false
  /**
   * @default 0.5
   */
  radius?: number | false
  /**
   * @default '.dark'
   */
  darkSelector?: string
}

export type PresetShadcnThemeOptions = ArrayOrSingle<ThemeOptions>

export interface PresetShadcnControlOptions {
  /**
   * @param Generates global variables, like *.border-color, body.color, body.background.
   * @default true
   */
  globals?: boolean

  /**
   * @default 'radix'
   */
  componentLibrary?: 'radix' | 'reka'
}
