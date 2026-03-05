export class AddUserCommand {
    constructor(
        public readonly first_name: string,
        public readonly last_name: string,
        public readonly document_number: string
    ) {}
}