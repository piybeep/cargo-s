import { Project } from "../entities/projects.entity";

export class GetAllProjectsResponseDto {
  data: Project[];
  count: number;
}
