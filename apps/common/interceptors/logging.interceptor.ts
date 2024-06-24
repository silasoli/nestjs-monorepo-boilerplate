import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiCallService } from '../../global-modules/api-call/api-call.service';
import { CreateApiCallDto } from '../../global-modules/api-call/dto/create-api-call.dto';
import { UpdateApiCallDto } from '../../global-modules/api-call/dto/update-api-call.dto';
import { IUserSession } from '../interfaces/IUserSession.interface';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly apiCallService: ApiCallService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const startDate = Date.now();
    const request = context.switchToHttp().getRequest();
    const user: IUserSession = request['user'];

    const create: CreateApiCallDto = {
      email: user.email,
      method: request.method,
      url: request.url,
      args: request.body,
      host: request.host,
    };

    const apiCall = await this.apiCallService.create(create);

    return next.handle().pipe(
      tap(async (data) => {
        const duration = new Date(Date.now() - startDate).getTime() / 1000;

        const update: UpdateApiCallDto = {
          running: false,
          duration: `${duration}`,
          ok: true,
          result: data,
        };

        await this.apiCallService.update(apiCall.id, update);
      }),
      catchError(async (err) => {
        const duration = new Date(Date.now() - startDate).getTime() / 1000;

        const update: UpdateApiCallDto = {
          running: false,
          duration: `${duration}`,
          ok: false,
          error: err,
        };

        await this.apiCallService.update(apiCall.id, update);

        throw err;
      }),
    );
  }
}
