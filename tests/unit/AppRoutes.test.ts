import {
  AppRouteRegistry,
  ClassRoutes,
  RootRoutes,
  TabRoutes,
} from '../../src/presentation/navigation/AppRoutes';

describe('AppRouteRegistry', () => {
  it('defines root stack, tab, and nested stack initial routes', () => {
    const registry = new AppRouteRegistry();

    expect(registry.rootInitialRoute).toBe(RootRoutes.MainTabs);
    expect(registry.tabInitialRoute).toBe(TabRoutes.Home);
    expect(registry.classesInitialRoute).toBe(ClassRoutes.ClassList);
  });
});
