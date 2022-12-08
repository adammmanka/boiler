import Wei, { WeiSource, wei } from "@synthetixio/wei";
import axios from "codegen-graph-ts/build/src/lib/axios";
import generateGql from "codegen-graph-ts/build/src/lib/gql";
export type SingleQueryOptions = {
    id: string;
    block?: {
        "number": number;
    } | {
        hash: string;
    };
};
export type MultiQueryOptions<T, R> = {
    first?: number;
    where?: T;
    block?: {
        "number": number;
    } | {
        hash: string;
    };
    orderBy?: keyof R;
    orderDirection?: "asc" | "desc";
};
const MAX_PAGE = 1000;
export type BundleFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    ethPriceUSD?: WeiSource | null;
    ethPriceUSD_not?: WeiSource | null;
    ethPriceUSD_gt?: WeiSource | null;
    ethPriceUSD_lt?: WeiSource | null;
    ethPriceUSD_gte?: WeiSource | null;
    ethPriceUSD_lte?: WeiSource | null;
    ethPriceUSD_in?: WeiSource[];
    ethPriceUSD_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type BundleResult = {
    id: string;
    ethPriceUSD: Wei;
};
export type BundleFields = {
    id: true;
    ethPriceUSD: true;
};
export type BundleArgs<K extends keyof BundleResult> = {
    [Property in keyof Pick<BundleFields, K>]: BundleFields[Property];
};
export const getBundleById = async function <K extends keyof BundleResult>(url: string, options: SingleQueryOptions, args: BundleArgs<K>): Promise<Pick<BundleResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("bundle", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["ethPriceUSD"])
        formattedObj["ethPriceUSD"] = wei(obj["ethPriceUSD"]);
    return formattedObj as Pick<BundleResult, K>;
};
export const getBundles = async function <K extends keyof BundleResult>(url: string, options: MultiQueryOptions<BundleFilter, BundleResult>, args: BundleArgs<K>): Promise<Pick<BundleResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<BundleFilter, BundleResult>> = { ...options };
    let paginationKey: keyof BundleFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof BundleFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<BundleResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("bundles", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["ethPriceUSD"])
                formattedObj["ethPriceUSD"] = wei(obj["ethPriceUSD"]);
            return formattedObj as Pick<BundleResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type BurnFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    transaction?: string | null;
    transaction_not?: string | null;
    transaction_gt?: string | null;
    transaction_lt?: string | null;
    transaction_gte?: string | null;
    transaction_lte?: string | null;
    transaction_in?: string[];
    transaction_not_in?: string[];
    transaction_contains?: string | null;
    transaction_contains_nocase?: string | null;
    transaction_not_contains?: string | null;
    transaction_not_contains_nocase?: string | null;
    transaction_starts_with?: string | null;
    transaction_starts_with_nocase?: string | null;
    transaction_not_starts_with?: string | null;
    transaction_not_starts_with_nocase?: string | null;
    transaction_ends_with?: string | null;
    transaction_ends_with_nocase?: string | null;
    transaction_not_ends_with?: string | null;
    transaction_not_ends_with_nocase?: string | null;
    transaction_?: Transaction_filterFilter | null;
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    token0?: string | null;
    token0_not?: string | null;
    token0_gt?: string | null;
    token0_lt?: string | null;
    token0_gte?: string | null;
    token0_lte?: string | null;
    token0_in?: string[];
    token0_not_in?: string[];
    token0_contains?: string | null;
    token0_contains_nocase?: string | null;
    token0_not_contains?: string | null;
    token0_not_contains_nocase?: string | null;
    token0_starts_with?: string | null;
    token0_starts_with_nocase?: string | null;
    token0_not_starts_with?: string | null;
    token0_not_starts_with_nocase?: string | null;
    token0_ends_with?: string | null;
    token0_ends_with_nocase?: string | null;
    token0_not_ends_with?: string | null;
    token0_not_ends_with_nocase?: string | null;
    token0_?: Token_filterFilter | null;
    token1?: string | null;
    token1_not?: string | null;
    token1_gt?: string | null;
    token1_lt?: string | null;
    token1_gte?: string | null;
    token1_lte?: string | null;
    token1_in?: string[];
    token1_not_in?: string[];
    token1_contains?: string | null;
    token1_contains_nocase?: string | null;
    token1_not_contains?: string | null;
    token1_not_contains_nocase?: string | null;
    token1_starts_with?: string | null;
    token1_starts_with_nocase?: string | null;
    token1_not_starts_with?: string | null;
    token1_not_starts_with_nocase?: string | null;
    token1_ends_with?: string | null;
    token1_ends_with_nocase?: string | null;
    token1_not_ends_with?: string | null;
    token1_not_ends_with_nocase?: string | null;
    token1_?: Token_filterFilter | null;
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    owner?: string | null;
    owner_not?: string | null;
    owner_in?: string[];
    owner_not_in?: string[];
    owner_contains?: string | null;
    owner_not_contains?: string | null;
    origin?: string | null;
    origin_not?: string | null;
    origin_in?: string[];
    origin_not_in?: string[];
    origin_contains?: string | null;
    origin_not_contains?: string | null;
    amount?: WeiSource | null;
    amount_not?: WeiSource | null;
    amount_gt?: WeiSource | null;
    amount_lt?: WeiSource | null;
    amount_gte?: WeiSource | null;
    amount_lte?: WeiSource | null;
    amount_in?: WeiSource[];
    amount_not_in?: WeiSource[];
    amount0?: WeiSource | null;
    amount0_not?: WeiSource | null;
    amount0_gt?: WeiSource | null;
    amount0_lt?: WeiSource | null;
    amount0_gte?: WeiSource | null;
    amount0_lte?: WeiSource | null;
    amount0_in?: WeiSource[];
    amount0_not_in?: WeiSource[];
    amount1?: WeiSource | null;
    amount1_not?: WeiSource | null;
    amount1_gt?: WeiSource | null;
    amount1_lt?: WeiSource | null;
    amount1_gte?: WeiSource | null;
    amount1_lte?: WeiSource | null;
    amount1_in?: WeiSource[];
    amount1_not_in?: WeiSource[];
    amountUSD?: WeiSource | null;
    amountUSD_not?: WeiSource | null;
    amountUSD_gt?: WeiSource | null;
    amountUSD_lt?: WeiSource | null;
    amountUSD_gte?: WeiSource | null;
    amountUSD_lte?: WeiSource | null;
    amountUSD_in?: WeiSource[];
    amountUSD_not_in?: WeiSource[];
    tickLower?: WeiSource | null;
    tickLower_not?: WeiSource | null;
    tickLower_gt?: WeiSource | null;
    tickLower_lt?: WeiSource | null;
    tickLower_gte?: WeiSource | null;
    tickLower_lte?: WeiSource | null;
    tickLower_in?: WeiSource[];
    tickLower_not_in?: WeiSource[];
    tickUpper?: WeiSource | null;
    tickUpper_not?: WeiSource | null;
    tickUpper_gt?: WeiSource | null;
    tickUpper_lt?: WeiSource | null;
    tickUpper_gte?: WeiSource | null;
    tickUpper_lte?: WeiSource | null;
    tickUpper_in?: WeiSource[];
    tickUpper_not_in?: WeiSource[];
    logIndex?: WeiSource | null;
    logIndex_not?: WeiSource | null;
    logIndex_gt?: WeiSource | null;
    logIndex_lt?: WeiSource | null;
    logIndex_gte?: WeiSource | null;
    logIndex_lte?: WeiSource | null;
    logIndex_in?: WeiSource[];
    logIndex_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type BurnResult = {
    id: string;
    transaction: Partial<TransactionResult>;
    pool: Partial<PoolResult>;
    token0: Partial<TokenResult>;
    token1: Partial<TokenResult>;
    timestamp: Wei;
    owner: string | null;
    origin: string;
    amount: Wei;
    amount0: Wei;
    amount1: Wei;
    amountUSD: Wei | null;
    tickLower: Wei;
    tickUpper: Wei;
    logIndex: Wei | null;
};
export type BurnFields = {
    id: true;
    transaction: TransactionFields;
    pool: PoolFields;
    token0: TokenFields;
    token1: TokenFields;
    timestamp: true;
    owner: true;
    origin: true;
    amount: true;
    amount0: true;
    amount1: true;
    amountUSD: true;
    tickLower: true;
    tickUpper: true;
    logIndex: true;
};
export type BurnArgs<K extends keyof BurnResult> = {
    [Property in keyof Pick<BurnFields, K>]: BurnFields[Property];
};
export const getBurnById = async function <K extends keyof BurnResult>(url: string, options: SingleQueryOptions, args: BurnArgs<K>): Promise<Pick<BurnResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("burn", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["transaction"])
        formattedObj["transaction"] = obj["transaction"];
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["token0"])
        formattedObj["token0"] = obj["token0"];
    if (obj["token1"])
        formattedObj["token1"] = obj["token1"];
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    if (obj["owner"])
        formattedObj["owner"] = obj["owner"];
    if (obj["origin"])
        formattedObj["origin"] = obj["origin"];
    if (obj["amount"])
        formattedObj["amount"] = wei(obj["amount"], 0);
    if (obj["amount0"])
        formattedObj["amount0"] = wei(obj["amount0"]);
    if (obj["amount1"])
        formattedObj["amount1"] = wei(obj["amount1"]);
    if (obj["amountUSD"])
        formattedObj["amountUSD"] = wei(obj["amountUSD"]);
    if (obj["tickLower"])
        formattedObj["tickLower"] = wei(obj["tickLower"], 0);
    if (obj["tickUpper"])
        formattedObj["tickUpper"] = wei(obj["tickUpper"], 0);
    if (obj["logIndex"])
        formattedObj["logIndex"] = wei(obj["logIndex"], 0);
    return formattedObj as Pick<BurnResult, K>;
};
export const getBurns = async function <K extends keyof BurnResult>(url: string, options: MultiQueryOptions<BurnFilter, BurnResult>, args: BurnArgs<K>): Promise<Pick<BurnResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<BurnFilter, BurnResult>> = { ...options };
    let paginationKey: keyof BurnFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof BurnFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<BurnResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("burns", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["transaction"])
                formattedObj["transaction"] = obj["transaction"];
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["token0"])
                formattedObj["token0"] = obj["token0"];
            if (obj["token1"])
                formattedObj["token1"] = obj["token1"];
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            if (obj["owner"])
                formattedObj["owner"] = obj["owner"];
            if (obj["origin"])
                formattedObj["origin"] = obj["origin"];
            if (obj["amount"])
                formattedObj["amount"] = wei(obj["amount"], 0);
            if (obj["amount0"])
                formattedObj["amount0"] = wei(obj["amount0"]);
            if (obj["amount1"])
                formattedObj["amount1"] = wei(obj["amount1"]);
            if (obj["amountUSD"])
                formattedObj["amountUSD"] = wei(obj["amountUSD"]);
            if (obj["tickLower"])
                formattedObj["tickLower"] = wei(obj["tickLower"], 0);
            if (obj["tickUpper"])
                formattedObj["tickUpper"] = wei(obj["tickUpper"], 0);
            if (obj["logIndex"])
                formattedObj["logIndex"] = wei(obj["logIndex"], 0);
            return formattedObj as Pick<BurnResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type CollectFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    transaction?: string | null;
    transaction_not?: string | null;
    transaction_gt?: string | null;
    transaction_lt?: string | null;
    transaction_gte?: string | null;
    transaction_lte?: string | null;
    transaction_in?: string[];
    transaction_not_in?: string[];
    transaction_contains?: string | null;
    transaction_contains_nocase?: string | null;
    transaction_not_contains?: string | null;
    transaction_not_contains_nocase?: string | null;
    transaction_starts_with?: string | null;
    transaction_starts_with_nocase?: string | null;
    transaction_not_starts_with?: string | null;
    transaction_not_starts_with_nocase?: string | null;
    transaction_ends_with?: string | null;
    transaction_ends_with_nocase?: string | null;
    transaction_not_ends_with?: string | null;
    transaction_not_ends_with_nocase?: string | null;
    transaction_?: Transaction_filterFilter | null;
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    owner?: string | null;
    owner_not?: string | null;
    owner_in?: string[];
    owner_not_in?: string[];
    owner_contains?: string | null;
    owner_not_contains?: string | null;
    amount0?: WeiSource | null;
    amount0_not?: WeiSource | null;
    amount0_gt?: WeiSource | null;
    amount0_lt?: WeiSource | null;
    amount0_gte?: WeiSource | null;
    amount0_lte?: WeiSource | null;
    amount0_in?: WeiSource[];
    amount0_not_in?: WeiSource[];
    amount1?: WeiSource | null;
    amount1_not?: WeiSource | null;
    amount1_gt?: WeiSource | null;
    amount1_lt?: WeiSource | null;
    amount1_gte?: WeiSource | null;
    amount1_lte?: WeiSource | null;
    amount1_in?: WeiSource[];
    amount1_not_in?: WeiSource[];
    amountUSD?: WeiSource | null;
    amountUSD_not?: WeiSource | null;
    amountUSD_gt?: WeiSource | null;
    amountUSD_lt?: WeiSource | null;
    amountUSD_gte?: WeiSource | null;
    amountUSD_lte?: WeiSource | null;
    amountUSD_in?: WeiSource[];
    amountUSD_not_in?: WeiSource[];
    tickLower?: WeiSource | null;
    tickLower_not?: WeiSource | null;
    tickLower_gt?: WeiSource | null;
    tickLower_lt?: WeiSource | null;
    tickLower_gte?: WeiSource | null;
    tickLower_lte?: WeiSource | null;
    tickLower_in?: WeiSource[];
    tickLower_not_in?: WeiSource[];
    tickUpper?: WeiSource | null;
    tickUpper_not?: WeiSource | null;
    tickUpper_gt?: WeiSource | null;
    tickUpper_lt?: WeiSource | null;
    tickUpper_gte?: WeiSource | null;
    tickUpper_lte?: WeiSource | null;
    tickUpper_in?: WeiSource[];
    tickUpper_not_in?: WeiSource[];
    logIndex?: WeiSource | null;
    logIndex_not?: WeiSource | null;
    logIndex_gt?: WeiSource | null;
    logIndex_lt?: WeiSource | null;
    logIndex_gte?: WeiSource | null;
    logIndex_lte?: WeiSource | null;
    logIndex_in?: WeiSource[];
    logIndex_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type CollectResult = {
    id: string;
    transaction: Partial<TransactionResult>;
    timestamp: Wei;
    pool: Partial<PoolResult>;
    owner: string | null;
    amount0: Wei;
    amount1: Wei;
    amountUSD: Wei | null;
    tickLower: Wei;
    tickUpper: Wei;
    logIndex: Wei | null;
};
export type CollectFields = {
    id: true;
    transaction: TransactionFields;
    timestamp: true;
    pool: PoolFields;
    owner: true;
    amount0: true;
    amount1: true;
    amountUSD: true;
    tickLower: true;
    tickUpper: true;
    logIndex: true;
};
export type CollectArgs<K extends keyof CollectResult> = {
    [Property in keyof Pick<CollectFields, K>]: CollectFields[Property];
};
export const getCollectById = async function <K extends keyof CollectResult>(url: string, options: SingleQueryOptions, args: CollectArgs<K>): Promise<Pick<CollectResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("collect", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["transaction"])
        formattedObj["transaction"] = obj["transaction"];
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["owner"])
        formattedObj["owner"] = obj["owner"];
    if (obj["amount0"])
        formattedObj["amount0"] = wei(obj["amount0"]);
    if (obj["amount1"])
        formattedObj["amount1"] = wei(obj["amount1"]);
    if (obj["amountUSD"])
        formattedObj["amountUSD"] = wei(obj["amountUSD"]);
    if (obj["tickLower"])
        formattedObj["tickLower"] = wei(obj["tickLower"], 0);
    if (obj["tickUpper"])
        formattedObj["tickUpper"] = wei(obj["tickUpper"], 0);
    if (obj["logIndex"])
        formattedObj["logIndex"] = wei(obj["logIndex"], 0);
    return formattedObj as Pick<CollectResult, K>;
};
export const getCollects = async function <K extends keyof CollectResult>(url: string, options: MultiQueryOptions<CollectFilter, CollectResult>, args: CollectArgs<K>): Promise<Pick<CollectResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<CollectFilter, CollectResult>> = { ...options };
    let paginationKey: keyof CollectFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof CollectFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<CollectResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("collects", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["transaction"])
                formattedObj["transaction"] = obj["transaction"];
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["owner"])
                formattedObj["owner"] = obj["owner"];
            if (obj["amount0"])
                formattedObj["amount0"] = wei(obj["amount0"]);
            if (obj["amount1"])
                formattedObj["amount1"] = wei(obj["amount1"]);
            if (obj["amountUSD"])
                formattedObj["amountUSD"] = wei(obj["amountUSD"]);
            if (obj["tickLower"])
                formattedObj["tickLower"] = wei(obj["tickLower"], 0);
            if (obj["tickUpper"])
                formattedObj["tickUpper"] = wei(obj["tickUpper"], 0);
            if (obj["logIndex"])
                formattedObj["logIndex"] = wei(obj["logIndex"], 0);
            return formattedObj as Pick<CollectResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type FactoryFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    poolCount?: WeiSource | null;
    poolCount_not?: WeiSource | null;
    poolCount_gt?: WeiSource | null;
    poolCount_lt?: WeiSource | null;
    poolCount_gte?: WeiSource | null;
    poolCount_lte?: WeiSource | null;
    poolCount_in?: WeiSource[];
    poolCount_not_in?: WeiSource[];
    txCount?: WeiSource | null;
    txCount_not?: WeiSource | null;
    txCount_gt?: WeiSource | null;
    txCount_lt?: WeiSource | null;
    txCount_gte?: WeiSource | null;
    txCount_lte?: WeiSource | null;
    txCount_in?: WeiSource[];
    txCount_not_in?: WeiSource[];
    totalVolumeUSD?: WeiSource | null;
    totalVolumeUSD_not?: WeiSource | null;
    totalVolumeUSD_gt?: WeiSource | null;
    totalVolumeUSD_lt?: WeiSource | null;
    totalVolumeUSD_gte?: WeiSource | null;
    totalVolumeUSD_lte?: WeiSource | null;
    totalVolumeUSD_in?: WeiSource[];
    totalVolumeUSD_not_in?: WeiSource[];
    totalVolumeETH?: WeiSource | null;
    totalVolumeETH_not?: WeiSource | null;
    totalVolumeETH_gt?: WeiSource | null;
    totalVolumeETH_lt?: WeiSource | null;
    totalVolumeETH_gte?: WeiSource | null;
    totalVolumeETH_lte?: WeiSource | null;
    totalVolumeETH_in?: WeiSource[];
    totalVolumeETH_not_in?: WeiSource[];
    totalFeesUSD?: WeiSource | null;
    totalFeesUSD_not?: WeiSource | null;
    totalFeesUSD_gt?: WeiSource | null;
    totalFeesUSD_lt?: WeiSource | null;
    totalFeesUSD_gte?: WeiSource | null;
    totalFeesUSD_lte?: WeiSource | null;
    totalFeesUSD_in?: WeiSource[];
    totalFeesUSD_not_in?: WeiSource[];
    totalFeesETH?: WeiSource | null;
    totalFeesETH_not?: WeiSource | null;
    totalFeesETH_gt?: WeiSource | null;
    totalFeesETH_lt?: WeiSource | null;
    totalFeesETH_gte?: WeiSource | null;
    totalFeesETH_lte?: WeiSource | null;
    totalFeesETH_in?: WeiSource[];
    totalFeesETH_not_in?: WeiSource[];
    untrackedVolumeUSD?: WeiSource | null;
    untrackedVolumeUSD_not?: WeiSource | null;
    untrackedVolumeUSD_gt?: WeiSource | null;
    untrackedVolumeUSD_lt?: WeiSource | null;
    untrackedVolumeUSD_gte?: WeiSource | null;
    untrackedVolumeUSD_lte?: WeiSource | null;
    untrackedVolumeUSD_in?: WeiSource[];
    untrackedVolumeUSD_not_in?: WeiSource[];
    totalValueLockedUSD?: WeiSource | null;
    totalValueLockedUSD_not?: WeiSource | null;
    totalValueLockedUSD_gt?: WeiSource | null;
    totalValueLockedUSD_lt?: WeiSource | null;
    totalValueLockedUSD_gte?: WeiSource | null;
    totalValueLockedUSD_lte?: WeiSource | null;
    totalValueLockedUSD_in?: WeiSource[];
    totalValueLockedUSD_not_in?: WeiSource[];
    totalValueLockedETH?: WeiSource | null;
    totalValueLockedETH_not?: WeiSource | null;
    totalValueLockedETH_gt?: WeiSource | null;
    totalValueLockedETH_lt?: WeiSource | null;
    totalValueLockedETH_gte?: WeiSource | null;
    totalValueLockedETH_lte?: WeiSource | null;
    totalValueLockedETH_in?: WeiSource[];
    totalValueLockedETH_not_in?: WeiSource[];
    totalValueLockedUSDUntracked?: WeiSource | null;
    totalValueLockedUSDUntracked_not?: WeiSource | null;
    totalValueLockedUSDUntracked_gt?: WeiSource | null;
    totalValueLockedUSDUntracked_lt?: WeiSource | null;
    totalValueLockedUSDUntracked_gte?: WeiSource | null;
    totalValueLockedUSDUntracked_lte?: WeiSource | null;
    totalValueLockedUSDUntracked_in?: WeiSource[];
    totalValueLockedUSDUntracked_not_in?: WeiSource[];
    totalValueLockedETHUntracked?: WeiSource | null;
    totalValueLockedETHUntracked_not?: WeiSource | null;
    totalValueLockedETHUntracked_gt?: WeiSource | null;
    totalValueLockedETHUntracked_lt?: WeiSource | null;
    totalValueLockedETHUntracked_gte?: WeiSource | null;
    totalValueLockedETHUntracked_lte?: WeiSource | null;
    totalValueLockedETHUntracked_in?: WeiSource[];
    totalValueLockedETHUntracked_not_in?: WeiSource[];
    owner?: string | null;
    owner_not?: string | null;
    owner_gt?: string | null;
    owner_lt?: string | null;
    owner_gte?: string | null;
    owner_lte?: string | null;
    owner_in?: string[];
    owner_not_in?: string[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type FactoryResult = {
    id: string;
    poolCount: Wei;
    txCount: Wei;
    totalVolumeUSD: Wei;
    totalVolumeETH: Wei;
    totalFeesUSD: Wei;
    totalFeesETH: Wei;
    untrackedVolumeUSD: Wei;
    totalValueLockedUSD: Wei;
    totalValueLockedETH: Wei;
    totalValueLockedUSDUntracked: Wei;
    totalValueLockedETHUntracked: Wei;
    owner: string;
};
export type FactoryFields = {
    id: true;
    poolCount: true;
    txCount: true;
    totalVolumeUSD: true;
    totalVolumeETH: true;
    totalFeesUSD: true;
    totalFeesETH: true;
    untrackedVolumeUSD: true;
    totalValueLockedUSD: true;
    totalValueLockedETH: true;
    totalValueLockedUSDUntracked: true;
    totalValueLockedETHUntracked: true;
    owner: true;
};
export type FactoryArgs<K extends keyof FactoryResult> = {
    [Property in keyof Pick<FactoryFields, K>]: FactoryFields[Property];
};
export const getFactoryById = async function <K extends keyof FactoryResult>(url: string, options: SingleQueryOptions, args: FactoryArgs<K>): Promise<Pick<FactoryResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("factory", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["poolCount"])
        formattedObj["poolCount"] = wei(obj["poolCount"], 0);
    if (obj["txCount"])
        formattedObj["txCount"] = wei(obj["txCount"], 0);
    if (obj["totalVolumeUSD"])
        formattedObj["totalVolumeUSD"] = wei(obj["totalVolumeUSD"]);
    if (obj["totalVolumeETH"])
        formattedObj["totalVolumeETH"] = wei(obj["totalVolumeETH"]);
    if (obj["totalFeesUSD"])
        formattedObj["totalFeesUSD"] = wei(obj["totalFeesUSD"]);
    if (obj["totalFeesETH"])
        formattedObj["totalFeesETH"] = wei(obj["totalFeesETH"]);
    if (obj["untrackedVolumeUSD"])
        formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
    if (obj["totalValueLockedUSD"])
        formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
    if (obj["totalValueLockedETH"])
        formattedObj["totalValueLockedETH"] = wei(obj["totalValueLockedETH"]);
    if (obj["totalValueLockedUSDUntracked"])
        formattedObj["totalValueLockedUSDUntracked"] = wei(obj["totalValueLockedUSDUntracked"]);
    if (obj["totalValueLockedETHUntracked"])
        formattedObj["totalValueLockedETHUntracked"] = wei(obj["totalValueLockedETHUntracked"]);
    if (obj["owner"])
        formattedObj["owner"] = obj["owner"];
    return formattedObj as Pick<FactoryResult, K>;
};
export const getFactorys = async function <K extends keyof FactoryResult>(url: string, options: MultiQueryOptions<FactoryFilter, FactoryResult>, args: FactoryArgs<K>): Promise<Pick<FactoryResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<FactoryFilter, FactoryResult>> = { ...options };
    let paginationKey: keyof FactoryFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof FactoryFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<FactoryResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("factorys", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["poolCount"])
                formattedObj["poolCount"] = wei(obj["poolCount"], 0);
            if (obj["txCount"])
                formattedObj["txCount"] = wei(obj["txCount"], 0);
            if (obj["totalVolumeUSD"])
                formattedObj["totalVolumeUSD"] = wei(obj["totalVolumeUSD"]);
            if (obj["totalVolumeETH"])
                formattedObj["totalVolumeETH"] = wei(obj["totalVolumeETH"]);
            if (obj["totalFeesUSD"])
                formattedObj["totalFeesUSD"] = wei(obj["totalFeesUSD"]);
            if (obj["totalFeesETH"])
                formattedObj["totalFeesETH"] = wei(obj["totalFeesETH"]);
            if (obj["untrackedVolumeUSD"])
                formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
            if (obj["totalValueLockedUSD"])
                formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
            if (obj["totalValueLockedETH"])
                formattedObj["totalValueLockedETH"] = wei(obj["totalValueLockedETH"]);
            if (obj["totalValueLockedUSDUntracked"])
                formattedObj["totalValueLockedUSDUntracked"] = wei(obj["totalValueLockedUSDUntracked"]);
            if (obj["totalValueLockedETHUntracked"])
                formattedObj["totalValueLockedETHUntracked"] = wei(obj["totalValueLockedETHUntracked"]);
            if (obj["owner"])
                formattedObj["owner"] = obj["owner"];
            return formattedObj as Pick<FactoryResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type FlashFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    transaction?: string | null;
    transaction_not?: string | null;
    transaction_gt?: string | null;
    transaction_lt?: string | null;
    transaction_gte?: string | null;
    transaction_lte?: string | null;
    transaction_in?: string[];
    transaction_not_in?: string[];
    transaction_contains?: string | null;
    transaction_contains_nocase?: string | null;
    transaction_not_contains?: string | null;
    transaction_not_contains_nocase?: string | null;
    transaction_starts_with?: string | null;
    transaction_starts_with_nocase?: string | null;
    transaction_not_starts_with?: string | null;
    transaction_not_starts_with_nocase?: string | null;
    transaction_ends_with?: string | null;
    transaction_ends_with_nocase?: string | null;
    transaction_not_ends_with?: string | null;
    transaction_not_ends_with_nocase?: string | null;
    transaction_?: Transaction_filterFilter | null;
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    sender?: string | null;
    sender_not?: string | null;
    sender_in?: string[];
    sender_not_in?: string[];
    sender_contains?: string | null;
    sender_not_contains?: string | null;
    recipient?: string | null;
    recipient_not?: string | null;
    recipient_in?: string[];
    recipient_not_in?: string[];
    recipient_contains?: string | null;
    recipient_not_contains?: string | null;
    amount0?: WeiSource | null;
    amount0_not?: WeiSource | null;
    amount0_gt?: WeiSource | null;
    amount0_lt?: WeiSource | null;
    amount0_gte?: WeiSource | null;
    amount0_lte?: WeiSource | null;
    amount0_in?: WeiSource[];
    amount0_not_in?: WeiSource[];
    amount1?: WeiSource | null;
    amount1_not?: WeiSource | null;
    amount1_gt?: WeiSource | null;
    amount1_lt?: WeiSource | null;
    amount1_gte?: WeiSource | null;
    amount1_lte?: WeiSource | null;
    amount1_in?: WeiSource[];
    amount1_not_in?: WeiSource[];
    amountUSD?: WeiSource | null;
    amountUSD_not?: WeiSource | null;
    amountUSD_gt?: WeiSource | null;
    amountUSD_lt?: WeiSource | null;
    amountUSD_gte?: WeiSource | null;
    amountUSD_lte?: WeiSource | null;
    amountUSD_in?: WeiSource[];
    amountUSD_not_in?: WeiSource[];
    amount0Paid?: WeiSource | null;
    amount0Paid_not?: WeiSource | null;
    amount0Paid_gt?: WeiSource | null;
    amount0Paid_lt?: WeiSource | null;
    amount0Paid_gte?: WeiSource | null;
    amount0Paid_lte?: WeiSource | null;
    amount0Paid_in?: WeiSource[];
    amount0Paid_not_in?: WeiSource[];
    amount1Paid?: WeiSource | null;
    amount1Paid_not?: WeiSource | null;
    amount1Paid_gt?: WeiSource | null;
    amount1Paid_lt?: WeiSource | null;
    amount1Paid_gte?: WeiSource | null;
    amount1Paid_lte?: WeiSource | null;
    amount1Paid_in?: WeiSource[];
    amount1Paid_not_in?: WeiSource[];
    logIndex?: WeiSource | null;
    logIndex_not?: WeiSource | null;
    logIndex_gt?: WeiSource | null;
    logIndex_lt?: WeiSource | null;
    logIndex_gte?: WeiSource | null;
    logIndex_lte?: WeiSource | null;
    logIndex_in?: WeiSource[];
    logIndex_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type FlashResult = {
    id: string;
    transaction: Partial<TransactionResult>;
    timestamp: Wei;
    pool: Partial<PoolResult>;
    sender: string;
    recipient: string;
    amount0: Wei;
    amount1: Wei;
    amountUSD: Wei;
    amount0Paid: Wei;
    amount1Paid: Wei;
    logIndex: Wei | null;
};
export type FlashFields = {
    id: true;
    transaction: TransactionFields;
    timestamp: true;
    pool: PoolFields;
    sender: true;
    recipient: true;
    amount0: true;
    amount1: true;
    amountUSD: true;
    amount0Paid: true;
    amount1Paid: true;
    logIndex: true;
};
export type FlashArgs<K extends keyof FlashResult> = {
    [Property in keyof Pick<FlashFields, K>]: FlashFields[Property];
};
export const getFlashById = async function <K extends keyof FlashResult>(url: string, options: SingleQueryOptions, args: FlashArgs<K>): Promise<Pick<FlashResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("flash", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["transaction"])
        formattedObj["transaction"] = obj["transaction"];
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["sender"])
        formattedObj["sender"] = obj["sender"];
    if (obj["recipient"])
        formattedObj["recipient"] = obj["recipient"];
    if (obj["amount0"])
        formattedObj["amount0"] = wei(obj["amount0"]);
    if (obj["amount1"])
        formattedObj["amount1"] = wei(obj["amount1"]);
    if (obj["amountUSD"])
        formattedObj["amountUSD"] = wei(obj["amountUSD"]);
    if (obj["amount0Paid"])
        formattedObj["amount0Paid"] = wei(obj["amount0Paid"]);
    if (obj["amount1Paid"])
        formattedObj["amount1Paid"] = wei(obj["amount1Paid"]);
    if (obj["logIndex"])
        formattedObj["logIndex"] = wei(obj["logIndex"], 0);
    return formattedObj as Pick<FlashResult, K>;
};
export const getFlashs = async function <K extends keyof FlashResult>(url: string, options: MultiQueryOptions<FlashFilter, FlashResult>, args: FlashArgs<K>): Promise<Pick<FlashResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<FlashFilter, FlashResult>> = { ...options };
    let paginationKey: keyof FlashFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof FlashFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<FlashResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("flashs", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["transaction"])
                formattedObj["transaction"] = obj["transaction"];
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["sender"])
                formattedObj["sender"] = obj["sender"];
            if (obj["recipient"])
                formattedObj["recipient"] = obj["recipient"];
            if (obj["amount0"])
                formattedObj["amount0"] = wei(obj["amount0"]);
            if (obj["amount1"])
                formattedObj["amount1"] = wei(obj["amount1"]);
            if (obj["amountUSD"])
                formattedObj["amountUSD"] = wei(obj["amountUSD"]);
            if (obj["amount0Paid"])
                formattedObj["amount0Paid"] = wei(obj["amount0Paid"]);
            if (obj["amount1Paid"])
                formattedObj["amount1Paid"] = wei(obj["amount1Paid"]);
            if (obj["logIndex"])
                formattedObj["logIndex"] = wei(obj["logIndex"], 0);
            return formattedObj as Pick<FlashResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type MintFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    transaction?: string | null;
    transaction_not?: string | null;
    transaction_gt?: string | null;
    transaction_lt?: string | null;
    transaction_gte?: string | null;
    transaction_lte?: string | null;
    transaction_in?: string[];
    transaction_not_in?: string[];
    transaction_contains?: string | null;
    transaction_contains_nocase?: string | null;
    transaction_not_contains?: string | null;
    transaction_not_contains_nocase?: string | null;
    transaction_starts_with?: string | null;
    transaction_starts_with_nocase?: string | null;
    transaction_not_starts_with?: string | null;
    transaction_not_starts_with_nocase?: string | null;
    transaction_ends_with?: string | null;
    transaction_ends_with_nocase?: string | null;
    transaction_not_ends_with?: string | null;
    transaction_not_ends_with_nocase?: string | null;
    transaction_?: Transaction_filterFilter | null;
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    token0?: string | null;
    token0_not?: string | null;
    token0_gt?: string | null;
    token0_lt?: string | null;
    token0_gte?: string | null;
    token0_lte?: string | null;
    token0_in?: string[];
    token0_not_in?: string[];
    token0_contains?: string | null;
    token0_contains_nocase?: string | null;
    token0_not_contains?: string | null;
    token0_not_contains_nocase?: string | null;
    token0_starts_with?: string | null;
    token0_starts_with_nocase?: string | null;
    token0_not_starts_with?: string | null;
    token0_not_starts_with_nocase?: string | null;
    token0_ends_with?: string | null;
    token0_ends_with_nocase?: string | null;
    token0_not_ends_with?: string | null;
    token0_not_ends_with_nocase?: string | null;
    token0_?: Token_filterFilter | null;
    token1?: string | null;
    token1_not?: string | null;
    token1_gt?: string | null;
    token1_lt?: string | null;
    token1_gte?: string | null;
    token1_lte?: string | null;
    token1_in?: string[];
    token1_not_in?: string[];
    token1_contains?: string | null;
    token1_contains_nocase?: string | null;
    token1_not_contains?: string | null;
    token1_not_contains_nocase?: string | null;
    token1_starts_with?: string | null;
    token1_starts_with_nocase?: string | null;
    token1_not_starts_with?: string | null;
    token1_not_starts_with_nocase?: string | null;
    token1_ends_with?: string | null;
    token1_ends_with_nocase?: string | null;
    token1_not_ends_with?: string | null;
    token1_not_ends_with_nocase?: string | null;
    token1_?: Token_filterFilter | null;
    owner?: string | null;
    owner_not?: string | null;
    owner_in?: string[];
    owner_not_in?: string[];
    owner_contains?: string | null;
    owner_not_contains?: string | null;
    sender?: string | null;
    sender_not?: string | null;
    sender_in?: string[];
    sender_not_in?: string[];
    sender_contains?: string | null;
    sender_not_contains?: string | null;
    origin?: string | null;
    origin_not?: string | null;
    origin_in?: string[];
    origin_not_in?: string[];
    origin_contains?: string | null;
    origin_not_contains?: string | null;
    amount?: WeiSource | null;
    amount_not?: WeiSource | null;
    amount_gt?: WeiSource | null;
    amount_lt?: WeiSource | null;
    amount_gte?: WeiSource | null;
    amount_lte?: WeiSource | null;
    amount_in?: WeiSource[];
    amount_not_in?: WeiSource[];
    amount0?: WeiSource | null;
    amount0_not?: WeiSource | null;
    amount0_gt?: WeiSource | null;
    amount0_lt?: WeiSource | null;
    amount0_gte?: WeiSource | null;
    amount0_lte?: WeiSource | null;
    amount0_in?: WeiSource[];
    amount0_not_in?: WeiSource[];
    amount1?: WeiSource | null;
    amount1_not?: WeiSource | null;
    amount1_gt?: WeiSource | null;
    amount1_lt?: WeiSource | null;
    amount1_gte?: WeiSource | null;
    amount1_lte?: WeiSource | null;
    amount1_in?: WeiSource[];
    amount1_not_in?: WeiSource[];
    amountUSD?: WeiSource | null;
    amountUSD_not?: WeiSource | null;
    amountUSD_gt?: WeiSource | null;
    amountUSD_lt?: WeiSource | null;
    amountUSD_gte?: WeiSource | null;
    amountUSD_lte?: WeiSource | null;
    amountUSD_in?: WeiSource[];
    amountUSD_not_in?: WeiSource[];
    tickLower?: WeiSource | null;
    tickLower_not?: WeiSource | null;
    tickLower_gt?: WeiSource | null;
    tickLower_lt?: WeiSource | null;
    tickLower_gte?: WeiSource | null;
    tickLower_lte?: WeiSource | null;
    tickLower_in?: WeiSource[];
    tickLower_not_in?: WeiSource[];
    tickUpper?: WeiSource | null;
    tickUpper_not?: WeiSource | null;
    tickUpper_gt?: WeiSource | null;
    tickUpper_lt?: WeiSource | null;
    tickUpper_gte?: WeiSource | null;
    tickUpper_lte?: WeiSource | null;
    tickUpper_in?: WeiSource[];
    tickUpper_not_in?: WeiSource[];
    logIndex?: WeiSource | null;
    logIndex_not?: WeiSource | null;
    logIndex_gt?: WeiSource | null;
    logIndex_lt?: WeiSource | null;
    logIndex_gte?: WeiSource | null;
    logIndex_lte?: WeiSource | null;
    logIndex_in?: WeiSource[];
    logIndex_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type MintResult = {
    id: string;
    transaction: Partial<TransactionResult>;
    timestamp: Wei;
    pool: Partial<PoolResult>;
    token0: Partial<TokenResult>;
    token1: Partial<TokenResult>;
    owner: string;
    sender: string | null;
    origin: string;
    amount: Wei;
    amount0: Wei;
    amount1: Wei;
    amountUSD: Wei | null;
    tickLower: Wei;
    tickUpper: Wei;
    logIndex: Wei | null;
};
export type MintFields = {
    id: true;
    transaction: TransactionFields;
    timestamp: true;
    pool: PoolFields;
    token0: TokenFields;
    token1: TokenFields;
    owner: true;
    sender: true;
    origin: true;
    amount: true;
    amount0: true;
    amount1: true;
    amountUSD: true;
    tickLower: true;
    tickUpper: true;
    logIndex: true;
};
export type MintArgs<K extends keyof MintResult> = {
    [Property in keyof Pick<MintFields, K>]: MintFields[Property];
};
export const getMintById = async function <K extends keyof MintResult>(url: string, options: SingleQueryOptions, args: MintArgs<K>): Promise<Pick<MintResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("mint", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["transaction"])
        formattedObj["transaction"] = obj["transaction"];
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["token0"])
        formattedObj["token0"] = obj["token0"];
    if (obj["token1"])
        formattedObj["token1"] = obj["token1"];
    if (obj["owner"])
        formattedObj["owner"] = obj["owner"];
    if (obj["sender"])
        formattedObj["sender"] = obj["sender"];
    if (obj["origin"])
        formattedObj["origin"] = obj["origin"];
    if (obj["amount"])
        formattedObj["amount"] = wei(obj["amount"], 0);
    if (obj["amount0"])
        formattedObj["amount0"] = wei(obj["amount0"]);
    if (obj["amount1"])
        formattedObj["amount1"] = wei(obj["amount1"]);
    if (obj["amountUSD"])
        formattedObj["amountUSD"] = wei(obj["amountUSD"]);
    if (obj["tickLower"])
        formattedObj["tickLower"] = wei(obj["tickLower"], 0);
    if (obj["tickUpper"])
        formattedObj["tickUpper"] = wei(obj["tickUpper"], 0);
    if (obj["logIndex"])
        formattedObj["logIndex"] = wei(obj["logIndex"], 0);
    return formattedObj as Pick<MintResult, K>;
};
export const getMints = async function <K extends keyof MintResult>(url: string, options: MultiQueryOptions<MintFilter, MintResult>, args: MintArgs<K>): Promise<Pick<MintResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<MintFilter, MintResult>> = { ...options };
    let paginationKey: keyof MintFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof MintFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<MintResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("mints", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["transaction"])
                formattedObj["transaction"] = obj["transaction"];
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["token0"])
                formattedObj["token0"] = obj["token0"];
            if (obj["token1"])
                formattedObj["token1"] = obj["token1"];
            if (obj["owner"])
                formattedObj["owner"] = obj["owner"];
            if (obj["sender"])
                formattedObj["sender"] = obj["sender"];
            if (obj["origin"])
                formattedObj["origin"] = obj["origin"];
            if (obj["amount"])
                formattedObj["amount"] = wei(obj["amount"], 0);
            if (obj["amount0"])
                formattedObj["amount0"] = wei(obj["amount0"]);
            if (obj["amount1"])
                formattedObj["amount1"] = wei(obj["amount1"]);
            if (obj["amountUSD"])
                formattedObj["amountUSD"] = wei(obj["amountUSD"]);
            if (obj["tickLower"])
                formattedObj["tickLower"] = wei(obj["tickLower"], 0);
            if (obj["tickUpper"])
                formattedObj["tickUpper"] = wei(obj["tickUpper"], 0);
            if (obj["logIndex"])
                formattedObj["logIndex"] = wei(obj["logIndex"], 0);
            return formattedObj as Pick<MintResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type PoolFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    createdAtTimestamp?: WeiSource | null;
    createdAtTimestamp_not?: WeiSource | null;
    createdAtTimestamp_gt?: WeiSource | null;
    createdAtTimestamp_lt?: WeiSource | null;
    createdAtTimestamp_gte?: WeiSource | null;
    createdAtTimestamp_lte?: WeiSource | null;
    createdAtTimestamp_in?: WeiSource[];
    createdAtTimestamp_not_in?: WeiSource[];
    createdAtBlockNumber?: WeiSource | null;
    createdAtBlockNumber_not?: WeiSource | null;
    createdAtBlockNumber_gt?: WeiSource | null;
    createdAtBlockNumber_lt?: WeiSource | null;
    createdAtBlockNumber_gte?: WeiSource | null;
    createdAtBlockNumber_lte?: WeiSource | null;
    createdAtBlockNumber_in?: WeiSource[];
    createdAtBlockNumber_not_in?: WeiSource[];
    token0?: string | null;
    token0_not?: string | null;
    token0_gt?: string | null;
    token0_lt?: string | null;
    token0_gte?: string | null;
    token0_lte?: string | null;
    token0_in?: string[];
    token0_not_in?: string[];
    token0_contains?: string | null;
    token0_contains_nocase?: string | null;
    token0_not_contains?: string | null;
    token0_not_contains_nocase?: string | null;
    token0_starts_with?: string | null;
    token0_starts_with_nocase?: string | null;
    token0_not_starts_with?: string | null;
    token0_not_starts_with_nocase?: string | null;
    token0_ends_with?: string | null;
    token0_ends_with_nocase?: string | null;
    token0_not_ends_with?: string | null;
    token0_not_ends_with_nocase?: string | null;
    token0_?: Token_filterFilter | null;
    token1?: string | null;
    token1_not?: string | null;
    token1_gt?: string | null;
    token1_lt?: string | null;
    token1_gte?: string | null;
    token1_lte?: string | null;
    token1_in?: string[];
    token1_not_in?: string[];
    token1_contains?: string | null;
    token1_contains_nocase?: string | null;
    token1_not_contains?: string | null;
    token1_not_contains_nocase?: string | null;
    token1_starts_with?: string | null;
    token1_starts_with_nocase?: string | null;
    token1_not_starts_with?: string | null;
    token1_not_starts_with_nocase?: string | null;
    token1_ends_with?: string | null;
    token1_ends_with_nocase?: string | null;
    token1_not_ends_with?: string | null;
    token1_not_ends_with_nocase?: string | null;
    token1_?: Token_filterFilter | null;
    feeTier?: WeiSource | null;
    feeTier_not?: WeiSource | null;
    feeTier_gt?: WeiSource | null;
    feeTier_lt?: WeiSource | null;
    feeTier_gte?: WeiSource | null;
    feeTier_lte?: WeiSource | null;
    feeTier_in?: WeiSource[];
    feeTier_not_in?: WeiSource[];
    liquidity?: WeiSource | null;
    liquidity_not?: WeiSource | null;
    liquidity_gt?: WeiSource | null;
    liquidity_lt?: WeiSource | null;
    liquidity_gte?: WeiSource | null;
    liquidity_lte?: WeiSource | null;
    liquidity_in?: WeiSource[];
    liquidity_not_in?: WeiSource[];
    sqrtPrice?: WeiSource | null;
    sqrtPrice_not?: WeiSource | null;
    sqrtPrice_gt?: WeiSource | null;
    sqrtPrice_lt?: WeiSource | null;
    sqrtPrice_gte?: WeiSource | null;
    sqrtPrice_lte?: WeiSource | null;
    sqrtPrice_in?: WeiSource[];
    sqrtPrice_not_in?: WeiSource[];
    feeGrowthGlobal0X128?: WeiSource | null;
    feeGrowthGlobal0X128_not?: WeiSource | null;
    feeGrowthGlobal0X128_gt?: WeiSource | null;
    feeGrowthGlobal0X128_lt?: WeiSource | null;
    feeGrowthGlobal0X128_gte?: WeiSource | null;
    feeGrowthGlobal0X128_lte?: WeiSource | null;
    feeGrowthGlobal0X128_in?: WeiSource[];
    feeGrowthGlobal0X128_not_in?: WeiSource[];
    feeGrowthGlobal1X128?: WeiSource | null;
    feeGrowthGlobal1X128_not?: WeiSource | null;
    feeGrowthGlobal1X128_gt?: WeiSource | null;
    feeGrowthGlobal1X128_lt?: WeiSource | null;
    feeGrowthGlobal1X128_gte?: WeiSource | null;
    feeGrowthGlobal1X128_lte?: WeiSource | null;
    feeGrowthGlobal1X128_in?: WeiSource[];
    feeGrowthGlobal1X128_not_in?: WeiSource[];
    token0Price?: WeiSource | null;
    token0Price_not?: WeiSource | null;
    token0Price_gt?: WeiSource | null;
    token0Price_lt?: WeiSource | null;
    token0Price_gte?: WeiSource | null;
    token0Price_lte?: WeiSource | null;
    token0Price_in?: WeiSource[];
    token0Price_not_in?: WeiSource[];
    token1Price?: WeiSource | null;
    token1Price_not?: WeiSource | null;
    token1Price_gt?: WeiSource | null;
    token1Price_lt?: WeiSource | null;
    token1Price_gte?: WeiSource | null;
    token1Price_lte?: WeiSource | null;
    token1Price_in?: WeiSource[];
    token1Price_not_in?: WeiSource[];
    tick?: WeiSource | null;
    tick_not?: WeiSource | null;
    tick_gt?: WeiSource | null;
    tick_lt?: WeiSource | null;
    tick_gte?: WeiSource | null;
    tick_lte?: WeiSource | null;
    tick_in?: WeiSource[];
    tick_not_in?: WeiSource[];
    observationIndex?: WeiSource | null;
    observationIndex_not?: WeiSource | null;
    observationIndex_gt?: WeiSource | null;
    observationIndex_lt?: WeiSource | null;
    observationIndex_gte?: WeiSource | null;
    observationIndex_lte?: WeiSource | null;
    observationIndex_in?: WeiSource[];
    observationIndex_not_in?: WeiSource[];
    volumeToken0?: WeiSource | null;
    volumeToken0_not?: WeiSource | null;
    volumeToken0_gt?: WeiSource | null;
    volumeToken0_lt?: WeiSource | null;
    volumeToken0_gte?: WeiSource | null;
    volumeToken0_lte?: WeiSource | null;
    volumeToken0_in?: WeiSource[];
    volumeToken0_not_in?: WeiSource[];
    volumeToken1?: WeiSource | null;
    volumeToken1_not?: WeiSource | null;
    volumeToken1_gt?: WeiSource | null;
    volumeToken1_lt?: WeiSource | null;
    volumeToken1_gte?: WeiSource | null;
    volumeToken1_lte?: WeiSource | null;
    volumeToken1_in?: WeiSource[];
    volumeToken1_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    untrackedVolumeUSD?: WeiSource | null;
    untrackedVolumeUSD_not?: WeiSource | null;
    untrackedVolumeUSD_gt?: WeiSource | null;
    untrackedVolumeUSD_lt?: WeiSource | null;
    untrackedVolumeUSD_gte?: WeiSource | null;
    untrackedVolumeUSD_lte?: WeiSource | null;
    untrackedVolumeUSD_in?: WeiSource[];
    untrackedVolumeUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    txCount?: WeiSource | null;
    txCount_not?: WeiSource | null;
    txCount_gt?: WeiSource | null;
    txCount_lt?: WeiSource | null;
    txCount_gte?: WeiSource | null;
    txCount_lte?: WeiSource | null;
    txCount_in?: WeiSource[];
    txCount_not_in?: WeiSource[];
    collectedFeesToken0?: WeiSource | null;
    collectedFeesToken0_not?: WeiSource | null;
    collectedFeesToken0_gt?: WeiSource | null;
    collectedFeesToken0_lt?: WeiSource | null;
    collectedFeesToken0_gte?: WeiSource | null;
    collectedFeesToken0_lte?: WeiSource | null;
    collectedFeesToken0_in?: WeiSource[];
    collectedFeesToken0_not_in?: WeiSource[];
    collectedFeesToken1?: WeiSource | null;
    collectedFeesToken1_not?: WeiSource | null;
    collectedFeesToken1_gt?: WeiSource | null;
    collectedFeesToken1_lt?: WeiSource | null;
    collectedFeesToken1_gte?: WeiSource | null;
    collectedFeesToken1_lte?: WeiSource | null;
    collectedFeesToken1_in?: WeiSource[];
    collectedFeesToken1_not_in?: WeiSource[];
    collectedFeesUSD?: WeiSource | null;
    collectedFeesUSD_not?: WeiSource | null;
    collectedFeesUSD_gt?: WeiSource | null;
    collectedFeesUSD_lt?: WeiSource | null;
    collectedFeesUSD_gte?: WeiSource | null;
    collectedFeesUSD_lte?: WeiSource | null;
    collectedFeesUSD_in?: WeiSource[];
    collectedFeesUSD_not_in?: WeiSource[];
    totalValueLockedToken0?: WeiSource | null;
    totalValueLockedToken0_not?: WeiSource | null;
    totalValueLockedToken0_gt?: WeiSource | null;
    totalValueLockedToken0_lt?: WeiSource | null;
    totalValueLockedToken0_gte?: WeiSource | null;
    totalValueLockedToken0_lte?: WeiSource | null;
    totalValueLockedToken0_in?: WeiSource[];
    totalValueLockedToken0_not_in?: WeiSource[];
    totalValueLockedToken1?: WeiSource | null;
    totalValueLockedToken1_not?: WeiSource | null;
    totalValueLockedToken1_gt?: WeiSource | null;
    totalValueLockedToken1_lt?: WeiSource | null;
    totalValueLockedToken1_gte?: WeiSource | null;
    totalValueLockedToken1_lte?: WeiSource | null;
    totalValueLockedToken1_in?: WeiSource[];
    totalValueLockedToken1_not_in?: WeiSource[];
    totalValueLockedETH?: WeiSource | null;
    totalValueLockedETH_not?: WeiSource | null;
    totalValueLockedETH_gt?: WeiSource | null;
    totalValueLockedETH_lt?: WeiSource | null;
    totalValueLockedETH_gte?: WeiSource | null;
    totalValueLockedETH_lte?: WeiSource | null;
    totalValueLockedETH_in?: WeiSource[];
    totalValueLockedETH_not_in?: WeiSource[];
    totalValueLockedUSD?: WeiSource | null;
    totalValueLockedUSD_not?: WeiSource | null;
    totalValueLockedUSD_gt?: WeiSource | null;
    totalValueLockedUSD_lt?: WeiSource | null;
    totalValueLockedUSD_gte?: WeiSource | null;
    totalValueLockedUSD_lte?: WeiSource | null;
    totalValueLockedUSD_in?: WeiSource[];
    totalValueLockedUSD_not_in?: WeiSource[];
    totalValueLockedUSDUntracked?: WeiSource | null;
    totalValueLockedUSDUntracked_not?: WeiSource | null;
    totalValueLockedUSDUntracked_gt?: WeiSource | null;
    totalValueLockedUSDUntracked_lt?: WeiSource | null;
    totalValueLockedUSDUntracked_gte?: WeiSource | null;
    totalValueLockedUSDUntracked_lte?: WeiSource | null;
    totalValueLockedUSDUntracked_in?: WeiSource[];
    totalValueLockedUSDUntracked_not_in?: WeiSource[];
    liquidityProviderCount?: WeiSource | null;
    liquidityProviderCount_not?: WeiSource | null;
    liquidityProviderCount_gt?: WeiSource | null;
    liquidityProviderCount_lt?: WeiSource | null;
    liquidityProviderCount_gte?: WeiSource | null;
    liquidityProviderCount_lte?: WeiSource | null;
    liquidityProviderCount_in?: WeiSource[];
    liquidityProviderCount_not_in?: WeiSource[];
    poolHourData_?: PoolHourData_filterFilter | null;
    poolDayData_?: PoolDayData_filterFilter | null;
    mints_?: Mint_filterFilter | null;
    burns_?: Burn_filterFilter | null;
    swaps_?: Swap_filterFilter | null;
    collects_?: Collect_filterFilter | null;
    ticks_?: Tick_filterFilter | null;
    _change_block?: BlockChangedFilterFilter | null;
};
export type PoolResult = {
    id: string;
    createdAtTimestamp: Wei;
    createdAtBlockNumber: Wei;
    token0: Partial<TokenResult>;
    token1: Partial<TokenResult>;
    feeTier: Wei;
    liquidity: Wei;
    sqrtPrice: Wei;
    feeGrowthGlobal0X128: Wei;
    feeGrowthGlobal1X128: Wei;
    token0Price: Wei;
    token1Price: Wei;
    tick: Wei | null;
    observationIndex: Wei;
    volumeToken0: Wei;
    volumeToken1: Wei;
    volumeUSD: Wei;
    untrackedVolumeUSD: Wei;
    feesUSD: Wei;
    txCount: Wei;
    collectedFeesToken0: Wei;
    collectedFeesToken1: Wei;
    collectedFeesUSD: Wei;
    totalValueLockedToken0: Wei;
    totalValueLockedToken1: Wei;
    totalValueLockedETH: Wei;
    totalValueLockedUSD: Wei;
    totalValueLockedUSDUntracked: Wei;
    liquidityProviderCount: Wei;
    poolHourData: Partial<PoolHourDataResult>[];
    poolDayData: Partial<PoolDayDataResult>[];
    mints: Partial<MintResult>[];
    burns: Partial<BurnResult>[];
    swaps: Partial<SwapResult>[];
    collects: Partial<CollectResult>[];
    ticks: Partial<TickResult>[];
};
export type PoolFields = {
    id: true;
    createdAtTimestamp: true;
    createdAtBlockNumber: true;
    token0: TokenFields;
    token1: TokenFields;
    feeTier: true;
    liquidity: true;
    sqrtPrice: true;
    feeGrowthGlobal0X128: true;
    feeGrowthGlobal1X128: true;
    token0Price: true;
    token1Price: true;
    tick: true;
    observationIndex: true;
    volumeToken0: true;
    volumeToken1: true;
    volumeUSD: true;
    untrackedVolumeUSD: true;
    feesUSD: true;
    txCount: true;
    collectedFeesToken0: true;
    collectedFeesToken1: true;
    collectedFeesUSD: true;
    totalValueLockedToken0: true;
    totalValueLockedToken1: true;
    totalValueLockedETH: true;
    totalValueLockedUSD: true;
    totalValueLockedUSDUntracked: true;
    liquidityProviderCount: true;
    poolHourData: PoolHourDataFields;
    poolDayData: PoolDayDataFields;
    mints: MintFields;
    burns: BurnFields;
    swaps: SwapFields;
    collects: CollectFields;
    ticks: TickFields;
};
export type PoolArgs<K extends keyof PoolResult> = {
    [Property in keyof Pick<PoolFields, K>]: PoolFields[Property];
};
export const getPoolById = async function <K extends keyof PoolResult>(url: string, options: SingleQueryOptions, args: PoolArgs<K>): Promise<Pick<PoolResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("pool", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["createdAtTimestamp"])
        formattedObj["createdAtTimestamp"] = wei(obj["createdAtTimestamp"], 0);
    if (obj["createdAtBlockNumber"])
        formattedObj["createdAtBlockNumber"] = wei(obj["createdAtBlockNumber"], 0);
    if (obj["token0"])
        formattedObj["token0"] = obj["token0"];
    if (obj["token1"])
        formattedObj["token1"] = obj["token1"];
    if (obj["feeTier"])
        formattedObj["feeTier"] = wei(obj["feeTier"], 0);
    if (obj["liquidity"])
        formattedObj["liquidity"] = wei(obj["liquidity"], 0);
    if (obj["sqrtPrice"])
        formattedObj["sqrtPrice"] = wei(obj["sqrtPrice"], 0);
    if (obj["feeGrowthGlobal0X128"])
        formattedObj["feeGrowthGlobal0X128"] = wei(obj["feeGrowthGlobal0X128"], 0);
    if (obj["feeGrowthGlobal1X128"])
        formattedObj["feeGrowthGlobal1X128"] = wei(obj["feeGrowthGlobal1X128"], 0);
    if (obj["token0Price"])
        formattedObj["token0Price"] = wei(obj["token0Price"]);
    if (obj["token1Price"])
        formattedObj["token1Price"] = wei(obj["token1Price"]);
    if (obj["tick"])
        formattedObj["tick"] = wei(obj["tick"], 0);
    if (obj["observationIndex"])
        formattedObj["observationIndex"] = wei(obj["observationIndex"], 0);
    if (obj["volumeToken0"])
        formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
    if (obj["volumeToken1"])
        formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["untrackedVolumeUSD"])
        formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["txCount"])
        formattedObj["txCount"] = wei(obj["txCount"], 0);
    if (obj["collectedFeesToken0"])
        formattedObj["collectedFeesToken0"] = wei(obj["collectedFeesToken0"]);
    if (obj["collectedFeesToken1"])
        formattedObj["collectedFeesToken1"] = wei(obj["collectedFeesToken1"]);
    if (obj["collectedFeesUSD"])
        formattedObj["collectedFeesUSD"] = wei(obj["collectedFeesUSD"]);
    if (obj["totalValueLockedToken0"])
        formattedObj["totalValueLockedToken0"] = wei(obj["totalValueLockedToken0"]);
    if (obj["totalValueLockedToken1"])
        formattedObj["totalValueLockedToken1"] = wei(obj["totalValueLockedToken1"]);
    if (obj["totalValueLockedETH"])
        formattedObj["totalValueLockedETH"] = wei(obj["totalValueLockedETH"]);
    if (obj["totalValueLockedUSD"])
        formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
    if (obj["totalValueLockedUSDUntracked"])
        formattedObj["totalValueLockedUSDUntracked"] = wei(obj["totalValueLockedUSDUntracked"]);
    if (obj["liquidityProviderCount"])
        formattedObj["liquidityProviderCount"] = wei(obj["liquidityProviderCount"], 0);
    if (obj["poolHourData"])
        formattedObj["poolHourData"] = obj["poolHourData"];
    if (obj["poolDayData"])
        formattedObj["poolDayData"] = obj["poolDayData"];
    if (obj["mints"])
        formattedObj["mints"] = obj["mints"];
    if (obj["burns"])
        formattedObj["burns"] = obj["burns"];
    if (obj["swaps"])
        formattedObj["swaps"] = obj["swaps"];
    if (obj["collects"])
        formattedObj["collects"] = obj["collects"];
    if (obj["ticks"])
        formattedObj["ticks"] = obj["ticks"];
    return formattedObj as Pick<PoolResult, K>;
};
export const getPools = async function <K extends keyof PoolResult>(url: string, options: MultiQueryOptions<PoolFilter, PoolResult>, args: PoolArgs<K>): Promise<Pick<PoolResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<PoolFilter, PoolResult>> = { ...options };
    let paginationKey: keyof PoolFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof PoolFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<PoolResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("pools", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["createdAtTimestamp"])
                formattedObj["createdAtTimestamp"] = wei(obj["createdAtTimestamp"], 0);
            if (obj["createdAtBlockNumber"])
                formattedObj["createdAtBlockNumber"] = wei(obj["createdAtBlockNumber"], 0);
            if (obj["token0"])
                formattedObj["token0"] = obj["token0"];
            if (obj["token1"])
                formattedObj["token1"] = obj["token1"];
            if (obj["feeTier"])
                formattedObj["feeTier"] = wei(obj["feeTier"], 0);
            if (obj["liquidity"])
                formattedObj["liquidity"] = wei(obj["liquidity"], 0);
            if (obj["sqrtPrice"])
                formattedObj["sqrtPrice"] = wei(obj["sqrtPrice"], 0);
            if (obj["feeGrowthGlobal0X128"])
                formattedObj["feeGrowthGlobal0X128"] = wei(obj["feeGrowthGlobal0X128"], 0);
            if (obj["feeGrowthGlobal1X128"])
                formattedObj["feeGrowthGlobal1X128"] = wei(obj["feeGrowthGlobal1X128"], 0);
            if (obj["token0Price"])
                formattedObj["token0Price"] = wei(obj["token0Price"]);
            if (obj["token1Price"])
                formattedObj["token1Price"] = wei(obj["token1Price"]);
            if (obj["tick"])
                formattedObj["tick"] = wei(obj["tick"], 0);
            if (obj["observationIndex"])
                formattedObj["observationIndex"] = wei(obj["observationIndex"], 0);
            if (obj["volumeToken0"])
                formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
            if (obj["volumeToken1"])
                formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["untrackedVolumeUSD"])
                formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["txCount"])
                formattedObj["txCount"] = wei(obj["txCount"], 0);
            if (obj["collectedFeesToken0"])
                formattedObj["collectedFeesToken0"] = wei(obj["collectedFeesToken0"]);
            if (obj["collectedFeesToken1"])
                formattedObj["collectedFeesToken1"] = wei(obj["collectedFeesToken1"]);
            if (obj["collectedFeesUSD"])
                formattedObj["collectedFeesUSD"] = wei(obj["collectedFeesUSD"]);
            if (obj["totalValueLockedToken0"])
                formattedObj["totalValueLockedToken0"] = wei(obj["totalValueLockedToken0"]);
            if (obj["totalValueLockedToken1"])
                formattedObj["totalValueLockedToken1"] = wei(obj["totalValueLockedToken1"]);
            if (obj["totalValueLockedETH"])
                formattedObj["totalValueLockedETH"] = wei(obj["totalValueLockedETH"]);
            if (obj["totalValueLockedUSD"])
                formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
            if (obj["totalValueLockedUSDUntracked"])
                formattedObj["totalValueLockedUSDUntracked"] = wei(obj["totalValueLockedUSDUntracked"]);
            if (obj["liquidityProviderCount"])
                formattedObj["liquidityProviderCount"] = wei(obj["liquidityProviderCount"], 0);
            if (obj["poolHourData"])
                formattedObj["poolHourData"] = obj["poolHourData"];
            if (obj["poolDayData"])
                formattedObj["poolDayData"] = obj["poolDayData"];
            if (obj["mints"])
                formattedObj["mints"] = obj["mints"];
            if (obj["burns"])
                formattedObj["burns"] = obj["burns"];
            if (obj["swaps"])
                formattedObj["swaps"] = obj["swaps"];
            if (obj["collects"])
                formattedObj["collects"] = obj["collects"];
            if (obj["ticks"])
                formattedObj["ticks"] = obj["ticks"];
            return formattedObj as Pick<PoolResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type PoolDayDataFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    date?: number | null;
    date_not?: number | null;
    date_gt?: number | null;
    date_lt?: number | null;
    date_gte?: number | null;
    date_lte?: number | null;
    date_in?: number[];
    date_not_in?: number[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    liquidity?: WeiSource | null;
    liquidity_not?: WeiSource | null;
    liquidity_gt?: WeiSource | null;
    liquidity_lt?: WeiSource | null;
    liquidity_gte?: WeiSource | null;
    liquidity_lte?: WeiSource | null;
    liquidity_in?: WeiSource[];
    liquidity_not_in?: WeiSource[];
    sqrtPrice?: WeiSource | null;
    sqrtPrice_not?: WeiSource | null;
    sqrtPrice_gt?: WeiSource | null;
    sqrtPrice_lt?: WeiSource | null;
    sqrtPrice_gte?: WeiSource | null;
    sqrtPrice_lte?: WeiSource | null;
    sqrtPrice_in?: WeiSource[];
    sqrtPrice_not_in?: WeiSource[];
    token0Price?: WeiSource | null;
    token0Price_not?: WeiSource | null;
    token0Price_gt?: WeiSource | null;
    token0Price_lt?: WeiSource | null;
    token0Price_gte?: WeiSource | null;
    token0Price_lte?: WeiSource | null;
    token0Price_in?: WeiSource[];
    token0Price_not_in?: WeiSource[];
    token1Price?: WeiSource | null;
    token1Price_not?: WeiSource | null;
    token1Price_gt?: WeiSource | null;
    token1Price_lt?: WeiSource | null;
    token1Price_gte?: WeiSource | null;
    token1Price_lte?: WeiSource | null;
    token1Price_in?: WeiSource[];
    token1Price_not_in?: WeiSource[];
    tick?: WeiSource | null;
    tick_not?: WeiSource | null;
    tick_gt?: WeiSource | null;
    tick_lt?: WeiSource | null;
    tick_gte?: WeiSource | null;
    tick_lte?: WeiSource | null;
    tick_in?: WeiSource[];
    tick_not_in?: WeiSource[];
    feeGrowthGlobal0X128?: WeiSource | null;
    feeGrowthGlobal0X128_not?: WeiSource | null;
    feeGrowthGlobal0X128_gt?: WeiSource | null;
    feeGrowthGlobal0X128_lt?: WeiSource | null;
    feeGrowthGlobal0X128_gte?: WeiSource | null;
    feeGrowthGlobal0X128_lte?: WeiSource | null;
    feeGrowthGlobal0X128_in?: WeiSource[];
    feeGrowthGlobal0X128_not_in?: WeiSource[];
    feeGrowthGlobal1X128?: WeiSource | null;
    feeGrowthGlobal1X128_not?: WeiSource | null;
    feeGrowthGlobal1X128_gt?: WeiSource | null;
    feeGrowthGlobal1X128_lt?: WeiSource | null;
    feeGrowthGlobal1X128_gte?: WeiSource | null;
    feeGrowthGlobal1X128_lte?: WeiSource | null;
    feeGrowthGlobal1X128_in?: WeiSource[];
    feeGrowthGlobal1X128_not_in?: WeiSource[];
    tvlUSD?: WeiSource | null;
    tvlUSD_not?: WeiSource | null;
    tvlUSD_gt?: WeiSource | null;
    tvlUSD_lt?: WeiSource | null;
    tvlUSD_gte?: WeiSource | null;
    tvlUSD_lte?: WeiSource | null;
    tvlUSD_in?: WeiSource[];
    tvlUSD_not_in?: WeiSource[];
    volumeToken0?: WeiSource | null;
    volumeToken0_not?: WeiSource | null;
    volumeToken0_gt?: WeiSource | null;
    volumeToken0_lt?: WeiSource | null;
    volumeToken0_gte?: WeiSource | null;
    volumeToken0_lte?: WeiSource | null;
    volumeToken0_in?: WeiSource[];
    volumeToken0_not_in?: WeiSource[];
    volumeToken1?: WeiSource | null;
    volumeToken1_not?: WeiSource | null;
    volumeToken1_gt?: WeiSource | null;
    volumeToken1_lt?: WeiSource | null;
    volumeToken1_gte?: WeiSource | null;
    volumeToken1_lte?: WeiSource | null;
    volumeToken1_in?: WeiSource[];
    volumeToken1_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    txCount?: WeiSource | null;
    txCount_not?: WeiSource | null;
    txCount_gt?: WeiSource | null;
    txCount_lt?: WeiSource | null;
    txCount_gte?: WeiSource | null;
    txCount_lte?: WeiSource | null;
    txCount_in?: WeiSource[];
    txCount_not_in?: WeiSource[];
    open?: WeiSource | null;
    open_not?: WeiSource | null;
    open_gt?: WeiSource | null;
    open_lt?: WeiSource | null;
    open_gte?: WeiSource | null;
    open_lte?: WeiSource | null;
    open_in?: WeiSource[];
    open_not_in?: WeiSource[];
    high?: WeiSource | null;
    high_not?: WeiSource | null;
    high_gt?: WeiSource | null;
    high_lt?: WeiSource | null;
    high_gte?: WeiSource | null;
    high_lte?: WeiSource | null;
    high_in?: WeiSource[];
    high_not_in?: WeiSource[];
    low?: WeiSource | null;
    low_not?: WeiSource | null;
    low_gt?: WeiSource | null;
    low_lt?: WeiSource | null;
    low_gte?: WeiSource | null;
    low_lte?: WeiSource | null;
    low_in?: WeiSource[];
    low_not_in?: WeiSource[];
    close?: WeiSource | null;
    close_not?: WeiSource | null;
    close_gt?: WeiSource | null;
    close_lt?: WeiSource | null;
    close_gte?: WeiSource | null;
    close_lte?: WeiSource | null;
    close_in?: WeiSource[];
    close_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type PoolDayDataResult = {
    id: string;
    date: number;
    pool: Partial<PoolResult>;
    liquidity: Wei;
    sqrtPrice: Wei;
    token0Price: Wei;
    token1Price: Wei;
    tick: Wei | null;
    feeGrowthGlobal0X128: Wei;
    feeGrowthGlobal1X128: Wei;
    tvlUSD: Wei;
    volumeToken0: Wei;
    volumeToken1: Wei;
    volumeUSD: Wei;
    feesUSD: Wei;
    txCount: Wei;
    open: Wei;
    high: Wei;
    low: Wei;
    close: Wei;
};
export type PoolDayDataFields = {
    id: true;
    date: true;
    pool: PoolFields;
    liquidity: true;
    sqrtPrice: true;
    token0Price: true;
    token1Price: true;
    tick: true;
    feeGrowthGlobal0X128: true;
    feeGrowthGlobal1X128: true;
    tvlUSD: true;
    volumeToken0: true;
    volumeToken1: true;
    volumeUSD: true;
    feesUSD: true;
    txCount: true;
    open: true;
    high: true;
    low: true;
    close: true;
};
export type PoolDayDataArgs<K extends keyof PoolDayDataResult> = {
    [Property in keyof Pick<PoolDayDataFields, K>]: PoolDayDataFields[Property];
};
export const getPoolDayDataById = async function <K extends keyof PoolDayDataResult>(url: string, options: SingleQueryOptions, args: PoolDayDataArgs<K>): Promise<Pick<PoolDayDataResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("poolDayData", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["date"])
        formattedObj["date"] = obj["date"];
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["liquidity"])
        formattedObj["liquidity"] = wei(obj["liquidity"], 0);
    if (obj["sqrtPrice"])
        formattedObj["sqrtPrice"] = wei(obj["sqrtPrice"], 0);
    if (obj["token0Price"])
        formattedObj["token0Price"] = wei(obj["token0Price"]);
    if (obj["token1Price"])
        formattedObj["token1Price"] = wei(obj["token1Price"]);
    if (obj["tick"])
        formattedObj["tick"] = wei(obj["tick"], 0);
    if (obj["feeGrowthGlobal0X128"])
        formattedObj["feeGrowthGlobal0X128"] = wei(obj["feeGrowthGlobal0X128"], 0);
    if (obj["feeGrowthGlobal1X128"])
        formattedObj["feeGrowthGlobal1X128"] = wei(obj["feeGrowthGlobal1X128"], 0);
    if (obj["tvlUSD"])
        formattedObj["tvlUSD"] = wei(obj["tvlUSD"]);
    if (obj["volumeToken0"])
        formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
    if (obj["volumeToken1"])
        formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["txCount"])
        formattedObj["txCount"] = wei(obj["txCount"], 0);
    if (obj["open"])
        formattedObj["open"] = wei(obj["open"]);
    if (obj["high"])
        formattedObj["high"] = wei(obj["high"]);
    if (obj["low"])
        formattedObj["low"] = wei(obj["low"]);
    if (obj["close"])
        formattedObj["close"] = wei(obj["close"]);
    return formattedObj as Pick<PoolDayDataResult, K>;
};
export const getPoolDayDatas = async function <K extends keyof PoolDayDataResult>(url: string, options: MultiQueryOptions<PoolDayDataFilter, PoolDayDataResult>, args: PoolDayDataArgs<K>): Promise<Pick<PoolDayDataResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<PoolDayDataFilter, PoolDayDataResult>> = { ...options };
    let paginationKey: keyof PoolDayDataFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof PoolDayDataFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<PoolDayDataResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("poolDayDatas", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["date"])
                formattedObj["date"] = obj["date"];
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["liquidity"])
                formattedObj["liquidity"] = wei(obj["liquidity"], 0);
            if (obj["sqrtPrice"])
                formattedObj["sqrtPrice"] = wei(obj["sqrtPrice"], 0);
            if (obj["token0Price"])
                formattedObj["token0Price"] = wei(obj["token0Price"]);
            if (obj["token1Price"])
                formattedObj["token1Price"] = wei(obj["token1Price"]);
            if (obj["tick"])
                formattedObj["tick"] = wei(obj["tick"], 0);
            if (obj["feeGrowthGlobal0X128"])
                formattedObj["feeGrowthGlobal0X128"] = wei(obj["feeGrowthGlobal0X128"], 0);
            if (obj["feeGrowthGlobal1X128"])
                formattedObj["feeGrowthGlobal1X128"] = wei(obj["feeGrowthGlobal1X128"], 0);
            if (obj["tvlUSD"])
                formattedObj["tvlUSD"] = wei(obj["tvlUSD"]);
            if (obj["volumeToken0"])
                formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
            if (obj["volumeToken1"])
                formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["txCount"])
                formattedObj["txCount"] = wei(obj["txCount"], 0);
            if (obj["open"])
                formattedObj["open"] = wei(obj["open"]);
            if (obj["high"])
                formattedObj["high"] = wei(obj["high"]);
            if (obj["low"])
                formattedObj["low"] = wei(obj["low"]);
            if (obj["close"])
                formattedObj["close"] = wei(obj["close"]);
            return formattedObj as Pick<PoolDayDataResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type PoolHourDataFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    periodStartUnix?: number | null;
    periodStartUnix_not?: number | null;
    periodStartUnix_gt?: number | null;
    periodStartUnix_lt?: number | null;
    periodStartUnix_gte?: number | null;
    periodStartUnix_lte?: number | null;
    periodStartUnix_in?: number[];
    periodStartUnix_not_in?: number[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    liquidity?: WeiSource | null;
    liquidity_not?: WeiSource | null;
    liquidity_gt?: WeiSource | null;
    liquidity_lt?: WeiSource | null;
    liquidity_gte?: WeiSource | null;
    liquidity_lte?: WeiSource | null;
    liquidity_in?: WeiSource[];
    liquidity_not_in?: WeiSource[];
    sqrtPrice?: WeiSource | null;
    sqrtPrice_not?: WeiSource | null;
    sqrtPrice_gt?: WeiSource | null;
    sqrtPrice_lt?: WeiSource | null;
    sqrtPrice_gte?: WeiSource | null;
    sqrtPrice_lte?: WeiSource | null;
    sqrtPrice_in?: WeiSource[];
    sqrtPrice_not_in?: WeiSource[];
    token0Price?: WeiSource | null;
    token0Price_not?: WeiSource | null;
    token0Price_gt?: WeiSource | null;
    token0Price_lt?: WeiSource | null;
    token0Price_gte?: WeiSource | null;
    token0Price_lte?: WeiSource | null;
    token0Price_in?: WeiSource[];
    token0Price_not_in?: WeiSource[];
    token1Price?: WeiSource | null;
    token1Price_not?: WeiSource | null;
    token1Price_gt?: WeiSource | null;
    token1Price_lt?: WeiSource | null;
    token1Price_gte?: WeiSource | null;
    token1Price_lte?: WeiSource | null;
    token1Price_in?: WeiSource[];
    token1Price_not_in?: WeiSource[];
    tick?: WeiSource | null;
    tick_not?: WeiSource | null;
    tick_gt?: WeiSource | null;
    tick_lt?: WeiSource | null;
    tick_gte?: WeiSource | null;
    tick_lte?: WeiSource | null;
    tick_in?: WeiSource[];
    tick_not_in?: WeiSource[];
    feeGrowthGlobal0X128?: WeiSource | null;
    feeGrowthGlobal0X128_not?: WeiSource | null;
    feeGrowthGlobal0X128_gt?: WeiSource | null;
    feeGrowthGlobal0X128_lt?: WeiSource | null;
    feeGrowthGlobal0X128_gte?: WeiSource | null;
    feeGrowthGlobal0X128_lte?: WeiSource | null;
    feeGrowthGlobal0X128_in?: WeiSource[];
    feeGrowthGlobal0X128_not_in?: WeiSource[];
    feeGrowthGlobal1X128?: WeiSource | null;
    feeGrowthGlobal1X128_not?: WeiSource | null;
    feeGrowthGlobal1X128_gt?: WeiSource | null;
    feeGrowthGlobal1X128_lt?: WeiSource | null;
    feeGrowthGlobal1X128_gte?: WeiSource | null;
    feeGrowthGlobal1X128_lte?: WeiSource | null;
    feeGrowthGlobal1X128_in?: WeiSource[];
    feeGrowthGlobal1X128_not_in?: WeiSource[];
    tvlUSD?: WeiSource | null;
    tvlUSD_not?: WeiSource | null;
    tvlUSD_gt?: WeiSource | null;
    tvlUSD_lt?: WeiSource | null;
    tvlUSD_gte?: WeiSource | null;
    tvlUSD_lte?: WeiSource | null;
    tvlUSD_in?: WeiSource[];
    tvlUSD_not_in?: WeiSource[];
    volumeToken0?: WeiSource | null;
    volumeToken0_not?: WeiSource | null;
    volumeToken0_gt?: WeiSource | null;
    volumeToken0_lt?: WeiSource | null;
    volumeToken0_gte?: WeiSource | null;
    volumeToken0_lte?: WeiSource | null;
    volumeToken0_in?: WeiSource[];
    volumeToken0_not_in?: WeiSource[];
    volumeToken1?: WeiSource | null;
    volumeToken1_not?: WeiSource | null;
    volumeToken1_gt?: WeiSource | null;
    volumeToken1_lt?: WeiSource | null;
    volumeToken1_gte?: WeiSource | null;
    volumeToken1_lte?: WeiSource | null;
    volumeToken1_in?: WeiSource[];
    volumeToken1_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    txCount?: WeiSource | null;
    txCount_not?: WeiSource | null;
    txCount_gt?: WeiSource | null;
    txCount_lt?: WeiSource | null;
    txCount_gte?: WeiSource | null;
    txCount_lte?: WeiSource | null;
    txCount_in?: WeiSource[];
    txCount_not_in?: WeiSource[];
    open?: WeiSource | null;
    open_not?: WeiSource | null;
    open_gt?: WeiSource | null;
    open_lt?: WeiSource | null;
    open_gte?: WeiSource | null;
    open_lte?: WeiSource | null;
    open_in?: WeiSource[];
    open_not_in?: WeiSource[];
    high?: WeiSource | null;
    high_not?: WeiSource | null;
    high_gt?: WeiSource | null;
    high_lt?: WeiSource | null;
    high_gte?: WeiSource | null;
    high_lte?: WeiSource | null;
    high_in?: WeiSource[];
    high_not_in?: WeiSource[];
    low?: WeiSource | null;
    low_not?: WeiSource | null;
    low_gt?: WeiSource | null;
    low_lt?: WeiSource | null;
    low_gte?: WeiSource | null;
    low_lte?: WeiSource | null;
    low_in?: WeiSource[];
    low_not_in?: WeiSource[];
    close?: WeiSource | null;
    close_not?: WeiSource | null;
    close_gt?: WeiSource | null;
    close_lt?: WeiSource | null;
    close_gte?: WeiSource | null;
    close_lte?: WeiSource | null;
    close_in?: WeiSource[];
    close_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type PoolHourDataResult = {
    id: string;
    periodStartUnix: number;
    pool: Partial<PoolResult>;
    liquidity: Wei;
    sqrtPrice: Wei;
    token0Price: Wei;
    token1Price: Wei;
    tick: Wei | null;
    feeGrowthGlobal0X128: Wei;
    feeGrowthGlobal1X128: Wei;
    tvlUSD: Wei;
    volumeToken0: Wei;
    volumeToken1: Wei;
    volumeUSD: Wei;
    feesUSD: Wei;
    txCount: Wei;
    open: Wei;
    high: Wei;
    low: Wei;
    close: Wei;
};
export type PoolHourDataFields = {
    id: true;
    periodStartUnix: true;
    pool: PoolFields;
    liquidity: true;
    sqrtPrice: true;
    token0Price: true;
    token1Price: true;
    tick: true;
    feeGrowthGlobal0X128: true;
    feeGrowthGlobal1X128: true;
    tvlUSD: true;
    volumeToken0: true;
    volumeToken1: true;
    volumeUSD: true;
    feesUSD: true;
    txCount: true;
    open: true;
    high: true;
    low: true;
    close: true;
};
export type PoolHourDataArgs<K extends keyof PoolHourDataResult> = {
    [Property in keyof Pick<PoolHourDataFields, K>]: PoolHourDataFields[Property];
};
export const getPoolHourDataById = async function <K extends keyof PoolHourDataResult>(url: string, options: SingleQueryOptions, args: PoolHourDataArgs<K>): Promise<Pick<PoolHourDataResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("poolHourData", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["periodStartUnix"])
        formattedObj["periodStartUnix"] = obj["periodStartUnix"];
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["liquidity"])
        formattedObj["liquidity"] = wei(obj["liquidity"], 0);
    if (obj["sqrtPrice"])
        formattedObj["sqrtPrice"] = wei(obj["sqrtPrice"], 0);
    if (obj["token0Price"])
        formattedObj["token0Price"] = wei(obj["token0Price"]);
    if (obj["token1Price"])
        formattedObj["token1Price"] = wei(obj["token1Price"]);
    if (obj["tick"])
        formattedObj["tick"] = wei(obj["tick"], 0);
    if (obj["feeGrowthGlobal0X128"])
        formattedObj["feeGrowthGlobal0X128"] = wei(obj["feeGrowthGlobal0X128"], 0);
    if (obj["feeGrowthGlobal1X128"])
        formattedObj["feeGrowthGlobal1X128"] = wei(obj["feeGrowthGlobal1X128"], 0);
    if (obj["tvlUSD"])
        formattedObj["tvlUSD"] = wei(obj["tvlUSD"]);
    if (obj["volumeToken0"])
        formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
    if (obj["volumeToken1"])
        formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["txCount"])
        formattedObj["txCount"] = wei(obj["txCount"], 0);
    if (obj["open"])
        formattedObj["open"] = wei(obj["open"]);
    if (obj["high"])
        formattedObj["high"] = wei(obj["high"]);
    if (obj["low"])
        formattedObj["low"] = wei(obj["low"]);
    if (obj["close"])
        formattedObj["close"] = wei(obj["close"]);
    return formattedObj as Pick<PoolHourDataResult, K>;
};
export const getPoolHourDatas = async function <K extends keyof PoolHourDataResult>(url: string, options: MultiQueryOptions<PoolHourDataFilter, PoolHourDataResult>, args: PoolHourDataArgs<K>): Promise<Pick<PoolHourDataResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<PoolHourDataFilter, PoolHourDataResult>> = { ...options };
    let paginationKey: keyof PoolHourDataFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof PoolHourDataFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<PoolHourDataResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("poolHourDatas", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["periodStartUnix"])
                formattedObj["periodStartUnix"] = obj["periodStartUnix"];
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["liquidity"])
                formattedObj["liquidity"] = wei(obj["liquidity"], 0);
            if (obj["sqrtPrice"])
                formattedObj["sqrtPrice"] = wei(obj["sqrtPrice"], 0);
            if (obj["token0Price"])
                formattedObj["token0Price"] = wei(obj["token0Price"]);
            if (obj["token1Price"])
                formattedObj["token1Price"] = wei(obj["token1Price"]);
            if (obj["tick"])
                formattedObj["tick"] = wei(obj["tick"], 0);
            if (obj["feeGrowthGlobal0X128"])
                formattedObj["feeGrowthGlobal0X128"] = wei(obj["feeGrowthGlobal0X128"], 0);
            if (obj["feeGrowthGlobal1X128"])
                formattedObj["feeGrowthGlobal1X128"] = wei(obj["feeGrowthGlobal1X128"], 0);
            if (obj["tvlUSD"])
                formattedObj["tvlUSD"] = wei(obj["tvlUSD"]);
            if (obj["volumeToken0"])
                formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
            if (obj["volumeToken1"])
                formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["txCount"])
                formattedObj["txCount"] = wei(obj["txCount"], 0);
            if (obj["open"])
                formattedObj["open"] = wei(obj["open"]);
            if (obj["high"])
                formattedObj["high"] = wei(obj["high"]);
            if (obj["low"])
                formattedObj["low"] = wei(obj["low"]);
            if (obj["close"])
                formattedObj["close"] = wei(obj["close"]);
            return formattedObj as Pick<PoolHourDataResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type PositionFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    owner?: string | null;
    owner_not?: string | null;
    owner_in?: string[];
    owner_not_in?: string[];
    owner_contains?: string | null;
    owner_not_contains?: string | null;
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    token0?: string | null;
    token0_not?: string | null;
    token0_gt?: string | null;
    token0_lt?: string | null;
    token0_gte?: string | null;
    token0_lte?: string | null;
    token0_in?: string[];
    token0_not_in?: string[];
    token0_contains?: string | null;
    token0_contains_nocase?: string | null;
    token0_not_contains?: string | null;
    token0_not_contains_nocase?: string | null;
    token0_starts_with?: string | null;
    token0_starts_with_nocase?: string | null;
    token0_not_starts_with?: string | null;
    token0_not_starts_with_nocase?: string | null;
    token0_ends_with?: string | null;
    token0_ends_with_nocase?: string | null;
    token0_not_ends_with?: string | null;
    token0_not_ends_with_nocase?: string | null;
    token0_?: Token_filterFilter | null;
    token1?: string | null;
    token1_not?: string | null;
    token1_gt?: string | null;
    token1_lt?: string | null;
    token1_gte?: string | null;
    token1_lte?: string | null;
    token1_in?: string[];
    token1_not_in?: string[];
    token1_contains?: string | null;
    token1_contains_nocase?: string | null;
    token1_not_contains?: string | null;
    token1_not_contains_nocase?: string | null;
    token1_starts_with?: string | null;
    token1_starts_with_nocase?: string | null;
    token1_not_starts_with?: string | null;
    token1_not_starts_with_nocase?: string | null;
    token1_ends_with?: string | null;
    token1_ends_with_nocase?: string | null;
    token1_not_ends_with?: string | null;
    token1_not_ends_with_nocase?: string | null;
    token1_?: Token_filterFilter | null;
    tickLower?: string | null;
    tickLower_not?: string | null;
    tickLower_gt?: string | null;
    tickLower_lt?: string | null;
    tickLower_gte?: string | null;
    tickLower_lte?: string | null;
    tickLower_in?: string[];
    tickLower_not_in?: string[];
    tickLower_contains?: string | null;
    tickLower_contains_nocase?: string | null;
    tickLower_not_contains?: string | null;
    tickLower_not_contains_nocase?: string | null;
    tickLower_starts_with?: string | null;
    tickLower_starts_with_nocase?: string | null;
    tickLower_not_starts_with?: string | null;
    tickLower_not_starts_with_nocase?: string | null;
    tickLower_ends_with?: string | null;
    tickLower_ends_with_nocase?: string | null;
    tickLower_not_ends_with?: string | null;
    tickLower_not_ends_with_nocase?: string | null;
    tickLower_?: Tick_filterFilter | null;
    tickUpper?: string | null;
    tickUpper_not?: string | null;
    tickUpper_gt?: string | null;
    tickUpper_lt?: string | null;
    tickUpper_gte?: string | null;
    tickUpper_lte?: string | null;
    tickUpper_in?: string[];
    tickUpper_not_in?: string[];
    tickUpper_contains?: string | null;
    tickUpper_contains_nocase?: string | null;
    tickUpper_not_contains?: string | null;
    tickUpper_not_contains_nocase?: string | null;
    tickUpper_starts_with?: string | null;
    tickUpper_starts_with_nocase?: string | null;
    tickUpper_not_starts_with?: string | null;
    tickUpper_not_starts_with_nocase?: string | null;
    tickUpper_ends_with?: string | null;
    tickUpper_ends_with_nocase?: string | null;
    tickUpper_not_ends_with?: string | null;
    tickUpper_not_ends_with_nocase?: string | null;
    tickUpper_?: Tick_filterFilter | null;
    liquidity?: WeiSource | null;
    liquidity_not?: WeiSource | null;
    liquidity_gt?: WeiSource | null;
    liquidity_lt?: WeiSource | null;
    liquidity_gte?: WeiSource | null;
    liquidity_lte?: WeiSource | null;
    liquidity_in?: WeiSource[];
    liquidity_not_in?: WeiSource[];
    depositedToken0?: WeiSource | null;
    depositedToken0_not?: WeiSource | null;
    depositedToken0_gt?: WeiSource | null;
    depositedToken0_lt?: WeiSource | null;
    depositedToken0_gte?: WeiSource | null;
    depositedToken0_lte?: WeiSource | null;
    depositedToken0_in?: WeiSource[];
    depositedToken0_not_in?: WeiSource[];
    depositedToken1?: WeiSource | null;
    depositedToken1_not?: WeiSource | null;
    depositedToken1_gt?: WeiSource | null;
    depositedToken1_lt?: WeiSource | null;
    depositedToken1_gte?: WeiSource | null;
    depositedToken1_lte?: WeiSource | null;
    depositedToken1_in?: WeiSource[];
    depositedToken1_not_in?: WeiSource[];
    withdrawnToken0?: WeiSource | null;
    withdrawnToken0_not?: WeiSource | null;
    withdrawnToken0_gt?: WeiSource | null;
    withdrawnToken0_lt?: WeiSource | null;
    withdrawnToken0_gte?: WeiSource | null;
    withdrawnToken0_lte?: WeiSource | null;
    withdrawnToken0_in?: WeiSource[];
    withdrawnToken0_not_in?: WeiSource[];
    withdrawnToken1?: WeiSource | null;
    withdrawnToken1_not?: WeiSource | null;
    withdrawnToken1_gt?: WeiSource | null;
    withdrawnToken1_lt?: WeiSource | null;
    withdrawnToken1_gte?: WeiSource | null;
    withdrawnToken1_lte?: WeiSource | null;
    withdrawnToken1_in?: WeiSource[];
    withdrawnToken1_not_in?: WeiSource[];
    collectedFeesToken0?: WeiSource | null;
    collectedFeesToken0_not?: WeiSource | null;
    collectedFeesToken0_gt?: WeiSource | null;
    collectedFeesToken0_lt?: WeiSource | null;
    collectedFeesToken0_gte?: WeiSource | null;
    collectedFeesToken0_lte?: WeiSource | null;
    collectedFeesToken0_in?: WeiSource[];
    collectedFeesToken0_not_in?: WeiSource[];
    collectedFeesToken1?: WeiSource | null;
    collectedFeesToken1_not?: WeiSource | null;
    collectedFeesToken1_gt?: WeiSource | null;
    collectedFeesToken1_lt?: WeiSource | null;
    collectedFeesToken1_gte?: WeiSource | null;
    collectedFeesToken1_lte?: WeiSource | null;
    collectedFeesToken1_in?: WeiSource[];
    collectedFeesToken1_not_in?: WeiSource[];
    transaction?: string | null;
    transaction_not?: string | null;
    transaction_gt?: string | null;
    transaction_lt?: string | null;
    transaction_gte?: string | null;
    transaction_lte?: string | null;
    transaction_in?: string[];
    transaction_not_in?: string[];
    transaction_contains?: string | null;
    transaction_contains_nocase?: string | null;
    transaction_not_contains?: string | null;
    transaction_not_contains_nocase?: string | null;
    transaction_starts_with?: string | null;
    transaction_starts_with_nocase?: string | null;
    transaction_not_starts_with?: string | null;
    transaction_not_starts_with_nocase?: string | null;
    transaction_ends_with?: string | null;
    transaction_ends_with_nocase?: string | null;
    transaction_not_ends_with?: string | null;
    transaction_not_ends_with_nocase?: string | null;
    transaction_?: Transaction_filterFilter | null;
    feeGrowthInside0LastX128?: WeiSource | null;
    feeGrowthInside0LastX128_not?: WeiSource | null;
    feeGrowthInside0LastX128_gt?: WeiSource | null;
    feeGrowthInside0LastX128_lt?: WeiSource | null;
    feeGrowthInside0LastX128_gte?: WeiSource | null;
    feeGrowthInside0LastX128_lte?: WeiSource | null;
    feeGrowthInside0LastX128_in?: WeiSource[];
    feeGrowthInside0LastX128_not_in?: WeiSource[];
    feeGrowthInside1LastX128?: WeiSource | null;
    feeGrowthInside1LastX128_not?: WeiSource | null;
    feeGrowthInside1LastX128_gt?: WeiSource | null;
    feeGrowthInside1LastX128_lt?: WeiSource | null;
    feeGrowthInside1LastX128_gte?: WeiSource | null;
    feeGrowthInside1LastX128_lte?: WeiSource | null;
    feeGrowthInside1LastX128_in?: WeiSource[];
    feeGrowthInside1LastX128_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type PositionResult = {
    id: string;
    owner: string;
    pool: Partial<PoolResult>;
    token0: Partial<TokenResult>;
    token1: Partial<TokenResult>;
    tickLower: Partial<TickResult>;
    tickUpper: Partial<TickResult>;
    liquidity: Wei;
    depositedToken0: Wei;
    depositedToken1: Wei;
    withdrawnToken0: Wei;
    withdrawnToken1: Wei;
    collectedFeesToken0: Wei;
    collectedFeesToken1: Wei;
    transaction: Partial<TransactionResult>;
    feeGrowthInside0LastX128: Wei;
    feeGrowthInside1LastX128: Wei;
};
export type PositionFields = {
    id: true;
    owner: true;
    pool: PoolFields;
    token0: TokenFields;
    token1: TokenFields;
    tickLower: TickFields;
    tickUpper: TickFields;
    liquidity: true;
    depositedToken0: true;
    depositedToken1: true;
    withdrawnToken0: true;
    withdrawnToken1: true;
    collectedFeesToken0: true;
    collectedFeesToken1: true;
    transaction: TransactionFields;
    feeGrowthInside0LastX128: true;
    feeGrowthInside1LastX128: true;
};
export type PositionArgs<K extends keyof PositionResult> = {
    [Property in keyof Pick<PositionFields, K>]: PositionFields[Property];
};
export const getPositionById = async function <K extends keyof PositionResult>(url: string, options: SingleQueryOptions, args: PositionArgs<K>): Promise<Pick<PositionResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("position", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["owner"])
        formattedObj["owner"] = obj["owner"];
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["token0"])
        formattedObj["token0"] = obj["token0"];
    if (obj["token1"])
        formattedObj["token1"] = obj["token1"];
    if (obj["tickLower"])
        formattedObj["tickLower"] = obj["tickLower"];
    if (obj["tickUpper"])
        formattedObj["tickUpper"] = obj["tickUpper"];
    if (obj["liquidity"])
        formattedObj["liquidity"] = wei(obj["liquidity"], 0);
    if (obj["depositedToken0"])
        formattedObj["depositedToken0"] = wei(obj["depositedToken0"]);
    if (obj["depositedToken1"])
        formattedObj["depositedToken1"] = wei(obj["depositedToken1"]);
    if (obj["withdrawnToken0"])
        formattedObj["withdrawnToken0"] = wei(obj["withdrawnToken0"]);
    if (obj["withdrawnToken1"])
        formattedObj["withdrawnToken1"] = wei(obj["withdrawnToken1"]);
    if (obj["collectedFeesToken0"])
        formattedObj["collectedFeesToken0"] = wei(obj["collectedFeesToken0"]);
    if (obj["collectedFeesToken1"])
        formattedObj["collectedFeesToken1"] = wei(obj["collectedFeesToken1"]);
    if (obj["transaction"])
        formattedObj["transaction"] = obj["transaction"];
    if (obj["feeGrowthInside0LastX128"])
        formattedObj["feeGrowthInside0LastX128"] = wei(obj["feeGrowthInside0LastX128"], 0);
    if (obj["feeGrowthInside1LastX128"])
        formattedObj["feeGrowthInside1LastX128"] = wei(obj["feeGrowthInside1LastX128"], 0);
    return formattedObj as Pick<PositionResult, K>;
};
export const getPositions = async function <K extends keyof PositionResult>(url: string, options: MultiQueryOptions<PositionFilter, PositionResult>, args: PositionArgs<K>): Promise<Pick<PositionResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<PositionFilter, PositionResult>> = { ...options };
    let paginationKey: keyof PositionFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof PositionFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<PositionResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("positions", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["owner"])
                formattedObj["owner"] = obj["owner"];
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["token0"])
                formattedObj["token0"] = obj["token0"];
            if (obj["token1"])
                formattedObj["token1"] = obj["token1"];
            if (obj["tickLower"])
                formattedObj["tickLower"] = obj["tickLower"];
            if (obj["tickUpper"])
                formattedObj["tickUpper"] = obj["tickUpper"];
            if (obj["liquidity"])
                formattedObj["liquidity"] = wei(obj["liquidity"], 0);
            if (obj["depositedToken0"])
                formattedObj["depositedToken0"] = wei(obj["depositedToken0"]);
            if (obj["depositedToken1"])
                formattedObj["depositedToken1"] = wei(obj["depositedToken1"]);
            if (obj["withdrawnToken0"])
                formattedObj["withdrawnToken0"] = wei(obj["withdrawnToken0"]);
            if (obj["withdrawnToken1"])
                formattedObj["withdrawnToken1"] = wei(obj["withdrawnToken1"]);
            if (obj["collectedFeesToken0"])
                formattedObj["collectedFeesToken0"] = wei(obj["collectedFeesToken0"]);
            if (obj["collectedFeesToken1"])
                formattedObj["collectedFeesToken1"] = wei(obj["collectedFeesToken1"]);
            if (obj["transaction"])
                formattedObj["transaction"] = obj["transaction"];
            if (obj["feeGrowthInside0LastX128"])
                formattedObj["feeGrowthInside0LastX128"] = wei(obj["feeGrowthInside0LastX128"], 0);
            if (obj["feeGrowthInside1LastX128"])
                formattedObj["feeGrowthInside1LastX128"] = wei(obj["feeGrowthInside1LastX128"], 0);
            return formattedObj as Pick<PositionResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type PositionSnapshotFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    owner?: string | null;
    owner_not?: string | null;
    owner_in?: string[];
    owner_not_in?: string[];
    owner_contains?: string | null;
    owner_not_contains?: string | null;
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    position?: string | null;
    position_not?: string | null;
    position_gt?: string | null;
    position_lt?: string | null;
    position_gte?: string | null;
    position_lte?: string | null;
    position_in?: string[];
    position_not_in?: string[];
    position_contains?: string | null;
    position_contains_nocase?: string | null;
    position_not_contains?: string | null;
    position_not_contains_nocase?: string | null;
    position_starts_with?: string | null;
    position_starts_with_nocase?: string | null;
    position_not_starts_with?: string | null;
    position_not_starts_with_nocase?: string | null;
    position_ends_with?: string | null;
    position_ends_with_nocase?: string | null;
    position_not_ends_with?: string | null;
    position_not_ends_with_nocase?: string | null;
    position_?: Position_filterFilter | null;
    blockNumber?: WeiSource | null;
    blockNumber_not?: WeiSource | null;
    blockNumber_gt?: WeiSource | null;
    blockNumber_lt?: WeiSource | null;
    blockNumber_gte?: WeiSource | null;
    blockNumber_lte?: WeiSource | null;
    blockNumber_in?: WeiSource[];
    blockNumber_not_in?: WeiSource[];
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    liquidity?: WeiSource | null;
    liquidity_not?: WeiSource | null;
    liquidity_gt?: WeiSource | null;
    liquidity_lt?: WeiSource | null;
    liquidity_gte?: WeiSource | null;
    liquidity_lte?: WeiSource | null;
    liquidity_in?: WeiSource[];
    liquidity_not_in?: WeiSource[];
    depositedToken0?: WeiSource | null;
    depositedToken0_not?: WeiSource | null;
    depositedToken0_gt?: WeiSource | null;
    depositedToken0_lt?: WeiSource | null;
    depositedToken0_gte?: WeiSource | null;
    depositedToken0_lte?: WeiSource | null;
    depositedToken0_in?: WeiSource[];
    depositedToken0_not_in?: WeiSource[];
    depositedToken1?: WeiSource | null;
    depositedToken1_not?: WeiSource | null;
    depositedToken1_gt?: WeiSource | null;
    depositedToken1_lt?: WeiSource | null;
    depositedToken1_gte?: WeiSource | null;
    depositedToken1_lte?: WeiSource | null;
    depositedToken1_in?: WeiSource[];
    depositedToken1_not_in?: WeiSource[];
    withdrawnToken0?: WeiSource | null;
    withdrawnToken0_not?: WeiSource | null;
    withdrawnToken0_gt?: WeiSource | null;
    withdrawnToken0_lt?: WeiSource | null;
    withdrawnToken0_gte?: WeiSource | null;
    withdrawnToken0_lte?: WeiSource | null;
    withdrawnToken0_in?: WeiSource[];
    withdrawnToken0_not_in?: WeiSource[];
    withdrawnToken1?: WeiSource | null;
    withdrawnToken1_not?: WeiSource | null;
    withdrawnToken1_gt?: WeiSource | null;
    withdrawnToken1_lt?: WeiSource | null;
    withdrawnToken1_gte?: WeiSource | null;
    withdrawnToken1_lte?: WeiSource | null;
    withdrawnToken1_in?: WeiSource[];
    withdrawnToken1_not_in?: WeiSource[];
    collectedFeesToken0?: WeiSource | null;
    collectedFeesToken0_not?: WeiSource | null;
    collectedFeesToken0_gt?: WeiSource | null;
    collectedFeesToken0_lt?: WeiSource | null;
    collectedFeesToken0_gte?: WeiSource | null;
    collectedFeesToken0_lte?: WeiSource | null;
    collectedFeesToken0_in?: WeiSource[];
    collectedFeesToken0_not_in?: WeiSource[];
    collectedFeesToken1?: WeiSource | null;
    collectedFeesToken1_not?: WeiSource | null;
    collectedFeesToken1_gt?: WeiSource | null;
    collectedFeesToken1_lt?: WeiSource | null;
    collectedFeesToken1_gte?: WeiSource | null;
    collectedFeesToken1_lte?: WeiSource | null;
    collectedFeesToken1_in?: WeiSource[];
    collectedFeesToken1_not_in?: WeiSource[];
    transaction?: string | null;
    transaction_not?: string | null;
    transaction_gt?: string | null;
    transaction_lt?: string | null;
    transaction_gte?: string | null;
    transaction_lte?: string | null;
    transaction_in?: string[];
    transaction_not_in?: string[];
    transaction_contains?: string | null;
    transaction_contains_nocase?: string | null;
    transaction_not_contains?: string | null;
    transaction_not_contains_nocase?: string | null;
    transaction_starts_with?: string | null;
    transaction_starts_with_nocase?: string | null;
    transaction_not_starts_with?: string | null;
    transaction_not_starts_with_nocase?: string | null;
    transaction_ends_with?: string | null;
    transaction_ends_with_nocase?: string | null;
    transaction_not_ends_with?: string | null;
    transaction_not_ends_with_nocase?: string | null;
    transaction_?: Transaction_filterFilter | null;
    feeGrowthInside0LastX128?: WeiSource | null;
    feeGrowthInside0LastX128_not?: WeiSource | null;
    feeGrowthInside0LastX128_gt?: WeiSource | null;
    feeGrowthInside0LastX128_lt?: WeiSource | null;
    feeGrowthInside0LastX128_gte?: WeiSource | null;
    feeGrowthInside0LastX128_lte?: WeiSource | null;
    feeGrowthInside0LastX128_in?: WeiSource[];
    feeGrowthInside0LastX128_not_in?: WeiSource[];
    feeGrowthInside1LastX128?: WeiSource | null;
    feeGrowthInside1LastX128_not?: WeiSource | null;
    feeGrowthInside1LastX128_gt?: WeiSource | null;
    feeGrowthInside1LastX128_lt?: WeiSource | null;
    feeGrowthInside1LastX128_gte?: WeiSource | null;
    feeGrowthInside1LastX128_lte?: WeiSource | null;
    feeGrowthInside1LastX128_in?: WeiSource[];
    feeGrowthInside1LastX128_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type PositionSnapshotResult = {
    id: string;
    owner: string;
    pool: Partial<PoolResult>;
    position: Partial<PositionResult>;
    blockNumber: Wei;
    timestamp: Wei;
    liquidity: Wei;
    depositedToken0: Wei;
    depositedToken1: Wei;
    withdrawnToken0: Wei;
    withdrawnToken1: Wei;
    collectedFeesToken0: Wei;
    collectedFeesToken1: Wei;
    transaction: Partial<TransactionResult>;
    feeGrowthInside0LastX128: Wei;
    feeGrowthInside1LastX128: Wei;
};
export type PositionSnapshotFields = {
    id: true;
    owner: true;
    pool: PoolFields;
    position: PositionFields;
    blockNumber: true;
    timestamp: true;
    liquidity: true;
    depositedToken0: true;
    depositedToken1: true;
    withdrawnToken0: true;
    withdrawnToken1: true;
    collectedFeesToken0: true;
    collectedFeesToken1: true;
    transaction: TransactionFields;
    feeGrowthInside0LastX128: true;
    feeGrowthInside1LastX128: true;
};
export type PositionSnapshotArgs<K extends keyof PositionSnapshotResult> = {
    [Property in keyof Pick<PositionSnapshotFields, K>]: PositionSnapshotFields[Property];
};
export const getPositionSnapshotById = async function <K extends keyof PositionSnapshotResult>(url: string, options: SingleQueryOptions, args: PositionSnapshotArgs<K>): Promise<Pick<PositionSnapshotResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("positionSnapshot", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["owner"])
        formattedObj["owner"] = obj["owner"];
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["position"])
        formattedObj["position"] = obj["position"];
    if (obj["blockNumber"])
        formattedObj["blockNumber"] = wei(obj["blockNumber"], 0);
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    if (obj["liquidity"])
        formattedObj["liquidity"] = wei(obj["liquidity"], 0);
    if (obj["depositedToken0"])
        formattedObj["depositedToken0"] = wei(obj["depositedToken0"]);
    if (obj["depositedToken1"])
        formattedObj["depositedToken1"] = wei(obj["depositedToken1"]);
    if (obj["withdrawnToken0"])
        formattedObj["withdrawnToken0"] = wei(obj["withdrawnToken0"]);
    if (obj["withdrawnToken1"])
        formattedObj["withdrawnToken1"] = wei(obj["withdrawnToken1"]);
    if (obj["collectedFeesToken0"])
        formattedObj["collectedFeesToken0"] = wei(obj["collectedFeesToken0"]);
    if (obj["collectedFeesToken1"])
        formattedObj["collectedFeesToken1"] = wei(obj["collectedFeesToken1"]);
    if (obj["transaction"])
        formattedObj["transaction"] = obj["transaction"];
    if (obj["feeGrowthInside0LastX128"])
        formattedObj["feeGrowthInside0LastX128"] = wei(obj["feeGrowthInside0LastX128"], 0);
    if (obj["feeGrowthInside1LastX128"])
        formattedObj["feeGrowthInside1LastX128"] = wei(obj["feeGrowthInside1LastX128"], 0);
    return formattedObj as Pick<PositionSnapshotResult, K>;
};
export const getPositionSnapshots = async function <K extends keyof PositionSnapshotResult>(url: string, options: MultiQueryOptions<PositionSnapshotFilter, PositionSnapshotResult>, args: PositionSnapshotArgs<K>): Promise<Pick<PositionSnapshotResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<PositionSnapshotFilter, PositionSnapshotResult>> = { ...options };
    let paginationKey: keyof PositionSnapshotFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof PositionSnapshotFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<PositionSnapshotResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("positionSnapshots", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["owner"])
                formattedObj["owner"] = obj["owner"];
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["position"])
                formattedObj["position"] = obj["position"];
            if (obj["blockNumber"])
                formattedObj["blockNumber"] = wei(obj["blockNumber"], 0);
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            if (obj["liquidity"])
                formattedObj["liquidity"] = wei(obj["liquidity"], 0);
            if (obj["depositedToken0"])
                formattedObj["depositedToken0"] = wei(obj["depositedToken0"]);
            if (obj["depositedToken1"])
                formattedObj["depositedToken1"] = wei(obj["depositedToken1"]);
            if (obj["withdrawnToken0"])
                formattedObj["withdrawnToken0"] = wei(obj["withdrawnToken0"]);
            if (obj["withdrawnToken1"])
                formattedObj["withdrawnToken1"] = wei(obj["withdrawnToken1"]);
            if (obj["collectedFeesToken0"])
                formattedObj["collectedFeesToken0"] = wei(obj["collectedFeesToken0"]);
            if (obj["collectedFeesToken1"])
                formattedObj["collectedFeesToken1"] = wei(obj["collectedFeesToken1"]);
            if (obj["transaction"])
                formattedObj["transaction"] = obj["transaction"];
            if (obj["feeGrowthInside0LastX128"])
                formattedObj["feeGrowthInside0LastX128"] = wei(obj["feeGrowthInside0LastX128"], 0);
            if (obj["feeGrowthInside1LastX128"])
                formattedObj["feeGrowthInside1LastX128"] = wei(obj["feeGrowthInside1LastX128"], 0);
            return formattedObj as Pick<PositionSnapshotResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type SwapFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    transaction?: string | null;
    transaction_not?: string | null;
    transaction_gt?: string | null;
    transaction_lt?: string | null;
    transaction_gte?: string | null;
    transaction_lte?: string | null;
    transaction_in?: string[];
    transaction_not_in?: string[];
    transaction_contains?: string | null;
    transaction_contains_nocase?: string | null;
    transaction_not_contains?: string | null;
    transaction_not_contains_nocase?: string | null;
    transaction_starts_with?: string | null;
    transaction_starts_with_nocase?: string | null;
    transaction_not_starts_with?: string | null;
    transaction_not_starts_with_nocase?: string | null;
    transaction_ends_with?: string | null;
    transaction_ends_with_nocase?: string | null;
    transaction_not_ends_with?: string | null;
    transaction_not_ends_with_nocase?: string | null;
    transaction_?: Transaction_filterFilter | null;
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    token0?: string | null;
    token0_not?: string | null;
    token0_gt?: string | null;
    token0_lt?: string | null;
    token0_gte?: string | null;
    token0_lte?: string | null;
    token0_in?: string[];
    token0_not_in?: string[];
    token0_contains?: string | null;
    token0_contains_nocase?: string | null;
    token0_not_contains?: string | null;
    token0_not_contains_nocase?: string | null;
    token0_starts_with?: string | null;
    token0_starts_with_nocase?: string | null;
    token0_not_starts_with?: string | null;
    token0_not_starts_with_nocase?: string | null;
    token0_ends_with?: string | null;
    token0_ends_with_nocase?: string | null;
    token0_not_ends_with?: string | null;
    token0_not_ends_with_nocase?: string | null;
    token0_?: Token_filterFilter | null;
    token1?: string | null;
    token1_not?: string | null;
    token1_gt?: string | null;
    token1_lt?: string | null;
    token1_gte?: string | null;
    token1_lte?: string | null;
    token1_in?: string[];
    token1_not_in?: string[];
    token1_contains?: string | null;
    token1_contains_nocase?: string | null;
    token1_not_contains?: string | null;
    token1_not_contains_nocase?: string | null;
    token1_starts_with?: string | null;
    token1_starts_with_nocase?: string | null;
    token1_not_starts_with?: string | null;
    token1_not_starts_with_nocase?: string | null;
    token1_ends_with?: string | null;
    token1_ends_with_nocase?: string | null;
    token1_not_ends_with?: string | null;
    token1_not_ends_with_nocase?: string | null;
    token1_?: Token_filterFilter | null;
    sender?: string | null;
    sender_not?: string | null;
    sender_in?: string[];
    sender_not_in?: string[];
    sender_contains?: string | null;
    sender_not_contains?: string | null;
    recipient?: string | null;
    recipient_not?: string | null;
    recipient_in?: string[];
    recipient_not_in?: string[];
    recipient_contains?: string | null;
    recipient_not_contains?: string | null;
    origin?: string | null;
    origin_not?: string | null;
    origin_in?: string[];
    origin_not_in?: string[];
    origin_contains?: string | null;
    origin_not_contains?: string | null;
    amount0?: WeiSource | null;
    amount0_not?: WeiSource | null;
    amount0_gt?: WeiSource | null;
    amount0_lt?: WeiSource | null;
    amount0_gte?: WeiSource | null;
    amount0_lte?: WeiSource | null;
    amount0_in?: WeiSource[];
    amount0_not_in?: WeiSource[];
    amount1?: WeiSource | null;
    amount1_not?: WeiSource | null;
    amount1_gt?: WeiSource | null;
    amount1_lt?: WeiSource | null;
    amount1_gte?: WeiSource | null;
    amount1_lte?: WeiSource | null;
    amount1_in?: WeiSource[];
    amount1_not_in?: WeiSource[];
    amountUSD?: WeiSource | null;
    amountUSD_not?: WeiSource | null;
    amountUSD_gt?: WeiSource | null;
    amountUSD_lt?: WeiSource | null;
    amountUSD_gte?: WeiSource | null;
    amountUSD_lte?: WeiSource | null;
    amountUSD_in?: WeiSource[];
    amountUSD_not_in?: WeiSource[];
    sqrtPriceX96?: WeiSource | null;
    sqrtPriceX96_not?: WeiSource | null;
    sqrtPriceX96_gt?: WeiSource | null;
    sqrtPriceX96_lt?: WeiSource | null;
    sqrtPriceX96_gte?: WeiSource | null;
    sqrtPriceX96_lte?: WeiSource | null;
    sqrtPriceX96_in?: WeiSource[];
    sqrtPriceX96_not_in?: WeiSource[];
    tick?: WeiSource | null;
    tick_not?: WeiSource | null;
    tick_gt?: WeiSource | null;
    tick_lt?: WeiSource | null;
    tick_gte?: WeiSource | null;
    tick_lte?: WeiSource | null;
    tick_in?: WeiSource[];
    tick_not_in?: WeiSource[];
    logIndex?: WeiSource | null;
    logIndex_not?: WeiSource | null;
    logIndex_gt?: WeiSource | null;
    logIndex_lt?: WeiSource | null;
    logIndex_gte?: WeiSource | null;
    logIndex_lte?: WeiSource | null;
    logIndex_in?: WeiSource[];
    logIndex_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type SwapResult = {
    id: string;
    transaction: Partial<TransactionResult>;
    timestamp: Wei;
    pool: Partial<PoolResult>;
    token0: Partial<TokenResult>;
    token1: Partial<TokenResult>;
    sender: string;
    recipient: string;
    origin: string;
    amount0: Wei;
    amount1: Wei;
    amountUSD: Wei;
    sqrtPriceX96: Wei;
    tick: Wei;
    logIndex: Wei | null;
};
export type SwapFields = {
    id: true;
    transaction: TransactionFields;
    timestamp: true;
    pool: PoolFields;
    token0: TokenFields;
    token1: TokenFields;
    sender: true;
    recipient: true;
    origin: true;
    amount0: true;
    amount1: true;
    amountUSD: true;
    sqrtPriceX96: true;
    tick: true;
    logIndex: true;
};
export type SwapArgs<K extends keyof SwapResult> = {
    [Property in keyof Pick<SwapFields, K>]: SwapFields[Property];
};
export const getSwapById = async function <K extends keyof SwapResult>(url: string, options: SingleQueryOptions, args: SwapArgs<K>): Promise<Pick<SwapResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("swap", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["transaction"])
        formattedObj["transaction"] = obj["transaction"];
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["token0"])
        formattedObj["token0"] = obj["token0"];
    if (obj["token1"])
        formattedObj["token1"] = obj["token1"];
    if (obj["sender"])
        formattedObj["sender"] = obj["sender"];
    if (obj["recipient"])
        formattedObj["recipient"] = obj["recipient"];
    if (obj["origin"])
        formattedObj["origin"] = obj["origin"];
    if (obj["amount0"])
        formattedObj["amount0"] = wei(obj["amount0"]);
    if (obj["amount1"])
        formattedObj["amount1"] = wei(obj["amount1"]);
    if (obj["amountUSD"])
        formattedObj["amountUSD"] = wei(obj["amountUSD"]);
    if (obj["sqrtPriceX96"])
        formattedObj["sqrtPriceX96"] = wei(obj["sqrtPriceX96"], 0);
    if (obj["tick"])
        formattedObj["tick"] = wei(obj["tick"], 0);
    if (obj["logIndex"])
        formattedObj["logIndex"] = wei(obj["logIndex"], 0);
    return formattedObj as Pick<SwapResult, K>;
};
export const getSwaps = async function <K extends keyof SwapResult>(url: string, options: MultiQueryOptions<SwapFilter, SwapResult>, args: SwapArgs<K>): Promise<Pick<SwapResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<SwapFilter, SwapResult>> = { ...options };
    let paginationKey: keyof SwapFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof SwapFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<SwapResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("swaps", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["transaction"])
                formattedObj["transaction"] = obj["transaction"];
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["token0"])
                formattedObj["token0"] = obj["token0"];
            if (obj["token1"])
                formattedObj["token1"] = obj["token1"];
            if (obj["sender"])
                formattedObj["sender"] = obj["sender"];
            if (obj["recipient"])
                formattedObj["recipient"] = obj["recipient"];
            if (obj["origin"])
                formattedObj["origin"] = obj["origin"];
            if (obj["amount0"])
                formattedObj["amount0"] = wei(obj["amount0"]);
            if (obj["amount1"])
                formattedObj["amount1"] = wei(obj["amount1"]);
            if (obj["amountUSD"])
                formattedObj["amountUSD"] = wei(obj["amountUSD"]);
            if (obj["sqrtPriceX96"])
                formattedObj["sqrtPriceX96"] = wei(obj["sqrtPriceX96"], 0);
            if (obj["tick"])
                formattedObj["tick"] = wei(obj["tick"], 0);
            if (obj["logIndex"])
                formattedObj["logIndex"] = wei(obj["logIndex"], 0);
            return formattedObj as Pick<SwapResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TickFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    poolAddress?: string | null;
    poolAddress_not?: string | null;
    poolAddress_gt?: string | null;
    poolAddress_lt?: string | null;
    poolAddress_gte?: string | null;
    poolAddress_lte?: string | null;
    poolAddress_in?: string[];
    poolAddress_not_in?: string[];
    poolAddress_contains?: string | null;
    poolAddress_contains_nocase?: string | null;
    poolAddress_not_contains?: string | null;
    poolAddress_not_contains_nocase?: string | null;
    poolAddress_starts_with?: string | null;
    poolAddress_starts_with_nocase?: string | null;
    poolAddress_not_starts_with?: string | null;
    poolAddress_not_starts_with_nocase?: string | null;
    poolAddress_ends_with?: string | null;
    poolAddress_ends_with_nocase?: string | null;
    poolAddress_not_ends_with?: string | null;
    poolAddress_not_ends_with_nocase?: string | null;
    tickIdx?: WeiSource | null;
    tickIdx_not?: WeiSource | null;
    tickIdx_gt?: WeiSource | null;
    tickIdx_lt?: WeiSource | null;
    tickIdx_gte?: WeiSource | null;
    tickIdx_lte?: WeiSource | null;
    tickIdx_in?: WeiSource[];
    tickIdx_not_in?: WeiSource[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    liquidityGross?: WeiSource | null;
    liquidityGross_not?: WeiSource | null;
    liquidityGross_gt?: WeiSource | null;
    liquidityGross_lt?: WeiSource | null;
    liquidityGross_gte?: WeiSource | null;
    liquidityGross_lte?: WeiSource | null;
    liquidityGross_in?: WeiSource[];
    liquidityGross_not_in?: WeiSource[];
    liquidityNet?: WeiSource | null;
    liquidityNet_not?: WeiSource | null;
    liquidityNet_gt?: WeiSource | null;
    liquidityNet_lt?: WeiSource | null;
    liquidityNet_gte?: WeiSource | null;
    liquidityNet_lte?: WeiSource | null;
    liquidityNet_in?: WeiSource[];
    liquidityNet_not_in?: WeiSource[];
    price0?: WeiSource | null;
    price0_not?: WeiSource | null;
    price0_gt?: WeiSource | null;
    price0_lt?: WeiSource | null;
    price0_gte?: WeiSource | null;
    price0_lte?: WeiSource | null;
    price0_in?: WeiSource[];
    price0_not_in?: WeiSource[];
    price1?: WeiSource | null;
    price1_not?: WeiSource | null;
    price1_gt?: WeiSource | null;
    price1_lt?: WeiSource | null;
    price1_gte?: WeiSource | null;
    price1_lte?: WeiSource | null;
    price1_in?: WeiSource[];
    price1_not_in?: WeiSource[];
    volumeToken0?: WeiSource | null;
    volumeToken0_not?: WeiSource | null;
    volumeToken0_gt?: WeiSource | null;
    volumeToken0_lt?: WeiSource | null;
    volumeToken0_gte?: WeiSource | null;
    volumeToken0_lte?: WeiSource | null;
    volumeToken0_in?: WeiSource[];
    volumeToken0_not_in?: WeiSource[];
    volumeToken1?: WeiSource | null;
    volumeToken1_not?: WeiSource | null;
    volumeToken1_gt?: WeiSource | null;
    volumeToken1_lt?: WeiSource | null;
    volumeToken1_gte?: WeiSource | null;
    volumeToken1_lte?: WeiSource | null;
    volumeToken1_in?: WeiSource[];
    volumeToken1_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    untrackedVolumeUSD?: WeiSource | null;
    untrackedVolumeUSD_not?: WeiSource | null;
    untrackedVolumeUSD_gt?: WeiSource | null;
    untrackedVolumeUSD_lt?: WeiSource | null;
    untrackedVolumeUSD_gte?: WeiSource | null;
    untrackedVolumeUSD_lte?: WeiSource | null;
    untrackedVolumeUSD_in?: WeiSource[];
    untrackedVolumeUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    collectedFeesToken0?: WeiSource | null;
    collectedFeesToken0_not?: WeiSource | null;
    collectedFeesToken0_gt?: WeiSource | null;
    collectedFeesToken0_lt?: WeiSource | null;
    collectedFeesToken0_gte?: WeiSource | null;
    collectedFeesToken0_lte?: WeiSource | null;
    collectedFeesToken0_in?: WeiSource[];
    collectedFeesToken0_not_in?: WeiSource[];
    collectedFeesToken1?: WeiSource | null;
    collectedFeesToken1_not?: WeiSource | null;
    collectedFeesToken1_gt?: WeiSource | null;
    collectedFeesToken1_lt?: WeiSource | null;
    collectedFeesToken1_gte?: WeiSource | null;
    collectedFeesToken1_lte?: WeiSource | null;
    collectedFeesToken1_in?: WeiSource[];
    collectedFeesToken1_not_in?: WeiSource[];
    collectedFeesUSD?: WeiSource | null;
    collectedFeesUSD_not?: WeiSource | null;
    collectedFeesUSD_gt?: WeiSource | null;
    collectedFeesUSD_lt?: WeiSource | null;
    collectedFeesUSD_gte?: WeiSource | null;
    collectedFeesUSD_lte?: WeiSource | null;
    collectedFeesUSD_in?: WeiSource[];
    collectedFeesUSD_not_in?: WeiSource[];
    createdAtTimestamp?: WeiSource | null;
    createdAtTimestamp_not?: WeiSource | null;
    createdAtTimestamp_gt?: WeiSource | null;
    createdAtTimestamp_lt?: WeiSource | null;
    createdAtTimestamp_gte?: WeiSource | null;
    createdAtTimestamp_lte?: WeiSource | null;
    createdAtTimestamp_in?: WeiSource[];
    createdAtTimestamp_not_in?: WeiSource[];
    createdAtBlockNumber?: WeiSource | null;
    createdAtBlockNumber_not?: WeiSource | null;
    createdAtBlockNumber_gt?: WeiSource | null;
    createdAtBlockNumber_lt?: WeiSource | null;
    createdAtBlockNumber_gte?: WeiSource | null;
    createdAtBlockNumber_lte?: WeiSource | null;
    createdAtBlockNumber_in?: WeiSource[];
    createdAtBlockNumber_not_in?: WeiSource[];
    liquidityProviderCount?: WeiSource | null;
    liquidityProviderCount_not?: WeiSource | null;
    liquidityProviderCount_gt?: WeiSource | null;
    liquidityProviderCount_lt?: WeiSource | null;
    liquidityProviderCount_gte?: WeiSource | null;
    liquidityProviderCount_lte?: WeiSource | null;
    liquidityProviderCount_in?: WeiSource[];
    liquidityProviderCount_not_in?: WeiSource[];
    feeGrowthOutside0X128?: WeiSource | null;
    feeGrowthOutside0X128_not?: WeiSource | null;
    feeGrowthOutside0X128_gt?: WeiSource | null;
    feeGrowthOutside0X128_lt?: WeiSource | null;
    feeGrowthOutside0X128_gte?: WeiSource | null;
    feeGrowthOutside0X128_lte?: WeiSource | null;
    feeGrowthOutside0X128_in?: WeiSource[];
    feeGrowthOutside0X128_not_in?: WeiSource[];
    feeGrowthOutside1X128?: WeiSource | null;
    feeGrowthOutside1X128_not?: WeiSource | null;
    feeGrowthOutside1X128_gt?: WeiSource | null;
    feeGrowthOutside1X128_lt?: WeiSource | null;
    feeGrowthOutside1X128_gte?: WeiSource | null;
    feeGrowthOutside1X128_lte?: WeiSource | null;
    feeGrowthOutside1X128_in?: WeiSource[];
    feeGrowthOutside1X128_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type TickResult = {
    id: string;
    poolAddress: string | null;
    tickIdx: Wei;
    pool: Partial<PoolResult>;
    liquidityGross: Wei;
    liquidityNet: Wei;
    price0: Wei;
    price1: Wei;
    volumeToken0: Wei;
    volumeToken1: Wei;
    volumeUSD: Wei;
    untrackedVolumeUSD: Wei;
    feesUSD: Wei;
    collectedFeesToken0: Wei;
    collectedFeesToken1: Wei;
    collectedFeesUSD: Wei;
    createdAtTimestamp: Wei;
    createdAtBlockNumber: Wei;
    liquidityProviderCount: Wei;
    feeGrowthOutside0X128: Wei;
    feeGrowthOutside1X128: Wei;
};
export type TickFields = {
    id: true;
    poolAddress: true;
    tickIdx: true;
    pool: PoolFields;
    liquidityGross: true;
    liquidityNet: true;
    price0: true;
    price1: true;
    volumeToken0: true;
    volumeToken1: true;
    volumeUSD: true;
    untrackedVolumeUSD: true;
    feesUSD: true;
    collectedFeesToken0: true;
    collectedFeesToken1: true;
    collectedFeesUSD: true;
    createdAtTimestamp: true;
    createdAtBlockNumber: true;
    liquidityProviderCount: true;
    feeGrowthOutside0X128: true;
    feeGrowthOutside1X128: true;
};
export type TickArgs<K extends keyof TickResult> = {
    [Property in keyof Pick<TickFields, K>]: TickFields[Property];
};
export const getTickById = async function <K extends keyof TickResult>(url: string, options: SingleQueryOptions, args: TickArgs<K>): Promise<Pick<TickResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("tick", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["poolAddress"])
        formattedObj["poolAddress"] = obj["poolAddress"];
    if (obj["tickIdx"])
        formattedObj["tickIdx"] = wei(obj["tickIdx"], 0);
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["liquidityGross"])
        formattedObj["liquidityGross"] = wei(obj["liquidityGross"], 0);
    if (obj["liquidityNet"])
        formattedObj["liquidityNet"] = wei(obj["liquidityNet"], 0);
    if (obj["price0"])
        formattedObj["price0"] = wei(obj["price0"]);
    if (obj["price1"])
        formattedObj["price1"] = wei(obj["price1"]);
    if (obj["volumeToken0"])
        formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
    if (obj["volumeToken1"])
        formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["untrackedVolumeUSD"])
        formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["collectedFeesToken0"])
        formattedObj["collectedFeesToken0"] = wei(obj["collectedFeesToken0"]);
    if (obj["collectedFeesToken1"])
        formattedObj["collectedFeesToken1"] = wei(obj["collectedFeesToken1"]);
    if (obj["collectedFeesUSD"])
        formattedObj["collectedFeesUSD"] = wei(obj["collectedFeesUSD"]);
    if (obj["createdAtTimestamp"])
        formattedObj["createdAtTimestamp"] = wei(obj["createdAtTimestamp"], 0);
    if (obj["createdAtBlockNumber"])
        formattedObj["createdAtBlockNumber"] = wei(obj["createdAtBlockNumber"], 0);
    if (obj["liquidityProviderCount"])
        formattedObj["liquidityProviderCount"] = wei(obj["liquidityProviderCount"], 0);
    if (obj["feeGrowthOutside0X128"])
        formattedObj["feeGrowthOutside0X128"] = wei(obj["feeGrowthOutside0X128"], 0);
    if (obj["feeGrowthOutside1X128"])
        formattedObj["feeGrowthOutside1X128"] = wei(obj["feeGrowthOutside1X128"], 0);
    return formattedObj as Pick<TickResult, K>;
};
export const getTicks = async function <K extends keyof TickResult>(url: string, options: MultiQueryOptions<TickFilter, TickResult>, args: TickArgs<K>): Promise<Pick<TickResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TickFilter, TickResult>> = { ...options };
    let paginationKey: keyof TickFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TickFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TickResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("ticks", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["poolAddress"])
                formattedObj["poolAddress"] = obj["poolAddress"];
            if (obj["tickIdx"])
                formattedObj["tickIdx"] = wei(obj["tickIdx"], 0);
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["liquidityGross"])
                formattedObj["liquidityGross"] = wei(obj["liquidityGross"], 0);
            if (obj["liquidityNet"])
                formattedObj["liquidityNet"] = wei(obj["liquidityNet"], 0);
            if (obj["price0"])
                formattedObj["price0"] = wei(obj["price0"]);
            if (obj["price1"])
                formattedObj["price1"] = wei(obj["price1"]);
            if (obj["volumeToken0"])
                formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
            if (obj["volumeToken1"])
                formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["untrackedVolumeUSD"])
                formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["collectedFeesToken0"])
                formattedObj["collectedFeesToken0"] = wei(obj["collectedFeesToken0"]);
            if (obj["collectedFeesToken1"])
                formattedObj["collectedFeesToken1"] = wei(obj["collectedFeesToken1"]);
            if (obj["collectedFeesUSD"])
                formattedObj["collectedFeesUSD"] = wei(obj["collectedFeesUSD"]);
            if (obj["createdAtTimestamp"])
                formattedObj["createdAtTimestamp"] = wei(obj["createdAtTimestamp"], 0);
            if (obj["createdAtBlockNumber"])
                formattedObj["createdAtBlockNumber"] = wei(obj["createdAtBlockNumber"], 0);
            if (obj["liquidityProviderCount"])
                formattedObj["liquidityProviderCount"] = wei(obj["liquidityProviderCount"], 0);
            if (obj["feeGrowthOutside0X128"])
                formattedObj["feeGrowthOutside0X128"] = wei(obj["feeGrowthOutside0X128"], 0);
            if (obj["feeGrowthOutside1X128"])
                formattedObj["feeGrowthOutside1X128"] = wei(obj["feeGrowthOutside1X128"], 0);
            return formattedObj as Pick<TickResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TickDayDataFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    date?: number | null;
    date_not?: number | null;
    date_gt?: number | null;
    date_lt?: number | null;
    date_gte?: number | null;
    date_lte?: number | null;
    date_in?: number[];
    date_not_in?: number[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    tick?: string | null;
    tick_not?: string | null;
    tick_gt?: string | null;
    tick_lt?: string | null;
    tick_gte?: string | null;
    tick_lte?: string | null;
    tick_in?: string[];
    tick_not_in?: string[];
    tick_contains?: string | null;
    tick_contains_nocase?: string | null;
    tick_not_contains?: string | null;
    tick_not_contains_nocase?: string | null;
    tick_starts_with?: string | null;
    tick_starts_with_nocase?: string | null;
    tick_not_starts_with?: string | null;
    tick_not_starts_with_nocase?: string | null;
    tick_ends_with?: string | null;
    tick_ends_with_nocase?: string | null;
    tick_not_ends_with?: string | null;
    tick_not_ends_with_nocase?: string | null;
    tick_?: Tick_filterFilter | null;
    liquidityGross?: WeiSource | null;
    liquidityGross_not?: WeiSource | null;
    liquidityGross_gt?: WeiSource | null;
    liquidityGross_lt?: WeiSource | null;
    liquidityGross_gte?: WeiSource | null;
    liquidityGross_lte?: WeiSource | null;
    liquidityGross_in?: WeiSource[];
    liquidityGross_not_in?: WeiSource[];
    liquidityNet?: WeiSource | null;
    liquidityNet_not?: WeiSource | null;
    liquidityNet_gt?: WeiSource | null;
    liquidityNet_lt?: WeiSource | null;
    liquidityNet_gte?: WeiSource | null;
    liquidityNet_lte?: WeiSource | null;
    liquidityNet_in?: WeiSource[];
    liquidityNet_not_in?: WeiSource[];
    volumeToken0?: WeiSource | null;
    volumeToken0_not?: WeiSource | null;
    volumeToken0_gt?: WeiSource | null;
    volumeToken0_lt?: WeiSource | null;
    volumeToken0_gte?: WeiSource | null;
    volumeToken0_lte?: WeiSource | null;
    volumeToken0_in?: WeiSource[];
    volumeToken0_not_in?: WeiSource[];
    volumeToken1?: WeiSource | null;
    volumeToken1_not?: WeiSource | null;
    volumeToken1_gt?: WeiSource | null;
    volumeToken1_lt?: WeiSource | null;
    volumeToken1_gte?: WeiSource | null;
    volumeToken1_lte?: WeiSource | null;
    volumeToken1_in?: WeiSource[];
    volumeToken1_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    feeGrowthOutside0X128?: WeiSource | null;
    feeGrowthOutside0X128_not?: WeiSource | null;
    feeGrowthOutside0X128_gt?: WeiSource | null;
    feeGrowthOutside0X128_lt?: WeiSource | null;
    feeGrowthOutside0X128_gte?: WeiSource | null;
    feeGrowthOutside0X128_lte?: WeiSource | null;
    feeGrowthOutside0X128_in?: WeiSource[];
    feeGrowthOutside0X128_not_in?: WeiSource[];
    feeGrowthOutside1X128?: WeiSource | null;
    feeGrowthOutside1X128_not?: WeiSource | null;
    feeGrowthOutside1X128_gt?: WeiSource | null;
    feeGrowthOutside1X128_lt?: WeiSource | null;
    feeGrowthOutside1X128_gte?: WeiSource | null;
    feeGrowthOutside1X128_lte?: WeiSource | null;
    feeGrowthOutside1X128_in?: WeiSource[];
    feeGrowthOutside1X128_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type TickDayDataResult = {
    id: string;
    date: number;
    pool: Partial<PoolResult>;
    tick: Partial<TickResult>;
    liquidityGross: Wei;
    liquidityNet: Wei;
    volumeToken0: Wei;
    volumeToken1: Wei;
    volumeUSD: Wei;
    feesUSD: Wei;
    feeGrowthOutside0X128: Wei;
    feeGrowthOutside1X128: Wei;
};
export type TickDayDataFields = {
    id: true;
    date: true;
    pool: PoolFields;
    tick: TickFields;
    liquidityGross: true;
    liquidityNet: true;
    volumeToken0: true;
    volumeToken1: true;
    volumeUSD: true;
    feesUSD: true;
    feeGrowthOutside0X128: true;
    feeGrowthOutside1X128: true;
};
export type TickDayDataArgs<K extends keyof TickDayDataResult> = {
    [Property in keyof Pick<TickDayDataFields, K>]: TickDayDataFields[Property];
};
export const getTickDayDataById = async function <K extends keyof TickDayDataResult>(url: string, options: SingleQueryOptions, args: TickDayDataArgs<K>): Promise<Pick<TickDayDataResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("tickDayData", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["date"])
        formattedObj["date"] = obj["date"];
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["tick"])
        formattedObj["tick"] = obj["tick"];
    if (obj["liquidityGross"])
        formattedObj["liquidityGross"] = wei(obj["liquidityGross"], 0);
    if (obj["liquidityNet"])
        formattedObj["liquidityNet"] = wei(obj["liquidityNet"], 0);
    if (obj["volumeToken0"])
        formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
    if (obj["volumeToken1"])
        formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["feeGrowthOutside0X128"])
        formattedObj["feeGrowthOutside0X128"] = wei(obj["feeGrowthOutside0X128"], 0);
    if (obj["feeGrowthOutside1X128"])
        formattedObj["feeGrowthOutside1X128"] = wei(obj["feeGrowthOutside1X128"], 0);
    return formattedObj as Pick<TickDayDataResult, K>;
};
export const getTickDayDatas = async function <K extends keyof TickDayDataResult>(url: string, options: MultiQueryOptions<TickDayDataFilter, TickDayDataResult>, args: TickDayDataArgs<K>): Promise<Pick<TickDayDataResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TickDayDataFilter, TickDayDataResult>> = { ...options };
    let paginationKey: keyof TickDayDataFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TickDayDataFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TickDayDataResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("tickDayDatas", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["date"])
                formattedObj["date"] = obj["date"];
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["tick"])
                formattedObj["tick"] = obj["tick"];
            if (obj["liquidityGross"])
                formattedObj["liquidityGross"] = wei(obj["liquidityGross"], 0);
            if (obj["liquidityNet"])
                formattedObj["liquidityNet"] = wei(obj["liquidityNet"], 0);
            if (obj["volumeToken0"])
                formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
            if (obj["volumeToken1"])
                formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["feeGrowthOutside0X128"])
                formattedObj["feeGrowthOutside0X128"] = wei(obj["feeGrowthOutside0X128"], 0);
            if (obj["feeGrowthOutside1X128"])
                formattedObj["feeGrowthOutside1X128"] = wei(obj["feeGrowthOutside1X128"], 0);
            return formattedObj as Pick<TickDayDataResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TickHourDataFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    periodStartUnix?: number | null;
    periodStartUnix_not?: number | null;
    periodStartUnix_gt?: number | null;
    periodStartUnix_lt?: number | null;
    periodStartUnix_gte?: number | null;
    periodStartUnix_lte?: number | null;
    periodStartUnix_in?: number[];
    periodStartUnix_not_in?: number[];
    pool?: string | null;
    pool_not?: string | null;
    pool_gt?: string | null;
    pool_lt?: string | null;
    pool_gte?: string | null;
    pool_lte?: string | null;
    pool_in?: string[];
    pool_not_in?: string[];
    pool_contains?: string | null;
    pool_contains_nocase?: string | null;
    pool_not_contains?: string | null;
    pool_not_contains_nocase?: string | null;
    pool_starts_with?: string | null;
    pool_starts_with_nocase?: string | null;
    pool_not_starts_with?: string | null;
    pool_not_starts_with_nocase?: string | null;
    pool_ends_with?: string | null;
    pool_ends_with_nocase?: string | null;
    pool_not_ends_with?: string | null;
    pool_not_ends_with_nocase?: string | null;
    pool_?: Pool_filterFilter | null;
    tick?: string | null;
    tick_not?: string | null;
    tick_gt?: string | null;
    tick_lt?: string | null;
    tick_gte?: string | null;
    tick_lte?: string | null;
    tick_in?: string[];
    tick_not_in?: string[];
    tick_contains?: string | null;
    tick_contains_nocase?: string | null;
    tick_not_contains?: string | null;
    tick_not_contains_nocase?: string | null;
    tick_starts_with?: string | null;
    tick_starts_with_nocase?: string | null;
    tick_not_starts_with?: string | null;
    tick_not_starts_with_nocase?: string | null;
    tick_ends_with?: string | null;
    tick_ends_with_nocase?: string | null;
    tick_not_ends_with?: string | null;
    tick_not_ends_with_nocase?: string | null;
    tick_?: Tick_filterFilter | null;
    liquidityGross?: WeiSource | null;
    liquidityGross_not?: WeiSource | null;
    liquidityGross_gt?: WeiSource | null;
    liquidityGross_lt?: WeiSource | null;
    liquidityGross_gte?: WeiSource | null;
    liquidityGross_lte?: WeiSource | null;
    liquidityGross_in?: WeiSource[];
    liquidityGross_not_in?: WeiSource[];
    liquidityNet?: WeiSource | null;
    liquidityNet_not?: WeiSource | null;
    liquidityNet_gt?: WeiSource | null;
    liquidityNet_lt?: WeiSource | null;
    liquidityNet_gte?: WeiSource | null;
    liquidityNet_lte?: WeiSource | null;
    liquidityNet_in?: WeiSource[];
    liquidityNet_not_in?: WeiSource[];
    volumeToken0?: WeiSource | null;
    volumeToken0_not?: WeiSource | null;
    volumeToken0_gt?: WeiSource | null;
    volumeToken0_lt?: WeiSource | null;
    volumeToken0_gte?: WeiSource | null;
    volumeToken0_lte?: WeiSource | null;
    volumeToken0_in?: WeiSource[];
    volumeToken0_not_in?: WeiSource[];
    volumeToken1?: WeiSource | null;
    volumeToken1_not?: WeiSource | null;
    volumeToken1_gt?: WeiSource | null;
    volumeToken1_lt?: WeiSource | null;
    volumeToken1_gte?: WeiSource | null;
    volumeToken1_lte?: WeiSource | null;
    volumeToken1_in?: WeiSource[];
    volumeToken1_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type TickHourDataResult = {
    id: string;
    periodStartUnix: number;
    pool: Partial<PoolResult>;
    tick: Partial<TickResult>;
    liquidityGross: Wei;
    liquidityNet: Wei;
    volumeToken0: Wei;
    volumeToken1: Wei;
    volumeUSD: Wei;
    feesUSD: Wei;
};
export type TickHourDataFields = {
    id: true;
    periodStartUnix: true;
    pool: PoolFields;
    tick: TickFields;
    liquidityGross: true;
    liquidityNet: true;
    volumeToken0: true;
    volumeToken1: true;
    volumeUSD: true;
    feesUSD: true;
};
export type TickHourDataArgs<K extends keyof TickHourDataResult> = {
    [Property in keyof Pick<TickHourDataFields, K>]: TickHourDataFields[Property];
};
export const getTickHourDataById = async function <K extends keyof TickHourDataResult>(url: string, options: SingleQueryOptions, args: TickHourDataArgs<K>): Promise<Pick<TickHourDataResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("tickHourData", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["periodStartUnix"])
        formattedObj["periodStartUnix"] = obj["periodStartUnix"];
    if (obj["pool"])
        formattedObj["pool"] = obj["pool"];
    if (obj["tick"])
        formattedObj["tick"] = obj["tick"];
    if (obj["liquidityGross"])
        formattedObj["liquidityGross"] = wei(obj["liquidityGross"], 0);
    if (obj["liquidityNet"])
        formattedObj["liquidityNet"] = wei(obj["liquidityNet"], 0);
    if (obj["volumeToken0"])
        formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
    if (obj["volumeToken1"])
        formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    return formattedObj as Pick<TickHourDataResult, K>;
};
export const getTickHourDatas = async function <K extends keyof TickHourDataResult>(url: string, options: MultiQueryOptions<TickHourDataFilter, TickHourDataResult>, args: TickHourDataArgs<K>): Promise<Pick<TickHourDataResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TickHourDataFilter, TickHourDataResult>> = { ...options };
    let paginationKey: keyof TickHourDataFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TickHourDataFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TickHourDataResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("tickHourDatas", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["periodStartUnix"])
                formattedObj["periodStartUnix"] = obj["periodStartUnix"];
            if (obj["pool"])
                formattedObj["pool"] = obj["pool"];
            if (obj["tick"])
                formattedObj["tick"] = obj["tick"];
            if (obj["liquidityGross"])
                formattedObj["liquidityGross"] = wei(obj["liquidityGross"], 0);
            if (obj["liquidityNet"])
                formattedObj["liquidityNet"] = wei(obj["liquidityNet"], 0);
            if (obj["volumeToken0"])
                formattedObj["volumeToken0"] = wei(obj["volumeToken0"]);
            if (obj["volumeToken1"])
                formattedObj["volumeToken1"] = wei(obj["volumeToken1"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            return formattedObj as Pick<TickHourDataResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TokenFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    symbol?: string | null;
    symbol_not?: string | null;
    symbol_gt?: string | null;
    symbol_lt?: string | null;
    symbol_gte?: string | null;
    symbol_lte?: string | null;
    symbol_in?: string[];
    symbol_not_in?: string[];
    symbol_contains?: string | null;
    symbol_contains_nocase?: string | null;
    symbol_not_contains?: string | null;
    symbol_not_contains_nocase?: string | null;
    symbol_starts_with?: string | null;
    symbol_starts_with_nocase?: string | null;
    symbol_not_starts_with?: string | null;
    symbol_not_starts_with_nocase?: string | null;
    symbol_ends_with?: string | null;
    symbol_ends_with_nocase?: string | null;
    symbol_not_ends_with?: string | null;
    symbol_not_ends_with_nocase?: string | null;
    name?: string | null;
    name_not?: string | null;
    name_gt?: string | null;
    name_lt?: string | null;
    name_gte?: string | null;
    name_lte?: string | null;
    name_in?: string[];
    name_not_in?: string[];
    name_contains?: string | null;
    name_contains_nocase?: string | null;
    name_not_contains?: string | null;
    name_not_contains_nocase?: string | null;
    name_starts_with?: string | null;
    name_starts_with_nocase?: string | null;
    name_not_starts_with?: string | null;
    name_not_starts_with_nocase?: string | null;
    name_ends_with?: string | null;
    name_ends_with_nocase?: string | null;
    name_not_ends_with?: string | null;
    name_not_ends_with_nocase?: string | null;
    decimals?: WeiSource | null;
    decimals_not?: WeiSource | null;
    decimals_gt?: WeiSource | null;
    decimals_lt?: WeiSource | null;
    decimals_gte?: WeiSource | null;
    decimals_lte?: WeiSource | null;
    decimals_in?: WeiSource[];
    decimals_not_in?: WeiSource[];
    totalSupply?: WeiSource | null;
    totalSupply_not?: WeiSource | null;
    totalSupply_gt?: WeiSource | null;
    totalSupply_lt?: WeiSource | null;
    totalSupply_gte?: WeiSource | null;
    totalSupply_lte?: WeiSource | null;
    totalSupply_in?: WeiSource[];
    totalSupply_not_in?: WeiSource[];
    volume?: WeiSource | null;
    volume_not?: WeiSource | null;
    volume_gt?: WeiSource | null;
    volume_lt?: WeiSource | null;
    volume_gte?: WeiSource | null;
    volume_lte?: WeiSource | null;
    volume_in?: WeiSource[];
    volume_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    untrackedVolumeUSD?: WeiSource | null;
    untrackedVolumeUSD_not?: WeiSource | null;
    untrackedVolumeUSD_gt?: WeiSource | null;
    untrackedVolumeUSD_lt?: WeiSource | null;
    untrackedVolumeUSD_gte?: WeiSource | null;
    untrackedVolumeUSD_lte?: WeiSource | null;
    untrackedVolumeUSD_in?: WeiSource[];
    untrackedVolumeUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    txCount?: WeiSource | null;
    txCount_not?: WeiSource | null;
    txCount_gt?: WeiSource | null;
    txCount_lt?: WeiSource | null;
    txCount_gte?: WeiSource | null;
    txCount_lte?: WeiSource | null;
    txCount_in?: WeiSource[];
    txCount_not_in?: WeiSource[];
    poolCount?: WeiSource | null;
    poolCount_not?: WeiSource | null;
    poolCount_gt?: WeiSource | null;
    poolCount_lt?: WeiSource | null;
    poolCount_gte?: WeiSource | null;
    poolCount_lte?: WeiSource | null;
    poolCount_in?: WeiSource[];
    poolCount_not_in?: WeiSource[];
    totalValueLocked?: WeiSource | null;
    totalValueLocked_not?: WeiSource | null;
    totalValueLocked_gt?: WeiSource | null;
    totalValueLocked_lt?: WeiSource | null;
    totalValueLocked_gte?: WeiSource | null;
    totalValueLocked_lte?: WeiSource | null;
    totalValueLocked_in?: WeiSource[];
    totalValueLocked_not_in?: WeiSource[];
    totalValueLockedUSD?: WeiSource | null;
    totalValueLockedUSD_not?: WeiSource | null;
    totalValueLockedUSD_gt?: WeiSource | null;
    totalValueLockedUSD_lt?: WeiSource | null;
    totalValueLockedUSD_gte?: WeiSource | null;
    totalValueLockedUSD_lte?: WeiSource | null;
    totalValueLockedUSD_in?: WeiSource[];
    totalValueLockedUSD_not_in?: WeiSource[];
    totalValueLockedUSDUntracked?: WeiSource | null;
    totalValueLockedUSDUntracked_not?: WeiSource | null;
    totalValueLockedUSDUntracked_gt?: WeiSource | null;
    totalValueLockedUSDUntracked_lt?: WeiSource | null;
    totalValueLockedUSDUntracked_gte?: WeiSource | null;
    totalValueLockedUSDUntracked_lte?: WeiSource | null;
    totalValueLockedUSDUntracked_in?: WeiSource[];
    totalValueLockedUSDUntracked_not_in?: WeiSource[];
    derivedETH?: WeiSource | null;
    derivedETH_not?: WeiSource | null;
    derivedETH_gt?: WeiSource | null;
    derivedETH_lt?: WeiSource | null;
    derivedETH_gte?: WeiSource | null;
    derivedETH_lte?: WeiSource | null;
    derivedETH_in?: WeiSource[];
    derivedETH_not_in?: WeiSource[];
    whitelistPools?: string[];
    whitelistPools_not?: string[];
    whitelistPools_contains?: string[];
    whitelistPools_contains_nocase?: string[];
    whitelistPools_not_contains?: string[];
    whitelistPools_not_contains_nocase?: string[];
    whitelistPools_?: Pool_filterFilter | null;
    tokenDayData_?: TokenDayData_filterFilter | null;
    _change_block?: BlockChangedFilterFilter | null;
};
export type TokenResult = {
    id: string;
    symbol: string;
    name: string;
    decimals: Wei;
    totalSupply: Wei;
    volume: Wei;
    volumeUSD: Wei;
    untrackedVolumeUSD: Wei;
    feesUSD: Wei;
    txCount: Wei;
    poolCount: Wei;
    totalValueLocked: Wei;
    totalValueLockedUSD: Wei;
    totalValueLockedUSDUntracked: Wei;
    derivedETH: Wei;
    whitelistPools: Partial<PoolResult>[];
    tokenDayData: Partial<TokenDayDataResult>[];
};
export type TokenFields = {
    id: true;
    symbol: true;
    name: true;
    decimals: true;
    totalSupply: true;
    volume: true;
    volumeUSD: true;
    untrackedVolumeUSD: true;
    feesUSD: true;
    txCount: true;
    poolCount: true;
    totalValueLocked: true;
    totalValueLockedUSD: true;
    totalValueLockedUSDUntracked: true;
    derivedETH: true;
    whitelistPools: PoolFields;
    tokenDayData: TokenDayDataFields;
};
export type TokenArgs<K extends keyof TokenResult> = {
    [Property in keyof Pick<TokenFields, K>]: TokenFields[Property];
};
export const getTokenById = async function <K extends keyof TokenResult>(url: string, options: SingleQueryOptions, args: TokenArgs<K>): Promise<Pick<TokenResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("token", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["symbol"])
        formattedObj["symbol"] = obj["symbol"];
    if (obj["name"])
        formattedObj["name"] = obj["name"];
    if (obj["decimals"])
        formattedObj["decimals"] = wei(obj["decimals"], 0);
    if (obj["totalSupply"])
        formattedObj["totalSupply"] = wei(obj["totalSupply"], 0);
    if (obj["volume"])
        formattedObj["volume"] = wei(obj["volume"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["untrackedVolumeUSD"])
        formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["txCount"])
        formattedObj["txCount"] = wei(obj["txCount"], 0);
    if (obj["poolCount"])
        formattedObj["poolCount"] = wei(obj["poolCount"], 0);
    if (obj["totalValueLocked"])
        formattedObj["totalValueLocked"] = wei(obj["totalValueLocked"]);
    if (obj["totalValueLockedUSD"])
        formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
    if (obj["totalValueLockedUSDUntracked"])
        formattedObj["totalValueLockedUSDUntracked"] = wei(obj["totalValueLockedUSDUntracked"]);
    if (obj["derivedETH"])
        formattedObj["derivedETH"] = wei(obj["derivedETH"]);
    if (obj["whitelistPools"])
        formattedObj["whitelistPools"] = obj["whitelistPools"];
    if (obj["tokenDayData"])
        formattedObj["tokenDayData"] = obj["tokenDayData"];
    return formattedObj as Pick<TokenResult, K>;
};
export const getTokens = async function <K extends keyof TokenResult>(url: string, options: MultiQueryOptions<TokenFilter, TokenResult>, args: TokenArgs<K>): Promise<Pick<TokenResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TokenFilter, TokenResult>> = { ...options };
    let paginationKey: keyof TokenFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TokenFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TokenResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("tokens", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["symbol"])
                formattedObj["symbol"] = obj["symbol"];
            if (obj["name"])
                formattedObj["name"] = obj["name"];
            if (obj["decimals"])
                formattedObj["decimals"] = wei(obj["decimals"], 0);
            if (obj["totalSupply"])
                formattedObj["totalSupply"] = wei(obj["totalSupply"], 0);
            if (obj["volume"])
                formattedObj["volume"] = wei(obj["volume"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["untrackedVolumeUSD"])
                formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["txCount"])
                formattedObj["txCount"] = wei(obj["txCount"], 0);
            if (obj["poolCount"])
                formattedObj["poolCount"] = wei(obj["poolCount"], 0);
            if (obj["totalValueLocked"])
                formattedObj["totalValueLocked"] = wei(obj["totalValueLocked"]);
            if (obj["totalValueLockedUSD"])
                formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
            if (obj["totalValueLockedUSDUntracked"])
                formattedObj["totalValueLockedUSDUntracked"] = wei(obj["totalValueLockedUSDUntracked"]);
            if (obj["derivedETH"])
                formattedObj["derivedETH"] = wei(obj["derivedETH"]);
            if (obj["whitelistPools"])
                formattedObj["whitelistPools"] = obj["whitelistPools"];
            if (obj["tokenDayData"])
                formattedObj["tokenDayData"] = obj["tokenDayData"];
            return formattedObj as Pick<TokenResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TokenDayDataFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    date?: number | null;
    date_not?: number | null;
    date_gt?: number | null;
    date_lt?: number | null;
    date_gte?: number | null;
    date_lte?: number | null;
    date_in?: number[];
    date_not_in?: number[];
    token?: string | null;
    token_not?: string | null;
    token_gt?: string | null;
    token_lt?: string | null;
    token_gte?: string | null;
    token_lte?: string | null;
    token_in?: string[];
    token_not_in?: string[];
    token_contains?: string | null;
    token_contains_nocase?: string | null;
    token_not_contains?: string | null;
    token_not_contains_nocase?: string | null;
    token_starts_with?: string | null;
    token_starts_with_nocase?: string | null;
    token_not_starts_with?: string | null;
    token_not_starts_with_nocase?: string | null;
    token_ends_with?: string | null;
    token_ends_with_nocase?: string | null;
    token_not_ends_with?: string | null;
    token_not_ends_with_nocase?: string | null;
    token_?: Token_filterFilter | null;
    volume?: WeiSource | null;
    volume_not?: WeiSource | null;
    volume_gt?: WeiSource | null;
    volume_lt?: WeiSource | null;
    volume_gte?: WeiSource | null;
    volume_lte?: WeiSource | null;
    volume_in?: WeiSource[];
    volume_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    untrackedVolumeUSD?: WeiSource | null;
    untrackedVolumeUSD_not?: WeiSource | null;
    untrackedVolumeUSD_gt?: WeiSource | null;
    untrackedVolumeUSD_lt?: WeiSource | null;
    untrackedVolumeUSD_gte?: WeiSource | null;
    untrackedVolumeUSD_lte?: WeiSource | null;
    untrackedVolumeUSD_in?: WeiSource[];
    untrackedVolumeUSD_not_in?: WeiSource[];
    totalValueLocked?: WeiSource | null;
    totalValueLocked_not?: WeiSource | null;
    totalValueLocked_gt?: WeiSource | null;
    totalValueLocked_lt?: WeiSource | null;
    totalValueLocked_gte?: WeiSource | null;
    totalValueLocked_lte?: WeiSource | null;
    totalValueLocked_in?: WeiSource[];
    totalValueLocked_not_in?: WeiSource[];
    totalValueLockedUSD?: WeiSource | null;
    totalValueLockedUSD_not?: WeiSource | null;
    totalValueLockedUSD_gt?: WeiSource | null;
    totalValueLockedUSD_lt?: WeiSource | null;
    totalValueLockedUSD_gte?: WeiSource | null;
    totalValueLockedUSD_lte?: WeiSource | null;
    totalValueLockedUSD_in?: WeiSource[];
    totalValueLockedUSD_not_in?: WeiSource[];
    priceUSD?: WeiSource | null;
    priceUSD_not?: WeiSource | null;
    priceUSD_gt?: WeiSource | null;
    priceUSD_lt?: WeiSource | null;
    priceUSD_gte?: WeiSource | null;
    priceUSD_lte?: WeiSource | null;
    priceUSD_in?: WeiSource[];
    priceUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    open?: WeiSource | null;
    open_not?: WeiSource | null;
    open_gt?: WeiSource | null;
    open_lt?: WeiSource | null;
    open_gte?: WeiSource | null;
    open_lte?: WeiSource | null;
    open_in?: WeiSource[];
    open_not_in?: WeiSource[];
    high?: WeiSource | null;
    high_not?: WeiSource | null;
    high_gt?: WeiSource | null;
    high_lt?: WeiSource | null;
    high_gte?: WeiSource | null;
    high_lte?: WeiSource | null;
    high_in?: WeiSource[];
    high_not_in?: WeiSource[];
    low?: WeiSource | null;
    low_not?: WeiSource | null;
    low_gt?: WeiSource | null;
    low_lt?: WeiSource | null;
    low_gte?: WeiSource | null;
    low_lte?: WeiSource | null;
    low_in?: WeiSource[];
    low_not_in?: WeiSource[];
    close?: WeiSource | null;
    close_not?: WeiSource | null;
    close_gt?: WeiSource | null;
    close_lt?: WeiSource | null;
    close_gte?: WeiSource | null;
    close_lte?: WeiSource | null;
    close_in?: WeiSource[];
    close_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type TokenDayDataResult = {
    id: string;
    date: number;
    token: Partial<TokenResult>;
    volume: Wei;
    volumeUSD: Wei;
    untrackedVolumeUSD: Wei;
    totalValueLocked: Wei;
    totalValueLockedUSD: Wei;
    priceUSD: Wei;
    feesUSD: Wei;
    open: Wei;
    high: Wei;
    low: Wei;
    close: Wei;
};
export type TokenDayDataFields = {
    id: true;
    date: true;
    token: TokenFields;
    volume: true;
    volumeUSD: true;
    untrackedVolumeUSD: true;
    totalValueLocked: true;
    totalValueLockedUSD: true;
    priceUSD: true;
    feesUSD: true;
    open: true;
    high: true;
    low: true;
    close: true;
};
export type TokenDayDataArgs<K extends keyof TokenDayDataResult> = {
    [Property in keyof Pick<TokenDayDataFields, K>]: TokenDayDataFields[Property];
};
export const getTokenDayDataById = async function <K extends keyof TokenDayDataResult>(url: string, options: SingleQueryOptions, args: TokenDayDataArgs<K>): Promise<Pick<TokenDayDataResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("tokenDayData", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["date"])
        formattedObj["date"] = obj["date"];
    if (obj["token"])
        formattedObj["token"] = obj["token"];
    if (obj["volume"])
        formattedObj["volume"] = wei(obj["volume"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["untrackedVolumeUSD"])
        formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
    if (obj["totalValueLocked"])
        formattedObj["totalValueLocked"] = wei(obj["totalValueLocked"]);
    if (obj["totalValueLockedUSD"])
        formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
    if (obj["priceUSD"])
        formattedObj["priceUSD"] = wei(obj["priceUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["open"])
        formattedObj["open"] = wei(obj["open"]);
    if (obj["high"])
        formattedObj["high"] = wei(obj["high"]);
    if (obj["low"])
        formattedObj["low"] = wei(obj["low"]);
    if (obj["close"])
        formattedObj["close"] = wei(obj["close"]);
    return formattedObj as Pick<TokenDayDataResult, K>;
};
export const getTokenDayDatas = async function <K extends keyof TokenDayDataResult>(url: string, options: MultiQueryOptions<TokenDayDataFilter, TokenDayDataResult>, args: TokenDayDataArgs<K>): Promise<Pick<TokenDayDataResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TokenDayDataFilter, TokenDayDataResult>> = { ...options };
    let paginationKey: keyof TokenDayDataFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TokenDayDataFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TokenDayDataResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("tokenDayDatas", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["date"])
                formattedObj["date"] = obj["date"];
            if (obj["token"])
                formattedObj["token"] = obj["token"];
            if (obj["volume"])
                formattedObj["volume"] = wei(obj["volume"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["untrackedVolumeUSD"])
                formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
            if (obj["totalValueLocked"])
                formattedObj["totalValueLocked"] = wei(obj["totalValueLocked"]);
            if (obj["totalValueLockedUSD"])
                formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
            if (obj["priceUSD"])
                formattedObj["priceUSD"] = wei(obj["priceUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["open"])
                formattedObj["open"] = wei(obj["open"]);
            if (obj["high"])
                formattedObj["high"] = wei(obj["high"]);
            if (obj["low"])
                formattedObj["low"] = wei(obj["low"]);
            if (obj["close"])
                formattedObj["close"] = wei(obj["close"]);
            return formattedObj as Pick<TokenDayDataResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TokenHourDataFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    periodStartUnix?: number | null;
    periodStartUnix_not?: number | null;
    periodStartUnix_gt?: number | null;
    periodStartUnix_lt?: number | null;
    periodStartUnix_gte?: number | null;
    periodStartUnix_lte?: number | null;
    periodStartUnix_in?: number[];
    periodStartUnix_not_in?: number[];
    token?: string | null;
    token_not?: string | null;
    token_gt?: string | null;
    token_lt?: string | null;
    token_gte?: string | null;
    token_lte?: string | null;
    token_in?: string[];
    token_not_in?: string[];
    token_contains?: string | null;
    token_contains_nocase?: string | null;
    token_not_contains?: string | null;
    token_not_contains_nocase?: string | null;
    token_starts_with?: string | null;
    token_starts_with_nocase?: string | null;
    token_not_starts_with?: string | null;
    token_not_starts_with_nocase?: string | null;
    token_ends_with?: string | null;
    token_ends_with_nocase?: string | null;
    token_not_ends_with?: string | null;
    token_not_ends_with_nocase?: string | null;
    token_?: Token_filterFilter | null;
    volume?: WeiSource | null;
    volume_not?: WeiSource | null;
    volume_gt?: WeiSource | null;
    volume_lt?: WeiSource | null;
    volume_gte?: WeiSource | null;
    volume_lte?: WeiSource | null;
    volume_in?: WeiSource[];
    volume_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    untrackedVolumeUSD?: WeiSource | null;
    untrackedVolumeUSD_not?: WeiSource | null;
    untrackedVolumeUSD_gt?: WeiSource | null;
    untrackedVolumeUSD_lt?: WeiSource | null;
    untrackedVolumeUSD_gte?: WeiSource | null;
    untrackedVolumeUSD_lte?: WeiSource | null;
    untrackedVolumeUSD_in?: WeiSource[];
    untrackedVolumeUSD_not_in?: WeiSource[];
    totalValueLocked?: WeiSource | null;
    totalValueLocked_not?: WeiSource | null;
    totalValueLocked_gt?: WeiSource | null;
    totalValueLocked_lt?: WeiSource | null;
    totalValueLocked_gte?: WeiSource | null;
    totalValueLocked_lte?: WeiSource | null;
    totalValueLocked_in?: WeiSource[];
    totalValueLocked_not_in?: WeiSource[];
    totalValueLockedUSD?: WeiSource | null;
    totalValueLockedUSD_not?: WeiSource | null;
    totalValueLockedUSD_gt?: WeiSource | null;
    totalValueLockedUSD_lt?: WeiSource | null;
    totalValueLockedUSD_gte?: WeiSource | null;
    totalValueLockedUSD_lte?: WeiSource | null;
    totalValueLockedUSD_in?: WeiSource[];
    totalValueLockedUSD_not_in?: WeiSource[];
    priceUSD?: WeiSource | null;
    priceUSD_not?: WeiSource | null;
    priceUSD_gt?: WeiSource | null;
    priceUSD_lt?: WeiSource | null;
    priceUSD_gte?: WeiSource | null;
    priceUSD_lte?: WeiSource | null;
    priceUSD_in?: WeiSource[];
    priceUSD_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    open?: WeiSource | null;
    open_not?: WeiSource | null;
    open_gt?: WeiSource | null;
    open_lt?: WeiSource | null;
    open_gte?: WeiSource | null;
    open_lte?: WeiSource | null;
    open_in?: WeiSource[];
    open_not_in?: WeiSource[];
    high?: WeiSource | null;
    high_not?: WeiSource | null;
    high_gt?: WeiSource | null;
    high_lt?: WeiSource | null;
    high_gte?: WeiSource | null;
    high_lte?: WeiSource | null;
    high_in?: WeiSource[];
    high_not_in?: WeiSource[];
    low?: WeiSource | null;
    low_not?: WeiSource | null;
    low_gt?: WeiSource | null;
    low_lt?: WeiSource | null;
    low_gte?: WeiSource | null;
    low_lte?: WeiSource | null;
    low_in?: WeiSource[];
    low_not_in?: WeiSource[];
    close?: WeiSource | null;
    close_not?: WeiSource | null;
    close_gt?: WeiSource | null;
    close_lt?: WeiSource | null;
    close_gte?: WeiSource | null;
    close_lte?: WeiSource | null;
    close_in?: WeiSource[];
    close_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type TokenHourDataResult = {
    id: string;
    periodStartUnix: number;
    token: Partial<TokenResult>;
    volume: Wei;
    volumeUSD: Wei;
    untrackedVolumeUSD: Wei;
    totalValueLocked: Wei;
    totalValueLockedUSD: Wei;
    priceUSD: Wei;
    feesUSD: Wei;
    open: Wei;
    high: Wei;
    low: Wei;
    close: Wei;
};
export type TokenHourDataFields = {
    id: true;
    periodStartUnix: true;
    token: TokenFields;
    volume: true;
    volumeUSD: true;
    untrackedVolumeUSD: true;
    totalValueLocked: true;
    totalValueLockedUSD: true;
    priceUSD: true;
    feesUSD: true;
    open: true;
    high: true;
    low: true;
    close: true;
};
export type TokenHourDataArgs<K extends keyof TokenHourDataResult> = {
    [Property in keyof Pick<TokenHourDataFields, K>]: TokenHourDataFields[Property];
};
export const getTokenHourDataById = async function <K extends keyof TokenHourDataResult>(url: string, options: SingleQueryOptions, args: TokenHourDataArgs<K>): Promise<Pick<TokenHourDataResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("tokenHourData", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["periodStartUnix"])
        formattedObj["periodStartUnix"] = obj["periodStartUnix"];
    if (obj["token"])
        formattedObj["token"] = obj["token"];
    if (obj["volume"])
        formattedObj["volume"] = wei(obj["volume"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["untrackedVolumeUSD"])
        formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
    if (obj["totalValueLocked"])
        formattedObj["totalValueLocked"] = wei(obj["totalValueLocked"]);
    if (obj["totalValueLockedUSD"])
        formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
    if (obj["priceUSD"])
        formattedObj["priceUSD"] = wei(obj["priceUSD"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["open"])
        formattedObj["open"] = wei(obj["open"]);
    if (obj["high"])
        formattedObj["high"] = wei(obj["high"]);
    if (obj["low"])
        formattedObj["low"] = wei(obj["low"]);
    if (obj["close"])
        formattedObj["close"] = wei(obj["close"]);
    return formattedObj as Pick<TokenHourDataResult, K>;
};
export const getTokenHourDatas = async function <K extends keyof TokenHourDataResult>(url: string, options: MultiQueryOptions<TokenHourDataFilter, TokenHourDataResult>, args: TokenHourDataArgs<K>): Promise<Pick<TokenHourDataResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TokenHourDataFilter, TokenHourDataResult>> = { ...options };
    let paginationKey: keyof TokenHourDataFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TokenHourDataFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TokenHourDataResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("tokenHourDatas", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["periodStartUnix"])
                formattedObj["periodStartUnix"] = obj["periodStartUnix"];
            if (obj["token"])
                formattedObj["token"] = obj["token"];
            if (obj["volume"])
                formattedObj["volume"] = wei(obj["volume"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["untrackedVolumeUSD"])
                formattedObj["untrackedVolumeUSD"] = wei(obj["untrackedVolumeUSD"]);
            if (obj["totalValueLocked"])
                formattedObj["totalValueLocked"] = wei(obj["totalValueLocked"]);
            if (obj["totalValueLockedUSD"])
                formattedObj["totalValueLockedUSD"] = wei(obj["totalValueLockedUSD"]);
            if (obj["priceUSD"])
                formattedObj["priceUSD"] = wei(obj["priceUSD"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["open"])
                formattedObj["open"] = wei(obj["open"]);
            if (obj["high"])
                formattedObj["high"] = wei(obj["high"]);
            if (obj["low"])
                formattedObj["low"] = wei(obj["low"]);
            if (obj["close"])
                formattedObj["close"] = wei(obj["close"]);
            return formattedObj as Pick<TokenHourDataResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TransactionFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    blockNumber?: WeiSource | null;
    blockNumber_not?: WeiSource | null;
    blockNumber_gt?: WeiSource | null;
    blockNumber_lt?: WeiSource | null;
    blockNumber_gte?: WeiSource | null;
    blockNumber_lte?: WeiSource | null;
    blockNumber_in?: WeiSource[];
    blockNumber_not_in?: WeiSource[];
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    gasUsed?: WeiSource | null;
    gasUsed_not?: WeiSource | null;
    gasUsed_gt?: WeiSource | null;
    gasUsed_lt?: WeiSource | null;
    gasUsed_gte?: WeiSource | null;
    gasUsed_lte?: WeiSource | null;
    gasUsed_in?: WeiSource[];
    gasUsed_not_in?: WeiSource[];
    gasPrice?: WeiSource | null;
    gasPrice_not?: WeiSource | null;
    gasPrice_gt?: WeiSource | null;
    gasPrice_lt?: WeiSource | null;
    gasPrice_gte?: WeiSource | null;
    gasPrice_lte?: WeiSource | null;
    gasPrice_in?: WeiSource[];
    gasPrice_not_in?: WeiSource[];
    mints_?: Mint_filterFilter | null;
    burns_?: Burn_filterFilter | null;
    swaps_?: Swap_filterFilter | null;
    flashed_?: Flash_filterFilter | null;
    collects_?: Collect_filterFilter | null;
    _change_block?: BlockChangedFilterFilter | null;
};
export type TransactionResult = {
    id: string;
    blockNumber: Wei;
    timestamp: Wei;
    gasUsed: Wei;
    gasPrice: Wei;
    mints: (Partial<MintResult> | null)[];
    burns: (Partial<BurnResult> | null)[];
    swaps: (Partial<SwapResult> | null)[];
    flashed: (Partial<FlashResult> | null)[];
    collects: (Partial<CollectResult> | null)[];
};
export type TransactionFields = {
    id: true;
    blockNumber: true;
    timestamp: true;
    gasUsed: true;
    gasPrice: true;
    mints: MintFields;
    burns: BurnFields;
    swaps: SwapFields;
    flashed: FlashFields;
    collects: CollectFields;
};
export type TransactionArgs<K extends keyof TransactionResult> = {
    [Property in keyof Pick<TransactionFields, K>]: TransactionFields[Property];
};
export const getTransactionById = async function <K extends keyof TransactionResult>(url: string, options: SingleQueryOptions, args: TransactionArgs<K>): Promise<Pick<TransactionResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("transaction", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["blockNumber"])
        formattedObj["blockNumber"] = wei(obj["blockNumber"], 0);
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    if (obj["gasUsed"])
        formattedObj["gasUsed"] = wei(obj["gasUsed"], 0);
    if (obj["gasPrice"])
        formattedObj["gasPrice"] = wei(obj["gasPrice"], 0);
    if (obj["mints"])
        formattedObj["mints"] = obj["mints"];
    if (obj["burns"])
        formattedObj["burns"] = obj["burns"];
    if (obj["swaps"])
        formattedObj["swaps"] = obj["swaps"];
    if (obj["flashed"])
        formattedObj["flashed"] = obj["flashed"];
    if (obj["collects"])
        formattedObj["collects"] = obj["collects"];
    return formattedObj as Pick<TransactionResult, K>;
};
export const getTransactions = async function <K extends keyof TransactionResult>(url: string, options: MultiQueryOptions<TransactionFilter, TransactionResult>, args: TransactionArgs<K>): Promise<Pick<TransactionResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TransactionFilter, TransactionResult>> = { ...options };
    let paginationKey: keyof TransactionFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TransactionFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TransactionResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("transactions", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["blockNumber"])
                formattedObj["blockNumber"] = wei(obj["blockNumber"], 0);
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            if (obj["gasUsed"])
                formattedObj["gasUsed"] = wei(obj["gasUsed"], 0);
            if (obj["gasPrice"])
                formattedObj["gasPrice"] = wei(obj["gasPrice"], 0);
            if (obj["mints"])
                formattedObj["mints"] = obj["mints"];
            if (obj["burns"])
                formattedObj["burns"] = obj["burns"];
            if (obj["swaps"])
                formattedObj["swaps"] = obj["swaps"];
            if (obj["flashed"])
                formattedObj["flashed"] = obj["flashed"];
            if (obj["collects"])
                formattedObj["collects"] = obj["collects"];
            return formattedObj as Pick<TransactionResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type UniswapDayDataFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    date?: number | null;
    date_not?: number | null;
    date_gt?: number | null;
    date_lt?: number | null;
    date_gte?: number | null;
    date_lte?: number | null;
    date_in?: number[];
    date_not_in?: number[];
    volumeETH?: WeiSource | null;
    volumeETH_not?: WeiSource | null;
    volumeETH_gt?: WeiSource | null;
    volumeETH_lt?: WeiSource | null;
    volumeETH_gte?: WeiSource | null;
    volumeETH_lte?: WeiSource | null;
    volumeETH_in?: WeiSource[];
    volumeETH_not_in?: WeiSource[];
    volumeUSD?: WeiSource | null;
    volumeUSD_not?: WeiSource | null;
    volumeUSD_gt?: WeiSource | null;
    volumeUSD_lt?: WeiSource | null;
    volumeUSD_gte?: WeiSource | null;
    volumeUSD_lte?: WeiSource | null;
    volumeUSD_in?: WeiSource[];
    volumeUSD_not_in?: WeiSource[];
    volumeUSDUntracked?: WeiSource | null;
    volumeUSDUntracked_not?: WeiSource | null;
    volumeUSDUntracked_gt?: WeiSource | null;
    volumeUSDUntracked_lt?: WeiSource | null;
    volumeUSDUntracked_gte?: WeiSource | null;
    volumeUSDUntracked_lte?: WeiSource | null;
    volumeUSDUntracked_in?: WeiSource[];
    volumeUSDUntracked_not_in?: WeiSource[];
    feesUSD?: WeiSource | null;
    feesUSD_not?: WeiSource | null;
    feesUSD_gt?: WeiSource | null;
    feesUSD_lt?: WeiSource | null;
    feesUSD_gte?: WeiSource | null;
    feesUSD_lte?: WeiSource | null;
    feesUSD_in?: WeiSource[];
    feesUSD_not_in?: WeiSource[];
    txCount?: WeiSource | null;
    txCount_not?: WeiSource | null;
    txCount_gt?: WeiSource | null;
    txCount_lt?: WeiSource | null;
    txCount_gte?: WeiSource | null;
    txCount_lte?: WeiSource | null;
    txCount_in?: WeiSource[];
    txCount_not_in?: WeiSource[];
    tvlUSD?: WeiSource | null;
    tvlUSD_not?: WeiSource | null;
    tvlUSD_gt?: WeiSource | null;
    tvlUSD_lt?: WeiSource | null;
    tvlUSD_gte?: WeiSource | null;
    tvlUSD_lte?: WeiSource | null;
    tvlUSD_in?: WeiSource[];
    tvlUSD_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type UniswapDayDataResult = {
    id: string;
    date: number;
    volumeETH: Wei;
    volumeUSD: Wei;
    volumeUSDUntracked: Wei;
    feesUSD: Wei;
    txCount: Wei;
    tvlUSD: Wei;
};
export type UniswapDayDataFields = {
    id: true;
    date: true;
    volumeETH: true;
    volumeUSD: true;
    volumeUSDUntracked: true;
    feesUSD: true;
    txCount: true;
    tvlUSD: true;
};
export type UniswapDayDataArgs<K extends keyof UniswapDayDataResult> = {
    [Property in keyof Pick<UniswapDayDataFields, K>]: UniswapDayDataFields[Property];
};
export const getUniswapDayDataById = async function <K extends keyof UniswapDayDataResult>(url: string, options: SingleQueryOptions, args: UniswapDayDataArgs<K>): Promise<Pick<UniswapDayDataResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("uniswapDayData", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["date"])
        formattedObj["date"] = obj["date"];
    if (obj["volumeETH"])
        formattedObj["volumeETH"] = wei(obj["volumeETH"]);
    if (obj["volumeUSD"])
        formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
    if (obj["volumeUSDUntracked"])
        formattedObj["volumeUSDUntracked"] = wei(obj["volumeUSDUntracked"]);
    if (obj["feesUSD"])
        formattedObj["feesUSD"] = wei(obj["feesUSD"]);
    if (obj["txCount"])
        formattedObj["txCount"] = wei(obj["txCount"], 0);
    if (obj["tvlUSD"])
        formattedObj["tvlUSD"] = wei(obj["tvlUSD"]);
    return formattedObj as Pick<UniswapDayDataResult, K>;
};
export const getUniswapDayDatas = async function <K extends keyof UniswapDayDataResult>(url: string, options: MultiQueryOptions<UniswapDayDataFilter, UniswapDayDataResult>, args: UniswapDayDataArgs<K>): Promise<Pick<UniswapDayDataResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<UniswapDayDataFilter, UniswapDayDataResult>> = { ...options };
    let paginationKey: keyof UniswapDayDataFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof UniswapDayDataFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<UniswapDayDataResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("uniswapDayDatas", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["date"])
                formattedObj["date"] = obj["date"];
            if (obj["volumeETH"])
                formattedObj["volumeETH"] = wei(obj["volumeETH"]);
            if (obj["volumeUSD"])
                formattedObj["volumeUSD"] = wei(obj["volumeUSD"]);
            if (obj["volumeUSDUntracked"])
                formattedObj["volumeUSDUntracked"] = wei(obj["volumeUSDUntracked"]);
            if (obj["feesUSD"])
                formattedObj["feesUSD"] = wei(obj["feesUSD"]);
            if (obj["txCount"])
                formattedObj["txCount"] = wei(obj["txCount"], 0);
            if (obj["tvlUSD"])
                formattedObj["tvlUSD"] = wei(obj["tvlUSD"]);
            return formattedObj as Pick<UniswapDayDataResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
