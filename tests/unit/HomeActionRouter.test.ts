import { RootRoutes, TabRoutes } from '#app/navigation/AppRoutes';
import { HomeActionRouter } from '#app/navigation/HomeActionRouter';

describe('HomeActionRouter', () => {
  const router = new HomeActionRouter();

  it('routes class actions to the Classes tab', () => {
    expect(router.resolve('join-class')).toEqual({
      type: 'tab',
      route: TabRoutes.Classes,
    });
    expect(router.resolve('create-class')).toEqual({
      type: 'tab',
      route: TabRoutes.Classes,
    });
  });

  it('routes organization action to create organization screen', () => {
    expect(router.resolve('create-organization')).toEqual({
      type: 'createOrganization',
      route: RootRoutes.CreateOrganization,
    });
  });

  it('ignores unknown actions', () => {
    expect(router.resolve('unknown')).toBeNull();
  });
});
