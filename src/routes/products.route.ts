import { Router } from 'express';
import ProductsController from '@controllers/products.controller';
import { CreateProductDto, UpdateProductDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/get-by-filter`, authMiddleware, this.productsController.getProducts);
    this.router.get(`${this.path}/stats`, authMiddleware, this.productsController.getProductStats);
    this.router.get(`${this.path}/:id`, authMiddleware, this.productsController.getProductById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateProductDto, 'body'), this.productsController.createProduct);
    this.router.post(`${this.path}/bulk`, authMiddleware, this.productsController.bulkCreateProducts);
    this.router.put(`${this.path}/:id`, authMiddleware, this.productsController.updateProduct);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.productsController.deleteProduct);
  }
}

export default ProductsRoute;
