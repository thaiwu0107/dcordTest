/**
 * $eq   " = ",
 * $ne   " != ",
 * $lt   " < ",
 * $gt   " > ",
 * $lte   " <= ",
 * $gte   " >= ",
 * $like   " like ",
 * $null   " IS ",
 * $in   " IN ",
 * $nin   " NOT IN "
 * @export
 * @enum {number}
 */
export interface ICondition {
    key?: { IN };
    $and?: IN[];
    $or?: IN[];
}
export interface IN {
    $and: IN[];
    $or: IN[];
    $eq: any;
    $ne: any;
    $lt: any;
    $gt: any;
    $lte: any;
    $gte: any;
    $like: any;
    $null: any;
    $in: any;
    $nin: any;
}
export enum DaoOperator {
    And = '$and',
    Or = '$or',
    Eq = '$eq',
    NotEQ = '$ne',
    LessThan = '$lt',
    MoreThan = '$gt',
    LessThanEq = '$lte',
    MoreThanEq = '$gte',
    Like = '$like',
    Is = '$null',
    In = '$in',
    NotIn = '$nin'
}

export interface IAnd { $and: ICondition[]; }
export interface IOr { $or: ICondition[]; }
export interface ITableObj {
    Daotable: string;
    ConnectionName: string;
    TableName: string;
}
export interface ISubKeyTableObj {
    name: string;
    type: ISubTypeTableObj;
    inc: boolean;
}
export interface ISubTableObj {
    name: string;
    type: ISubTypeTableObj;
}
export interface ISubTypeTableObj {
    name: string;
    length: number;
}
export interface IJoins {
    [key: string]: string[];
}
export type SQLJoins = IAJoins | undefined;
export interface IAJoins {
    outerjoin?: IJoins[];
    leftjoin?: IJoins[];
    rightjoin?: IJoins[];
    innerjoin?: IJoins[];
}
export interface IQueryOptions {
    field?: string[] | undefined;
    nolock: boolean | undefined;
    sort?: IOrderBy[] | undefined;
    limit?: number | undefined;
    groupby?: string[] | undefined;
    distinct?: boolean | undefined;
}
export interface IUniqueField {
    field: string[];
    nolock: boolean | undefined;
    sort?: string[] | undefined;
    limit?: number | undefined;
}
export interface IOrderBy {
    [key: string]: boolean;
}
