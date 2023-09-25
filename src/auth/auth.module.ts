import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'fyAm2FGufocS88ZIc5AstQFaqa7DvsN5',
    }),
    UserModule,
    PrismaModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
