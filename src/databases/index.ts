import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb://${'localhost'}:${'27017'}/${'ASSIGMENT'}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
