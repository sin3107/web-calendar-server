import { ErrorResponseOption } from 'common/decorators/ErrorResponse.decorator';

type Keys =
  | 'USER_NOT_FOUND'
  | 'EMAIL_NOT_FOUND'
  | 'WRONG_PASSWORD'
  | 'EMAIL_ALREADY_EXIST'
  | 'CHANGE_PW_FAIL'
  | 'PROFILE_UPLOAD_FAIL'
  | 'DUPLICATED_NICKNAME'
  | 'PROFILE_NOT_FOUND'
  | 'VALIDATE_FAIL'
  | 'REFRESH_TOKEN_NOT_FOUND'
  | 'REFRESH_TOKEN_NOT_MATCH';

export const User: Record<Keys, ErrorResponseOption & { code: string; statusCode: number }> = {
  USER_NOT_FOUND: {
    code: 'User-E001',
    statusCode: 404,
    exampleTitle: '유저 없음',
    exampleDescription: '해당 유저가 존재하지 않을 때 발생',
    message: '유저를 찾을 수 없습니다.',
  },
  EMAIL_NOT_FOUND: {
    code: 'User-E002',
    statusCode: 404,
    exampleTitle: '이메일 없음',
    exampleDescription: '등록되지 않은 이메일로 로그인 시도',
    message: '해당 이메일이 존재하지 않습니다.',
  },
  WRONG_PASSWORD: {
    code: 'User-E003',
    statusCode: 400,
    exampleTitle: '비밀번호 오류',
    exampleDescription: '비밀번호가 일치하지 않을 때',
    message: '비밀번호가 일치하지 않습니다.',
  },
  EMAIL_ALREADY_EXIST: {
    code: 'User-E004',
    statusCode: 409,
    exampleTitle: '이메일 중복',
    exampleDescription: '이미 등록된 이메일로 회원가입 시도',
    message: '이미 존재하는 이메일입니다.',
  },
  CHANGE_PW_FAIL: {    
    code: 'User-E005',
    statusCode: 500,
    exampleTitle: '비밀번호 변경 실패',
    exampleDescription: '비밀번호 변경 처리 중 예외 발생',
    message: '비밀번호 변경에 실패했습니다.',

  },
  PROFILE_UPLOAD_FAIL: {
    code: 'User-E006',
    statusCode: 500,
    exampleTitle: '프로필 업로드 실패',
    exampleDescription: '프로필 이미지 업로드에 실패할 때',
    message: '프로필 업로드에 실패했습니다.',
  },
  DUPLICATED_NICKNAME: {
    code: 'User-E007',
    statusCode: 409,
    exampleTitle: '닉네임 중복',
    exampleDescription: '이미 사용 중인 닉네임일 경우',
    message: '중복된 닉네임입니다.',
  },
  PROFILE_NOT_FOUND: {
    code: 'User-E008',
    statusCode: 404,
    exampleTitle: '프로필 없음',
    exampleDescription: '등록된 프로필이 존재하지 않을 때',
    message: '프로필을 찾을 수 없습니다.',
  },
  VALIDATE_FAIL: {
    code: 'User-E009',
    statusCode: 401,
    exampleTitle: 'Access Token 오류',
    exampleDescription: 'Access Token이 유효하지 않을 때',
    message: 'Access Token이 유효하지 않습니다.',
  },
  REFRESH_TOKEN_NOT_FOUND: {
    code: 'User-E010',
    statusCode: 401,
    exampleTitle: 'Refresh Token 없음',
    exampleDescription: '저장된 Refresh Token이 없을 때',
    message: 'Refresh Token이 존재하지 않습니다.',
  },
  REFRESH_TOKEN_NOT_MATCH: {
    code: 'User-E011',
    statusCode: 401,
    exampleTitle: 'Refresh Token 불일치',
    exampleDescription: 'Refresh Token이 일치하지 않을 때',
    message: 'Refresh Token이 일치하지 않습니다.',
  },
};
