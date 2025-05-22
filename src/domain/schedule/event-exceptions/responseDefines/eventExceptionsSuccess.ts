import { SuccessResponseOption } from 'common/decorators/SuccessResponse.decorator';
import { CreateEventExceptionResponseDTO } from '../dtos/response/CreateEventException.response.dto';
import { UpdateEventExceptionResponseDTO } from '../dtos/response/UpdateEventException.response.dto.ts';
import { DeleteEventExceptionResponseDTO } from '../dtos/response/DeleteEventException.response.dto';
import { SelectEventExceptionsResponseDTO } from '../dtos/response/SelectEventExceptions.response.dto';

type Keys = 'EventException-S001' | 'EventException-S002' | 'EventException-S003' | 'EventException-S004';

export const EventExceptionSuccessDefine: Record<Keys, SuccessResponseOption & { code: string }> = {
  'EventException-S001': {
    model: CreateEventExceptionResponseDTO,
    exampleTitle: '예외 일정 등록 성공',
    exampleDescription: '예외 일정이 성공적으로 등록되었습니다.',
    code: 'EventException-S001',
  },
  'EventException-S002': {
    model: UpdateEventExceptionResponseDTO,
    exampleTitle: '예외 일정 수정 성공',
    exampleDescription: '예외 일정이 성공적으로 수정되었습니다.',
    code: 'EventException-S002',
  },
  'EventException-S003': {
    model: DeleteEventExceptionResponseDTO,
    exampleTitle: '예외 일정 삭제',
    exampleDescription: '예외 일정이 성공적으로 삭제되었습니다.',
    code: 'EventException-S003',
  },
  'EventException-S004': {
    model: SelectEventExceptionsResponseDTO,
    exampleTitle: '예외 일정 목록 조회',
    exampleDescription: '특정 이벤트에 대한 예외 일정들을 조회합니다.',
    code: 'EventException-S004',
  }
};
