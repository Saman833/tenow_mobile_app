import { colors } from './colors';

export class Theme {
  readonly colors = colors;

  readonly spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  } as const;

  readonly typography = {
    title: 28,
    subtitle: 16,
    body: 15,
    caption: 13,
  } as const;
}

export const theme = new Theme();
