export class UpdateStatusCommand {
  constructor(
    public readonly id: number,
    public readonly description: string
  ) {}
}