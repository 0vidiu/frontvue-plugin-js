export interface WebpackConfiguration {
    entry?: object | string | any[];
    mode?: string;
    module?: object;
    optimization?: object;
    output?: object;
    plugins: any[];
    resolve?: object;
    resolveLoader?: object;
}
declare const _default: {
    description: string;
    hook: string;
    name: string;
    taskFn: (done: any, { logger, config, paths, env, gulp }?: any) => Promise<any>;
};
export default _default;
