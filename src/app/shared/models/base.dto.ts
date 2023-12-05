export interface BaseDto {
	createdAt: Date;
	modifiedAt: Date;
	deletedAt: Date | null;
	status: boolean;
}
