// repeat-expansion.util.ts
import { EventEntity } from 'domain/schedule/events/entities/event.entity';
import { EventRepeatRuleEntity } from 'domain/schedule/events/entities/event-repeat-rule.entity';
import { addDays, addWeeks, addMonths, isBefore, isAfter, isEqual } from 'date-fns';

export function generateRecurringEvents(
  baseEvent: EventEntity,
  rule: EventRepeatRuleEntity,
  rangeStart: Date,
  rangeEnd: Date
): EventEntity[] {
  const result: EventEntity[] = [];

  const {
    repeatType,
    repeatInterval = 1,
    repeatEndDate,
    isForever,
    repeatDaysOfWeek,
  } = rule;

  const eventStart = new Date(baseEvent.startTime);
  const eventEnd = new Date(baseEvent.endTime);

  const exceptions = baseEvent.exceptions ?? [];

  let cursor = new Date(eventStart);
  const finalDate = repeatEndDate ?? rangeEnd;

  while (isBefore(cursor, finalDate) || isEqual(cursor, finalDate)) {
    const duration = eventEnd.getTime() - eventStart.getTime();

    // 반복 요일 처리 (weekly only)
    if (repeatType === 'weekly' && repeatDaysOfWeek?.length) {
      for (const day of repeatDaysOfWeek) {
        const dayNum = Number(day);
        const offset = (7 + dayNum - eventStart.getDay()) % 7;
        const occurrenceDate = addDays(cursor, offset);

        if (occurrenceDate < rangeStart || occurrenceDate > rangeEnd) continue;

        const exception = exceptions.find(e =>
          e.type === 'skip' && isEqual(new Date(e.exceptionDate), occurrenceDate)
        );

        if (exception) continue;

        const modify = exceptions.find(e =>
          e.type === 'modify' && isEqual(new Date(e.exceptionDate), occurrenceDate)
        );

        const eventInstance = { ...baseEvent } as EventEntity;
        eventInstance.startTime = occurrenceDate;
        eventInstance.endTime = new Date(occurrenceDate.getTime() + duration);

        if (modify?.modifiedEventData) {
          Object.assign(eventInstance, modify.modifiedEventData);
        }

        result.push(eventInstance);
      }

      cursor = addWeeks(cursor, repeatInterval);
    } else {
      if (cursor > rangeEnd) break;
      if (cursor < rangeStart) {
        if (repeatType === 'daily') cursor = addDays(cursor, repeatInterval);
        else if (repeatType === 'weekly') cursor = addWeeks(cursor, repeatInterval);
        else if (repeatType === 'monthly') cursor = addMonths(cursor, repeatInterval);
        continue;
      }

      const exception = exceptions.find(e =>
        e.type === 'skip' && isEqual(new Date(e.exceptionDate), cursor)
      );
      if (exception) {
        if (repeatType === 'daily') cursor = addDays(cursor, repeatInterval);
        else if (repeatType === 'weekly') cursor = addWeeks(cursor, repeatInterval);
        else if (repeatType === 'monthly') cursor = addMonths(cursor, repeatInterval);
        continue;
      }

      const modify = exceptions.find(e =>
        e.type === 'modify' && isEqual(new Date(e.exceptionDate), cursor)
      );

      const instance = { ...baseEvent } as EventEntity;
      instance.startTime = new Date(cursor);
      instance.endTime = new Date(cursor.getTime() + duration);

      if (modify?.modifiedEventData) {
        Object.assign(instance, modify.modifiedEventData);
      }

      result.push(instance);

      if (repeatType === 'daily') cursor = addDays(cursor, repeatInterval);
      else if (repeatType === 'weekly') cursor = addWeeks(cursor, repeatInterval);
      else if (repeatType === 'monthly') cursor = addMonths(cursor, repeatInterval);
      else break;
    }
  }

  return result;
}