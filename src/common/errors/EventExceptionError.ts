import { ErrorResponseOption } from 'common/decorators/ErrorResponse.decorator';

type Keys = 'EXCEPTION_NOT_FOUND';

export const EventException: Record<Keys, ErrorResponseOption & { code: string; statusCode: number }> = {
  EXCEPTION_NOT_FOUND: {
    code: 'EventException-E001',
    statusCode: 404,
    exampleTitle: '예외 일정 없음',
    exampleDescription: '요청한 예외 일정을 찾을 수 없습니다.',
    message: '해당 예외 일정이 존재하지 않습니다.',
  },
};
