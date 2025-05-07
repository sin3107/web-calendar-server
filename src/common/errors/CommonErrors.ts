import { ErrorResponseOption } from 'common/decorators/ErrorResponse.decorator';

type Keys = 
  | 'INTERNAL_SERVER_ERROR'
  | 'BAD_REQUEST'
  | 'IMAGE_NOT_FOUND';

export const Common: Record<Keys, ErrorResponseOption & { code: string; statusCode: number }> = {
  INTERNAL_SERVER_ERROR: {
    code: 'Common-E001',
    statusCode: 500,
    exampleTitle : '서버 내부 에러',
    exampleDescription: '서버 내부 에러 시 발생하는 에러',
    message: '서버 에러',
  },
  BAD_REQUEST: {
    code: 'Common-E002',
    statusCode: 400,
    exampleTitle : '잘못된 요청',
    exampleDescription: '요청 값이 이상할 때 발생하는 에러',
    message: '요청 값이 유효하지 않습니다.',
  },
  IMAGE_NOT_FOUND: {
    code: 'Common-E003',
    statusCode: 404,
    exampleTitle : '이미지 없음',
    exampleDescription: '이미지를 찾을 수 없을 때 발생',
    message: '이미지를 찾을 수 없습니다.',
  },
};
