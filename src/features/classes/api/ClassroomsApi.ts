import { BackendRoutes, HttpClient } from '#shared';
import {
  Classroom,
  ClassroomInvitation,
  CreateClassroomInput,
} from '../model/Classroom';

export class ClassroomsApi {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly routes: BackendRoutes,
  ) {}

  listMine(): Promise<Classroom[]> {
    return this.httpClient.request<Classroom[]>(this.routes.classroomsMine);
  }

  listForActiveOrganization(): Promise<Classroom[]> {
    return this.httpClient.request<Classroom[]>(this.routes.classrooms);
  }

  create(input: CreateClassroomInput): Promise<Classroom> {
    return this.httpClient.request<Classroom>(this.routes.classrooms, {
      method: 'POST',
      body: input,
    });
  }

  listInvitations(): Promise<ClassroomInvitation[]> {
    return this.httpClient.request<ClassroomInvitation[]>(
      this.routes.classroomInvitationsMine,
    );
  }

  getById(classId: string): Promise<Classroom> {
    return this.httpClient.request<Classroom>(
      this.routes.classroomDetail(classId),
    );
  }
}
