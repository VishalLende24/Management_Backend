import { IsEmail, IsString, IsNumber, IsBoolean, IsOptional, Min, IsArray, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  public firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  public lastName: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  public email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'Password must not exceed 100 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
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
