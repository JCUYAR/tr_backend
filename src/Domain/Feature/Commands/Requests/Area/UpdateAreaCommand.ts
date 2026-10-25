export class UpdateAreaCommand {
  constructor(
    public readonly id: number,
    public readonly description: string
  ) {}
}