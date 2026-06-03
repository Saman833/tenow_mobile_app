import { BackendRoutes } from '../../src/infrastructure/api/BackendRoutes';
import { ClassroomsApi } from '../../src/infrastructure/api/ClassroomsApi';
import { HttpClient } from '../../src/infrastructure/api/HttpClient';

describe('ClassroomsApi', () => {
  const createApi = () => {
    const httpClient = {
      request: jest.fn(),
    } as unknown as HttpClient;

    return {
      api: new ClassroomsApi(httpClient, new BackendRoutes()),
      request: httpClient.request as jest.Mock,
    };
  };

  it('requests current user classes from the backend route', async () => {
    const { api, request } = createApi();
    request.mockResolvedValue([]);

    await expect(api.listMine()).resolves.toEqual([]);

    expect(request).toHaveBeenCalledWith('/classrooms/mine');
  });

  it('requests current user invitations from the backend route', async () => {
    const { api, request } = createApi();
    request.mockResolvedValue([]);

    await expect(api.listInvitations()).resolves.toEqual([]);

    expect(request).toHaveBeenCalledWith('/classrooms/invitations/mine');
  });

  it('requests class detail from the backend route', async () => {
    const { api, request } = createApi();
    const classroom = {
      id: 'cs-101',
      name: 'CS 101',
      subject: 'Computer Science',
      gradeLevel: 'University',
    };
    request.mockResolvedValue(classroom);

    await expect(api.getById('cs-101')).resolves.toEqual(classroom);

    expect(request).toHaveBeenCalledWith('/classrooms/cs-101');
  });
});
