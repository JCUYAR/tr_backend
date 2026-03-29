import { AddTareoDto } from "src/Model/DTOs/BodySchema/Tareo/AddTareoDto";

export class AddTareoCommand {
    constructor(
        public readonly data: AddTareoDto
    ) {}
}