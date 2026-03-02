export class UpdateTareoCommand {
  constructor(
    public readonly id: number,
    public readonly description: string,
    public readonly category_id: number,
    public readonly area_id: number,
    public readonly status_id: number,
    public readonly start_time: string,
    public readonly end_time: string
  ) {}
}