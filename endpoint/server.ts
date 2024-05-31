import app from "./src/app";
import { config } from "./src/config/config";
import connectToDB from "./src/config/db";

const startServer = () => {
  connectToDB();
  const PORT = config.port || 3000;
  app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`),
  );
};

startServer();
