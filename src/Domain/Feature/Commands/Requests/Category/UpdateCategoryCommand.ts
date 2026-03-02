export class UpdateCategoryCommand {
  constructor(
    public readonly id: number,
    public readonly key: string,
    public readonly description: string
  ) {}
}