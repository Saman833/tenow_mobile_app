import {
  AppRouteRegistry,
  AuthRoutes,
  ClassRoutes,
  RootRoutes,
  TabRoutes,
} from '#app/navigation/AppRoutes';

describe('AppRouteRegistry', () => {
  it('defines root stack, tab, and nested stack initial routes', () => {
    const registry = new AppRouteRegistry();

    expect(registry.rootInitialRoute).toBe(RootRoutes.AuthStack);
    expect(registry.authInitialRoute).toBe(AuthRoutes.SignIn);
    expect(registry.tabInitialRoute).toBe(TabRoutes.Home);
    expect(registry.classesInitialRoute).toBe(ClassRoutes.ClassList);
  });
});
