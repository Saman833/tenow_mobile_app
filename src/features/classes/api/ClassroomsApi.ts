import { BackendRoutes, HttpClient } from '#shared';
import {
  Classroom,
  ClassroomEnrollment,
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

  joinWithCode(joinCode: string): Promise<ClassroomEnrollment> {
    return this.httpClient.request<ClassroomEnrollment>(
      this.routes.classroomJoin,
      {
        method: 'POST',
        body: { joinCode: joinCode.trim().toUpperCase() },
      },
    );
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
