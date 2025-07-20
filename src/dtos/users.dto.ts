import { IsEmail, IsString, IsNumber, IsBoolean, IsOptional, Min, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsNumber()
  @Min(0)
  public price: number;

  @IsNumber()
  @Min(0)
  public stock: number;

  @IsString()
  public category: string;

  @IsBoolean()
  @IsOptional()
  public stockVisible?: boolean;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  public price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  public stock?: number;

  @IsString()
  @IsOptional()
  public category?: string;

  @IsBoolean()
  @IsOptional()
  public stockVisible?: boolean;
}

export class ProductFiltersDto {
  @IsOptional()
  public priceRange?: { min: number; max: number };

  @IsOptional()
  public stockRange?: { min: number; max: number };

  @IsArray()
  @IsOptional()
  public categories?: string[];

  @IsBoolean()
  @IsOptional()
  public showLowStock?: boolean;

  @IsBoolean()
  @IsOptional()
  public showOutOfStock?: boolean;

  @IsString()
  @IsOptional()
  public sortBy?: string;

  @IsString()
  @IsOptional()
  public sortOrder?: 'asc' | 'desc';

  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsNumber()
  @IsOptional()
  public pageSize?: number;
}
