import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'

import presetShadcn from '../src'
import { generateCSSVars } from '../src/generate'

const unoGenerator = await createGenerator()

describe('presetShadcn()-execute-getCSS', () => {
  it('default options', async () => {
    const presetReturn = presetShadcn()
    await expect(presetReturn).toMatchFileSnapshot('snapshot/presetShadcn()-default.json')

    await expect(
      presetReturn.preflights![0]?.getCSS({ generator: unoGenerator, theme: {} }),
    ).toMatchFileSnapshot('snapshot/presetShadcn()-default-getCSS.css')
  })

  it('disable color', async () => {
    const presetReturn = presetShadcn({ color: false })
    // Don't think this is needed for now
    // await expect(presetReturn).toMatchFileSnapshot('snapshot/presetShadcn()-disable_color.json')

    await expect(
      presetReturn.preflights![0]?.getCSS({ generator: unoGenerator, theme: {} }),
    ).toMatchFileSnapshot('snapshot/presetShadcn()-disable_color-getCSS.css')
  })

  it('disable radius', async () => {
    const presetReturn = presetShadcn({ radius: false })
    // Don't think this is needed for now
    // await expect(presetReturn).toMatchFileSnapshot('snapshot/presetShadcn()-disable_radius.json')

    await expect(
      presetReturn.preflights![0]?.getCSS({ generator: unoGenerator, theme: {} }),
    ).toMatchFileSnapshot('snapshot/presetShadcn()-disable_radius-getCSS.css')
  })

  it('disable color and radius', async () => {
    const presetReturn = presetShadcn({ color: false, radius: false })
    // Don't think this is needed for now
    // await expect(presetReturn).toMatchFileSnapshot('snapshot/presetShadcn()-disable_color_and_radius.json')

    await expect(
      presetReturn.preflights![0]?.getCSS({ generator: unoGenerator, theme: {} }),
    ).toMatchFileSnapshot('snapshot/presetShadcn()-disable_color_and_radius-getCSS.css')
  })

  it('disable global styles', async () => {
    const presetReturn = presetShadcn(undefined, { globals: false })
    // Don't think this is needed for now
    // await expect(presetReturn).toMatchFileSnapshot('snapshot/presetShadcn()-disable_global_styles.json')

    await expect(
      presetReturn.preflights![0]?.getCSS({ generator: unoGenerator, theme: {} }),
    ).toMatchFileSnapshot('snapshot/presetShadcn()-disable_global_styles-getCSS.css')
  })

  it('use reka ui', async () => {
    const presetReturn = presetShadcn(undefined, { componentLibrary: 'reka' })
    // Don't think this is needed for now
    // await expect(presetReturn).toMatchFileSnapshot('snapshot/presetShadcn()-disable_global_styles.json')

    await expect(
      presetReturn.preflights![0]?.getCSS({ generator: unoGenerator, theme: {} }),
    ).toMatchFileSnapshot('snapshot/presetShadcn()-use_reka_ui-getCSS.css')
  })
})

describe('generate-theme-css-var', () => {
  it('built in themes', async () => {
    await expect(
      generateCSSVars({
        color: 'zinc',
        radius: 0.5,
      }),
    ).toMatchFileSnapshot('snapshot/zinc-0.5.css')
    await expect(
      generateCSSVars({
        color: 'neutral',
        radius: 0.75,
      }),
    ).toMatchFileSnapshot('snapshot/neutral-0.75.css')
  })

  it('custom theme', async () => {
    await expect(
      generateCSSVars({
        color: {
          name: 'custom',
          light: {
            'background': '0 1% 100%',
            'foreground': '240 10% 3.9%',
            'card': '0 0% 100%',
            'card-foreground': '240 10% 3.9%',
            'popover': '0 0% 100%',
            'popover-foreground': '240 10% 3.9%',
            'primary': '240 5.9% 10%',
            'primary-foreground': '0 0% 98%',
            'secondary': '240 4.8% 95.9%',
            'secondary-foreground': '240 5.9% 10%',
            'muted': '240 4.8% 95.9%',
            'muted-foreground': '240 3.8% 46.1%',
            'accent': '240 4.8% 95.9%',
            'accent-foreground': '240 5.9% 10%',
            'destructive': '0 84.2% 60.2%',
            'destructive-foreground': '0 0% 98%',
            'border': '240 5.9% 90%',
            'input': '240 5.9% 90%',
            'ring': '240 5.9% 10%',
            'chart-1': '12 76% 61%',
            'chart-2': '173 58% 39%',
            'chart-3': '197 37% 24%',
            'chart-4': '43 74% 66%',
            'chart-5': '27 87% 67%',
            'sidebar': '0 0% 98%',
            'sidebar-foreground': '240 5.3% 26.1%',
            'sidebar-primary': '240 5.9% 10%',
            'sidebar-primary-foreground': '0 0% 98%',
            'sidebar-accent': '240 4.8% 95.9%',
            'sidebar-accent-foreground': '240 5.9% 10%',
            'sidebar-border': '220 13% 91%',
            'sidebar-ring': '217.2 91.2% 59.8%',
          },
          dark: {
            'background': '240 10% 3.9%',
            'foreground': '0 0% 98%',
            'card': '240 10% 3.9%',
            'card-foreground': '0 0% 98%',
            'popover': '240 10% 3.9%',
            'popover-foreground': '0 0% 98%',
            'primary': '0 0% 98%',
            'primary-foreground': '240 5.9% 10%',
            'secondary': '240 3.7% 15.9%',
            'secondary-foreground': '0 0% 98%',
            'muted': '240 3.7% 15.9%',
            'muted-foreground': '240 5% 64.9%',
            'accent': '240 3.7% 15.9%',
            'accent-foreground': '0 0% 98%',
            'destructive': '0 62.8% 30.6%',
            'destructive-foreground': '0 0% 98%',
            'border': '240 3.7% 15.9%',
            'input': '240 3.7% 15.9%',
            'ring': '240 4.9% 83.9%',
            'chart-1': '220 70% 50%',
            'chart-2': '160 60% 45%',
            'chart-3': '30 80% 55%',
            'chart-4': '280 65% 60%',
            'chart-5': '340 75% 55%',
            'sidebar': '240 5.9% 10%',
            'sidebar-foreground': '240 4.8% 95.9%',
            'sidebar-primary': '0 0% 98%',
            'sidebar-primary-foreground': '240 5.9% 10%',
            'sidebar-accent': '240 3.7% 15.9%',
            'sidebar-accent-foreground': '240 4.8% 95.9%',
            'sidebar-border': '240 3.7% 15.9%',
            'sidebar-ring': '217.2 91.2% 59.8%',
          },
        },
        radius: 1,
      }),
    ).toMatchFileSnapshot('snapshot/custom.css')
  })

  it('custom theme based on built in theme', async () => {
    await expect(
      generateCSSVars({
        color: {
          base: 'zinc',
          light: {
            background: '0 1% 100%',
          },
        },
        radius: 1,
      }),
    ).toMatchFileSnapshot('snapshot/custom.css')
  })

  it('generate multiple themes', async () => {
    await expect(
      generateCSSVars([
        {
          color: 'zinc',
          radius: 0.5,
        },
        {
          color: 'neutral',
          radius: 0.75,
        },
      ]),
    ).toMatchFileSnapshot('snapshot/multiple.css')
  })

  it('custom dark selector', async () => {
    await expect(
      generateCSSVars({
        darkSelector: '.custom-dark',
      }),
    ).toMatchFileSnapshot('snapshot/dark-selector.css')
  })
})
