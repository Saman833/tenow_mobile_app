import { TabRoutes } from '../../src/presentation/navigation/AppRoutes';
import { HomeActionRouter } from '../../src/presentation/navigation/HomeActionRouter';

describe('HomeActionRouter', () => {
  const router = new HomeActionRouter();

  it('routes class actions to the Classes tab', () => {
    expect(router.resolveTabRoute('join-class')).toBe(TabRoutes.Classes);
    expect(router.resolveTabRoute('create-class')).toBe(TabRoutes.Classes);
  });

  it('routes organization action to Settings', () => {
    expect(router.resolveTabRoute('create-organization')).toBe(
      TabRoutes.Settings,
    );
  });

  it('ignores unknown actions', () => {
    expect(router.resolveTabRoute('unknown')).toBeNull();
  });
});
