import { applyDecorators, HttpException, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiResponse, getSchemaPath, refs } from '@nestjs/swagger';
import { ErrorCommonResponse } from 'common/errors/errorResponse/ErrorCommonResponse.dto';
import { HttpExceptionErrorResponseDto } from 'common/errors/errorResponse/HttpExceptionError.response.dto';
import { makeInstanceByApiProperty } from 'common/utils/makeInstanceByApiProperty';

export interface ErrorResponseOption {
  code: string;
  statusCode: number;
  exampleTitle: string;
  message: string;
  exampleDescription: string;
}

export const ErrorResponse = (
  StatusCode: HttpStatus,
  errorResponseOptions: ErrorResponseOption[]
) => {
  const examples = errorResponseOptions.reduce((acc, error) => {
    const innerErrorDto = new HttpExceptionErrorResponseDto(
      error.statusCode,
      error.exampleTitle,
      error.message,
      error.code
    );
    const commonErrorInstance = makeInstanceByApiProperty<ErrorCommonResponse<any>>(ErrorCommonResponse);
    commonErrorInstance.error = innerErrorDto;
    acc[error.exampleTitle] = {
      value: commonErrorInstance,
      description: error.exampleDescription,
    };
    return acc;
  }, {});
  
  return applyDecorators(
    ApiExtraModels(ErrorCommonResponse, HttpExceptionErrorResponseDto),
    ApiResponse({
      status: StatusCode,
      content: {
        'application/json': {
          schema: {
            $ref: getSchemaPath(ErrorCommonResponse),
          },
          examples,
        },
      },
    })
  );
};