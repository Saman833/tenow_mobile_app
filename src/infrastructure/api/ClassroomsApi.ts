import {
  Classroom,
  ClassroomInvitation,
} from '../../domain/entities/Classroom';
import { BackendRoutes } from './BackendRoutes';
import { HttpClient } from './HttpClient';

export class ClassroomsApi {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly routes: BackendRoutes,
  ) {}

  listMine(): Promise<Classroom[]> {
    return this.httpClient.request<Classroom[]>(this.routes.classroomsMine);
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
