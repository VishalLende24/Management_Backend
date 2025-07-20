import { NextFunction, Request, Response } from 'express';
import { CreateProductDto, UpdateProductDto, ProductFiltersDto } from '@dtos/users.dto';
import { Product } from '@interfaces/products.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import ProductService from '@services/products.service';

class ProductsController {
  public productService = new ProductService();

  public getProducts = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const filters: ProductFiltersDto = req.body;

      const result = await this.productService.findAllProducts(userId, filters);

      res.status(200).json({
        data: result.products,
        totalCount: result.totalCount,
        currentPage: result.page,
        pageSize: result.pageSize,
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const userId = req.user._id;

      const product: Product = await this.productService.findProductById(productId, userId);

      res.status(200).json({ data: product, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const userId = req.user._id;

      const createProductData: Product = await this.productService.createProduct(productData, userId);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const productData: UpdateProductDto = req.body;
      const userId = req.user._id;

      const updateProductData: Product = await this.productService.updateProduct(productId, productData, userId);

      res.status(200).json({ data: updateProductData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const userId = req.user._id;

      const deleteProductData: Product = await this.productService.deleteProduct(productId, userId);

      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public bulkCreateProducts = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { products: productsData } = req.body;
      const userId = req.user._id;

      if (!productsData || !Array.isArray(productsData)) {
        throw new Error('Products array is required');
      }

      if (productsData.length === 0) {
        throw new Error('Products array cannot be empty');
      }
      const filterData = [];
      for (let i = 0; i < productsData.length; i++) {
        const product = productsData[i];
        if (!product.name || !product.price || !product.stock || !product.category) {
          continue;
          throw new Error(`Product at index ${i} is missing required fields (name, price, stock, category)`);
        }

        if (typeof product.price !== 'number' || product.price < 0) {
          continue;
          throw new Error(`Product at index ${i} has invalid price`);
        }

        if (typeof product.stock !== 'number' || product.stock < 0) {
          continue;
          throw new Error(`Product at index ${i} has invalid stock`);
        }

        filterData.push(product);
      }

      const createdProducts: Product[] = await this.productService.bulkCreateProducts(productsData, userId);

      res.status(201).json({
        data: createdProducts,
        message: `Successfully created ${createdProducts.length} products`,
        count: createdProducts.length,
      });
    } catch (error) {
      next(error);
    }
  };

  public getProductStats = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;

      const stats = await this.productService.getProductStats(userId);

      res.status(200).json({ data: stats, message: 'stats' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
