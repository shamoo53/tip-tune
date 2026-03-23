import { ApiProperty } from "@nestjs/swagger";

export class PaginationMeta {
  @ApiProperty({ example: 120 })
  total: number;

  @ApiProperty({ example: 2 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 6 })
  totalPages: number;

  @ApiProperty({ example: true })
  hasNextPage: boolean;

  @ApiProperty({ example: true })
  hasPreviousPage: boolean;

  // ADD THIS:
  @ApiProperty({ example: 5, required: false })
  unseenCount?: number;
}
