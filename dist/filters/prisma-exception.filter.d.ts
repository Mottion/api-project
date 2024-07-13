import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
export declare class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void;
    catchPrismaError(exception: PrismaClientKnownRequestError): string;
}
