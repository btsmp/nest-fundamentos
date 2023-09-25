import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'fyAm2FGufocS88ZIc5AstQFaqa7DvsN5',
    }),
  ],
})
export class AuthModule {}
