import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ProductsRoute from '@routes/products.route';
import UploadRoute from '@routes/upload.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new ProductsRoute(), new UploadRoute()]);

app.listen();
