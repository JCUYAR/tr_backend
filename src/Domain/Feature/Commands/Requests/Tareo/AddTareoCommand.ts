export class AddTareoCommand {
    constructor(
        public readonly description: string,
        public readonly user_id: number,
        public readonly category_id: number,
        public readonly area_id: number,
        public readonly status_id: number,
        public readonly work_date: Date,
        public readonly start_time: string,
        public readonly end_time: string,
        public readonly total_hours: number
    ) {}
}