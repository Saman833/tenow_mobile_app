import { colors, radii, spacing, typography } from '../design-system/tokens';

export class Theme {
  readonly colors = colors;
  readonly spacing = spacing;
  readonly typography = typography;
  readonly radii = radii;
}

export const theme = new Theme();
