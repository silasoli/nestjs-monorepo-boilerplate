import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { IMessage } from '../../../../common/interfaces/Imessage.interface';
import { IRequestWithUser } from '../../../../common/interfaces/IRequestWithUser.inteface';
import { IUserSession } from '../../../../common/interfaces/IUserSession.interface';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../../../common/dto/login.dto';
import { LocalAuthGuard } from '../../../../global-modules/auth/guards/local-auth.guard';

@ApiTags('admin-users-auth')
@Controller('admin-users-auth')
export class AdminUserAuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public login(
    @Req() request: IRequestWithUser,
    @Body() dto: LoginDto,
  ): IUserSession {
    return { email: dto.email, ...request.user };
  }

  @Delete('/logout')
  public logout(@Req() request: Request): IMessage {
    request.session.destroy(function (err) {
      if (err) return console.error(err);
    });
    return { message: 'The user session has ended' };
  }
}
