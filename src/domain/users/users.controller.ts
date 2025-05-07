import {
  Controller,
  Post,
  Body,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'common/decorators/SuccessResponse.decorator';
import { UsersService } from 'domain/users/users.service';
import { UserSuccessDefine } from 'domain/users/responseDefines/userSuccess';
import { EmailCheckRequestDTO } from 'domain/users/dtos/request/EmailCheck.request.dto';
import { EmailCheckResponseDTO } from './dtos/response/EmailCheck.response.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post('check-email')
  @ApiOperation({ summary: '이메일 중복 확인' })
  @ApiBody({ type: EmailCheckRequestDTO })
  @SuccessResponse(HttpStatus.OK, [UserSuccessDefine['User-S001']])
  async emailCheck(@Body() dto: EmailCheckRequestDTO): Promise<EmailCheckResponseDTO> {
    const user = await this.usersService.findUserByEmail(dto.email);
    return { result: !user };
  }
}