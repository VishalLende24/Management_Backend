import { Product, CreateProductDto, UpdateProductDto, ProductFilters } from '@interfaces/products.interface';
import productModel from '@models/products.model';
import { HttpException } from '@exceptions/HttpException';

class ProductService {
  public async findAllProducts(
    userId: string,
    filters?: ProductFilters,
  ): Promise<{ products: Product[]; totalCount: number; page: number; pageSize: number }> {
    const query: any = { userId };

    if (filters?.priceRange) {
      query.price = {
        $gte: filters.priceRange.min,
        $lte: filters.priceRange.max,
      };
    }

    if (filters?.stockRange) {
      query.stock = {
        $gte: filters.stockRange.min,
        $lte: filters.stockRange.max,
      };
    }

    if (filters?.categories && filters.categories.length > 0) {
      query.category = { $in: filters.categories };
    }

    if (filters?.showLowStock) {
      query.stock = { ...query.stock, $gt: 0, $lte: 10 };
    }

    if (filters?.showOutOfStock) {
      query.stock = 0;
    }

    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const pageSize = filters?.pageSize && filters.pageSize > 0 ? filters.pageSize : 10;
    const skip = (page - 1) * pageSize;

    let sortObject: any = { createdAt: -1 };
    if (filters?.sortBy) {
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
      sortObject = {};
      sortObject[filters.sortBy] = sortOrder;
    }

    const totalCount = await productModel.countDocuments(query);
    const products = await productModel.find(query).sort(sortObject).skip(skip).limit(pageSize);

    return { products, totalCount, page, pageSize };
  }

  public async findProductById(productId: string, userId: string): Promise<Product> {
    const product: Product = await productModel.findOne({ _id: productId, userId });
    if (!product) throw new HttpException(409, "Product doesn't exist");

    return product;
  }

  public async createProduct(productData: CreateProductDto, userId: string): Promise<Product> {
    const createProductData: Product = await productModel.create({ ...productData, userId });
    return createProductData;
  }

  public async updateProduct(productId: string, productData: UpdateProductDto, userId: string): Promise<Product> {
    const updateProductById: Product = await productModel.findByIdAndUpdate(
      { _id: productId },
      { $set: productData },
      { new: true, runValidators: true },
    );
    if (!updateProductById) throw new HttpException(409, "Product doesn't exist");

    return updateProductById;
  }

  public async deleteProduct(productId: string, userId: string): Promise<Product> {
    const deleteProductById: Product = await productModel.findByIdAndDelete({ _id: productId, userId });
    if (!deleteProductById) throw new HttpException(409, "Product doesn't exist");

    return deleteProductById;
  }

  public async bulkCreateProducts(productsData: CreateProductDto[], userId: string): Promise<Product[]> {
    try {
      const productsWithUserId = productsData.map(product => ({
        ...product,
        userId,
        stockVisible: product.stockVisible !== undefined ? product.stockVisible : true,
      }));

      const createdProducts: Product[] = await productModel.insertMany(productsWithUserId, {
        ordered: false,
      });

      return createdProducts;
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(409, 'Some products already exist');
      }
      throw new HttpException(400, 'Error creating products: ' + error.message);
    }
  }

  public async getProductStats(userId: string): Promise<any> {
    const totalProducts = await productModel.countDocuments({ userId });
    const inStockCount = await productModel.countDocuments({ userId, stock: { $gt: 0 } });
    const lowStockCount = await productModel.countDocuments({ userId, stock: { $gt: 0, $lte: 10 } });
    const outOfStockCount = await productModel.countDocuments({ userId, stock: 0 });

    return {
      totalProducts,
      inStockCount,
      lowStockCount,
      outOfStockCount,
    };
  }
}

export default ProductService;
