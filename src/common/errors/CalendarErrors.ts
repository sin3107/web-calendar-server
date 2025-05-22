import { ErrorResponseOption } from 'common/decorators/ErrorResponse.decorator';

type Keys =
  | 'INVALID_CALENDAR_DATA'
  | 'CALENDAR_NOT_FOUND'
  | 'NO_DEFAULT_CALENDAR'
  | 'CALENDAR_ACCESS_DENIED'

export const Calendar: Record<Keys, ErrorResponseOption & { code: string; statusCode: number }> = {
  INVALID_CALENDAR_DATA: {
    code: 'Calendar-E001',
    statusCode: 400,
    exampleTitle: '잘못된 요청',
    exampleDescription: '캘린더 이름이나 색상 형식이 올바르지 않습니다.',
    message: '잘못된 캘린더 요청입니다.',
  },

  CALENDAR_NOT_FOUND: {
    code: 'Calendar-E002',
    statusCode: 404,
    exampleTitle: '존재하지 않는 캘린더',
    exampleDescription: '요청한 ID에 해당하는 캘린더가 존재하지 않습니다.',
    message: '해당 캘린더를 찾을 수 없습니다.',
  },

  NO_DEFAULT_CALENDAR: {
    code: 'Calendar-E003',
    statusCode: 404,
    exampleTitle: '기본 캘린더 없음',
    exampleDescription: '사용자에게 설정된 기본 캘린더가 없습니다.',
    message: '기본 캘린더가 존재하지 않습니다.',
  },

  CALENDAR_ACCESS_DENIED: {
    code: 'Calendar-E004',
    statusCode: 403,
    exampleTitle: '접근 권한 없음',
    exampleDescription: '해당 캘린더에 접근할 권한이 없습니다.',
    message: '이 캘린더에 접근할 수 없습니다.',
  },
};
