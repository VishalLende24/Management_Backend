import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb+srv://vishallende24:vishal24@cluster0.rhy2f.mongodb.net/assignment?retryWrites=true&w=majority&appName=Cluster0`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
