import { SuccessResponseOption } from "common/decorators/SuccessResponse.decorator";

import { CreateEventResponseDTO } from "../dtos/response/CreateEvent.response.dto";
import { UpdateAndDeleteEventResponseDTO } from "../dtos/response/UpdateAndDeleteEvent.response.dto";
import { SelectEventListResponseDTO } from "../dtos/response/SelectEventList.response.dto";
import { UpdateRepeatRuleResponseDTO } from "../dtos/response/UpdateRepeatRule.response.dto";


type successKeys = 'Event-S001' | 'Event-S002' | 'Event-S003' | 'Event-S004';

export const EventsSuccessDefine: Record<successKeys, SuccessResponseOption & { code: string }> = {
  'Event-S001': {
    model: CreateEventResponseDTO,
    exampleDescription: '이벤트가 성공적으로 생성되었습니다.',
    exampleTitle: '일정 등록',
    code: 'Event-S001',
  },
  'Event-S002': {
    model: UpdateAndDeleteEventResponseDTO,
    exampleDescription: '이벤트가 수정 또는 삭제되었습니다.',
    exampleTitle: '일정 수정, 삭제',
    code: 'Event-S002',
  },
  'Event-S003': {
    model: SelectEventListResponseDTO,
    exampleDescription: '지정된 기간 내의 일정을 조회했습니다.',
    exampleTitle: '일정 목록 조회',
    code: 'Event-S003',
  },
  'Event-S004': {
    model: UpdateRepeatRuleResponseDTO,
    exampleDescription: '반복 규칙이 성공적으로 수정되었습니다.',
    exampleTitle: '반복 규칙 수정',
    code: 'Event-S004',
  }
};