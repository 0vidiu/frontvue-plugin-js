declare const _default: {
    description: string;
    hook: string;
    name: string;
    configDefaults: {
        sourceDir: string;
        entryPoint: string;
        buildDir: string;
        buildFilename: string;
    };
    configQuestionnaire: {
        namespace: string;
        questions: {
            default: string;
            message: string;
            name: string;
            type: string;
        }[];
    };
    taskFn(done: any, { logger, config, paths }?: any): void;
};
export default _default;
