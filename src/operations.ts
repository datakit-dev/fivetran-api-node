import { fivetranApiSpec } from './fivetran_api_spec';
import { snakeToCamel } from './utils';
import { paths } from './fivetran_api_types'

const operations = (fetcher: any): { [key: string]: any } => {
    return Object.entries(fivetranApiSpec.paths || {}).reduce((acc, [path, methods]) => {
        const ops = Object.entries(methods).reduce((acc, [method, operation]) => {
            const opFetcher = fetcher.path(path as keyof paths).method(method as keyof paths[keyof paths]).create();
            const opName = snakeToCamel(operation.operationId);
            return {...acc, [opName]: opFetcher };
        }, {});
        return {...acc, ...ops};
    }, {});
}

export { operations };
