export class AddCategoryCommand {
    constructor(
        public readonly key: string,
        public readonly description: string
    ) {}
}