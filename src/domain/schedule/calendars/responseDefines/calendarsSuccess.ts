import { SuccessResponseOption } from 'common/decorators/SuccessResponse.decorator';
import { CreateCalendarResponseDTO } from '../dtos/response/CreateCalendar.response.dto';
import { SelectCalendarListResponseDTO } from '../dtos/response/SelectCalendarList.response.dto';
import { CalendarDetailResponseDTO } from '../dtos/response/SelectCalendarDetail.response.dto';
import { CalendarMembersResponseDTO } from '../dtos/response/SelectCalendarMembers.response.dto';

type successKeys =
  | 'Calendar-S001' // 캘린더 생성
  | 'Calendar-S002' // 목록 조회
  | 'Calendar-S003' // 단일 조회
  | 'Calendar-S004' // 기본 캘린더 조회
  | 'Calendar-S005' // 멤버 목록 조회

export const CalendarsSuccessDefine: Record<successKeys, SuccessResponseOption & { code: string }> = {
  'Calendar-S001': {
    model: CreateCalendarResponseDTO,
    exampleTitle: '캘린더 생성',
    exampleDescription: '캘린더가 성공적으로 생성되었습니다.',
    code: 'Calendar-S001',
  },
  'Calendar-S002': {
    model: SelectCalendarListResponseDTO,
    exampleTitle: '캘린더 목록 조회',
    exampleDescription: '사용자가 참여 중인 캘린더 목록을 반환합니다.',
    code: 'Calendar-S002',
  },
  'Calendar-S003': {
    model: CalendarDetailResponseDTO,
    exampleTitle: '단일 캘린더 조회',
    exampleDescription: '요청한 ID의 캘린더 상세 정보를 반환합니다.',
    code: 'Calendar-S003',
  },
  'Calendar-S004': {
    model: CalendarDetailResponseDTO,
    exampleTitle: '기본 캘린더 조회',
    exampleDescription: '사용자의 기본 캘린더 정보를 반환합니다.',
    code: 'Calendar-S004',
  },
  'Calendar-S005': {
    model: CalendarMembersResponseDTO,
    exampleTitle: '캘린더 멤버 목록 조회',
    exampleDescription: '해당 캘린더에 속한 사용자 목록을 반환합니다.',
    code: 'Calendar-S005',
  },
};
