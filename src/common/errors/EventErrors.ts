import { ErrorResponseOption } from 'common/decorators/ErrorResponse.decorator';

type Keys = 
  | 'EVENT_NOT_FOUND'
  | 'INVALID_EVENT_TIME_RANGE'
  | 'UNAUTHORIZED_EVENT_ACCESS';

export const Event: Record<Keys, ErrorResponseOption & { code: string; statusCode: number }> = {
  EVENT_NOT_FOUND: {
    code: 'Event-E001',
    statusCode: 404,
    exampleTitle: '일정 조회 실패',
    exampleDescription: '존재하지 않는 일정 ID로 조회를 시도했을 때',
    message: '해당 일정을 찾을 수 없습니다.',
  },
  INVALID_EVENT_TIME_RANGE: {
    code: 'Event-E002',
    statusCode: 400,
    exampleTitle: '시간 범위 오류',
    exampleDescription: '시작 시간이 종료 시간보다 늦을 경우',
    message: '시작 시간이 종료 시간보다 늦을 수 없습니다.',
  },
  UNAUTHORIZED_EVENT_ACCESS: {
    code: 'Event-E003',
    statusCode: 403,
    exampleTitle: '접근 권한 없음',
    exampleDescription: '자신이 소유하지 않은 일정에 접근하려 할 때',
    message: '해당 일정에 접근할 권한이 없습니다.',
  },
};
