declare function extendPrismaClient(): import("@prisma/client/runtime/library").DynamicClientExtensionThis<import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & {
    result: {};
    model: {};
    query: {};
    client: {
        onModuleInit: () => () => Promise<void>;
    };
}, import(".prisma/client").Prisma.PrismaClientOptions>, import(".prisma/client").Prisma.TypeMapCb, {
    result: {};
    model: {};
    query: {};
    client: {
        onModuleInit: () => () => Promise<void>;
    };
}, {}>;
declare const ExtendedPrismaClient: new () => ReturnType<typeof extendPrismaClient>;
export declare class PrismaService extends ExtendedPrismaClient {
}
export {};
