export type AllowedColors<TColors extends string, TExcluded extends string | undefined = undefined> = Exclude<TColors, TExcluded>;
export type ColorName = 'Lavender' | 'Ivy' | 'Rose';
export type ColorShadeName = '100' | '200' | '300' | '400' | '500' | '600';

/**
 * It seems as though there is some limit where the type expansion is breaking the doc generation
 * For example, this works as expected and expands the `values` in the generated JSON docs to all
 * expected color names + shades.
 */
// export type ColorName = 'Lavender' | 'Ivy' | 'Rose';
// export type ColorShadeName = '100' | '200' | '300' | '400' | '500';

/**
 * Similarly, if you take out one of the colors and add additional shades, it seems to generate those as well.
 * But there's a tipping point where it seems to just do a naive `String.split` on the `|` character.
 */
// export type ColorName = 'Lavender' | 'Ivy';
// export type ColorShadeName = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
