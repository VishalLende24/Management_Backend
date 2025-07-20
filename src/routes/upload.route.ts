import { Router } from 'express';
import UploadController from '@controllers/upload.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class UploadRoute implements Routes {
  public path = '/upload';
  public router = Router();
  public uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/products`, authMiddleware, this.uploadController.uploadProducts);
    this.router.post(`${this.path}/products/validate`, authMiddleware, this.uploadController.validateUpload);
  }
}

export default UploadRoute;
