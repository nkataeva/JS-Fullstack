import express from "express";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
// import { errorMiddleware } from "./middleware/errorMiddleware";
import { router } from "./routes/contactRoutes";

const app = express();
const PORT = 3000;

// Подключение middleware
// app.use(loggerMiddleware);
app.use(express.json());

// Подключение маршрутов
app.use('/contacts', router);

// Подключение обработчика ошибок
// app.use(errorMiddleware);

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
