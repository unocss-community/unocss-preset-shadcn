import { presetWind } from '@unocss/preset-wind3'
import { defineConfig, presetIcons } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      scale: 1.3,
    }),
    presetAnimations(),
    presetShadcn(builtinColors.map(c => ({ color: c }))),
  ],
})
