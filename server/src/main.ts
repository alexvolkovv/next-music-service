import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 8080;
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    await app.listen(PORT, () => {
      console.log('Server is working...');
    });
  } catch (e) {
    console.log(e);
  }
};

start();
