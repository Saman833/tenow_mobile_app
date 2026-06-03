import { ClassroomsApi } from '#features/classes';
import { BackendRoutes, HttpClient } from '#shared';

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

  it('requests active organization classes from the backend route', async () => {
    const { api, request } = createApi();
    request.mockResolvedValue([]);

    await expect(api.listForActiveOrganization()).resolves.toEqual([]);

    expect(request).toHaveBeenCalledWith('/classrooms');
  });

  it('creates a class from the backend route', async () => {
    const { api, request } = createApi();
    const classroom = {
      id: 'class-1',
      name: 'Grade 8 Math',
      subject: 'Math',
      gradeLevel: 'Grade 8',
    };
    request.mockResolvedValue(classroom);

    await expect(
      api.create({
        name: 'Grade 8 Math',
        subject: 'Math',
        gradeLevel: 'Grade 8',
      }),
    ).resolves.toEqual(classroom);

    expect(request).toHaveBeenCalledWith('/classrooms', {
      method: 'POST',
      body: {
        name: 'Grade 8 Math',
        subject: 'Math',
        gradeLevel: 'Grade 8',
      },
    });
  });

  it('joins a class with a class code', async () => {
    const { api, request } = createApi();
    request.mockResolvedValue({ classId: 'class-1' });

    await expect(api.joinWithCode(' math8demo ')).resolves.toEqual({
      classId: 'class-1',
    });

    expect(request).toHaveBeenCalledWith('/classrooms/join', {
      method: 'POST',
      body: { joinCode: 'MATH8DEMO' },
    });
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
