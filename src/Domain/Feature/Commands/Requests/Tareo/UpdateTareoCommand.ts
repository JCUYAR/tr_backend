import { UpdateTareoDto } from "src/Model/DTOs/BodySchema/Tareo/UpdateTareoDto";

export class UpdateTareoCommand {
  constructor(
    public readonly data: UpdateTareoDto
  ) {}
}