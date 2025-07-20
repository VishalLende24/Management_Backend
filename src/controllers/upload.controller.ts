import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Product } from '@interfaces/products.interface';
import ProductService from '@services/products.service';
import { HttpException } from '@exceptions/HttpException';

class UploadController {
  public productService = new ProductService();

  public uploadProducts = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { products: productsData } = req.body;
      const userId = req.user._id;

      if (!productsData || !Array.isArray(productsData)) {
        throw new HttpException(400, 'Products array is required');
      }

      if (productsData.length === 0) {
        throw new HttpException(400, 'Products array cannot be empty');
      }

      const validationErrors = [];
      for (let i = 0; i < productsData.length; i++) {
        const product = productsData[i];

        if (!product.name || !product.price || !product.stock || !product.category) {
          validationErrors.push(`Product at index ${i} is missing required fields (name, price, stock, category)`);
          continue;
        }

        if (typeof product.price !== 'number' || product.price < 0) {
          validationErrors.push(`Product at index ${i} has invalid price`);
          continue;
        }

        if (typeof product.stock !== 'number' || product.stock < 0) {
          validationErrors.push(`Product at index ${i} has invalid stock`);
          continue;
        }

        if (typeof product.name !== 'string' || product.name.trim() === '') {
          validationErrors.push(`Product at index ${i} has invalid name`);
          continue;
        }

        if (typeof product.category !== 'string' || product.category.trim() === '') {
          validationErrors.push(`Product at index ${i} has invalid category`);
          continue;
        }
      }

      if (validationErrors.length > 0) {
        throw new HttpException(400, `Validation errors: ${validationErrors.join(', ')}`);
      }

      const createdProducts: Product[] = await this.productService.bulkCreateProducts(productsData, userId);

      res.status(201).json({
        data: createdProducts,
        message: `Successfully uploaded ${createdProducts.length} products`,
        count: createdProducts.length,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public validateUpload = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { products: productsData } = req.body;
      const userId = req.user._id;

      if (!productsData || !Array.isArray(productsData)) {
        throw new HttpException(400, 'Products array is required');
      }

      if (productsData.length === 0) {
        throw new HttpException(400, 'Products array cannot be empty');
      }

      const validationErrors = [];
      const validProducts = [];

      for (let i = 0; i < productsData.length; i++) {
        const product = productsData[i];

        if (!product.name || !product.price || !product.stock || !product.category) {
          validationErrors.push(`Row ${i + 1}: Missing required fields (name, price, stock, category)`);
          continue;
        }

        if (typeof product.price !== 'number' || product.price < 0) {
          validationErrors.push(`Row ${i + 1}: Invalid price`);
          continue;
        }

        if (typeof product.stock !== 'number' || product.stock < 0) {
          validationErrors.push(`Row ${i + 1}: Invalid stock`);
          continue;
        }

        if (typeof product.name !== 'string' || product.name.trim() === '') {
          validationErrors.push(`Row ${i + 1}: Invalid name`);
          continue;
        }

        if (typeof product.category !== 'string' || product.category.trim() === '') {
          validationErrors.push(`Row ${i + 1}: Invalid category`);
          continue;
        }

        validProducts.push(product);
      }

      res.status(200).json({
        data: {
          totalProducts: productsData.length,
          validProducts: validProducts.length,
          invalidProducts: validationErrors.length,
          validationErrors,
          validProducts: validProducts,
        },
        message: `Validation complete. ${validProducts.length} valid products found.`,
        success: validationErrors.length === 0,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UploadController;
