declare const _default: ({
    description: string;
    hook: string;
    name: string;
    taskFn: (done: any, { logger, paths, gulp }?: any) => Promise<any>;
    configDefaults: {
        sourceDir: string;
        buildDir: string;
        entrypoints: string;
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
    dependencies: {
        devDependencies: {
            '@babel/core': string;
            'babel-eslint': string;
            'babel-loader': string;
            'eslint': string;
            'eslint-loader': string;
            'eslint-plugin-babel': string;
            'webpack': string;
        };
    };
} | {
    description: string;
    hook: string;
    name: string;
    taskFn: (done: any, { logger, config, paths, env, gulp }?: any) => Promise<any>;
    configDefaults?: undefined;
    configQuestionnaire?: undefined;
    dependencies?: undefined;
})[];
export default _default;
