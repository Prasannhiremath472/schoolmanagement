
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PlatformUser
 * 
 */
export type PlatformUser = $Result.DefaultSelection<Prisma.$PlatformUserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model SubscriptionPlan
 * 
 */
export type SubscriptionPlan = $Result.DefaultSelection<Prisma.$SubscriptionPlanPayload>
/**
 * Model Reseller
 * 
 */
export type Reseller = $Result.DefaultSelection<Prisma.$ResellerPayload>
/**
 * Model Commission
 * 
 */
export type Commission = $Result.DefaultSelection<Prisma.$CommissionPayload>
/**
 * Model School
 * 
 */
export type School = $Result.DefaultSelection<Prisma.$SchoolPayload>
/**
 * Model SchoolSetting
 * 
 */
export type SchoolSetting = $Result.DefaultSelection<Prisma.$SchoolSettingPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model UsageMetric
 * 
 */
export type UsageMetric = $Result.DefaultSelection<Prisma.$UsageMetricPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model SystemSetting
 * 
 */
export type SystemSetting = $Result.DefaultSelection<Prisma.$SystemSettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PlatformRole: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  FINANCE: 'FINANCE',
  RESELLER: 'RESELLER'
};

export type PlatformRole = (typeof PlatformRole)[keyof typeof PlatformRole]


export const BillingCycle: {
  TRIAL: 'TRIAL',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY',
  LIFETIME: 'LIFETIME'
};

export type BillingCycle = (typeof BillingCycle)[keyof typeof BillingCycle]


export const CommStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
};

export type CommStatus = (typeof CommStatus)[keyof typeof CommStatus]


export const SchoolStatus: {
  TRIAL: 'TRIAL',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
};

export type SchoolStatus = (typeof SchoolStatus)[keyof typeof SchoolStatus]


export const SubStatus: {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING'
};

export type SubStatus = (typeof SubStatus)[keyof typeof SubStatus]


export const PayStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PayStatus = (typeof PayStatus)[keyof typeof PayStatus]

}

export type PlatformRole = $Enums.PlatformRole

export const PlatformRole: typeof $Enums.PlatformRole

export type BillingCycle = $Enums.BillingCycle

export const BillingCycle: typeof $Enums.BillingCycle

export type CommStatus = $Enums.CommStatus

export const CommStatus: typeof $Enums.CommStatus

export type SchoolStatus = $Enums.SchoolStatus

export const SchoolStatus: typeof $Enums.SchoolStatus

export type SubStatus = $Enums.SubStatus

export const SubStatus: typeof $Enums.SubStatus

export type PayStatus = $Enums.PayStatus

export const PayStatus: typeof $Enums.PayStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PlatformUsers
 * const platformUsers = await prisma.platformUser.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PlatformUsers
   * const platformUsers = await prisma.platformUser.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.platformUser`: Exposes CRUD operations for the **PlatformUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformUsers
    * const platformUsers = await prisma.platformUser.findMany()
    * ```
    */
  get platformUser(): Prisma.PlatformUserDelegate<ExtArgs>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs>;

  /**
   * `prisma.subscriptionPlan`: Exposes CRUD operations for the **SubscriptionPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriptionPlans
    * const subscriptionPlans = await prisma.subscriptionPlan.findMany()
    * ```
    */
  get subscriptionPlan(): Prisma.SubscriptionPlanDelegate<ExtArgs>;

  /**
   * `prisma.reseller`: Exposes CRUD operations for the **Reseller** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resellers
    * const resellers = await prisma.reseller.findMany()
    * ```
    */
  get reseller(): Prisma.ResellerDelegate<ExtArgs>;

  /**
   * `prisma.commission`: Exposes CRUD operations for the **Commission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commissions
    * const commissions = await prisma.commission.findMany()
    * ```
    */
  get commission(): Prisma.CommissionDelegate<ExtArgs>;

  /**
   * `prisma.school`: Exposes CRUD operations for the **School** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schools
    * const schools = await prisma.school.findMany()
    * ```
    */
  get school(): Prisma.SchoolDelegate<ExtArgs>;

  /**
   * `prisma.schoolSetting`: Exposes CRUD operations for the **SchoolSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SchoolSettings
    * const schoolSettings = await prisma.schoolSetting.findMany()
    * ```
    */
  get schoolSetting(): Prisma.SchoolSettingDelegate<ExtArgs>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.usageMetric`: Exposes CRUD operations for the **UsageMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageMetrics
    * const usageMetrics = await prisma.usageMetric.findMany()
    * ```
    */
  get usageMetric(): Prisma.UsageMetricDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemSettings
    * const systemSettings = await prisma.systemSetting.findMany()
    * ```
    */
  get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PlatformUser: 'PlatformUser',
    RefreshToken: 'RefreshToken',
    SubscriptionPlan: 'SubscriptionPlan',
    Reseller: 'Reseller',
    Commission: 'Commission',
    School: 'School',
    SchoolSetting: 'SchoolSetting',
    Subscription: 'Subscription',
    Payment: 'Payment',
    UsageMetric: 'UsageMetric',
    AuditLog: 'AuditLog',
    SystemSetting: 'SystemSetting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "platformUser" | "refreshToken" | "subscriptionPlan" | "reseller" | "commission" | "school" | "schoolSetting" | "subscription" | "payment" | "usageMetric" | "auditLog" | "systemSetting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PlatformUser: {
        payload: Prisma.$PlatformUserPayload<ExtArgs>
        fields: Prisma.PlatformUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload>
          }
          findFirst: {
            args: Prisma.PlatformUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload>
          }
          findMany: {
            args: Prisma.PlatformUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload>[]
          }
          create: {
            args: Prisma.PlatformUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload>
          }
          createMany: {
            args: Prisma.PlatformUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload>[]
          }
          delete: {
            args: Prisma.PlatformUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload>
          }
          update: {
            args: Prisma.PlatformUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload>
          }
          deleteMany: {
            args: Prisma.PlatformUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlatformUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformUserPayload>
          }
          aggregate: {
            args: Prisma.PlatformUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformUser>
          }
          groupBy: {
            args: Prisma.PlatformUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformUserCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformUserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      SubscriptionPlan: {
        payload: Prisma.$SubscriptionPlanPayload<ExtArgs>
        fields: Prisma.SubscriptionPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          findMany: {
            args: Prisma.SubscriptionPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>[]
          }
          create: {
            args: Prisma.SubscriptionPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          createMany: {
            args: Prisma.SubscriptionPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          update: {
            args: Prisma.SubscriptionPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubscriptionPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptionPlan>
          }
          groupBy: {
            args: Prisma.SubscriptionPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionPlanCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionPlanCountAggregateOutputType> | number
          }
        }
      }
      Reseller: {
        payload: Prisma.$ResellerPayload<ExtArgs>
        fields: Prisma.ResellerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResellerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResellerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload>
          }
          findFirst: {
            args: Prisma.ResellerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResellerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload>
          }
          findMany: {
            args: Prisma.ResellerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload>[]
          }
          create: {
            args: Prisma.ResellerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload>
          }
          createMany: {
            args: Prisma.ResellerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResellerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload>[]
          }
          delete: {
            args: Prisma.ResellerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload>
          }
          update: {
            args: Prisma.ResellerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload>
          }
          deleteMany: {
            args: Prisma.ResellerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResellerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResellerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResellerPayload>
          }
          aggregate: {
            args: Prisma.ResellerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReseller>
          }
          groupBy: {
            args: Prisma.ResellerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResellerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResellerCountArgs<ExtArgs>
            result: $Utils.Optional<ResellerCountAggregateOutputType> | number
          }
        }
      }
      Commission: {
        payload: Prisma.$CommissionPayload<ExtArgs>
        fields: Prisma.CommissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload>
          }
          findFirst: {
            args: Prisma.CommissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload>
          }
          findMany: {
            args: Prisma.CommissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload>[]
          }
          create: {
            args: Prisma.CommissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload>
          }
          createMany: {
            args: Prisma.CommissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload>[]
          }
          delete: {
            args: Prisma.CommissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload>
          }
          update: {
            args: Prisma.CommissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload>
          }
          deleteMany: {
            args: Prisma.CommissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionPayload>
          }
          aggregate: {
            args: Prisma.CommissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommission>
          }
          groupBy: {
            args: Prisma.CommissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommissionCountArgs<ExtArgs>
            result: $Utils.Optional<CommissionCountAggregateOutputType> | number
          }
        }
      }
      School: {
        payload: Prisma.$SchoolPayload<ExtArgs>
        fields: Prisma.SchoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findFirst: {
            args: Prisma.SchoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findMany: {
            args: Prisma.SchoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          create: {
            args: Prisma.SchoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          createMany: {
            args: Prisma.SchoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          delete: {
            args: Prisma.SchoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          update: {
            args: Prisma.SchoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          deleteMany: {
            args: Prisma.SchoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SchoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          aggregate: {
            args: Prisma.SchoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchool>
          }
          groupBy: {
            args: Prisma.SchoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolCountAggregateOutputType> | number
          }
        }
      }
      SchoolSetting: {
        payload: Prisma.$SchoolSettingPayload<ExtArgs>
        fields: Prisma.SchoolSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload>
          }
          findFirst: {
            args: Prisma.SchoolSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload>
          }
          findMany: {
            args: Prisma.SchoolSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload>[]
          }
          create: {
            args: Prisma.SchoolSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload>
          }
          createMany: {
            args: Prisma.SchoolSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload>[]
          }
          delete: {
            args: Prisma.SchoolSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload>
          }
          update: {
            args: Prisma.SchoolSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload>
          }
          deleteMany: {
            args: Prisma.SchoolSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SchoolSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingPayload>
          }
          aggregate: {
            args: Prisma.SchoolSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchoolSetting>
          }
          groupBy: {
            args: Prisma.SchoolSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolSettingCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      UsageMetric: {
        payload: Prisma.$UsageMetricPayload<ExtArgs>
        fields: Prisma.UsageMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload>
          }
          findFirst: {
            args: Prisma.UsageMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload>
          }
          findMany: {
            args: Prisma.UsageMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload>[]
          }
          create: {
            args: Prisma.UsageMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload>
          }
          createMany: {
            args: Prisma.UsageMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageMetricCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload>[]
          }
          delete: {
            args: Prisma.UsageMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload>
          }
          update: {
            args: Prisma.UsageMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload>
          }
          deleteMany: {
            args: Prisma.UsageMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsageMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMetricPayload>
          }
          aggregate: {
            args: Prisma.UsageMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageMetric>
          }
          groupBy: {
            args: Prisma.UsageMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageMetricGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageMetricCountArgs<ExtArgs>
            result: $Utils.Optional<UsageMetricCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      SystemSetting: {
        payload: Prisma.$SystemSettingPayload<ExtArgs>
        fields: Prisma.SystemSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findFirst: {
            args: Prisma.SystemSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findMany: {
            args: Prisma.SystemSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          create: {
            args: Prisma.SystemSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          createMany: {
            args: Prisma.SystemSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          delete: {
            args: Prisma.SystemSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          update: {
            args: Prisma.SystemSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          deleteMany: {
            args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          aggregate: {
            args: Prisma.SystemSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemSetting>
          }
          groupBy: {
            args: Prisma.SystemSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlatformUserCountOutputType
   */

  export type PlatformUserCountOutputType = {
    auditLogs: number
    refreshTokens: number
  }

  export type PlatformUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | PlatformUserCountOutputTypeCountAuditLogsArgs
    refreshTokens?: boolean | PlatformUserCountOutputTypeCountRefreshTokensArgs
  }

  // Custom InputTypes
  /**
   * PlatformUserCountOutputType without action
   */
  export type PlatformUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUserCountOutputType
     */
    select?: PlatformUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlatformUserCountOutputType without action
   */
  export type PlatformUserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * PlatformUserCountOutputType without action
   */
  export type PlatformUserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }


  /**
   * Count Type SubscriptionPlanCountOutputType
   */

  export type SubscriptionPlanCountOutputType = {
    subscriptions: number
  }

  export type SubscriptionPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | SubscriptionPlanCountOutputTypeCountSubscriptionsArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionPlanCountOutputType without action
   */
  export type SubscriptionPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlanCountOutputType
     */
    select?: SubscriptionPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionPlanCountOutputType without action
   */
  export type SubscriptionPlanCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }


  /**
   * Count Type ResellerCountOutputType
   */

  export type ResellerCountOutputType = {
    schools: number
    commissions: number
  }

  export type ResellerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schools?: boolean | ResellerCountOutputTypeCountSchoolsArgs
    commissions?: boolean | ResellerCountOutputTypeCountCommissionsArgs
  }

  // Custom InputTypes
  /**
   * ResellerCountOutputType without action
   */
  export type ResellerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerCountOutputType
     */
    select?: ResellerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResellerCountOutputType without action
   */
  export type ResellerCountOutputTypeCountSchoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
  }

  /**
   * ResellerCountOutputType without action
   */
  export type ResellerCountOutputTypeCountCommissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommissionWhereInput
  }


  /**
   * Count Type SchoolCountOutputType
   */

  export type SchoolCountOutputType = {
    subscriptions: number
    commissions: number
    usageMetrics: number
  }

  export type SchoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | SchoolCountOutputTypeCountSubscriptionsArgs
    commissions?: boolean | SchoolCountOutputTypeCountCommissionsArgs
    usageMetrics?: boolean | SchoolCountOutputTypeCountUsageMetricsArgs
  }

  // Custom InputTypes
  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolCountOutputType
     */
    select?: SchoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountCommissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommissionWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountUsageMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageMetricWhereInput
  }


  /**
   * Count Type SubscriptionCountOutputType
   */

  export type SubscriptionCountOutputType = {
    payments: number
  }

  export type SubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | SubscriptionCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCountOutputType
     */
    select?: SubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PlatformUser
   */

  export type AggregatePlatformUser = {
    _count: PlatformUserCountAggregateOutputType | null
    _min: PlatformUserMinAggregateOutputType | null
    _max: PlatformUserMaxAggregateOutputType | null
  }

  export type PlatformUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.PlatformRole | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.PlatformRole | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformUserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    isActive: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlatformUserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlatformUserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlatformUserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlatformUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformUser to aggregate.
     */
    where?: PlatformUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformUsers to fetch.
     */
    orderBy?: PlatformUserOrderByWithRelationInput | PlatformUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformUsers
    **/
    _count?: true | PlatformUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformUserMaxAggregateInputType
  }

  export type GetPlatformUserAggregateType<T extends PlatformUserAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformUser[P]>
      : GetScalarType<T[P], AggregatePlatformUser[P]>
  }




  export type PlatformUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformUserWhereInput
    orderBy?: PlatformUserOrderByWithAggregationInput | PlatformUserOrderByWithAggregationInput[]
    by: PlatformUserScalarFieldEnum[] | PlatformUserScalarFieldEnum
    having?: PlatformUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformUserCountAggregateInputType | true
    _min?: PlatformUserMinAggregateInputType
    _max?: PlatformUserMaxAggregateInputType
  }

  export type PlatformUserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    role: $Enums.PlatformRole
    isActive: boolean
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PlatformUserCountAggregateOutputType | null
    _min: PlatformUserMinAggregateOutputType | null
    _max: PlatformUserMaxAggregateOutputType | null
  }

  type GetPlatformUserGroupByPayload<T extends PlatformUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformUserGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformUserGroupByOutputType[P]>
        }
      >
    >


  export type PlatformUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auditLogs?: boolean | PlatformUser$auditLogsArgs<ExtArgs>
    refreshTokens?: boolean | PlatformUser$refreshTokensArgs<ExtArgs>
    _count?: boolean | PlatformUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platformUser"]>

  export type PlatformUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformUser"]>

  export type PlatformUserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlatformUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | PlatformUser$auditLogsArgs<ExtArgs>
    refreshTokens?: boolean | PlatformUser$refreshTokensArgs<ExtArgs>
    _count?: boolean | PlatformUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlatformUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlatformUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformUser"
    objects: {
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      role: $Enums.PlatformRole
      isActive: boolean
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["platformUser"]>
    composites: {}
  }

  type PlatformUserGetPayload<S extends boolean | null | undefined | PlatformUserDefaultArgs> = $Result.GetResult<Prisma.$PlatformUserPayload, S>

  type PlatformUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlatformUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlatformUserCountAggregateInputType | true
    }

  export interface PlatformUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformUser'], meta: { name: 'PlatformUser' } }
    /**
     * Find zero or one PlatformUser that matches the filter.
     * @param {PlatformUserFindUniqueArgs} args - Arguments to find a PlatformUser
     * @example
     * // Get one PlatformUser
     * const platformUser = await prisma.platformUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformUserFindUniqueArgs>(args: SelectSubset<T, PlatformUserFindUniqueArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlatformUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlatformUserFindUniqueOrThrowArgs} args - Arguments to find a PlatformUser
     * @example
     * // Get one PlatformUser
     * const platformUser = await prisma.platformUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformUserFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlatformUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUserFindFirstArgs} args - Arguments to find a PlatformUser
     * @example
     * // Get one PlatformUser
     * const platformUser = await prisma.platformUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformUserFindFirstArgs>(args?: SelectSubset<T, PlatformUserFindFirstArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlatformUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUserFindFirstOrThrowArgs} args - Arguments to find a PlatformUser
     * @example
     * // Get one PlatformUser
     * const platformUser = await prisma.platformUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformUserFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlatformUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformUsers
     * const platformUsers = await prisma.platformUser.findMany()
     * 
     * // Get first 10 PlatformUsers
     * const platformUsers = await prisma.platformUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformUserWithIdOnly = await prisma.platformUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformUserFindManyArgs>(args?: SelectSubset<T, PlatformUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlatformUser.
     * @param {PlatformUserCreateArgs} args - Arguments to create a PlatformUser.
     * @example
     * // Create one PlatformUser
     * const PlatformUser = await prisma.platformUser.create({
     *   data: {
     *     // ... data to create a PlatformUser
     *   }
     * })
     * 
     */
    create<T extends PlatformUserCreateArgs>(args: SelectSubset<T, PlatformUserCreateArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlatformUsers.
     * @param {PlatformUserCreateManyArgs} args - Arguments to create many PlatformUsers.
     * @example
     * // Create many PlatformUsers
     * const platformUser = await prisma.platformUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformUserCreateManyArgs>(args?: SelectSubset<T, PlatformUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlatformUsers and returns the data saved in the database.
     * @param {PlatformUserCreateManyAndReturnArgs} args - Arguments to create many PlatformUsers.
     * @example
     * // Create many PlatformUsers
     * const platformUser = await prisma.platformUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlatformUsers and only return the `id`
     * const platformUserWithIdOnly = await prisma.platformUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformUserCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlatformUser.
     * @param {PlatformUserDeleteArgs} args - Arguments to delete one PlatformUser.
     * @example
     * // Delete one PlatformUser
     * const PlatformUser = await prisma.platformUser.delete({
     *   where: {
     *     // ... filter to delete one PlatformUser
     *   }
     * })
     * 
     */
    delete<T extends PlatformUserDeleteArgs>(args: SelectSubset<T, PlatformUserDeleteArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlatformUser.
     * @param {PlatformUserUpdateArgs} args - Arguments to update one PlatformUser.
     * @example
     * // Update one PlatformUser
     * const platformUser = await prisma.platformUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformUserUpdateArgs>(args: SelectSubset<T, PlatformUserUpdateArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlatformUsers.
     * @param {PlatformUserDeleteManyArgs} args - Arguments to filter PlatformUsers to delete.
     * @example
     * // Delete a few PlatformUsers
     * const { count } = await prisma.platformUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformUserDeleteManyArgs>(args?: SelectSubset<T, PlatformUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformUsers
     * const platformUser = await prisma.platformUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformUserUpdateManyArgs>(args: SelectSubset<T, PlatformUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlatformUser.
     * @param {PlatformUserUpsertArgs} args - Arguments to update or create a PlatformUser.
     * @example
     * // Update or create a PlatformUser
     * const platformUser = await prisma.platformUser.upsert({
     *   create: {
     *     // ... data to create a PlatformUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformUser we want to update
     *   }
     * })
     */
    upsert<T extends PlatformUserUpsertArgs>(args: SelectSubset<T, PlatformUserUpsertArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlatformUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUserCountArgs} args - Arguments to filter PlatformUsers to count.
     * @example
     * // Count the number of PlatformUsers
     * const count = await prisma.platformUser.count({
     *   where: {
     *     // ... the filter for the PlatformUsers we want to count
     *   }
     * })
    **/
    count<T extends PlatformUserCountArgs>(
      args?: Subset<T, PlatformUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatformUserAggregateArgs>(args: Subset<T, PlatformUserAggregateArgs>): Prisma.PrismaPromise<GetPlatformUserAggregateType<T>>

    /**
     * Group by PlatformUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlatformUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformUserGroupByArgs['orderBy'] }
        : { orderBy?: PlatformUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlatformUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformUser model
   */
  readonly fields: PlatformUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auditLogs<T extends PlatformUser$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, PlatformUser$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    refreshTokens<T extends PlatformUser$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, PlatformUser$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlatformUser model
   */ 
  interface PlatformUserFieldRefs {
    readonly id: FieldRef<"PlatformUser", 'String'>
    readonly email: FieldRef<"PlatformUser", 'String'>
    readonly password: FieldRef<"PlatformUser", 'String'>
    readonly name: FieldRef<"PlatformUser", 'String'>
    readonly role: FieldRef<"PlatformUser", 'PlatformRole'>
    readonly isActive: FieldRef<"PlatformUser", 'Boolean'>
    readonly lastLoginAt: FieldRef<"PlatformUser", 'DateTime'>
    readonly createdAt: FieldRef<"PlatformUser", 'DateTime'>
    readonly updatedAt: FieldRef<"PlatformUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlatformUser findUnique
   */
  export type PlatformUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * Filter, which PlatformUser to fetch.
     */
    where: PlatformUserWhereUniqueInput
  }

  /**
   * PlatformUser findUniqueOrThrow
   */
  export type PlatformUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * Filter, which PlatformUser to fetch.
     */
    where: PlatformUserWhereUniqueInput
  }

  /**
   * PlatformUser findFirst
   */
  export type PlatformUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * Filter, which PlatformUser to fetch.
     */
    where?: PlatformUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformUsers to fetch.
     */
    orderBy?: PlatformUserOrderByWithRelationInput | PlatformUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformUsers.
     */
    cursor?: PlatformUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformUsers.
     */
    distinct?: PlatformUserScalarFieldEnum | PlatformUserScalarFieldEnum[]
  }

  /**
   * PlatformUser findFirstOrThrow
   */
  export type PlatformUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * Filter, which PlatformUser to fetch.
     */
    where?: PlatformUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformUsers to fetch.
     */
    orderBy?: PlatformUserOrderByWithRelationInput | PlatformUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformUsers.
     */
    cursor?: PlatformUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformUsers.
     */
    distinct?: PlatformUserScalarFieldEnum | PlatformUserScalarFieldEnum[]
  }

  /**
   * PlatformUser findMany
   */
  export type PlatformUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * Filter, which PlatformUsers to fetch.
     */
    where?: PlatformUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformUsers to fetch.
     */
    orderBy?: PlatformUserOrderByWithRelationInput | PlatformUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformUsers.
     */
    cursor?: PlatformUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformUsers.
     */
    skip?: number
    distinct?: PlatformUserScalarFieldEnum | PlatformUserScalarFieldEnum[]
  }

  /**
   * PlatformUser create
   */
  export type PlatformUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * The data needed to create a PlatformUser.
     */
    data: XOR<PlatformUserCreateInput, PlatformUserUncheckedCreateInput>
  }

  /**
   * PlatformUser createMany
   */
  export type PlatformUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformUsers.
     */
    data: PlatformUserCreateManyInput | PlatformUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformUser createManyAndReturn
   */
  export type PlatformUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlatformUsers.
     */
    data: PlatformUserCreateManyInput | PlatformUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformUser update
   */
  export type PlatformUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * The data needed to update a PlatformUser.
     */
    data: XOR<PlatformUserUpdateInput, PlatformUserUncheckedUpdateInput>
    /**
     * Choose, which PlatformUser to update.
     */
    where: PlatformUserWhereUniqueInput
  }

  /**
   * PlatformUser updateMany
   */
  export type PlatformUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformUsers.
     */
    data: XOR<PlatformUserUpdateManyMutationInput, PlatformUserUncheckedUpdateManyInput>
    /**
     * Filter which PlatformUsers to update
     */
    where?: PlatformUserWhereInput
  }

  /**
   * PlatformUser upsert
   */
  export type PlatformUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * The filter to search for the PlatformUser to update in case it exists.
     */
    where: PlatformUserWhereUniqueInput
    /**
     * In case the PlatformUser found by the `where` argument doesn't exist, create a new PlatformUser with this data.
     */
    create: XOR<PlatformUserCreateInput, PlatformUserUncheckedCreateInput>
    /**
     * In case the PlatformUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformUserUpdateInput, PlatformUserUncheckedUpdateInput>
  }

  /**
   * PlatformUser delete
   */
  export type PlatformUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    /**
     * Filter which PlatformUser to delete.
     */
    where: PlatformUserWhereUniqueInput
  }

  /**
   * PlatformUser deleteMany
   */
  export type PlatformUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformUsers to delete
     */
    where?: PlatformUserWhereInput
  }

  /**
   * PlatformUser.auditLogs
   */
  export type PlatformUser$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * PlatformUser.refreshTokens
   */
  export type PlatformUser$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * PlatformUser without action
   */
  export type PlatformUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    platformUserId: string | null
    expiresAt: Date | null
    isRevoked: boolean | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    platformUserId: string | null
    expiresAt: Date | null
    isRevoked: boolean | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    platformUserId: number
    expiresAt: number
    isRevoked: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    platformUserId?: true
    expiresAt?: true
    isRevoked?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    platformUserId?: true
    expiresAt?: true
    isRevoked?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    platformUserId?: true
    expiresAt?: true
    isRevoked?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    platformUserId: string | null
    expiresAt: Date
    isRevoked: boolean
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    platformUserId?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    createdAt?: boolean
    platformUser?: boolean | RefreshToken$platformUserArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    platformUserId?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    createdAt?: boolean
    platformUser?: boolean | RefreshToken$platformUserArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    platformUserId?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformUser?: boolean | RefreshToken$platformUserArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformUser?: boolean | RefreshToken$platformUserArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      platformUser: Prisma.$PlatformUserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      platformUserId: string | null
      expiresAt: Date
      isRevoked: boolean
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    platformUser<T extends RefreshToken$platformUserArgs<ExtArgs> = {}>(args?: Subset<T, RefreshToken$platformUserArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */ 
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly platformUserId: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly isRevoked: FieldRef<"RefreshToken", 'Boolean'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken.platformUser
   */
  export type RefreshToken$platformUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    where?: PlatformUserWhereInput
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model SubscriptionPlan
   */

  export type AggregateSubscriptionPlan = {
    _count: SubscriptionPlanCountAggregateOutputType | null
    _avg: SubscriptionPlanAvgAggregateOutputType | null
    _sum: SubscriptionPlanSumAggregateOutputType | null
    _min: SubscriptionPlanMinAggregateOutputType | null
    _max: SubscriptionPlanMaxAggregateOutputType | null
  }

  export type SubscriptionPlanAvgAggregateOutputType = {
    price: Decimal | null
    trialDays: number | null
    maxStudents: number | null
    maxTeachers: number | null
    maxStaff: number | null
    storageGB: number | null
    sortOrder: number | null
  }

  export type SubscriptionPlanSumAggregateOutputType = {
    price: Decimal | null
    trialDays: number | null
    maxStudents: number | null
    maxTeachers: number | null
    maxStaff: number | null
    storageGB: number | null
    sortOrder: number | null
  }

  export type SubscriptionPlanMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: Decimal | null
    billingCycle: $Enums.BillingCycle | null
    trialDays: number | null
    maxStudents: number | null
    maxTeachers: number | null
    maxStaff: number | null
    storageGB: number | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionPlanMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: Decimal | null
    billingCycle: $Enums.BillingCycle | null
    trialDays: number | null
    maxStudents: number | null
    maxTeachers: number | null
    maxStaff: number | null
    storageGB: number | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionPlanCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    price: number
    billingCycle: number
    trialDays: number
    maxStudents: number
    maxTeachers: number
    maxStaff: number
    storageGB: number
    features: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionPlanAvgAggregateInputType = {
    price?: true
    trialDays?: true
    maxStudents?: true
    maxTeachers?: true
    maxStaff?: true
    storageGB?: true
    sortOrder?: true
  }

  export type SubscriptionPlanSumAggregateInputType = {
    price?: true
    trialDays?: true
    maxStudents?: true
    maxTeachers?: true
    maxStaff?: true
    storageGB?: true
    sortOrder?: true
  }

  export type SubscriptionPlanMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    billingCycle?: true
    trialDays?: true
    maxStudents?: true
    maxTeachers?: true
    maxStaff?: true
    storageGB?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionPlanMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    billingCycle?: true
    trialDays?: true
    maxStudents?: true
    maxTeachers?: true
    maxStaff?: true
    storageGB?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionPlanCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    billingCycle?: true
    trialDays?: true
    maxStudents?: true
    maxTeachers?: true
    maxStaff?: true
    storageGB?: true
    features?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionPlan to aggregate.
     */
    where?: SubscriptionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPlans to fetch.
     */
    orderBy?: SubscriptionPlanOrderByWithRelationInput | SubscriptionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriptionPlans
    **/
    _count?: true | SubscriptionPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionPlanMaxAggregateInputType
  }

  export type GetSubscriptionPlanAggregateType<T extends SubscriptionPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptionPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptionPlan[P]>
      : GetScalarType<T[P], AggregateSubscriptionPlan[P]>
  }




  export type SubscriptionPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionPlanWhereInput
    orderBy?: SubscriptionPlanOrderByWithAggregationInput | SubscriptionPlanOrderByWithAggregationInput[]
    by: SubscriptionPlanScalarFieldEnum[] | SubscriptionPlanScalarFieldEnum
    having?: SubscriptionPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionPlanCountAggregateInputType | true
    _avg?: SubscriptionPlanAvgAggregateInputType
    _sum?: SubscriptionPlanSumAggregateInputType
    _min?: SubscriptionPlanMinAggregateInputType
    _max?: SubscriptionPlanMaxAggregateInputType
  }

  export type SubscriptionPlanGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    price: Decimal
    billingCycle: $Enums.BillingCycle
    trialDays: number
    maxStudents: number
    maxTeachers: number
    maxStaff: number
    storageGB: number
    features: JsonValue
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionPlanCountAggregateOutputType | null
    _avg: SubscriptionPlanAvgAggregateOutputType | null
    _sum: SubscriptionPlanSumAggregateOutputType | null
    _min: SubscriptionPlanMinAggregateOutputType | null
    _max: SubscriptionPlanMaxAggregateOutputType | null
  }

  type GetSubscriptionPlanGroupByPayload<T extends SubscriptionPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionPlanGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionPlanGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    billingCycle?: boolean
    trialDays?: boolean
    maxStudents?: boolean
    maxTeachers?: boolean
    maxStaff?: boolean
    storageGB?: boolean
    features?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptions?: boolean | SubscriptionPlan$subscriptionsArgs<ExtArgs>
    _count?: boolean | SubscriptionPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionPlan"]>

  export type SubscriptionPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    billingCycle?: boolean
    trialDays?: boolean
    maxStudents?: boolean
    maxTeachers?: boolean
    maxStaff?: boolean
    storageGB?: boolean
    features?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subscriptionPlan"]>

  export type SubscriptionPlanSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    billingCycle?: boolean
    trialDays?: boolean
    maxStudents?: boolean
    maxTeachers?: boolean
    maxStaff?: boolean
    storageGB?: boolean
    features?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | SubscriptionPlan$subscriptionsArgs<ExtArgs>
    _count?: boolean | SubscriptionPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubscriptionPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SubscriptionPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscriptionPlan"
    objects: {
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      price: Prisma.Decimal
      billingCycle: $Enums.BillingCycle
      trialDays: number
      maxStudents: number
      maxTeachers: number
      maxStaff: number
      storageGB: number
      features: Prisma.JsonValue
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscriptionPlan"]>
    composites: {}
  }

  type SubscriptionPlanGetPayload<S extends boolean | null | undefined | SubscriptionPlanDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPlanPayload, S>

  type SubscriptionPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SubscriptionPlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SubscriptionPlanCountAggregateInputType | true
    }

  export interface SubscriptionPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriptionPlan'], meta: { name: 'SubscriptionPlan' } }
    /**
     * Find zero or one SubscriptionPlan that matches the filter.
     * @param {SubscriptionPlanFindUniqueArgs} args - Arguments to find a SubscriptionPlan
     * @example
     * // Get one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionPlanFindUniqueArgs>(args: SelectSubset<T, SubscriptionPlanFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SubscriptionPlan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SubscriptionPlanFindUniqueOrThrowArgs} args - Arguments to find a SubscriptionPlan
     * @example
     * // Get one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SubscriptionPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanFindFirstArgs} args - Arguments to find a SubscriptionPlan
     * @example
     * // Get one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionPlanFindFirstArgs>(args?: SelectSubset<T, SubscriptionPlanFindFirstArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SubscriptionPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanFindFirstOrThrowArgs} args - Arguments to find a SubscriptionPlan
     * @example
     * // Get one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SubscriptionPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriptionPlans
     * const subscriptionPlans = await prisma.subscriptionPlan.findMany()
     * 
     * // Get first 10 SubscriptionPlans
     * const subscriptionPlans = await prisma.subscriptionPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionPlanWithIdOnly = await prisma.subscriptionPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionPlanFindManyArgs>(args?: SelectSubset<T, SubscriptionPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SubscriptionPlan.
     * @param {SubscriptionPlanCreateArgs} args - Arguments to create a SubscriptionPlan.
     * @example
     * // Create one SubscriptionPlan
     * const SubscriptionPlan = await prisma.subscriptionPlan.create({
     *   data: {
     *     // ... data to create a SubscriptionPlan
     *   }
     * })
     * 
     */
    create<T extends SubscriptionPlanCreateArgs>(args: SelectSubset<T, SubscriptionPlanCreateArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SubscriptionPlans.
     * @param {SubscriptionPlanCreateManyArgs} args - Arguments to create many SubscriptionPlans.
     * @example
     * // Create many SubscriptionPlans
     * const subscriptionPlan = await prisma.subscriptionPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionPlanCreateManyArgs>(args?: SelectSubset<T, SubscriptionPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubscriptionPlans and returns the data saved in the database.
     * @param {SubscriptionPlanCreateManyAndReturnArgs} args - Arguments to create many SubscriptionPlans.
     * @example
     * // Create many SubscriptionPlans
     * const subscriptionPlan = await prisma.subscriptionPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubscriptionPlans and only return the `id`
     * const subscriptionPlanWithIdOnly = await prisma.subscriptionPlan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SubscriptionPlan.
     * @param {SubscriptionPlanDeleteArgs} args - Arguments to delete one SubscriptionPlan.
     * @example
     * // Delete one SubscriptionPlan
     * const SubscriptionPlan = await prisma.subscriptionPlan.delete({
     *   where: {
     *     // ... filter to delete one SubscriptionPlan
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionPlanDeleteArgs>(args: SelectSubset<T, SubscriptionPlanDeleteArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SubscriptionPlan.
     * @param {SubscriptionPlanUpdateArgs} args - Arguments to update one SubscriptionPlan.
     * @example
     * // Update one SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionPlanUpdateArgs>(args: SelectSubset<T, SubscriptionPlanUpdateArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SubscriptionPlans.
     * @param {SubscriptionPlanDeleteManyArgs} args - Arguments to filter SubscriptionPlans to delete.
     * @example
     * // Delete a few SubscriptionPlans
     * const { count } = await prisma.subscriptionPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionPlanDeleteManyArgs>(args?: SelectSubset<T, SubscriptionPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriptionPlans
     * const subscriptionPlan = await prisma.subscriptionPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionPlanUpdateManyArgs>(args: SelectSubset<T, SubscriptionPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SubscriptionPlan.
     * @param {SubscriptionPlanUpsertArgs} args - Arguments to update or create a SubscriptionPlan.
     * @example
     * // Update or create a SubscriptionPlan
     * const subscriptionPlan = await prisma.subscriptionPlan.upsert({
     *   create: {
     *     // ... data to create a SubscriptionPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriptionPlan we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionPlanUpsertArgs>(args: SelectSubset<T, SubscriptionPlanUpsertArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SubscriptionPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanCountArgs} args - Arguments to filter SubscriptionPlans to count.
     * @example
     * // Count the number of SubscriptionPlans
     * const count = await prisma.subscriptionPlan.count({
     *   where: {
     *     // ... the filter for the SubscriptionPlans we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionPlanCountArgs>(
      args?: Subset<T, SubscriptionPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriptionPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionPlanAggregateArgs>(args: Subset<T, SubscriptionPlanAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionPlanAggregateType<T>>

    /**
     * Group by SubscriptionPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionPlanGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriptionPlan model
   */
  readonly fields: SubscriptionPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriptionPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends SubscriptionPlan$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionPlan$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubscriptionPlan model
   */ 
  interface SubscriptionPlanFieldRefs {
    readonly id: FieldRef<"SubscriptionPlan", 'String'>
    readonly name: FieldRef<"SubscriptionPlan", 'String'>
    readonly slug: FieldRef<"SubscriptionPlan", 'String'>
    readonly description: FieldRef<"SubscriptionPlan", 'String'>
    readonly price: FieldRef<"SubscriptionPlan", 'Decimal'>
    readonly billingCycle: FieldRef<"SubscriptionPlan", 'BillingCycle'>
    readonly trialDays: FieldRef<"SubscriptionPlan", 'Int'>
    readonly maxStudents: FieldRef<"SubscriptionPlan", 'Int'>
    readonly maxTeachers: FieldRef<"SubscriptionPlan", 'Int'>
    readonly maxStaff: FieldRef<"SubscriptionPlan", 'Int'>
    readonly storageGB: FieldRef<"SubscriptionPlan", 'Int'>
    readonly features: FieldRef<"SubscriptionPlan", 'Json'>
    readonly isActive: FieldRef<"SubscriptionPlan", 'Boolean'>
    readonly sortOrder: FieldRef<"SubscriptionPlan", 'Int'>
    readonly createdAt: FieldRef<"SubscriptionPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"SubscriptionPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubscriptionPlan findUnique
   */
  export type SubscriptionPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlan to fetch.
     */
    where: SubscriptionPlanWhereUniqueInput
  }

  /**
   * SubscriptionPlan findUniqueOrThrow
   */
  export type SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlan to fetch.
     */
    where: SubscriptionPlanWhereUniqueInput
  }

  /**
   * SubscriptionPlan findFirst
   */
  export type SubscriptionPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlan to fetch.
     */
    where?: SubscriptionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPlans to fetch.
     */
    orderBy?: SubscriptionPlanOrderByWithRelationInput | SubscriptionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionPlans.
     */
    cursor?: SubscriptionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionPlans.
     */
    distinct?: SubscriptionPlanScalarFieldEnum | SubscriptionPlanScalarFieldEnum[]
  }

  /**
   * SubscriptionPlan findFirstOrThrow
   */
  export type SubscriptionPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlan to fetch.
     */
    where?: SubscriptionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPlans to fetch.
     */
    orderBy?: SubscriptionPlanOrderByWithRelationInput | SubscriptionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionPlans.
     */
    cursor?: SubscriptionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionPlans.
     */
    distinct?: SubscriptionPlanScalarFieldEnum | SubscriptionPlanScalarFieldEnum[]
  }

  /**
   * SubscriptionPlan findMany
   */
  export type SubscriptionPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPlans to fetch.
     */
    where?: SubscriptionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPlans to fetch.
     */
    orderBy?: SubscriptionPlanOrderByWithRelationInput | SubscriptionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriptionPlans.
     */
    cursor?: SubscriptionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPlans.
     */
    skip?: number
    distinct?: SubscriptionPlanScalarFieldEnum | SubscriptionPlanScalarFieldEnum[]
  }

  /**
   * SubscriptionPlan create
   */
  export type SubscriptionPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscriptionPlan.
     */
    data: XOR<SubscriptionPlanCreateInput, SubscriptionPlanUncheckedCreateInput>
  }

  /**
   * SubscriptionPlan createMany
   */
  export type SubscriptionPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriptionPlans.
     */
    data: SubscriptionPlanCreateManyInput | SubscriptionPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscriptionPlan createManyAndReturn
   */
  export type SubscriptionPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SubscriptionPlans.
     */
    data: SubscriptionPlanCreateManyInput | SubscriptionPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscriptionPlan update
   */
  export type SubscriptionPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscriptionPlan.
     */
    data: XOR<SubscriptionPlanUpdateInput, SubscriptionPlanUncheckedUpdateInput>
    /**
     * Choose, which SubscriptionPlan to update.
     */
    where: SubscriptionPlanWhereUniqueInput
  }

  /**
   * SubscriptionPlan updateMany
   */
  export type SubscriptionPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriptionPlans.
     */
    data: XOR<SubscriptionPlanUpdateManyMutationInput, SubscriptionPlanUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionPlans to update
     */
    where?: SubscriptionPlanWhereInput
  }

  /**
   * SubscriptionPlan upsert
   */
  export type SubscriptionPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscriptionPlan to update in case it exists.
     */
    where: SubscriptionPlanWhereUniqueInput
    /**
     * In case the SubscriptionPlan found by the `where` argument doesn't exist, create a new SubscriptionPlan with this data.
     */
    create: XOR<SubscriptionPlanCreateInput, SubscriptionPlanUncheckedCreateInput>
    /**
     * In case the SubscriptionPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionPlanUpdateInput, SubscriptionPlanUncheckedUpdateInput>
  }

  /**
   * SubscriptionPlan delete
   */
  export type SubscriptionPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
    /**
     * Filter which SubscriptionPlan to delete.
     */
    where: SubscriptionPlanWhereUniqueInput
  }

  /**
   * SubscriptionPlan deleteMany
   */
  export type SubscriptionPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionPlans to delete
     */
    where?: SubscriptionPlanWhereInput
  }

  /**
   * SubscriptionPlan.subscriptions
   */
  export type SubscriptionPlan$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * SubscriptionPlan without action
   */
  export type SubscriptionPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: SubscriptionPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPlanInclude<ExtArgs> | null
  }


  /**
   * Model Reseller
   */

  export type AggregateReseller = {
    _count: ResellerCountAggregateOutputType | null
    _avg: ResellerAvgAggregateOutputType | null
    _sum: ResellerSumAggregateOutputType | null
    _min: ResellerMinAggregateOutputType | null
    _max: ResellerMaxAggregateOutputType | null
  }

  export type ResellerAvgAggregateOutputType = {
    commissionPct: Decimal | null
  }

  export type ResellerSumAggregateOutputType = {
    commissionPct: Decimal | null
  }

  export type ResellerMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    company: string | null
    commissionPct: Decimal | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResellerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    company: string | null
    commissionPct: Decimal | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResellerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    company: number
    commissionPct: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResellerAvgAggregateInputType = {
    commissionPct?: true
  }

  export type ResellerSumAggregateInputType = {
    commissionPct?: true
  }

  export type ResellerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    company?: true
    commissionPct?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResellerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    company?: true
    commissionPct?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResellerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    company?: true
    commissionPct?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResellerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reseller to aggregate.
     */
    where?: ResellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resellers to fetch.
     */
    orderBy?: ResellerOrderByWithRelationInput | ResellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resellers
    **/
    _count?: true | ResellerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResellerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResellerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResellerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResellerMaxAggregateInputType
  }

  export type GetResellerAggregateType<T extends ResellerAggregateArgs> = {
        [P in keyof T & keyof AggregateReseller]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReseller[P]>
      : GetScalarType<T[P], AggregateReseller[P]>
  }




  export type ResellerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResellerWhereInput
    orderBy?: ResellerOrderByWithAggregationInput | ResellerOrderByWithAggregationInput[]
    by: ResellerScalarFieldEnum[] | ResellerScalarFieldEnum
    having?: ResellerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResellerCountAggregateInputType | true
    _avg?: ResellerAvgAggregateInputType
    _sum?: ResellerSumAggregateInputType
    _min?: ResellerMinAggregateInputType
    _max?: ResellerMaxAggregateInputType
  }

  export type ResellerGroupByOutputType = {
    id: string
    name: string
    email: string
    phone: string | null
    company: string | null
    commissionPct: Decimal
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ResellerCountAggregateOutputType | null
    _avg: ResellerAvgAggregateOutputType | null
    _sum: ResellerSumAggregateOutputType | null
    _min: ResellerMinAggregateOutputType | null
    _max: ResellerMaxAggregateOutputType | null
  }

  type GetResellerGroupByPayload<T extends ResellerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResellerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResellerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResellerGroupByOutputType[P]>
            : GetScalarType<T[P], ResellerGroupByOutputType[P]>
        }
      >
    >


  export type ResellerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    commissionPct?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    schools?: boolean | Reseller$schoolsArgs<ExtArgs>
    commissions?: boolean | Reseller$commissionsArgs<ExtArgs>
    _count?: boolean | ResellerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reseller"]>

  export type ResellerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    commissionPct?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["reseller"]>

  export type ResellerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    commissionPct?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ResellerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schools?: boolean | Reseller$schoolsArgs<ExtArgs>
    commissions?: boolean | Reseller$commissionsArgs<ExtArgs>
    _count?: boolean | ResellerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResellerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResellerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reseller"
    objects: {
      schools: Prisma.$SchoolPayload<ExtArgs>[]
      commissions: Prisma.$CommissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string | null
      company: string | null
      commissionPct: Prisma.Decimal
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reseller"]>
    composites: {}
  }

  type ResellerGetPayload<S extends boolean | null | undefined | ResellerDefaultArgs> = $Result.GetResult<Prisma.$ResellerPayload, S>

  type ResellerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ResellerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ResellerCountAggregateInputType | true
    }

  export interface ResellerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reseller'], meta: { name: 'Reseller' } }
    /**
     * Find zero or one Reseller that matches the filter.
     * @param {ResellerFindUniqueArgs} args - Arguments to find a Reseller
     * @example
     * // Get one Reseller
     * const reseller = await prisma.reseller.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResellerFindUniqueArgs>(args: SelectSubset<T, ResellerFindUniqueArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Reseller that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ResellerFindUniqueOrThrowArgs} args - Arguments to find a Reseller
     * @example
     * // Get one Reseller
     * const reseller = await prisma.reseller.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResellerFindUniqueOrThrowArgs>(args: SelectSubset<T, ResellerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Reseller that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerFindFirstArgs} args - Arguments to find a Reseller
     * @example
     * // Get one Reseller
     * const reseller = await prisma.reseller.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResellerFindFirstArgs>(args?: SelectSubset<T, ResellerFindFirstArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Reseller that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerFindFirstOrThrowArgs} args - Arguments to find a Reseller
     * @example
     * // Get one Reseller
     * const reseller = await prisma.reseller.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResellerFindFirstOrThrowArgs>(args?: SelectSubset<T, ResellerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Resellers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resellers
     * const resellers = await prisma.reseller.findMany()
     * 
     * // Get first 10 Resellers
     * const resellers = await prisma.reseller.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resellerWithIdOnly = await prisma.reseller.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResellerFindManyArgs>(args?: SelectSubset<T, ResellerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Reseller.
     * @param {ResellerCreateArgs} args - Arguments to create a Reseller.
     * @example
     * // Create one Reseller
     * const Reseller = await prisma.reseller.create({
     *   data: {
     *     // ... data to create a Reseller
     *   }
     * })
     * 
     */
    create<T extends ResellerCreateArgs>(args: SelectSubset<T, ResellerCreateArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Resellers.
     * @param {ResellerCreateManyArgs} args - Arguments to create many Resellers.
     * @example
     * // Create many Resellers
     * const reseller = await prisma.reseller.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResellerCreateManyArgs>(args?: SelectSubset<T, ResellerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resellers and returns the data saved in the database.
     * @param {ResellerCreateManyAndReturnArgs} args - Arguments to create many Resellers.
     * @example
     * // Create many Resellers
     * const reseller = await prisma.reseller.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resellers and only return the `id`
     * const resellerWithIdOnly = await prisma.reseller.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResellerCreateManyAndReturnArgs>(args?: SelectSubset<T, ResellerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Reseller.
     * @param {ResellerDeleteArgs} args - Arguments to delete one Reseller.
     * @example
     * // Delete one Reseller
     * const Reseller = await prisma.reseller.delete({
     *   where: {
     *     // ... filter to delete one Reseller
     *   }
     * })
     * 
     */
    delete<T extends ResellerDeleteArgs>(args: SelectSubset<T, ResellerDeleteArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Reseller.
     * @param {ResellerUpdateArgs} args - Arguments to update one Reseller.
     * @example
     * // Update one Reseller
     * const reseller = await prisma.reseller.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResellerUpdateArgs>(args: SelectSubset<T, ResellerUpdateArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Resellers.
     * @param {ResellerDeleteManyArgs} args - Arguments to filter Resellers to delete.
     * @example
     * // Delete a few Resellers
     * const { count } = await prisma.reseller.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResellerDeleteManyArgs>(args?: SelectSubset<T, ResellerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resellers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resellers
     * const reseller = await prisma.reseller.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResellerUpdateManyArgs>(args: SelectSubset<T, ResellerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Reseller.
     * @param {ResellerUpsertArgs} args - Arguments to update or create a Reseller.
     * @example
     * // Update or create a Reseller
     * const reseller = await prisma.reseller.upsert({
     *   create: {
     *     // ... data to create a Reseller
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reseller we want to update
     *   }
     * })
     */
    upsert<T extends ResellerUpsertArgs>(args: SelectSubset<T, ResellerUpsertArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Resellers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerCountArgs} args - Arguments to filter Resellers to count.
     * @example
     * // Count the number of Resellers
     * const count = await prisma.reseller.count({
     *   where: {
     *     // ... the filter for the Resellers we want to count
     *   }
     * })
    **/
    count<T extends ResellerCountArgs>(
      args?: Subset<T, ResellerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResellerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reseller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResellerAggregateArgs>(args: Subset<T, ResellerAggregateArgs>): Prisma.PrismaPromise<GetResellerAggregateType<T>>

    /**
     * Group by Reseller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResellerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResellerGroupByArgs['orderBy'] }
        : { orderBy?: ResellerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResellerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResellerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reseller model
   */
  readonly fields: ResellerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reseller.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResellerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schools<T extends Reseller$schoolsArgs<ExtArgs> = {}>(args?: Subset<T, Reseller$schoolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany"> | Null>
    commissions<T extends Reseller$commissionsArgs<ExtArgs> = {}>(args?: Subset<T, Reseller$commissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reseller model
   */ 
  interface ResellerFieldRefs {
    readonly id: FieldRef<"Reseller", 'String'>
    readonly name: FieldRef<"Reseller", 'String'>
    readonly email: FieldRef<"Reseller", 'String'>
    readonly phone: FieldRef<"Reseller", 'String'>
    readonly company: FieldRef<"Reseller", 'String'>
    readonly commissionPct: FieldRef<"Reseller", 'Decimal'>
    readonly isActive: FieldRef<"Reseller", 'Boolean'>
    readonly createdAt: FieldRef<"Reseller", 'DateTime'>
    readonly updatedAt: FieldRef<"Reseller", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reseller findUnique
   */
  export type ResellerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * Filter, which Reseller to fetch.
     */
    where: ResellerWhereUniqueInput
  }

  /**
   * Reseller findUniqueOrThrow
   */
  export type ResellerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * Filter, which Reseller to fetch.
     */
    where: ResellerWhereUniqueInput
  }

  /**
   * Reseller findFirst
   */
  export type ResellerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * Filter, which Reseller to fetch.
     */
    where?: ResellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resellers to fetch.
     */
    orderBy?: ResellerOrderByWithRelationInput | ResellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resellers.
     */
    cursor?: ResellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resellers.
     */
    distinct?: ResellerScalarFieldEnum | ResellerScalarFieldEnum[]
  }

  /**
   * Reseller findFirstOrThrow
   */
  export type ResellerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * Filter, which Reseller to fetch.
     */
    where?: ResellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resellers to fetch.
     */
    orderBy?: ResellerOrderByWithRelationInput | ResellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resellers.
     */
    cursor?: ResellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resellers.
     */
    distinct?: ResellerScalarFieldEnum | ResellerScalarFieldEnum[]
  }

  /**
   * Reseller findMany
   */
  export type ResellerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * Filter, which Resellers to fetch.
     */
    where?: ResellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resellers to fetch.
     */
    orderBy?: ResellerOrderByWithRelationInput | ResellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resellers.
     */
    cursor?: ResellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resellers.
     */
    skip?: number
    distinct?: ResellerScalarFieldEnum | ResellerScalarFieldEnum[]
  }

  /**
   * Reseller create
   */
  export type ResellerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * The data needed to create a Reseller.
     */
    data: XOR<ResellerCreateInput, ResellerUncheckedCreateInput>
  }

  /**
   * Reseller createMany
   */
  export type ResellerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resellers.
     */
    data: ResellerCreateManyInput | ResellerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reseller createManyAndReturn
   */
  export type ResellerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Resellers.
     */
    data: ResellerCreateManyInput | ResellerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reseller update
   */
  export type ResellerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * The data needed to update a Reseller.
     */
    data: XOR<ResellerUpdateInput, ResellerUncheckedUpdateInput>
    /**
     * Choose, which Reseller to update.
     */
    where: ResellerWhereUniqueInput
  }

  /**
   * Reseller updateMany
   */
  export type ResellerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resellers.
     */
    data: XOR<ResellerUpdateManyMutationInput, ResellerUncheckedUpdateManyInput>
    /**
     * Filter which Resellers to update
     */
    where?: ResellerWhereInput
  }

  /**
   * Reseller upsert
   */
  export type ResellerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * The filter to search for the Reseller to update in case it exists.
     */
    where: ResellerWhereUniqueInput
    /**
     * In case the Reseller found by the `where` argument doesn't exist, create a new Reseller with this data.
     */
    create: XOR<ResellerCreateInput, ResellerUncheckedCreateInput>
    /**
     * In case the Reseller was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResellerUpdateInput, ResellerUncheckedUpdateInput>
  }

  /**
   * Reseller delete
   */
  export type ResellerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    /**
     * Filter which Reseller to delete.
     */
    where: ResellerWhereUniqueInput
  }

  /**
   * Reseller deleteMany
   */
  export type ResellerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resellers to delete
     */
    where?: ResellerWhereInput
  }

  /**
   * Reseller.schools
   */
  export type Reseller$schoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    cursor?: SchoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * Reseller.commissions
   */
  export type Reseller$commissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    where?: CommissionWhereInput
    orderBy?: CommissionOrderByWithRelationInput | CommissionOrderByWithRelationInput[]
    cursor?: CommissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommissionScalarFieldEnum | CommissionScalarFieldEnum[]
  }

  /**
   * Reseller without action
   */
  export type ResellerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
  }


  /**
   * Model Commission
   */

  export type AggregateCommission = {
    _count: CommissionCountAggregateOutputType | null
    _avg: CommissionAvgAggregateOutputType | null
    _sum: CommissionSumAggregateOutputType | null
    _min: CommissionMinAggregateOutputType | null
    _max: CommissionMaxAggregateOutputType | null
  }

  export type CommissionAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type CommissionSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type CommissionMinAggregateOutputType = {
    id: string | null
    resellerId: string | null
    schoolId: string | null
    amount: Decimal | null
    status: $Enums.CommStatus | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type CommissionMaxAggregateOutputType = {
    id: string | null
    resellerId: string | null
    schoolId: string | null
    amount: Decimal | null
    status: $Enums.CommStatus | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type CommissionCountAggregateOutputType = {
    id: number
    resellerId: number
    schoolId: number
    amount: number
    status: number
    paidAt: number
    createdAt: number
    _all: number
  }


  export type CommissionAvgAggregateInputType = {
    amount?: true
  }

  export type CommissionSumAggregateInputType = {
    amount?: true
  }

  export type CommissionMinAggregateInputType = {
    id?: true
    resellerId?: true
    schoolId?: true
    amount?: true
    status?: true
    paidAt?: true
    createdAt?: true
  }

  export type CommissionMaxAggregateInputType = {
    id?: true
    resellerId?: true
    schoolId?: true
    amount?: true
    status?: true
    paidAt?: true
    createdAt?: true
  }

  export type CommissionCountAggregateInputType = {
    id?: true
    resellerId?: true
    schoolId?: true
    amount?: true
    status?: true
    paidAt?: true
    createdAt?: true
    _all?: true
  }

  export type CommissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commission to aggregate.
     */
    where?: CommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commissions to fetch.
     */
    orderBy?: CommissionOrderByWithRelationInput | CommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commissions
    **/
    _count?: true | CommissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommissionMaxAggregateInputType
  }

  export type GetCommissionAggregateType<T extends CommissionAggregateArgs> = {
        [P in keyof T & keyof AggregateCommission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommission[P]>
      : GetScalarType<T[P], AggregateCommission[P]>
  }




  export type CommissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommissionWhereInput
    orderBy?: CommissionOrderByWithAggregationInput | CommissionOrderByWithAggregationInput[]
    by: CommissionScalarFieldEnum[] | CommissionScalarFieldEnum
    having?: CommissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommissionCountAggregateInputType | true
    _avg?: CommissionAvgAggregateInputType
    _sum?: CommissionSumAggregateInputType
    _min?: CommissionMinAggregateInputType
    _max?: CommissionMaxAggregateInputType
  }

  export type CommissionGroupByOutputType = {
    id: string
    resellerId: string
    schoolId: string
    amount: Decimal
    status: $Enums.CommStatus
    paidAt: Date | null
    createdAt: Date
    _count: CommissionCountAggregateOutputType | null
    _avg: CommissionAvgAggregateOutputType | null
    _sum: CommissionSumAggregateOutputType | null
    _min: CommissionMinAggregateOutputType | null
    _max: CommissionMaxAggregateOutputType | null
  }

  type GetCommissionGroupByPayload<T extends CommissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommissionGroupByOutputType[P]>
            : GetScalarType<T[P], CommissionGroupByOutputType[P]>
        }
      >
    >


  export type CommissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resellerId?: boolean
    schoolId?: boolean
    amount?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    reseller?: boolean | ResellerDefaultArgs<ExtArgs>
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commission"]>

  export type CommissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resellerId?: boolean
    schoolId?: boolean
    amount?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    reseller?: boolean | ResellerDefaultArgs<ExtArgs>
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commission"]>

  export type CommissionSelectScalar = {
    id?: boolean
    resellerId?: boolean
    schoolId?: boolean
    amount?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
  }

  export type CommissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reseller?: boolean | ResellerDefaultArgs<ExtArgs>
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type CommissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reseller?: boolean | ResellerDefaultArgs<ExtArgs>
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $CommissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commission"
    objects: {
      reseller: Prisma.$ResellerPayload<ExtArgs>
      school: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      resellerId: string
      schoolId: string
      amount: Prisma.Decimal
      status: $Enums.CommStatus
      paidAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["commission"]>
    composites: {}
  }

  type CommissionGetPayload<S extends boolean | null | undefined | CommissionDefaultArgs> = $Result.GetResult<Prisma.$CommissionPayload, S>

  type CommissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommissionCountAggregateInputType | true
    }

  export interface CommissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commission'], meta: { name: 'Commission' } }
    /**
     * Find zero or one Commission that matches the filter.
     * @param {CommissionFindUniqueArgs} args - Arguments to find a Commission
     * @example
     * // Get one Commission
     * const commission = await prisma.commission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommissionFindUniqueArgs>(args: SelectSubset<T, CommissionFindUniqueArgs<ExtArgs>>): Prisma__CommissionClient<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Commission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommissionFindUniqueOrThrowArgs} args - Arguments to find a Commission
     * @example
     * // Get one Commission
     * const commission = await prisma.commission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommissionFindUniqueOrThrowArgs>(args: SelectSubset<T, CommissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommissionClient<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Commission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionFindFirstArgs} args - Arguments to find a Commission
     * @example
     * // Get one Commission
     * const commission = await prisma.commission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommissionFindFirstArgs>(args?: SelectSubset<T, CommissionFindFirstArgs<ExtArgs>>): Prisma__CommissionClient<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Commission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionFindFirstOrThrowArgs} args - Arguments to find a Commission
     * @example
     * // Get one Commission
     * const commission = await prisma.commission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommissionFindFirstOrThrowArgs>(args?: SelectSubset<T, CommissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommissionClient<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Commissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commissions
     * const commissions = await prisma.commission.findMany()
     * 
     * // Get first 10 Commissions
     * const commissions = await prisma.commission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commissionWithIdOnly = await prisma.commission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommissionFindManyArgs>(args?: SelectSubset<T, CommissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Commission.
     * @param {CommissionCreateArgs} args - Arguments to create a Commission.
     * @example
     * // Create one Commission
     * const Commission = await prisma.commission.create({
     *   data: {
     *     // ... data to create a Commission
     *   }
     * })
     * 
     */
    create<T extends CommissionCreateArgs>(args: SelectSubset<T, CommissionCreateArgs<ExtArgs>>): Prisma__CommissionClient<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Commissions.
     * @param {CommissionCreateManyArgs} args - Arguments to create many Commissions.
     * @example
     * // Create many Commissions
     * const commission = await prisma.commission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommissionCreateManyArgs>(args?: SelectSubset<T, CommissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commissions and returns the data saved in the database.
     * @param {CommissionCreateManyAndReturnArgs} args - Arguments to create many Commissions.
     * @example
     * // Create many Commissions
     * const commission = await prisma.commission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commissions and only return the `id`
     * const commissionWithIdOnly = await prisma.commission.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommissionCreateManyAndReturnArgs>(args?: SelectSubset<T, CommissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Commission.
     * @param {CommissionDeleteArgs} args - Arguments to delete one Commission.
     * @example
     * // Delete one Commission
     * const Commission = await prisma.commission.delete({
     *   where: {
     *     // ... filter to delete one Commission
     *   }
     * })
     * 
     */
    delete<T extends CommissionDeleteArgs>(args: SelectSubset<T, CommissionDeleteArgs<ExtArgs>>): Prisma__CommissionClient<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Commission.
     * @param {CommissionUpdateArgs} args - Arguments to update one Commission.
     * @example
     * // Update one Commission
     * const commission = await prisma.commission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommissionUpdateArgs>(args: SelectSubset<T, CommissionUpdateArgs<ExtArgs>>): Prisma__CommissionClient<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Commissions.
     * @param {CommissionDeleteManyArgs} args - Arguments to filter Commissions to delete.
     * @example
     * // Delete a few Commissions
     * const { count } = await prisma.commission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommissionDeleteManyArgs>(args?: SelectSubset<T, CommissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commissions
     * const commission = await prisma.commission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommissionUpdateManyArgs>(args: SelectSubset<T, CommissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Commission.
     * @param {CommissionUpsertArgs} args - Arguments to update or create a Commission.
     * @example
     * // Update or create a Commission
     * const commission = await prisma.commission.upsert({
     *   create: {
     *     // ... data to create a Commission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commission we want to update
     *   }
     * })
     */
    upsert<T extends CommissionUpsertArgs>(args: SelectSubset<T, CommissionUpsertArgs<ExtArgs>>): Prisma__CommissionClient<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Commissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionCountArgs} args - Arguments to filter Commissions to count.
     * @example
     * // Count the number of Commissions
     * const count = await prisma.commission.count({
     *   where: {
     *     // ... the filter for the Commissions we want to count
     *   }
     * })
    **/
    count<T extends CommissionCountArgs>(
      args?: Subset<T, CommissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommissionAggregateArgs>(args: Subset<T, CommissionAggregateArgs>): Prisma.PrismaPromise<GetCommissionAggregateType<T>>

    /**
     * Group by Commission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommissionGroupByArgs['orderBy'] }
        : { orderBy?: CommissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commission model
   */
  readonly fields: CommissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reseller<T extends ResellerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResellerDefaultArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Commission model
   */ 
  interface CommissionFieldRefs {
    readonly id: FieldRef<"Commission", 'String'>
    readonly resellerId: FieldRef<"Commission", 'String'>
    readonly schoolId: FieldRef<"Commission", 'String'>
    readonly amount: FieldRef<"Commission", 'Decimal'>
    readonly status: FieldRef<"Commission", 'CommStatus'>
    readonly paidAt: FieldRef<"Commission", 'DateTime'>
    readonly createdAt: FieldRef<"Commission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Commission findUnique
   */
  export type CommissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * Filter, which Commission to fetch.
     */
    where: CommissionWhereUniqueInput
  }

  /**
   * Commission findUniqueOrThrow
   */
  export type CommissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * Filter, which Commission to fetch.
     */
    where: CommissionWhereUniqueInput
  }

  /**
   * Commission findFirst
   */
  export type CommissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * Filter, which Commission to fetch.
     */
    where?: CommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commissions to fetch.
     */
    orderBy?: CommissionOrderByWithRelationInput | CommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commissions.
     */
    cursor?: CommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commissions.
     */
    distinct?: CommissionScalarFieldEnum | CommissionScalarFieldEnum[]
  }

  /**
   * Commission findFirstOrThrow
   */
  export type CommissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * Filter, which Commission to fetch.
     */
    where?: CommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commissions to fetch.
     */
    orderBy?: CommissionOrderByWithRelationInput | CommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commissions.
     */
    cursor?: CommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commissions.
     */
    distinct?: CommissionScalarFieldEnum | CommissionScalarFieldEnum[]
  }

  /**
   * Commission findMany
   */
  export type CommissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * Filter, which Commissions to fetch.
     */
    where?: CommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commissions to fetch.
     */
    orderBy?: CommissionOrderByWithRelationInput | CommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commissions.
     */
    cursor?: CommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commissions.
     */
    skip?: number
    distinct?: CommissionScalarFieldEnum | CommissionScalarFieldEnum[]
  }

  /**
   * Commission create
   */
  export type CommissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Commission.
     */
    data: XOR<CommissionCreateInput, CommissionUncheckedCreateInput>
  }

  /**
   * Commission createMany
   */
  export type CommissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commissions.
     */
    data: CommissionCreateManyInput | CommissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commission createManyAndReturn
   */
  export type CommissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Commissions.
     */
    data: CommissionCreateManyInput | CommissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commission update
   */
  export type CommissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Commission.
     */
    data: XOR<CommissionUpdateInput, CommissionUncheckedUpdateInput>
    /**
     * Choose, which Commission to update.
     */
    where: CommissionWhereUniqueInput
  }

  /**
   * Commission updateMany
   */
  export type CommissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commissions.
     */
    data: XOR<CommissionUpdateManyMutationInput, CommissionUncheckedUpdateManyInput>
    /**
     * Filter which Commissions to update
     */
    where?: CommissionWhereInput
  }

  /**
   * Commission upsert
   */
  export type CommissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Commission to update in case it exists.
     */
    where: CommissionWhereUniqueInput
    /**
     * In case the Commission found by the `where` argument doesn't exist, create a new Commission with this data.
     */
    create: XOR<CommissionCreateInput, CommissionUncheckedCreateInput>
    /**
     * In case the Commission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommissionUpdateInput, CommissionUncheckedUpdateInput>
  }

  /**
   * Commission delete
   */
  export type CommissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    /**
     * Filter which Commission to delete.
     */
    where: CommissionWhereUniqueInput
  }

  /**
   * Commission deleteMany
   */
  export type CommissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commissions to delete
     */
    where?: CommissionWhereInput
  }

  /**
   * Commission without action
   */
  export type CommissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
  }


  /**
   * Model School
   */

  export type AggregateSchool = {
    _count: SchoolCountAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  export type SchoolMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    pincode: string | null
    website: string | null
    logo: string | null
    favicon: string | null
    primaryColor: string | null
    secondaryColor: string | null
    customDomain: string | null
    dbName: string | null
    status: $Enums.SchoolStatus | null
    timezone: string | null
    currency: string | null
    language: string | null
    resellerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SchoolMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    pincode: string | null
    website: string | null
    logo: string | null
    favicon: string | null
    primaryColor: string | null
    secondaryColor: string | null
    customDomain: string | null
    dbName: string | null
    status: $Enums.SchoolStatus | null
    timezone: string | null
    currency: string | null
    language: string | null
    resellerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SchoolCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    email: number
    phone: number
    address: number
    city: number
    state: number
    country: number
    pincode: number
    website: number
    logo: number
    favicon: number
    primaryColor: number
    secondaryColor: number
    customDomain: number
    dbName: number
    status: number
    timezone: number
    currency: number
    language: number
    resellerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SchoolMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    state?: true
    country?: true
    pincode?: true
    website?: true
    logo?: true
    favicon?: true
    primaryColor?: true
    secondaryColor?: true
    customDomain?: true
    dbName?: true
    status?: true
    timezone?: true
    currency?: true
    language?: true
    resellerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SchoolMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    state?: true
    country?: true
    pincode?: true
    website?: true
    logo?: true
    favicon?: true
    primaryColor?: true
    secondaryColor?: true
    customDomain?: true
    dbName?: true
    status?: true
    timezone?: true
    currency?: true
    language?: true
    resellerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SchoolCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    state?: true
    country?: true
    pincode?: true
    website?: true
    logo?: true
    favicon?: true
    primaryColor?: true
    secondaryColor?: true
    customDomain?: true
    dbName?: true
    status?: true
    timezone?: true
    currency?: true
    language?: true
    resellerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SchoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which School to aggregate.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schools
    **/
    _count?: true | SchoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolMaxAggregateInputType
  }

  export type GetSchoolAggregateType<T extends SchoolAggregateArgs> = {
        [P in keyof T & keyof AggregateSchool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchool[P]>
      : GetScalarType<T[P], AggregateSchool[P]>
  }




  export type SchoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithAggregationInput | SchoolOrderByWithAggregationInput[]
    by: SchoolScalarFieldEnum[] | SchoolScalarFieldEnum
    having?: SchoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolCountAggregateInputType | true
    _min?: SchoolMinAggregateInputType
    _max?: SchoolMaxAggregateInputType
  }

  export type SchoolGroupByOutputType = {
    id: string
    name: string
    slug: string
    email: string
    phone: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string
    pincode: string | null
    website: string | null
    logo: string | null
    favicon: string | null
    primaryColor: string
    secondaryColor: string
    customDomain: string | null
    dbName: string
    status: $Enums.SchoolStatus
    timezone: string
    currency: string
    language: string
    resellerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: SchoolCountAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  type GetSchoolGroupByPayload<T extends SchoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolGroupByOutputType[P]>
        }
      >
    >


  export type SchoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    pincode?: boolean
    website?: boolean
    logo?: boolean
    favicon?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    customDomain?: boolean
    dbName?: boolean
    status?: boolean
    timezone?: boolean
    currency?: boolean
    language?: boolean
    resellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reseller?: boolean | School$resellerArgs<ExtArgs>
    subscriptions?: boolean | School$subscriptionsArgs<ExtArgs>
    commissions?: boolean | School$commissionsArgs<ExtArgs>
    usageMetrics?: boolean | School$usageMetricsArgs<ExtArgs>
    schoolSettings?: boolean | School$schoolSettingsArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    pincode?: boolean
    website?: boolean
    logo?: boolean
    favicon?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    customDomain?: boolean
    dbName?: boolean
    status?: boolean
    timezone?: boolean
    currency?: boolean
    language?: boolean
    resellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reseller?: boolean | School$resellerArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    pincode?: boolean
    website?: boolean
    logo?: boolean
    favicon?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    customDomain?: boolean
    dbName?: boolean
    status?: boolean
    timezone?: boolean
    currency?: boolean
    language?: boolean
    resellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SchoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reseller?: boolean | School$resellerArgs<ExtArgs>
    subscriptions?: boolean | School$subscriptionsArgs<ExtArgs>
    commissions?: boolean | School$commissionsArgs<ExtArgs>
    usageMetrics?: boolean | School$usageMetricsArgs<ExtArgs>
    schoolSettings?: boolean | School$schoolSettingsArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SchoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reseller?: boolean | School$resellerArgs<ExtArgs>
  }

  export type $SchoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "School"
    objects: {
      reseller: Prisma.$ResellerPayload<ExtArgs> | null
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      commissions: Prisma.$CommissionPayload<ExtArgs>[]
      usageMetrics: Prisma.$UsageMetricPayload<ExtArgs>[]
      schoolSettings: Prisma.$SchoolSettingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      email: string
      phone: string | null
      address: string | null
      city: string | null
      state: string | null
      country: string
      pincode: string | null
      website: string | null
      logo: string | null
      favicon: string | null
      primaryColor: string
      secondaryColor: string
      customDomain: string | null
      dbName: string
      status: $Enums.SchoolStatus
      timezone: string
      currency: string
      language: string
      resellerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["school"]>
    composites: {}
  }

  type SchoolGetPayload<S extends boolean | null | undefined | SchoolDefaultArgs> = $Result.GetResult<Prisma.$SchoolPayload, S>

  type SchoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SchoolFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SchoolCountAggregateInputType | true
    }

  export interface SchoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['School'], meta: { name: 'School' } }
    /**
     * Find zero or one School that matches the filter.
     * @param {SchoolFindUniqueArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolFindUniqueArgs>(args: SelectSubset<T, SchoolFindUniqueArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one School that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SchoolFindUniqueOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first School that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolFindFirstArgs>(args?: SelectSubset<T, SchoolFindFirstArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first School that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Schools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schools
     * const schools = await prisma.school.findMany()
     * 
     * // Get first 10 Schools
     * const schools = await prisma.school.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schoolWithIdOnly = await prisma.school.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchoolFindManyArgs>(args?: SelectSubset<T, SchoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a School.
     * @param {SchoolCreateArgs} args - Arguments to create a School.
     * @example
     * // Create one School
     * const School = await prisma.school.create({
     *   data: {
     *     // ... data to create a School
     *   }
     * })
     * 
     */
    create<T extends SchoolCreateArgs>(args: SelectSubset<T, SchoolCreateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Schools.
     * @param {SchoolCreateManyArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolCreateManyArgs>(args?: SelectSubset<T, SchoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schools and returns the data saved in the database.
     * @param {SchoolCreateManyAndReturnArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schools and only return the `id`
     * const schoolWithIdOnly = await prisma.school.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a School.
     * @param {SchoolDeleteArgs} args - Arguments to delete one School.
     * @example
     * // Delete one School
     * const School = await prisma.school.delete({
     *   where: {
     *     // ... filter to delete one School
     *   }
     * })
     * 
     */
    delete<T extends SchoolDeleteArgs>(args: SelectSubset<T, SchoolDeleteArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one School.
     * @param {SchoolUpdateArgs} args - Arguments to update one School.
     * @example
     * // Update one School
     * const school = await prisma.school.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolUpdateArgs>(args: SelectSubset<T, SchoolUpdateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Schools.
     * @param {SchoolDeleteManyArgs} args - Arguments to filter Schools to delete.
     * @example
     * // Delete a few Schools
     * const { count } = await prisma.school.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolDeleteManyArgs>(args?: SelectSubset<T, SchoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolUpdateManyArgs>(args: SelectSubset<T, SchoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one School.
     * @param {SchoolUpsertArgs} args - Arguments to update or create a School.
     * @example
     * // Update or create a School
     * const school = await prisma.school.upsert({
     *   create: {
     *     // ... data to create a School
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the School we want to update
     *   }
     * })
     */
    upsert<T extends SchoolUpsertArgs>(args: SelectSubset<T, SchoolUpsertArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolCountArgs} args - Arguments to filter Schools to count.
     * @example
     * // Count the number of Schools
     * const count = await prisma.school.count({
     *   where: {
     *     // ... the filter for the Schools we want to count
     *   }
     * })
    **/
    count<T extends SchoolCountArgs>(
      args?: Subset<T, SchoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchoolAggregateArgs>(args: Subset<T, SchoolAggregateArgs>): Prisma.PrismaPromise<GetSchoolAggregateType<T>>

    /**
     * Group by School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SchoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolGroupByArgs['orderBy'] }
        : { orderBy?: SchoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SchoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the School model
   */
  readonly fields: SchoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for School.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reseller<T extends School$resellerArgs<ExtArgs> = {}>(args?: Subset<T, School$resellerArgs<ExtArgs>>): Prisma__ResellerClient<$Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    subscriptions<T extends School$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, School$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany"> | Null>
    commissions<T extends School$commissionsArgs<ExtArgs> = {}>(args?: Subset<T, School$commissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionPayload<ExtArgs>, T, "findMany"> | Null>
    usageMetrics<T extends School$usageMetricsArgs<ExtArgs> = {}>(args?: Subset<T, School$usageMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "findMany"> | Null>
    schoolSettings<T extends School$schoolSettingsArgs<ExtArgs> = {}>(args?: Subset<T, School$schoolSettingsArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the School model
   */ 
  interface SchoolFieldRefs {
    readonly id: FieldRef<"School", 'String'>
    readonly name: FieldRef<"School", 'String'>
    readonly slug: FieldRef<"School", 'String'>
    readonly email: FieldRef<"School", 'String'>
    readonly phone: FieldRef<"School", 'String'>
    readonly address: FieldRef<"School", 'String'>
    readonly city: FieldRef<"School", 'String'>
    readonly state: FieldRef<"School", 'String'>
    readonly country: FieldRef<"School", 'String'>
    readonly pincode: FieldRef<"School", 'String'>
    readonly website: FieldRef<"School", 'String'>
    readonly logo: FieldRef<"School", 'String'>
    readonly favicon: FieldRef<"School", 'String'>
    readonly primaryColor: FieldRef<"School", 'String'>
    readonly secondaryColor: FieldRef<"School", 'String'>
    readonly customDomain: FieldRef<"School", 'String'>
    readonly dbName: FieldRef<"School", 'String'>
    readonly status: FieldRef<"School", 'SchoolStatus'>
    readonly timezone: FieldRef<"School", 'String'>
    readonly currency: FieldRef<"School", 'String'>
    readonly language: FieldRef<"School", 'String'>
    readonly resellerId: FieldRef<"School", 'String'>
    readonly createdAt: FieldRef<"School", 'DateTime'>
    readonly updatedAt: FieldRef<"School", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * School findUnique
   */
  export type SchoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findUniqueOrThrow
   */
  export type SchoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findFirst
   */
  export type SchoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findFirstOrThrow
   */
  export type SchoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findMany
   */
  export type SchoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Schools to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School create
   */
  export type SchoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to create a School.
     */
    data: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
  }

  /**
   * School createMany
   */
  export type SchoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * School createManyAndReturn
   */
  export type SchoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * School update
   */
  export type SchoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to update a School.
     */
    data: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
    /**
     * Choose, which School to update.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School updateMany
   */
  export type SchoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
  }

  /**
   * School upsert
   */
  export type SchoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The filter to search for the School to update in case it exists.
     */
    where: SchoolWhereUniqueInput
    /**
     * In case the School found by the `where` argument doesn't exist, create a new School with this data.
     */
    create: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
    /**
     * In case the School was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
  }

  /**
   * School delete
   */
  export type SchoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter which School to delete.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School deleteMany
   */
  export type SchoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schools to delete
     */
    where?: SchoolWhereInput
  }

  /**
   * School.reseller
   */
  export type School$resellerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reseller
     */
    select?: ResellerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResellerInclude<ExtArgs> | null
    where?: ResellerWhereInput
  }

  /**
   * School.subscriptions
   */
  export type School$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * School.commissions
   */
  export type School$commissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commission
     */
    select?: CommissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionInclude<ExtArgs> | null
    where?: CommissionWhereInput
    orderBy?: CommissionOrderByWithRelationInput | CommissionOrderByWithRelationInput[]
    cursor?: CommissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommissionScalarFieldEnum | CommissionScalarFieldEnum[]
  }

  /**
   * School.usageMetrics
   */
  export type School$usageMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    where?: UsageMetricWhereInput
    orderBy?: UsageMetricOrderByWithRelationInput | UsageMetricOrderByWithRelationInput[]
    cursor?: UsageMetricWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageMetricScalarFieldEnum | UsageMetricScalarFieldEnum[]
  }

  /**
   * School.schoolSettings
   */
  export type School$schoolSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    where?: SchoolSettingWhereInput
  }

  /**
   * School without action
   */
  export type SchoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
  }


  /**
   * Model SchoolSetting
   */

  export type AggregateSchoolSetting = {
    _count: SchoolSettingCountAggregateOutputType | null
    _avg: SchoolSettingAvgAggregateOutputType | null
    _sum: SchoolSettingSumAggregateOutputType | null
    _min: SchoolSettingMinAggregateOutputType | null
    _max: SchoolSettingMaxAggregateOutputType | null
  }

  export type SchoolSettingAvgAggregateOutputType = {
    smtpPort: number | null
  }

  export type SchoolSettingSumAggregateOutputType = {
    smtpPort: number | null
  }

  export type SchoolSettingMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    smtpHost: string | null
    smtpPort: number | null
    smtpUser: string | null
    smtpPass: string | null
    smtpFrom: string | null
    smsProvider: string | null
    smsApiKey: string | null
    whatsappApiKey: string | null
    razorpayKeyId: string | null
    razorpayKeySecret: string | null
    stripePubKey: string | null
    stripeSecretKey: string | null
    s3Bucket: string | null
    s3Region: string | null
    s3AccessKey: string | null
    s3SecretKey: string | null
    zoomApiKey: string | null
    zoomApiSecret: string | null
    firebaseServerKey: string | null
    updatedAt: Date | null
  }

  export type SchoolSettingMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    smtpHost: string | null
    smtpPort: number | null
    smtpUser: string | null
    smtpPass: string | null
    smtpFrom: string | null
    smsProvider: string | null
    smsApiKey: string | null
    whatsappApiKey: string | null
    razorpayKeyId: string | null
    razorpayKeySecret: string | null
    stripePubKey: string | null
    stripeSecretKey: string | null
    s3Bucket: string | null
    s3Region: string | null
    s3AccessKey: string | null
    s3SecretKey: string | null
    zoomApiKey: string | null
    zoomApiSecret: string | null
    firebaseServerKey: string | null
    updatedAt: Date | null
  }

  export type SchoolSettingCountAggregateOutputType = {
    id: number
    schoolId: number
    smtpHost: number
    smtpPort: number
    smtpUser: number
    smtpPass: number
    smtpFrom: number
    smsProvider: number
    smsApiKey: number
    whatsappApiKey: number
    razorpayKeyId: number
    razorpayKeySecret: number
    stripePubKey: number
    stripeSecretKey: number
    s3Bucket: number
    s3Region: number
    s3AccessKey: number
    s3SecretKey: number
    zoomApiKey: number
    zoomApiSecret: number
    firebaseServerKey: number
    updatedAt: number
    _all: number
  }


  export type SchoolSettingAvgAggregateInputType = {
    smtpPort?: true
  }

  export type SchoolSettingSumAggregateInputType = {
    smtpPort?: true
  }

  export type SchoolSettingMinAggregateInputType = {
    id?: true
    schoolId?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPass?: true
    smtpFrom?: true
    smsProvider?: true
    smsApiKey?: true
    whatsappApiKey?: true
    razorpayKeyId?: true
    razorpayKeySecret?: true
    stripePubKey?: true
    stripeSecretKey?: true
    s3Bucket?: true
    s3Region?: true
    s3AccessKey?: true
    s3SecretKey?: true
    zoomApiKey?: true
    zoomApiSecret?: true
    firebaseServerKey?: true
    updatedAt?: true
  }

  export type SchoolSettingMaxAggregateInputType = {
    id?: true
    schoolId?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPass?: true
    smtpFrom?: true
    smsProvider?: true
    smsApiKey?: true
    whatsappApiKey?: true
    razorpayKeyId?: true
    razorpayKeySecret?: true
    stripePubKey?: true
    stripeSecretKey?: true
    s3Bucket?: true
    s3Region?: true
    s3AccessKey?: true
    s3SecretKey?: true
    zoomApiKey?: true
    zoomApiSecret?: true
    firebaseServerKey?: true
    updatedAt?: true
  }

  export type SchoolSettingCountAggregateInputType = {
    id?: true
    schoolId?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPass?: true
    smtpFrom?: true
    smsProvider?: true
    smsApiKey?: true
    whatsappApiKey?: true
    razorpayKeyId?: true
    razorpayKeySecret?: true
    stripePubKey?: true
    stripeSecretKey?: true
    s3Bucket?: true
    s3Region?: true
    s3AccessKey?: true
    s3SecretKey?: true
    zoomApiKey?: true
    zoomApiSecret?: true
    firebaseServerKey?: true
    updatedAt?: true
    _all?: true
  }

  export type SchoolSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchoolSetting to aggregate.
     */
    where?: SchoolSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolSettings to fetch.
     */
    orderBy?: SchoolSettingOrderByWithRelationInput | SchoolSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SchoolSettings
    **/
    _count?: true | SchoolSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolSettingMaxAggregateInputType
  }

  export type GetSchoolSettingAggregateType<T extends SchoolSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSchoolSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchoolSetting[P]>
      : GetScalarType<T[P], AggregateSchoolSetting[P]>
  }




  export type SchoolSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolSettingWhereInput
    orderBy?: SchoolSettingOrderByWithAggregationInput | SchoolSettingOrderByWithAggregationInput[]
    by: SchoolSettingScalarFieldEnum[] | SchoolSettingScalarFieldEnum
    having?: SchoolSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolSettingCountAggregateInputType | true
    _avg?: SchoolSettingAvgAggregateInputType
    _sum?: SchoolSettingSumAggregateInputType
    _min?: SchoolSettingMinAggregateInputType
    _max?: SchoolSettingMaxAggregateInputType
  }

  export type SchoolSettingGroupByOutputType = {
    id: string
    schoolId: string
    smtpHost: string | null
    smtpPort: number | null
    smtpUser: string | null
    smtpPass: string | null
    smtpFrom: string | null
    smsProvider: string | null
    smsApiKey: string | null
    whatsappApiKey: string | null
    razorpayKeyId: string | null
    razorpayKeySecret: string | null
    stripePubKey: string | null
    stripeSecretKey: string | null
    s3Bucket: string | null
    s3Region: string | null
    s3AccessKey: string | null
    s3SecretKey: string | null
    zoomApiKey: string | null
    zoomApiSecret: string | null
    firebaseServerKey: string | null
    updatedAt: Date
    _count: SchoolSettingCountAggregateOutputType | null
    _avg: SchoolSettingAvgAggregateOutputType | null
    _sum: SchoolSettingSumAggregateOutputType | null
    _min: SchoolSettingMinAggregateOutputType | null
    _max: SchoolSettingMaxAggregateOutputType | null
  }

  type GetSchoolSettingGroupByPayload<T extends SchoolSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolSettingGroupByOutputType[P]>
        }
      >
    >


  export type SchoolSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPass?: boolean
    smtpFrom?: boolean
    smsProvider?: boolean
    smsApiKey?: boolean
    whatsappApiKey?: boolean
    razorpayKeyId?: boolean
    razorpayKeySecret?: boolean
    stripePubKey?: boolean
    stripeSecretKey?: boolean
    s3Bucket?: boolean
    s3Region?: boolean
    s3AccessKey?: boolean
    s3SecretKey?: boolean
    zoomApiKey?: boolean
    zoomApiSecret?: boolean
    firebaseServerKey?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schoolSetting"]>

  export type SchoolSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPass?: boolean
    smtpFrom?: boolean
    smsProvider?: boolean
    smsApiKey?: boolean
    whatsappApiKey?: boolean
    razorpayKeyId?: boolean
    razorpayKeySecret?: boolean
    stripePubKey?: boolean
    stripeSecretKey?: boolean
    s3Bucket?: boolean
    s3Region?: boolean
    s3AccessKey?: boolean
    s3SecretKey?: boolean
    zoomApiKey?: boolean
    zoomApiSecret?: boolean
    firebaseServerKey?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schoolSetting"]>

  export type SchoolSettingSelectScalar = {
    id?: boolean
    schoolId?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPass?: boolean
    smtpFrom?: boolean
    smsProvider?: boolean
    smsApiKey?: boolean
    whatsappApiKey?: boolean
    razorpayKeyId?: boolean
    razorpayKeySecret?: boolean
    stripePubKey?: boolean
    stripeSecretKey?: boolean
    s3Bucket?: boolean
    s3Region?: boolean
    s3AccessKey?: boolean
    s3SecretKey?: boolean
    zoomApiKey?: boolean
    zoomApiSecret?: boolean
    firebaseServerKey?: boolean
    updatedAt?: boolean
  }

  export type SchoolSettingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type SchoolSettingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $SchoolSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SchoolSetting"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string
      smtpHost: string | null
      smtpPort: number | null
      smtpUser: string | null
      smtpPass: string | null
      smtpFrom: string | null
      smsProvider: string | null
      smsApiKey: string | null
      whatsappApiKey: string | null
      razorpayKeyId: string | null
      razorpayKeySecret: string | null
      stripePubKey: string | null
      stripeSecretKey: string | null
      s3Bucket: string | null
      s3Region: string | null
      s3AccessKey: string | null
      s3SecretKey: string | null
      zoomApiKey: string | null
      zoomApiSecret: string | null
      firebaseServerKey: string | null
      updatedAt: Date
    }, ExtArgs["result"]["schoolSetting"]>
    composites: {}
  }

  type SchoolSettingGetPayload<S extends boolean | null | undefined | SchoolSettingDefaultArgs> = $Result.GetResult<Prisma.$SchoolSettingPayload, S>

  type SchoolSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SchoolSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SchoolSettingCountAggregateInputType | true
    }

  export interface SchoolSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SchoolSetting'], meta: { name: 'SchoolSetting' } }
    /**
     * Find zero or one SchoolSetting that matches the filter.
     * @param {SchoolSettingFindUniqueArgs} args - Arguments to find a SchoolSetting
     * @example
     * // Get one SchoolSetting
     * const schoolSetting = await prisma.schoolSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolSettingFindUniqueArgs>(args: SelectSubset<T, SchoolSettingFindUniqueArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SchoolSetting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SchoolSettingFindUniqueOrThrowArgs} args - Arguments to find a SchoolSetting
     * @example
     * // Get one SchoolSetting
     * const schoolSetting = await prisma.schoolSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SchoolSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingFindFirstArgs} args - Arguments to find a SchoolSetting
     * @example
     * // Get one SchoolSetting
     * const schoolSetting = await prisma.schoolSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolSettingFindFirstArgs>(args?: SelectSubset<T, SchoolSettingFindFirstArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SchoolSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingFindFirstOrThrowArgs} args - Arguments to find a SchoolSetting
     * @example
     * // Get one SchoolSetting
     * const schoolSetting = await prisma.schoolSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SchoolSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SchoolSettings
     * const schoolSettings = await prisma.schoolSetting.findMany()
     * 
     * // Get first 10 SchoolSettings
     * const schoolSettings = await prisma.schoolSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schoolSettingWithIdOnly = await prisma.schoolSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchoolSettingFindManyArgs>(args?: SelectSubset<T, SchoolSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SchoolSetting.
     * @param {SchoolSettingCreateArgs} args - Arguments to create a SchoolSetting.
     * @example
     * // Create one SchoolSetting
     * const SchoolSetting = await prisma.schoolSetting.create({
     *   data: {
     *     // ... data to create a SchoolSetting
     *   }
     * })
     * 
     */
    create<T extends SchoolSettingCreateArgs>(args: SelectSubset<T, SchoolSettingCreateArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SchoolSettings.
     * @param {SchoolSettingCreateManyArgs} args - Arguments to create many SchoolSettings.
     * @example
     * // Create many SchoolSettings
     * const schoolSetting = await prisma.schoolSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolSettingCreateManyArgs>(args?: SelectSubset<T, SchoolSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SchoolSettings and returns the data saved in the database.
     * @param {SchoolSettingCreateManyAndReturnArgs} args - Arguments to create many SchoolSettings.
     * @example
     * // Create many SchoolSettings
     * const schoolSetting = await prisma.schoolSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SchoolSettings and only return the `id`
     * const schoolSettingWithIdOnly = await prisma.schoolSetting.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SchoolSetting.
     * @param {SchoolSettingDeleteArgs} args - Arguments to delete one SchoolSetting.
     * @example
     * // Delete one SchoolSetting
     * const SchoolSetting = await prisma.schoolSetting.delete({
     *   where: {
     *     // ... filter to delete one SchoolSetting
     *   }
     * })
     * 
     */
    delete<T extends SchoolSettingDeleteArgs>(args: SelectSubset<T, SchoolSettingDeleteArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SchoolSetting.
     * @param {SchoolSettingUpdateArgs} args - Arguments to update one SchoolSetting.
     * @example
     * // Update one SchoolSetting
     * const schoolSetting = await prisma.schoolSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolSettingUpdateArgs>(args: SelectSubset<T, SchoolSettingUpdateArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SchoolSettings.
     * @param {SchoolSettingDeleteManyArgs} args - Arguments to filter SchoolSettings to delete.
     * @example
     * // Delete a few SchoolSettings
     * const { count } = await prisma.schoolSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolSettingDeleteManyArgs>(args?: SelectSubset<T, SchoolSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchoolSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SchoolSettings
     * const schoolSetting = await prisma.schoolSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolSettingUpdateManyArgs>(args: SelectSubset<T, SchoolSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SchoolSetting.
     * @param {SchoolSettingUpsertArgs} args - Arguments to update or create a SchoolSetting.
     * @example
     * // Update or create a SchoolSetting
     * const schoolSetting = await prisma.schoolSetting.upsert({
     *   create: {
     *     // ... data to create a SchoolSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SchoolSetting we want to update
     *   }
     * })
     */
    upsert<T extends SchoolSettingUpsertArgs>(args: SelectSubset<T, SchoolSettingUpsertArgs<ExtArgs>>): Prisma__SchoolSettingClient<$Result.GetResult<Prisma.$SchoolSettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SchoolSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingCountArgs} args - Arguments to filter SchoolSettings to count.
     * @example
     * // Count the number of SchoolSettings
     * const count = await prisma.schoolSetting.count({
     *   where: {
     *     // ... the filter for the SchoolSettings we want to count
     *   }
     * })
    **/
    count<T extends SchoolSettingCountArgs>(
      args?: Subset<T, SchoolSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SchoolSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchoolSettingAggregateArgs>(args: Subset<T, SchoolSettingAggregateArgs>): Prisma.PrismaPromise<GetSchoolSettingAggregateType<T>>

    /**
     * Group by SchoolSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SchoolSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolSettingGroupByArgs['orderBy'] }
        : { orderBy?: SchoolSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SchoolSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SchoolSetting model
   */
  readonly fields: SchoolSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SchoolSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SchoolSetting model
   */ 
  interface SchoolSettingFieldRefs {
    readonly id: FieldRef<"SchoolSetting", 'String'>
    readonly schoolId: FieldRef<"SchoolSetting", 'String'>
    readonly smtpHost: FieldRef<"SchoolSetting", 'String'>
    readonly smtpPort: FieldRef<"SchoolSetting", 'Int'>
    readonly smtpUser: FieldRef<"SchoolSetting", 'String'>
    readonly smtpPass: FieldRef<"SchoolSetting", 'String'>
    readonly smtpFrom: FieldRef<"SchoolSetting", 'String'>
    readonly smsProvider: FieldRef<"SchoolSetting", 'String'>
    readonly smsApiKey: FieldRef<"SchoolSetting", 'String'>
    readonly whatsappApiKey: FieldRef<"SchoolSetting", 'String'>
    readonly razorpayKeyId: FieldRef<"SchoolSetting", 'String'>
    readonly razorpayKeySecret: FieldRef<"SchoolSetting", 'String'>
    readonly stripePubKey: FieldRef<"SchoolSetting", 'String'>
    readonly stripeSecretKey: FieldRef<"SchoolSetting", 'String'>
    readonly s3Bucket: FieldRef<"SchoolSetting", 'String'>
    readonly s3Region: FieldRef<"SchoolSetting", 'String'>
    readonly s3AccessKey: FieldRef<"SchoolSetting", 'String'>
    readonly s3SecretKey: FieldRef<"SchoolSetting", 'String'>
    readonly zoomApiKey: FieldRef<"SchoolSetting", 'String'>
    readonly zoomApiSecret: FieldRef<"SchoolSetting", 'String'>
    readonly firebaseServerKey: FieldRef<"SchoolSetting", 'String'>
    readonly updatedAt: FieldRef<"SchoolSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SchoolSetting findUnique
   */
  export type SchoolSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * Filter, which SchoolSetting to fetch.
     */
    where: SchoolSettingWhereUniqueInput
  }

  /**
   * SchoolSetting findUniqueOrThrow
   */
  export type SchoolSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * Filter, which SchoolSetting to fetch.
     */
    where: SchoolSettingWhereUniqueInput
  }

  /**
   * SchoolSetting findFirst
   */
  export type SchoolSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * Filter, which SchoolSetting to fetch.
     */
    where?: SchoolSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolSettings to fetch.
     */
    orderBy?: SchoolSettingOrderByWithRelationInput | SchoolSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchoolSettings.
     */
    cursor?: SchoolSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolSettings.
     */
    distinct?: SchoolSettingScalarFieldEnum | SchoolSettingScalarFieldEnum[]
  }

  /**
   * SchoolSetting findFirstOrThrow
   */
  export type SchoolSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * Filter, which SchoolSetting to fetch.
     */
    where?: SchoolSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolSettings to fetch.
     */
    orderBy?: SchoolSettingOrderByWithRelationInput | SchoolSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchoolSettings.
     */
    cursor?: SchoolSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolSettings.
     */
    distinct?: SchoolSettingScalarFieldEnum | SchoolSettingScalarFieldEnum[]
  }

  /**
   * SchoolSetting findMany
   */
  export type SchoolSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * Filter, which SchoolSettings to fetch.
     */
    where?: SchoolSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolSettings to fetch.
     */
    orderBy?: SchoolSettingOrderByWithRelationInput | SchoolSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SchoolSettings.
     */
    cursor?: SchoolSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolSettings.
     */
    skip?: number
    distinct?: SchoolSettingScalarFieldEnum | SchoolSettingScalarFieldEnum[]
  }

  /**
   * SchoolSetting create
   */
  export type SchoolSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * The data needed to create a SchoolSetting.
     */
    data: XOR<SchoolSettingCreateInput, SchoolSettingUncheckedCreateInput>
  }

  /**
   * SchoolSetting createMany
   */
  export type SchoolSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SchoolSettings.
     */
    data: SchoolSettingCreateManyInput | SchoolSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchoolSetting createManyAndReturn
   */
  export type SchoolSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SchoolSettings.
     */
    data: SchoolSettingCreateManyInput | SchoolSettingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SchoolSetting update
   */
  export type SchoolSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * The data needed to update a SchoolSetting.
     */
    data: XOR<SchoolSettingUpdateInput, SchoolSettingUncheckedUpdateInput>
    /**
     * Choose, which SchoolSetting to update.
     */
    where: SchoolSettingWhereUniqueInput
  }

  /**
   * SchoolSetting updateMany
   */
  export type SchoolSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SchoolSettings.
     */
    data: XOR<SchoolSettingUpdateManyMutationInput, SchoolSettingUncheckedUpdateManyInput>
    /**
     * Filter which SchoolSettings to update
     */
    where?: SchoolSettingWhereInput
  }

  /**
   * SchoolSetting upsert
   */
  export type SchoolSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * The filter to search for the SchoolSetting to update in case it exists.
     */
    where: SchoolSettingWhereUniqueInput
    /**
     * In case the SchoolSetting found by the `where` argument doesn't exist, create a new SchoolSetting with this data.
     */
    create: XOR<SchoolSettingCreateInput, SchoolSettingUncheckedCreateInput>
    /**
     * In case the SchoolSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolSettingUpdateInput, SchoolSettingUncheckedUpdateInput>
  }

  /**
   * SchoolSetting delete
   */
  export type SchoolSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
    /**
     * Filter which SchoolSetting to delete.
     */
    where: SchoolSettingWhereUniqueInput
  }

  /**
   * SchoolSetting deleteMany
   */
  export type SchoolSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchoolSettings to delete
     */
    where?: SchoolSettingWhereInput
  }

  /**
   * SchoolSetting without action
   */
  export type SchoolSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSetting
     */
    select?: SchoolSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolSettingInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    amount: Decimal | null
    discount: Decimal | null
  }

  export type SubscriptionSumAggregateOutputType = {
    amount: Decimal | null
    discount: Decimal | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    planId: string | null
    status: $Enums.SubStatus | null
    startDate: Date | null
    endDate: Date | null
    amount: Decimal | null
    discount: Decimal | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    planId: string | null
    status: $Enums.SubStatus | null
    startDate: Date | null
    endDate: Date | null
    amount: Decimal | null
    discount: Decimal | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    schoolId: number
    planId: number
    status: number
    startDate: number
    endDate: number
    amount: number
    discount: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    amount?: true
    discount?: true
  }

  export type SubscriptionSumAggregateInputType = {
    amount?: true
    discount?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    schoolId?: true
    planId?: true
    status?: true
    startDate?: true
    endDate?: true
    amount?: true
    discount?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    schoolId?: true
    planId?: true
    status?: true
    startDate?: true
    endDate?: true
    amount?: true
    discount?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    schoolId?: true
    planId?: true
    status?: true
    startDate?: true
    endDate?: true
    amount?: true
    discount?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    schoolId: string
    planId: string
    status: $Enums.SubStatus
    startDate: Date
    endDate: Date
    amount: Decimal
    discount: Decimal
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    planId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    amount?: boolean
    discount?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    plan?: boolean | SubscriptionPlanDefaultArgs<ExtArgs>
    payments?: boolean | Subscription$paymentsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    planId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    amount?: boolean
    discount?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    plan?: boolean | SubscriptionPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    schoolId?: boolean
    planId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    amount?: boolean
    discount?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    plan?: boolean | SubscriptionPlanDefaultArgs<ExtArgs>
    payments?: boolean | Subscription$paymentsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    plan?: boolean | SubscriptionPlanDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
      plan: Prisma.$SubscriptionPlanPayload<ExtArgs>
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string
      planId: string
      status: $Enums.SubStatus
      startDate: Date
      endDate: Date
      amount: Prisma.Decimal
      discount: Prisma.Decimal
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    plan<T extends SubscriptionPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionPlanDefaultArgs<ExtArgs>>): Prisma__SubscriptionPlanClient<$Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    payments<T extends Subscription$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */ 
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly schoolId: FieldRef<"Subscription", 'String'>
    readonly planId: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'SubStatus'>
    readonly startDate: FieldRef<"Subscription", 'DateTime'>
    readonly endDate: FieldRef<"Subscription", 'DateTime'>
    readonly amount: FieldRef<"Subscription", 'Decimal'>
    readonly discount: FieldRef<"Subscription", 'Decimal'>
    readonly notes: FieldRef<"Subscription", 'String'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
  }

  /**
   * Subscription.payments
   */
  export type Subscription$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    subscriptionId: string | null
    amount: Decimal | null
    currency: string | null
    gateway: string | null
    gatewayPayId: string | null
    status: $Enums.PayStatus | null
    receiptUrl: string | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    subscriptionId: string | null
    amount: Decimal | null
    currency: string | null
    gateway: string | null
    gatewayPayId: string | null
    status: $Enums.PayStatus | null
    receiptUrl: string | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    subscriptionId: number
    amount: number
    currency: number
    gateway: number
    gatewayPayId: number
    status: number
    receiptUrl: number
    metadata: number
    paidAt: number
    createdAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    subscriptionId?: true
    amount?: true
    currency?: true
    gateway?: true
    gatewayPayId?: true
    status?: true
    receiptUrl?: true
    paidAt?: true
    createdAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    subscriptionId?: true
    amount?: true
    currency?: true
    gateway?: true
    gatewayPayId?: true
    status?: true
    receiptUrl?: true
    paidAt?: true
    createdAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    subscriptionId?: true
    amount?: true
    currency?: true
    gateway?: true
    gatewayPayId?: true
    status?: true
    receiptUrl?: true
    metadata?: true
    paidAt?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    subscriptionId: string
    amount: Decimal
    currency: string
    gateway: string
    gatewayPayId: string | null
    status: $Enums.PayStatus
    receiptUrl: string | null
    metadata: JsonValue
    paidAt: Date | null
    createdAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    amount?: boolean
    currency?: boolean
    gateway?: boolean
    gatewayPayId?: boolean
    status?: boolean
    receiptUrl?: boolean
    metadata?: boolean
    paidAt?: boolean
    createdAt?: boolean
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    amount?: boolean
    currency?: boolean
    gateway?: boolean
    gatewayPayId?: boolean
    status?: boolean
    receiptUrl?: boolean
    metadata?: boolean
    paidAt?: boolean
    createdAt?: boolean
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    subscriptionId?: boolean
    amount?: boolean
    currency?: boolean
    gateway?: boolean
    gatewayPayId?: boolean
    status?: boolean
    receiptUrl?: boolean
    metadata?: boolean
    paidAt?: boolean
    createdAt?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      subscription: Prisma.$SubscriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subscriptionId: string
      amount: Prisma.Decimal
      currency: string
      gateway: string
      gatewayPayId: string | null
      status: $Enums.PayStatus
      receiptUrl: string | null
      metadata: Prisma.JsonValue
      paidAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends SubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionDefaultArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly subscriptionId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Decimal'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly gateway: FieldRef<"Payment", 'String'>
    readonly gatewayPayId: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PayStatus'>
    readonly receiptUrl: FieldRef<"Payment", 'String'>
    readonly metadata: FieldRef<"Payment", 'Json'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model UsageMetric
   */

  export type AggregateUsageMetric = {
    _count: UsageMetricCountAggregateOutputType | null
    _avg: UsageMetricAvgAggregateOutputType | null
    _sum: UsageMetricSumAggregateOutputType | null
    _min: UsageMetricMinAggregateOutputType | null
    _max: UsageMetricMaxAggregateOutputType | null
  }

  export type UsageMetricAvgAggregateOutputType = {
    students: number | null
    teachers: number | null
    staff: number | null
    storageUsed: Decimal | null
    apiCalls: number | null
    activeUsers: number | null
  }

  export type UsageMetricSumAggregateOutputType = {
    students: number | null
    teachers: number | null
    staff: number | null
    storageUsed: Decimal | null
    apiCalls: number | null
    activeUsers: number | null
  }

  export type UsageMetricMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    metricDate: Date | null
    students: number | null
    teachers: number | null
    staff: number | null
    storageUsed: Decimal | null
    apiCalls: number | null
    activeUsers: number | null
    createdAt: Date | null
  }

  export type UsageMetricMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    metricDate: Date | null
    students: number | null
    teachers: number | null
    staff: number | null
    storageUsed: Decimal | null
    apiCalls: number | null
    activeUsers: number | null
    createdAt: Date | null
  }

  export type UsageMetricCountAggregateOutputType = {
    id: number
    schoolId: number
    metricDate: number
    students: number
    teachers: number
    staff: number
    storageUsed: number
    apiCalls: number
    activeUsers: number
    createdAt: number
    _all: number
  }


  export type UsageMetricAvgAggregateInputType = {
    students?: true
    teachers?: true
    staff?: true
    storageUsed?: true
    apiCalls?: true
    activeUsers?: true
  }

  export type UsageMetricSumAggregateInputType = {
    students?: true
    teachers?: true
    staff?: true
    storageUsed?: true
    apiCalls?: true
    activeUsers?: true
  }

  export type UsageMetricMinAggregateInputType = {
    id?: true
    schoolId?: true
    metricDate?: true
    students?: true
    teachers?: true
    staff?: true
    storageUsed?: true
    apiCalls?: true
    activeUsers?: true
    createdAt?: true
  }

  export type UsageMetricMaxAggregateInputType = {
    id?: true
    schoolId?: true
    metricDate?: true
    students?: true
    teachers?: true
    staff?: true
    storageUsed?: true
    apiCalls?: true
    activeUsers?: true
    createdAt?: true
  }

  export type UsageMetricCountAggregateInputType = {
    id?: true
    schoolId?: true
    metricDate?: true
    students?: true
    teachers?: true
    staff?: true
    storageUsed?: true
    apiCalls?: true
    activeUsers?: true
    createdAt?: true
    _all?: true
  }

  export type UsageMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageMetric to aggregate.
     */
    where?: UsageMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMetrics to fetch.
     */
    orderBy?: UsageMetricOrderByWithRelationInput | UsageMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageMetrics
    **/
    _count?: true | UsageMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageMetricAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageMetricSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageMetricMaxAggregateInputType
  }

  export type GetUsageMetricAggregateType<T extends UsageMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageMetric[P]>
      : GetScalarType<T[P], AggregateUsageMetric[P]>
  }




  export type UsageMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageMetricWhereInput
    orderBy?: UsageMetricOrderByWithAggregationInput | UsageMetricOrderByWithAggregationInput[]
    by: UsageMetricScalarFieldEnum[] | UsageMetricScalarFieldEnum
    having?: UsageMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageMetricCountAggregateInputType | true
    _avg?: UsageMetricAvgAggregateInputType
    _sum?: UsageMetricSumAggregateInputType
    _min?: UsageMetricMinAggregateInputType
    _max?: UsageMetricMaxAggregateInputType
  }

  export type UsageMetricGroupByOutputType = {
    id: string
    schoolId: string
    metricDate: Date
    students: number
    teachers: number
    staff: number
    storageUsed: Decimal
    apiCalls: number
    activeUsers: number
    createdAt: Date
    _count: UsageMetricCountAggregateOutputType | null
    _avg: UsageMetricAvgAggregateOutputType | null
    _sum: UsageMetricSumAggregateOutputType | null
    _min: UsageMetricMinAggregateOutputType | null
    _max: UsageMetricMaxAggregateOutputType | null
  }

  type GetUsageMetricGroupByPayload<T extends UsageMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageMetricGroupByOutputType[P]>
            : GetScalarType<T[P], UsageMetricGroupByOutputType[P]>
        }
      >
    >


  export type UsageMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    metricDate?: boolean
    students?: boolean
    teachers?: boolean
    staff?: boolean
    storageUsed?: boolean
    apiCalls?: boolean
    activeUsers?: boolean
    createdAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageMetric"]>

  export type UsageMetricSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    metricDate?: boolean
    students?: boolean
    teachers?: boolean
    staff?: boolean
    storageUsed?: boolean
    apiCalls?: boolean
    activeUsers?: boolean
    createdAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageMetric"]>

  export type UsageMetricSelectScalar = {
    id?: boolean
    schoolId?: boolean
    metricDate?: boolean
    students?: boolean
    teachers?: boolean
    staff?: boolean
    storageUsed?: boolean
    apiCalls?: boolean
    activeUsers?: boolean
    createdAt?: boolean
  }

  export type UsageMetricInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type UsageMetricIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $UsageMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageMetric"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string
      metricDate: Date
      students: number
      teachers: number
      staff: number
      storageUsed: Prisma.Decimal
      apiCalls: number
      activeUsers: number
      createdAt: Date
    }, ExtArgs["result"]["usageMetric"]>
    composites: {}
  }

  type UsageMetricGetPayload<S extends boolean | null | undefined | UsageMetricDefaultArgs> = $Result.GetResult<Prisma.$UsageMetricPayload, S>

  type UsageMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UsageMetricFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsageMetricCountAggregateInputType | true
    }

  export interface UsageMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageMetric'], meta: { name: 'UsageMetric' } }
    /**
     * Find zero or one UsageMetric that matches the filter.
     * @param {UsageMetricFindUniqueArgs} args - Arguments to find a UsageMetric
     * @example
     * // Get one UsageMetric
     * const usageMetric = await prisma.usageMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageMetricFindUniqueArgs>(args: SelectSubset<T, UsageMetricFindUniqueArgs<ExtArgs>>): Prisma__UsageMetricClient<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UsageMetric that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UsageMetricFindUniqueOrThrowArgs} args - Arguments to find a UsageMetric
     * @example
     * // Get one UsageMetric
     * const usageMetric = await prisma.usageMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageMetricClient<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UsageMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMetricFindFirstArgs} args - Arguments to find a UsageMetric
     * @example
     * // Get one UsageMetric
     * const usageMetric = await prisma.usageMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageMetricFindFirstArgs>(args?: SelectSubset<T, UsageMetricFindFirstArgs<ExtArgs>>): Prisma__UsageMetricClient<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UsageMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMetricFindFirstOrThrowArgs} args - Arguments to find a UsageMetric
     * @example
     * // Get one UsageMetric
     * const usageMetric = await prisma.usageMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageMetricClient<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UsageMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageMetrics
     * const usageMetrics = await prisma.usageMetric.findMany()
     * 
     * // Get first 10 UsageMetrics
     * const usageMetrics = await prisma.usageMetric.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageMetricWithIdOnly = await prisma.usageMetric.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageMetricFindManyArgs>(args?: SelectSubset<T, UsageMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UsageMetric.
     * @param {UsageMetricCreateArgs} args - Arguments to create a UsageMetric.
     * @example
     * // Create one UsageMetric
     * const UsageMetric = await prisma.usageMetric.create({
     *   data: {
     *     // ... data to create a UsageMetric
     *   }
     * })
     * 
     */
    create<T extends UsageMetricCreateArgs>(args: SelectSubset<T, UsageMetricCreateArgs<ExtArgs>>): Prisma__UsageMetricClient<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UsageMetrics.
     * @param {UsageMetricCreateManyArgs} args - Arguments to create many UsageMetrics.
     * @example
     * // Create many UsageMetrics
     * const usageMetric = await prisma.usageMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageMetricCreateManyArgs>(args?: SelectSubset<T, UsageMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageMetrics and returns the data saved in the database.
     * @param {UsageMetricCreateManyAndReturnArgs} args - Arguments to create many UsageMetrics.
     * @example
     * // Create many UsageMetrics
     * const usageMetric = await prisma.usageMetric.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageMetrics and only return the `id`
     * const usageMetricWithIdOnly = await prisma.usageMetric.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageMetricCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageMetricCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UsageMetric.
     * @param {UsageMetricDeleteArgs} args - Arguments to delete one UsageMetric.
     * @example
     * // Delete one UsageMetric
     * const UsageMetric = await prisma.usageMetric.delete({
     *   where: {
     *     // ... filter to delete one UsageMetric
     *   }
     * })
     * 
     */
    delete<T extends UsageMetricDeleteArgs>(args: SelectSubset<T, UsageMetricDeleteArgs<ExtArgs>>): Prisma__UsageMetricClient<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UsageMetric.
     * @param {UsageMetricUpdateArgs} args - Arguments to update one UsageMetric.
     * @example
     * // Update one UsageMetric
     * const usageMetric = await prisma.usageMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageMetricUpdateArgs>(args: SelectSubset<T, UsageMetricUpdateArgs<ExtArgs>>): Prisma__UsageMetricClient<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UsageMetrics.
     * @param {UsageMetricDeleteManyArgs} args - Arguments to filter UsageMetrics to delete.
     * @example
     * // Delete a few UsageMetrics
     * const { count } = await prisma.usageMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageMetricDeleteManyArgs>(args?: SelectSubset<T, UsageMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageMetrics
     * const usageMetric = await prisma.usageMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageMetricUpdateManyArgs>(args: SelectSubset<T, UsageMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UsageMetric.
     * @param {UsageMetricUpsertArgs} args - Arguments to update or create a UsageMetric.
     * @example
     * // Update or create a UsageMetric
     * const usageMetric = await prisma.usageMetric.upsert({
     *   create: {
     *     // ... data to create a UsageMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageMetric we want to update
     *   }
     * })
     */
    upsert<T extends UsageMetricUpsertArgs>(args: SelectSubset<T, UsageMetricUpsertArgs<ExtArgs>>): Prisma__UsageMetricClient<$Result.GetResult<Prisma.$UsageMetricPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UsageMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMetricCountArgs} args - Arguments to filter UsageMetrics to count.
     * @example
     * // Count the number of UsageMetrics
     * const count = await prisma.usageMetric.count({
     *   where: {
     *     // ... the filter for the UsageMetrics we want to count
     *   }
     * })
    **/
    count<T extends UsageMetricCountArgs>(
      args?: Subset<T, UsageMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageMetricAggregateArgs>(args: Subset<T, UsageMetricAggregateArgs>): Prisma.PrismaPromise<GetUsageMetricAggregateType<T>>

    /**
     * Group by UsageMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMetricGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageMetricGroupByArgs['orderBy'] }
        : { orderBy?: UsageMetricGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageMetric model
   */
  readonly fields: UsageMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageMetric model
   */ 
  interface UsageMetricFieldRefs {
    readonly id: FieldRef<"UsageMetric", 'String'>
    readonly schoolId: FieldRef<"UsageMetric", 'String'>
    readonly metricDate: FieldRef<"UsageMetric", 'DateTime'>
    readonly students: FieldRef<"UsageMetric", 'Int'>
    readonly teachers: FieldRef<"UsageMetric", 'Int'>
    readonly staff: FieldRef<"UsageMetric", 'Int'>
    readonly storageUsed: FieldRef<"UsageMetric", 'Decimal'>
    readonly apiCalls: FieldRef<"UsageMetric", 'Int'>
    readonly activeUsers: FieldRef<"UsageMetric", 'Int'>
    readonly createdAt: FieldRef<"UsageMetric", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageMetric findUnique
   */
  export type UsageMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which UsageMetric to fetch.
     */
    where: UsageMetricWhereUniqueInput
  }

  /**
   * UsageMetric findUniqueOrThrow
   */
  export type UsageMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which UsageMetric to fetch.
     */
    where: UsageMetricWhereUniqueInput
  }

  /**
   * UsageMetric findFirst
   */
  export type UsageMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which UsageMetric to fetch.
     */
    where?: UsageMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMetrics to fetch.
     */
    orderBy?: UsageMetricOrderByWithRelationInput | UsageMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageMetrics.
     */
    cursor?: UsageMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageMetrics.
     */
    distinct?: UsageMetricScalarFieldEnum | UsageMetricScalarFieldEnum[]
  }

  /**
   * UsageMetric findFirstOrThrow
   */
  export type UsageMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which UsageMetric to fetch.
     */
    where?: UsageMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMetrics to fetch.
     */
    orderBy?: UsageMetricOrderByWithRelationInput | UsageMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageMetrics.
     */
    cursor?: UsageMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageMetrics.
     */
    distinct?: UsageMetricScalarFieldEnum | UsageMetricScalarFieldEnum[]
  }

  /**
   * UsageMetric findMany
   */
  export type UsageMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which UsageMetrics to fetch.
     */
    where?: UsageMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMetrics to fetch.
     */
    orderBy?: UsageMetricOrderByWithRelationInput | UsageMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageMetrics.
     */
    cursor?: UsageMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMetrics.
     */
    skip?: number
    distinct?: UsageMetricScalarFieldEnum | UsageMetricScalarFieldEnum[]
  }

  /**
   * UsageMetric create
   */
  export type UsageMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageMetric.
     */
    data: XOR<UsageMetricCreateInput, UsageMetricUncheckedCreateInput>
  }

  /**
   * UsageMetric createMany
   */
  export type UsageMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageMetrics.
     */
    data: UsageMetricCreateManyInput | UsageMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageMetric createManyAndReturn
   */
  export type UsageMetricCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UsageMetrics.
     */
    data: UsageMetricCreateManyInput | UsageMetricCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageMetric update
   */
  export type UsageMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageMetric.
     */
    data: XOR<UsageMetricUpdateInput, UsageMetricUncheckedUpdateInput>
    /**
     * Choose, which UsageMetric to update.
     */
    where: UsageMetricWhereUniqueInput
  }

  /**
   * UsageMetric updateMany
   */
  export type UsageMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageMetrics.
     */
    data: XOR<UsageMetricUpdateManyMutationInput, UsageMetricUncheckedUpdateManyInput>
    /**
     * Filter which UsageMetrics to update
     */
    where?: UsageMetricWhereInput
  }

  /**
   * UsageMetric upsert
   */
  export type UsageMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageMetric to update in case it exists.
     */
    where: UsageMetricWhereUniqueInput
    /**
     * In case the UsageMetric found by the `where` argument doesn't exist, create a new UsageMetric with this data.
     */
    create: XOR<UsageMetricCreateInput, UsageMetricUncheckedCreateInput>
    /**
     * In case the UsageMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageMetricUpdateInput, UsageMetricUncheckedUpdateInput>
  }

  /**
   * UsageMetric delete
   */
  export type UsageMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
    /**
     * Filter which UsageMetric to delete.
     */
    where: UsageMetricWhereUniqueInput
  }

  /**
   * UsageMetric deleteMany
   */
  export type UsageMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageMetrics to delete
     */
    where?: UsageMetricWhereInput
  }

  /**
   * UsageMetric without action
   */
  export type UsageMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMetric
     */
    select?: UsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMetricInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    platformUserId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    platformUserId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    platformUserId: number
    action: number
    entity: number
    entityId: number
    oldValues: number
    newValues: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    platformUserId?: true
    action?: true
    entity?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    platformUserId?: true
    action?: true
    entity?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    platformUserId?: true
    action?: true
    entity?: true
    entityId?: true
    oldValues?: true
    newValues?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    platformUserId: string | null
    action: string
    entity: string
    entityId: string | null
    oldValues: JsonValue | null
    newValues: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformUserId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    platformUser?: boolean | AuditLog$platformUserArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformUserId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    platformUser?: boolean | AuditLog$platformUserArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    platformUserId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformUser?: boolean | AuditLog$platformUserArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformUser?: boolean | AuditLog$platformUserArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      platformUser: Prisma.$PlatformUserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      platformUserId: string | null
      action: string
      entity: string
      entityId: string | null
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    platformUser<T extends AuditLog$platformUserArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$platformUserArgs<ExtArgs>>): Prisma__PlatformUserClient<$Result.GetResult<Prisma.$PlatformUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly platformUserId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.platformUser
   */
  export type AuditLog$platformUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUser
     */
    select?: PlatformUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformUserInclude<ExtArgs> | null
    where?: PlatformUserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model SystemSetting
   */

  export type AggregateSystemSetting = {
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  export type SystemSettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    group: string | null
    isSecret: boolean | null
    updatedAt: Date | null
  }

  export type SystemSettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    group: string | null
    isSecret: boolean | null
    updatedAt: Date | null
  }

  export type SystemSettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    group: number
    isSecret: number
    updatedAt: number
    _all: number
  }


  export type SystemSettingMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    group?: true
    isSecret?: true
    updatedAt?: true
  }

  export type SystemSettingMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    group?: true
    isSecret?: true
    updatedAt?: true
  }

  export type SystemSettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    group?: true
    isSecret?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSetting to aggregate.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemSettings
    **/
    _count?: true | SystemSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemSettingMaxAggregateInputType
  }

  export type GetSystemSettingAggregateType<T extends SystemSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSetting[P]>
      : GetScalarType<T[P], AggregateSystemSetting[P]>
  }




  export type SystemSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemSettingWhereInput
    orderBy?: SystemSettingOrderByWithAggregationInput | SystemSettingOrderByWithAggregationInput[]
    by: SystemSettingScalarFieldEnum[] | SystemSettingScalarFieldEnum
    having?: SystemSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemSettingCountAggregateInputType | true
    _min?: SystemSettingMinAggregateInputType
    _max?: SystemSettingMaxAggregateInputType
  }

  export type SystemSettingGroupByOutputType = {
    id: string
    key: string
    value: string
    group: string
    isSecret: boolean
    updatedAt: Date
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  type GetSystemSettingGroupByPayload<T extends SystemSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
        }
      >
    >


  export type SystemSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    group?: boolean
    isSecret?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    group?: boolean
    isSecret?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    group?: boolean
    isSecret?: boolean
    updatedAt?: boolean
  }


  export type $SystemSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      group: string
      isSecret: boolean
      updatedAt: Date
    }, ExtArgs["result"]["systemSetting"]>
    composites: {}
  }

  type SystemSettingGetPayload<S extends boolean | null | undefined | SystemSettingDefaultArgs> = $Result.GetResult<Prisma.$SystemSettingPayload, S>

  type SystemSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemSettingCountAggregateInputType | true
    }

  export interface SystemSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemSetting'], meta: { name: 'SystemSetting' } }
    /**
     * Find zero or one SystemSetting that matches the filter.
     * @param {SystemSettingFindUniqueArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemSettingFindUniqueArgs>(args: SelectSubset<T, SystemSettingFindUniqueArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SystemSetting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SystemSettingFindUniqueOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SystemSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemSettingFindFirstArgs>(args?: SelectSubset<T, SystemSettingFindFirstArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SystemSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany()
     * 
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemSettingFindManyArgs>(args?: SelectSubset<T, SystemSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SystemSetting.
     * @param {SystemSettingCreateArgs} args - Arguments to create a SystemSetting.
     * @example
     * // Create one SystemSetting
     * const SystemSetting = await prisma.systemSetting.create({
     *   data: {
     *     // ... data to create a SystemSetting
     *   }
     * })
     * 
     */
    create<T extends SystemSettingCreateArgs>(args: SelectSubset<T, SystemSettingCreateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SystemSettings.
     * @param {SystemSettingCreateManyArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemSettingCreateManyArgs>(args?: SelectSubset<T, SystemSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemSettings and returns the data saved in the database.
     * @param {SystemSettingCreateManyAndReturnArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemSettings and only return the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SystemSetting.
     * @param {SystemSettingDeleteArgs} args - Arguments to delete one SystemSetting.
     * @example
     * // Delete one SystemSetting
     * const SystemSetting = await prisma.systemSetting.delete({
     *   where: {
     *     // ... filter to delete one SystemSetting
     *   }
     * })
     * 
     */
    delete<T extends SystemSettingDeleteArgs>(args: SelectSubset<T, SystemSettingDeleteArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SystemSetting.
     * @param {SystemSettingUpdateArgs} args - Arguments to update one SystemSetting.
     * @example
     * // Update one SystemSetting
     * const systemSetting = await prisma.systemSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemSettingUpdateArgs>(args: SelectSubset<T, SystemSettingUpdateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemSettingDeleteManyArgs>(args?: SelectSubset<T, SystemSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemSettingUpdateManyArgs>(args: SelectSubset<T, SystemSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemSetting.
     * @param {SystemSettingUpsertArgs} args - Arguments to update or create a SystemSetting.
     * @example
     * // Update or create a SystemSetting
     * const systemSetting = await prisma.systemSetting.upsert({
     *   create: {
     *     // ... data to create a SystemSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSetting we want to update
     *   }
     * })
     */
    upsert<T extends SystemSettingUpsertArgs>(args: SelectSubset<T, SystemSettingUpsertArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSetting.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
    **/
    count<T extends SystemSettingCountArgs>(
      args?: Subset<T, SystemSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemSettingAggregateArgs>(args: Subset<T, SystemSettingAggregateArgs>): Prisma.PrismaPromise<GetSystemSettingAggregateType<T>>

    /**
     * Group by SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemSetting model
   */
  readonly fields: SystemSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemSetting model
   */ 
  interface SystemSettingFieldRefs {
    readonly id: FieldRef<"SystemSetting", 'String'>
    readonly key: FieldRef<"SystemSetting", 'String'>
    readonly value: FieldRef<"SystemSetting", 'String'>
    readonly group: FieldRef<"SystemSetting", 'String'>
    readonly isSecret: FieldRef<"SystemSetting", 'Boolean'>
    readonly updatedAt: FieldRef<"SystemSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemSetting findUnique
   */
  export type SystemSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findUniqueOrThrow
   */
  export type SystemSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findFirst
   */
  export type SystemSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findFirstOrThrow
   */
  export type SystemSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findMany
   */
  export type SystemSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting create
   */
  export type SystemSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The data needed to create a SystemSetting.
     */
    data: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
  }

  /**
   * SystemSetting createMany
   */
  export type SystemSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting createManyAndReturn
   */
  export type SystemSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting update
   */
  export type SystemSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The data needed to update a SystemSetting.
     */
    data: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
    /**
     * Choose, which SystemSetting to update.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting updateMany
   */
  export type SystemSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
  }

  /**
   * SystemSetting upsert
   */
  export type SystemSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The filter to search for the SystemSetting to update in case it exists.
     */
    where: SystemSettingWhereUniqueInput
    /**
     * In case the SystemSetting found by the `where` argument doesn't exist, create a new SystemSetting with this data.
     */
    create: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
    /**
     * In case the SystemSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
  }

  /**
   * SystemSetting delete
   */
  export type SystemSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter which SystemSetting to delete.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting deleteMany
   */
  export type SystemSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingWhereInput
  }

  /**
   * SystemSetting without action
   */
  export type SystemSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlatformUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlatformUserScalarFieldEnum = (typeof PlatformUserScalarFieldEnum)[keyof typeof PlatformUserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    platformUserId: 'platformUserId',
    expiresAt: 'expiresAt',
    isRevoked: 'isRevoked',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const SubscriptionPlanScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    price: 'price',
    billingCycle: 'billingCycle',
    trialDays: 'trialDays',
    maxStudents: 'maxStudents',
    maxTeachers: 'maxTeachers',
    maxStaff: 'maxStaff',
    storageGB: 'storageGB',
    features: 'features',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionPlanScalarFieldEnum = (typeof SubscriptionPlanScalarFieldEnum)[keyof typeof SubscriptionPlanScalarFieldEnum]


  export const ResellerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    company: 'company',
    commissionPct: 'commissionPct',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResellerScalarFieldEnum = (typeof ResellerScalarFieldEnum)[keyof typeof ResellerScalarFieldEnum]


  export const CommissionScalarFieldEnum: {
    id: 'id',
    resellerId: 'resellerId',
    schoolId: 'schoolId',
    amount: 'amount',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt'
  };

  export type CommissionScalarFieldEnum = (typeof CommissionScalarFieldEnum)[keyof typeof CommissionScalarFieldEnum]


  export const SchoolScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    email: 'email',
    phone: 'phone',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    pincode: 'pincode',
    website: 'website',
    logo: 'logo',
    favicon: 'favicon',
    primaryColor: 'primaryColor',
    secondaryColor: 'secondaryColor',
    customDomain: 'customDomain',
    dbName: 'dbName',
    status: 'status',
    timezone: 'timezone',
    currency: 'currency',
    language: 'language',
    resellerId: 'resellerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SchoolScalarFieldEnum = (typeof SchoolScalarFieldEnum)[keyof typeof SchoolScalarFieldEnum]


  export const SchoolSettingScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    smtpHost: 'smtpHost',
    smtpPort: 'smtpPort',
    smtpUser: 'smtpUser',
    smtpPass: 'smtpPass',
    smtpFrom: 'smtpFrom',
    smsProvider: 'smsProvider',
    smsApiKey: 'smsApiKey',
    whatsappApiKey: 'whatsappApiKey',
    razorpayKeyId: 'razorpayKeyId',
    razorpayKeySecret: 'razorpayKeySecret',
    stripePubKey: 'stripePubKey',
    stripeSecretKey: 'stripeSecretKey',
    s3Bucket: 's3Bucket',
    s3Region: 's3Region',
    s3AccessKey: 's3AccessKey',
    s3SecretKey: 's3SecretKey',
    zoomApiKey: 'zoomApiKey',
    zoomApiSecret: 'zoomApiSecret',
    firebaseServerKey: 'firebaseServerKey',
    updatedAt: 'updatedAt'
  };

  export type SchoolSettingScalarFieldEnum = (typeof SchoolSettingScalarFieldEnum)[keyof typeof SchoolSettingScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    planId: 'planId',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    amount: 'amount',
    discount: 'discount',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    subscriptionId: 'subscriptionId',
    amount: 'amount',
    currency: 'currency',
    gateway: 'gateway',
    gatewayPayId: 'gatewayPayId',
    status: 'status',
    receiptUrl: 'receiptUrl',
    metadata: 'metadata',
    paidAt: 'paidAt',
    createdAt: 'createdAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const UsageMetricScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    metricDate: 'metricDate',
    students: 'students',
    teachers: 'teachers',
    staff: 'staff',
    storageUsed: 'storageUsed',
    apiCalls: 'apiCalls',
    activeUsers: 'activeUsers',
    createdAt: 'createdAt'
  };

  export type UsageMetricScalarFieldEnum = (typeof UsageMetricScalarFieldEnum)[keyof typeof UsageMetricScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    platformUserId: 'platformUserId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    oldValues: 'oldValues',
    newValues: 'newValues',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SystemSettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    group: 'group',
    isSecret: 'isSecret',
    updatedAt: 'updatedAt'
  };

  export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'PlatformRole'
   */
  export type EnumPlatformRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlatformRole'>
    


  /**
   * Reference to a field of type 'PlatformRole[]'
   */
  export type ListEnumPlatformRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlatformRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'BillingCycle'
   */
  export type EnumBillingCycleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillingCycle'>
    


  /**
   * Reference to a field of type 'BillingCycle[]'
   */
  export type ListEnumBillingCycleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillingCycle[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'CommStatus'
   */
  export type EnumCommStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommStatus'>
    


  /**
   * Reference to a field of type 'CommStatus[]'
   */
  export type ListEnumCommStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommStatus[]'>
    


  /**
   * Reference to a field of type 'SchoolStatus'
   */
  export type EnumSchoolStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SchoolStatus'>
    


  /**
   * Reference to a field of type 'SchoolStatus[]'
   */
  export type ListEnumSchoolStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SchoolStatus[]'>
    


  /**
   * Reference to a field of type 'SubStatus'
   */
  export type EnumSubStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubStatus'>
    


  /**
   * Reference to a field of type 'SubStatus[]'
   */
  export type ListEnumSubStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubStatus[]'>
    


  /**
   * Reference to a field of type 'PayStatus'
   */
  export type EnumPayStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PayStatus'>
    


  /**
   * Reference to a field of type 'PayStatus[]'
   */
  export type ListEnumPayStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PayStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PlatformUserWhereInput = {
    AND?: PlatformUserWhereInput | PlatformUserWhereInput[]
    OR?: PlatformUserWhereInput[]
    NOT?: PlatformUserWhereInput | PlatformUserWhereInput[]
    id?: StringFilter<"PlatformUser"> | string
    email?: StringFilter<"PlatformUser"> | string
    password?: StringFilter<"PlatformUser"> | string
    name?: StringFilter<"PlatformUser"> | string
    role?: EnumPlatformRoleFilter<"PlatformUser"> | $Enums.PlatformRole
    isActive?: BoolFilter<"PlatformUser"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"PlatformUser"> | Date | string | null
    createdAt?: DateTimeFilter<"PlatformUser"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformUser"> | Date | string
    auditLogs?: AuditLogListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
  }

  export type PlatformUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    auditLogs?: AuditLogOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
  }

  export type PlatformUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: PlatformUserWhereInput | PlatformUserWhereInput[]
    OR?: PlatformUserWhereInput[]
    NOT?: PlatformUserWhereInput | PlatformUserWhereInput[]
    password?: StringFilter<"PlatformUser"> | string
    name?: StringFilter<"PlatformUser"> | string
    role?: EnumPlatformRoleFilter<"PlatformUser"> | $Enums.PlatformRole
    isActive?: BoolFilter<"PlatformUser"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"PlatformUser"> | Date | string | null
    createdAt?: DateTimeFilter<"PlatformUser"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformUser"> | Date | string
    auditLogs?: AuditLogListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
  }, "id" | "email">

  export type PlatformUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlatformUserCountOrderByAggregateInput
    _max?: PlatformUserMaxOrderByAggregateInput
    _min?: PlatformUserMinOrderByAggregateInput
  }

  export type PlatformUserScalarWhereWithAggregatesInput = {
    AND?: PlatformUserScalarWhereWithAggregatesInput | PlatformUserScalarWhereWithAggregatesInput[]
    OR?: PlatformUserScalarWhereWithAggregatesInput[]
    NOT?: PlatformUserScalarWhereWithAggregatesInput | PlatformUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlatformUser"> | string
    email?: StringWithAggregatesFilter<"PlatformUser"> | string
    password?: StringWithAggregatesFilter<"PlatformUser"> | string
    name?: StringWithAggregatesFilter<"PlatformUser"> | string
    role?: EnumPlatformRoleWithAggregatesFilter<"PlatformUser"> | $Enums.PlatformRole
    isActive?: BoolWithAggregatesFilter<"PlatformUser"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"PlatformUser"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PlatformUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlatformUser"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    platformUserId?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    platformUser?: XOR<PlatformUserNullableRelationFilter, PlatformUserWhereInput> | null
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    platformUserId?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    platformUser?: PlatformUserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    platformUserId?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    platformUser?: XOR<PlatformUserNullableRelationFilter, PlatformUserWhereInput> | null
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    platformUserId?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    platformUserId?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolWithAggregatesFilter<"RefreshToken"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type SubscriptionPlanWhereInput = {
    AND?: SubscriptionPlanWhereInput | SubscriptionPlanWhereInput[]
    OR?: SubscriptionPlanWhereInput[]
    NOT?: SubscriptionPlanWhereInput | SubscriptionPlanWhereInput[]
    id?: StringFilter<"SubscriptionPlan"> | string
    name?: StringFilter<"SubscriptionPlan"> | string
    slug?: StringFilter<"SubscriptionPlan"> | string
    description?: StringNullableFilter<"SubscriptionPlan"> | string | null
    price?: DecimalFilter<"SubscriptionPlan"> | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleFilter<"SubscriptionPlan"> | $Enums.BillingCycle
    trialDays?: IntFilter<"SubscriptionPlan"> | number
    maxStudents?: IntFilter<"SubscriptionPlan"> | number
    maxTeachers?: IntFilter<"SubscriptionPlan"> | number
    maxStaff?: IntFilter<"SubscriptionPlan"> | number
    storageGB?: IntFilter<"SubscriptionPlan"> | number
    features?: JsonFilter<"SubscriptionPlan">
    isActive?: BoolFilter<"SubscriptionPlan"> | boolean
    sortOrder?: IntFilter<"SubscriptionPlan"> | number
    createdAt?: DateTimeFilter<"SubscriptionPlan"> | Date | string
    updatedAt?: DateTimeFilter<"SubscriptionPlan"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
  }

  export type SubscriptionPlanOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    billingCycle?: SortOrder
    trialDays?: SortOrder
    maxStudents?: SortOrder
    maxTeachers?: SortOrder
    maxStaff?: SortOrder
    storageGB?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptions?: SubscriptionOrderByRelationAggregateInput
  }

  export type SubscriptionPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: SubscriptionPlanWhereInput | SubscriptionPlanWhereInput[]
    OR?: SubscriptionPlanWhereInput[]
    NOT?: SubscriptionPlanWhereInput | SubscriptionPlanWhereInput[]
    description?: StringNullableFilter<"SubscriptionPlan"> | string | null
    price?: DecimalFilter<"SubscriptionPlan"> | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleFilter<"SubscriptionPlan"> | $Enums.BillingCycle
    trialDays?: IntFilter<"SubscriptionPlan"> | number
    maxStudents?: IntFilter<"SubscriptionPlan"> | number
    maxTeachers?: IntFilter<"SubscriptionPlan"> | number
    maxStaff?: IntFilter<"SubscriptionPlan"> | number
    storageGB?: IntFilter<"SubscriptionPlan"> | number
    features?: JsonFilter<"SubscriptionPlan">
    isActive?: BoolFilter<"SubscriptionPlan"> | boolean
    sortOrder?: IntFilter<"SubscriptionPlan"> | number
    createdAt?: DateTimeFilter<"SubscriptionPlan"> | Date | string
    updatedAt?: DateTimeFilter<"SubscriptionPlan"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
  }, "id" | "name" | "slug">

  export type SubscriptionPlanOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    billingCycle?: SortOrder
    trialDays?: SortOrder
    maxStudents?: SortOrder
    maxTeachers?: SortOrder
    maxStaff?: SortOrder
    storageGB?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionPlanCountOrderByAggregateInput
    _avg?: SubscriptionPlanAvgOrderByAggregateInput
    _max?: SubscriptionPlanMaxOrderByAggregateInput
    _min?: SubscriptionPlanMinOrderByAggregateInput
    _sum?: SubscriptionPlanSumOrderByAggregateInput
  }

  export type SubscriptionPlanScalarWhereWithAggregatesInput = {
    AND?: SubscriptionPlanScalarWhereWithAggregatesInput | SubscriptionPlanScalarWhereWithAggregatesInput[]
    OR?: SubscriptionPlanScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionPlanScalarWhereWithAggregatesInput | SubscriptionPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubscriptionPlan"> | string
    name?: StringWithAggregatesFilter<"SubscriptionPlan"> | string
    slug?: StringWithAggregatesFilter<"SubscriptionPlan"> | string
    description?: StringNullableWithAggregatesFilter<"SubscriptionPlan"> | string | null
    price?: DecimalWithAggregatesFilter<"SubscriptionPlan"> | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleWithAggregatesFilter<"SubscriptionPlan"> | $Enums.BillingCycle
    trialDays?: IntWithAggregatesFilter<"SubscriptionPlan"> | number
    maxStudents?: IntWithAggregatesFilter<"SubscriptionPlan"> | number
    maxTeachers?: IntWithAggregatesFilter<"SubscriptionPlan"> | number
    maxStaff?: IntWithAggregatesFilter<"SubscriptionPlan"> | number
    storageGB?: IntWithAggregatesFilter<"SubscriptionPlan"> | number
    features?: JsonWithAggregatesFilter<"SubscriptionPlan">
    isActive?: BoolWithAggregatesFilter<"SubscriptionPlan"> | boolean
    sortOrder?: IntWithAggregatesFilter<"SubscriptionPlan"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SubscriptionPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SubscriptionPlan"> | Date | string
  }

  export type ResellerWhereInput = {
    AND?: ResellerWhereInput | ResellerWhereInput[]
    OR?: ResellerWhereInput[]
    NOT?: ResellerWhereInput | ResellerWhereInput[]
    id?: StringFilter<"Reseller"> | string
    name?: StringFilter<"Reseller"> | string
    email?: StringFilter<"Reseller"> | string
    phone?: StringNullableFilter<"Reseller"> | string | null
    company?: StringNullableFilter<"Reseller"> | string | null
    commissionPct?: DecimalFilter<"Reseller"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Reseller"> | boolean
    createdAt?: DateTimeFilter<"Reseller"> | Date | string
    updatedAt?: DateTimeFilter<"Reseller"> | Date | string
    schools?: SchoolListRelationFilter
    commissions?: CommissionListRelationFilter
  }

  export type ResellerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    commissionPct?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    schools?: SchoolOrderByRelationAggregateInput
    commissions?: CommissionOrderByRelationAggregateInput
  }

  export type ResellerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ResellerWhereInput | ResellerWhereInput[]
    OR?: ResellerWhereInput[]
    NOT?: ResellerWhereInput | ResellerWhereInput[]
    name?: StringFilter<"Reseller"> | string
    phone?: StringNullableFilter<"Reseller"> | string | null
    company?: StringNullableFilter<"Reseller"> | string | null
    commissionPct?: DecimalFilter<"Reseller"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Reseller"> | boolean
    createdAt?: DateTimeFilter<"Reseller"> | Date | string
    updatedAt?: DateTimeFilter<"Reseller"> | Date | string
    schools?: SchoolListRelationFilter
    commissions?: CommissionListRelationFilter
  }, "id" | "email">

  export type ResellerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    commissionPct?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResellerCountOrderByAggregateInput
    _avg?: ResellerAvgOrderByAggregateInput
    _max?: ResellerMaxOrderByAggregateInput
    _min?: ResellerMinOrderByAggregateInput
    _sum?: ResellerSumOrderByAggregateInput
  }

  export type ResellerScalarWhereWithAggregatesInput = {
    AND?: ResellerScalarWhereWithAggregatesInput | ResellerScalarWhereWithAggregatesInput[]
    OR?: ResellerScalarWhereWithAggregatesInput[]
    NOT?: ResellerScalarWhereWithAggregatesInput | ResellerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reseller"> | string
    name?: StringWithAggregatesFilter<"Reseller"> | string
    email?: StringWithAggregatesFilter<"Reseller"> | string
    phone?: StringNullableWithAggregatesFilter<"Reseller"> | string | null
    company?: StringNullableWithAggregatesFilter<"Reseller"> | string | null
    commissionPct?: DecimalWithAggregatesFilter<"Reseller"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolWithAggregatesFilter<"Reseller"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Reseller"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reseller"> | Date | string
  }

  export type CommissionWhereInput = {
    AND?: CommissionWhereInput | CommissionWhereInput[]
    OR?: CommissionWhereInput[]
    NOT?: CommissionWhereInput | CommissionWhereInput[]
    id?: StringFilter<"Commission"> | string
    resellerId?: StringFilter<"Commission"> | string
    schoolId?: StringFilter<"Commission"> | string
    amount?: DecimalFilter<"Commission"> | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFilter<"Commission"> | $Enums.CommStatus
    paidAt?: DateTimeNullableFilter<"Commission"> | Date | string | null
    createdAt?: DateTimeFilter<"Commission"> | Date | string
    reseller?: XOR<ResellerRelationFilter, ResellerWhereInput>
    school?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }

  export type CommissionOrderByWithRelationInput = {
    id?: SortOrder
    resellerId?: SortOrder
    schoolId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    reseller?: ResellerOrderByWithRelationInput
    school?: SchoolOrderByWithRelationInput
  }

  export type CommissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommissionWhereInput | CommissionWhereInput[]
    OR?: CommissionWhereInput[]
    NOT?: CommissionWhereInput | CommissionWhereInput[]
    resellerId?: StringFilter<"Commission"> | string
    schoolId?: StringFilter<"Commission"> | string
    amount?: DecimalFilter<"Commission"> | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFilter<"Commission"> | $Enums.CommStatus
    paidAt?: DateTimeNullableFilter<"Commission"> | Date | string | null
    createdAt?: DateTimeFilter<"Commission"> | Date | string
    reseller?: XOR<ResellerRelationFilter, ResellerWhereInput>
    school?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }, "id">

  export type CommissionOrderByWithAggregationInput = {
    id?: SortOrder
    resellerId?: SortOrder
    schoolId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CommissionCountOrderByAggregateInput
    _avg?: CommissionAvgOrderByAggregateInput
    _max?: CommissionMaxOrderByAggregateInput
    _min?: CommissionMinOrderByAggregateInput
    _sum?: CommissionSumOrderByAggregateInput
  }

  export type CommissionScalarWhereWithAggregatesInput = {
    AND?: CommissionScalarWhereWithAggregatesInput | CommissionScalarWhereWithAggregatesInput[]
    OR?: CommissionScalarWhereWithAggregatesInput[]
    NOT?: CommissionScalarWhereWithAggregatesInput | CommissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Commission"> | string
    resellerId?: StringWithAggregatesFilter<"Commission"> | string
    schoolId?: StringWithAggregatesFilter<"Commission"> | string
    amount?: DecimalWithAggregatesFilter<"Commission"> | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusWithAggregatesFilter<"Commission"> | $Enums.CommStatus
    paidAt?: DateTimeNullableWithAggregatesFilter<"Commission"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Commission"> | Date | string
  }

  export type SchoolWhereInput = {
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    id?: StringFilter<"School"> | string
    name?: StringFilter<"School"> | string
    slug?: StringFilter<"School"> | string
    email?: StringFilter<"School"> | string
    phone?: StringNullableFilter<"School"> | string | null
    address?: StringNullableFilter<"School"> | string | null
    city?: StringNullableFilter<"School"> | string | null
    state?: StringNullableFilter<"School"> | string | null
    country?: StringFilter<"School"> | string
    pincode?: StringNullableFilter<"School"> | string | null
    website?: StringNullableFilter<"School"> | string | null
    logo?: StringNullableFilter<"School"> | string | null
    favicon?: StringNullableFilter<"School"> | string | null
    primaryColor?: StringFilter<"School"> | string
    secondaryColor?: StringFilter<"School"> | string
    customDomain?: StringNullableFilter<"School"> | string | null
    dbName?: StringFilter<"School"> | string
    status?: EnumSchoolStatusFilter<"School"> | $Enums.SchoolStatus
    timezone?: StringFilter<"School"> | string
    currency?: StringFilter<"School"> | string
    language?: StringFilter<"School"> | string
    resellerId?: StringNullableFilter<"School"> | string | null
    createdAt?: DateTimeFilter<"School"> | Date | string
    updatedAt?: DateTimeFilter<"School"> | Date | string
    reseller?: XOR<ResellerNullableRelationFilter, ResellerWhereInput> | null
    subscriptions?: SubscriptionListRelationFilter
    commissions?: CommissionListRelationFilter
    usageMetrics?: UsageMetricListRelationFilter
    schoolSettings?: XOR<SchoolSettingNullableRelationFilter, SchoolSettingWhereInput> | null
  }

  export type SchoolOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrder
    pincode?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    favicon?: SortOrderInput | SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    dbName?: SortOrder
    status?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    resellerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reseller?: ResellerOrderByWithRelationInput
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    commissions?: CommissionOrderByRelationAggregateInput
    usageMetrics?: UsageMetricOrderByRelationAggregateInput
    schoolSettings?: SchoolSettingOrderByWithRelationInput
  }

  export type SchoolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    email?: string
    customDomain?: string
    dbName?: string
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    name?: StringFilter<"School"> | string
    phone?: StringNullableFilter<"School"> | string | null
    address?: StringNullableFilter<"School"> | string | null
    city?: StringNullableFilter<"School"> | string | null
    state?: StringNullableFilter<"School"> | string | null
    country?: StringFilter<"School"> | string
    pincode?: StringNullableFilter<"School"> | string | null
    website?: StringNullableFilter<"School"> | string | null
    logo?: StringNullableFilter<"School"> | string | null
    favicon?: StringNullableFilter<"School"> | string | null
    primaryColor?: StringFilter<"School"> | string
    secondaryColor?: StringFilter<"School"> | string
    status?: EnumSchoolStatusFilter<"School"> | $Enums.SchoolStatus
    timezone?: StringFilter<"School"> | string
    currency?: StringFilter<"School"> | string
    language?: StringFilter<"School"> | string
    resellerId?: StringNullableFilter<"School"> | string | null
    createdAt?: DateTimeFilter<"School"> | Date | string
    updatedAt?: DateTimeFilter<"School"> | Date | string
    reseller?: XOR<ResellerNullableRelationFilter, ResellerWhereInput> | null
    subscriptions?: SubscriptionListRelationFilter
    commissions?: CommissionListRelationFilter
    usageMetrics?: UsageMetricListRelationFilter
    schoolSettings?: XOR<SchoolSettingNullableRelationFilter, SchoolSettingWhereInput> | null
  }, "id" | "slug" | "email" | "customDomain" | "dbName">

  export type SchoolOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrder
    pincode?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    favicon?: SortOrderInput | SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    dbName?: SortOrder
    status?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    resellerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SchoolCountOrderByAggregateInput
    _max?: SchoolMaxOrderByAggregateInput
    _min?: SchoolMinOrderByAggregateInput
  }

  export type SchoolScalarWhereWithAggregatesInput = {
    AND?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    OR?: SchoolScalarWhereWithAggregatesInput[]
    NOT?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"School"> | string
    name?: StringWithAggregatesFilter<"School"> | string
    slug?: StringWithAggregatesFilter<"School"> | string
    email?: StringWithAggregatesFilter<"School"> | string
    phone?: StringNullableWithAggregatesFilter<"School"> | string | null
    address?: StringNullableWithAggregatesFilter<"School"> | string | null
    city?: StringNullableWithAggregatesFilter<"School"> | string | null
    state?: StringNullableWithAggregatesFilter<"School"> | string | null
    country?: StringWithAggregatesFilter<"School"> | string
    pincode?: StringNullableWithAggregatesFilter<"School"> | string | null
    website?: StringNullableWithAggregatesFilter<"School"> | string | null
    logo?: StringNullableWithAggregatesFilter<"School"> | string | null
    favicon?: StringNullableWithAggregatesFilter<"School"> | string | null
    primaryColor?: StringWithAggregatesFilter<"School"> | string
    secondaryColor?: StringWithAggregatesFilter<"School"> | string
    customDomain?: StringNullableWithAggregatesFilter<"School"> | string | null
    dbName?: StringWithAggregatesFilter<"School"> | string
    status?: EnumSchoolStatusWithAggregatesFilter<"School"> | $Enums.SchoolStatus
    timezone?: StringWithAggregatesFilter<"School"> | string
    currency?: StringWithAggregatesFilter<"School"> | string
    language?: StringWithAggregatesFilter<"School"> | string
    resellerId?: StringNullableWithAggregatesFilter<"School"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"School"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"School"> | Date | string
  }

  export type SchoolSettingWhereInput = {
    AND?: SchoolSettingWhereInput | SchoolSettingWhereInput[]
    OR?: SchoolSettingWhereInput[]
    NOT?: SchoolSettingWhereInput | SchoolSettingWhereInput[]
    id?: StringFilter<"SchoolSetting"> | string
    schoolId?: StringFilter<"SchoolSetting"> | string
    smtpHost?: StringNullableFilter<"SchoolSetting"> | string | null
    smtpPort?: IntNullableFilter<"SchoolSetting"> | number | null
    smtpUser?: StringNullableFilter<"SchoolSetting"> | string | null
    smtpPass?: StringNullableFilter<"SchoolSetting"> | string | null
    smtpFrom?: StringNullableFilter<"SchoolSetting"> | string | null
    smsProvider?: StringNullableFilter<"SchoolSetting"> | string | null
    smsApiKey?: StringNullableFilter<"SchoolSetting"> | string | null
    whatsappApiKey?: StringNullableFilter<"SchoolSetting"> | string | null
    razorpayKeyId?: StringNullableFilter<"SchoolSetting"> | string | null
    razorpayKeySecret?: StringNullableFilter<"SchoolSetting"> | string | null
    stripePubKey?: StringNullableFilter<"SchoolSetting"> | string | null
    stripeSecretKey?: StringNullableFilter<"SchoolSetting"> | string | null
    s3Bucket?: StringNullableFilter<"SchoolSetting"> | string | null
    s3Region?: StringNullableFilter<"SchoolSetting"> | string | null
    s3AccessKey?: StringNullableFilter<"SchoolSetting"> | string | null
    s3SecretKey?: StringNullableFilter<"SchoolSetting"> | string | null
    zoomApiKey?: StringNullableFilter<"SchoolSetting"> | string | null
    zoomApiSecret?: StringNullableFilter<"SchoolSetting"> | string | null
    firebaseServerKey?: StringNullableFilter<"SchoolSetting"> | string | null
    updatedAt?: DateTimeFilter<"SchoolSetting"> | Date | string
    school?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }

  export type SchoolSettingOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    smtpHost?: SortOrderInput | SortOrder
    smtpPort?: SortOrderInput | SortOrder
    smtpUser?: SortOrderInput | SortOrder
    smtpPass?: SortOrderInput | SortOrder
    smtpFrom?: SortOrderInput | SortOrder
    smsProvider?: SortOrderInput | SortOrder
    smsApiKey?: SortOrderInput | SortOrder
    whatsappApiKey?: SortOrderInput | SortOrder
    razorpayKeyId?: SortOrderInput | SortOrder
    razorpayKeySecret?: SortOrderInput | SortOrder
    stripePubKey?: SortOrderInput | SortOrder
    stripeSecretKey?: SortOrderInput | SortOrder
    s3Bucket?: SortOrderInput | SortOrder
    s3Region?: SortOrderInput | SortOrder
    s3AccessKey?: SortOrderInput | SortOrder
    s3SecretKey?: SortOrderInput | SortOrder
    zoomApiKey?: SortOrderInput | SortOrder
    zoomApiSecret?: SortOrderInput | SortOrder
    firebaseServerKey?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
  }

  export type SchoolSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    schoolId?: string
    AND?: SchoolSettingWhereInput | SchoolSettingWhereInput[]
    OR?: SchoolSettingWhereInput[]
    NOT?: SchoolSettingWhereInput | SchoolSettingWhereInput[]
    smtpHost?: StringNullableFilter<"SchoolSetting"> | string | null
    smtpPort?: IntNullableFilter<"SchoolSetting"> | number | null
    smtpUser?: StringNullableFilter<"SchoolSetting"> | string | null
    smtpPass?: StringNullableFilter<"SchoolSetting"> | string | null
    smtpFrom?: StringNullableFilter<"SchoolSetting"> | string | null
    smsProvider?: StringNullableFilter<"SchoolSetting"> | string | null
    smsApiKey?: StringNullableFilter<"SchoolSetting"> | string | null
    whatsappApiKey?: StringNullableFilter<"SchoolSetting"> | string | null
    razorpayKeyId?: StringNullableFilter<"SchoolSetting"> | string | null
    razorpayKeySecret?: StringNullableFilter<"SchoolSetting"> | string | null
    stripePubKey?: StringNullableFilter<"SchoolSetting"> | string | null
    stripeSecretKey?: StringNullableFilter<"SchoolSetting"> | string | null
    s3Bucket?: StringNullableFilter<"SchoolSetting"> | string | null
    s3Region?: StringNullableFilter<"SchoolSetting"> | string | null
    s3AccessKey?: StringNullableFilter<"SchoolSetting"> | string | null
    s3SecretKey?: StringNullableFilter<"SchoolSetting"> | string | null
    zoomApiKey?: StringNullableFilter<"SchoolSetting"> | string | null
    zoomApiSecret?: StringNullableFilter<"SchoolSetting"> | string | null
    firebaseServerKey?: StringNullableFilter<"SchoolSetting"> | string | null
    updatedAt?: DateTimeFilter<"SchoolSetting"> | Date | string
    school?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }, "id" | "schoolId">

  export type SchoolSettingOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    smtpHost?: SortOrderInput | SortOrder
    smtpPort?: SortOrderInput | SortOrder
    smtpUser?: SortOrderInput | SortOrder
    smtpPass?: SortOrderInput | SortOrder
    smtpFrom?: SortOrderInput | SortOrder
    smsProvider?: SortOrderInput | SortOrder
    smsApiKey?: SortOrderInput | SortOrder
    whatsappApiKey?: SortOrderInput | SortOrder
    razorpayKeyId?: SortOrderInput | SortOrder
    razorpayKeySecret?: SortOrderInput | SortOrder
    stripePubKey?: SortOrderInput | SortOrder
    stripeSecretKey?: SortOrderInput | SortOrder
    s3Bucket?: SortOrderInput | SortOrder
    s3Region?: SortOrderInput | SortOrder
    s3AccessKey?: SortOrderInput | SortOrder
    s3SecretKey?: SortOrderInput | SortOrder
    zoomApiKey?: SortOrderInput | SortOrder
    zoomApiSecret?: SortOrderInput | SortOrder
    firebaseServerKey?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: SchoolSettingCountOrderByAggregateInput
    _avg?: SchoolSettingAvgOrderByAggregateInput
    _max?: SchoolSettingMaxOrderByAggregateInput
    _min?: SchoolSettingMinOrderByAggregateInput
    _sum?: SchoolSettingSumOrderByAggregateInput
  }

  export type SchoolSettingScalarWhereWithAggregatesInput = {
    AND?: SchoolSettingScalarWhereWithAggregatesInput | SchoolSettingScalarWhereWithAggregatesInput[]
    OR?: SchoolSettingScalarWhereWithAggregatesInput[]
    NOT?: SchoolSettingScalarWhereWithAggregatesInput | SchoolSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SchoolSetting"> | string
    schoolId?: StringWithAggregatesFilter<"SchoolSetting"> | string
    smtpHost?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    smtpPort?: IntNullableWithAggregatesFilter<"SchoolSetting"> | number | null
    smtpUser?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    smtpPass?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    smtpFrom?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    smsProvider?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    smsApiKey?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    whatsappApiKey?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    razorpayKeyId?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    razorpayKeySecret?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    stripePubKey?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    stripeSecretKey?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    s3Bucket?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    s3Region?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    s3AccessKey?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    s3SecretKey?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    zoomApiKey?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    zoomApiSecret?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    firebaseServerKey?: StringNullableWithAggregatesFilter<"SchoolSetting"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"SchoolSetting"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    schoolId?: StringFilter<"Subscription"> | string
    planId?: StringFilter<"Subscription"> | string
    status?: EnumSubStatusFilter<"Subscription"> | $Enums.SubStatus
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeFilter<"Subscription"> | Date | string
    amount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    discount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"Subscription"> | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    school?: XOR<SchoolRelationFilter, SchoolWhereInput>
    plan?: XOR<SubscriptionPlanRelationFilter, SubscriptionPlanWhereInput>
    payments?: PaymentListRelationFilter
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    amount?: SortOrder
    discount?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
    plan?: SubscriptionPlanOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    schoolId?: StringFilter<"Subscription"> | string
    planId?: StringFilter<"Subscription"> | string
    status?: EnumSubStatusFilter<"Subscription"> | $Enums.SubStatus
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeFilter<"Subscription"> | Date | string
    amount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    discount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"Subscription"> | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    school?: XOR<SchoolRelationFilter, SchoolWhereInput>
    plan?: XOR<SubscriptionPlanRelationFilter, SubscriptionPlanWhereInput>
    payments?: PaymentListRelationFilter
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    amount?: SortOrder
    discount?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _avg?: SubscriptionAvgOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
    _sum?: SubscriptionSumOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    schoolId?: StringWithAggregatesFilter<"Subscription"> | string
    planId?: StringWithAggregatesFilter<"Subscription"> | string
    status?: EnumSubStatusWithAggregatesFilter<"Subscription"> | $Enums.SubStatus
    startDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    amount?: DecimalWithAggregatesFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    discount?: DecimalWithAggregatesFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    subscriptionId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    gateway?: StringFilter<"Payment"> | string
    gatewayPayId?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPayStatusFilter<"Payment"> | $Enums.PayStatus
    receiptUrl?: StringNullableFilter<"Payment"> | string | null
    metadata?: JsonFilter<"Payment">
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    subscription?: XOR<SubscriptionRelationFilter, SubscriptionWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    gateway?: SortOrder
    gatewayPayId?: SortOrderInput | SortOrder
    status?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    metadata?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    subscription?: SubscriptionOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    subscriptionId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    gateway?: StringFilter<"Payment"> | string
    gatewayPayId?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPayStatusFilter<"Payment"> | $Enums.PayStatus
    receiptUrl?: StringNullableFilter<"Payment"> | string | null
    metadata?: JsonFilter<"Payment">
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    subscription?: XOR<SubscriptionRelationFilter, SubscriptionWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    gateway?: SortOrder
    gatewayPayId?: SortOrderInput | SortOrder
    status?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    metadata?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    subscriptionId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Payment"> | string
    gateway?: StringWithAggregatesFilter<"Payment"> | string
    gatewayPayId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    status?: EnumPayStatusWithAggregatesFilter<"Payment"> | $Enums.PayStatus
    receiptUrl?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    metadata?: JsonWithAggregatesFilter<"Payment">
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type UsageMetricWhereInput = {
    AND?: UsageMetricWhereInput | UsageMetricWhereInput[]
    OR?: UsageMetricWhereInput[]
    NOT?: UsageMetricWhereInput | UsageMetricWhereInput[]
    id?: StringFilter<"UsageMetric"> | string
    schoolId?: StringFilter<"UsageMetric"> | string
    metricDate?: DateTimeFilter<"UsageMetric"> | Date | string
    students?: IntFilter<"UsageMetric"> | number
    teachers?: IntFilter<"UsageMetric"> | number
    staff?: IntFilter<"UsageMetric"> | number
    storageUsed?: DecimalFilter<"UsageMetric"> | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFilter<"UsageMetric"> | number
    activeUsers?: IntFilter<"UsageMetric"> | number
    createdAt?: DateTimeFilter<"UsageMetric"> | Date | string
    school?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }

  export type UsageMetricOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    metricDate?: SortOrder
    students?: SortOrder
    teachers?: SortOrder
    staff?: SortOrder
    storageUsed?: SortOrder
    apiCalls?: SortOrder
    activeUsers?: SortOrder
    createdAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
  }

  export type UsageMetricWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    schoolId_metricDate?: UsageMetricSchoolIdMetricDateCompoundUniqueInput
    AND?: UsageMetricWhereInput | UsageMetricWhereInput[]
    OR?: UsageMetricWhereInput[]
    NOT?: UsageMetricWhereInput | UsageMetricWhereInput[]
    schoolId?: StringFilter<"UsageMetric"> | string
    metricDate?: DateTimeFilter<"UsageMetric"> | Date | string
    students?: IntFilter<"UsageMetric"> | number
    teachers?: IntFilter<"UsageMetric"> | number
    staff?: IntFilter<"UsageMetric"> | number
    storageUsed?: DecimalFilter<"UsageMetric"> | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFilter<"UsageMetric"> | number
    activeUsers?: IntFilter<"UsageMetric"> | number
    createdAt?: DateTimeFilter<"UsageMetric"> | Date | string
    school?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }, "id" | "schoolId_metricDate">

  export type UsageMetricOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    metricDate?: SortOrder
    students?: SortOrder
    teachers?: SortOrder
    staff?: SortOrder
    storageUsed?: SortOrder
    apiCalls?: SortOrder
    activeUsers?: SortOrder
    createdAt?: SortOrder
    _count?: UsageMetricCountOrderByAggregateInput
    _avg?: UsageMetricAvgOrderByAggregateInput
    _max?: UsageMetricMaxOrderByAggregateInput
    _min?: UsageMetricMinOrderByAggregateInput
    _sum?: UsageMetricSumOrderByAggregateInput
  }

  export type UsageMetricScalarWhereWithAggregatesInput = {
    AND?: UsageMetricScalarWhereWithAggregatesInput | UsageMetricScalarWhereWithAggregatesInput[]
    OR?: UsageMetricScalarWhereWithAggregatesInput[]
    NOT?: UsageMetricScalarWhereWithAggregatesInput | UsageMetricScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageMetric"> | string
    schoolId?: StringWithAggregatesFilter<"UsageMetric"> | string
    metricDate?: DateTimeWithAggregatesFilter<"UsageMetric"> | Date | string
    students?: IntWithAggregatesFilter<"UsageMetric"> | number
    teachers?: IntWithAggregatesFilter<"UsageMetric"> | number
    staff?: IntWithAggregatesFilter<"UsageMetric"> | number
    storageUsed?: DecimalWithAggregatesFilter<"UsageMetric"> | Decimal | DecimalJsLike | number | string
    apiCalls?: IntWithAggregatesFilter<"UsageMetric"> | number
    activeUsers?: IntWithAggregatesFilter<"UsageMetric"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UsageMetric"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    platformUserId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    platformUser?: XOR<PlatformUserNullableRelationFilter, PlatformUserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    platformUserId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    platformUser?: PlatformUserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    platformUserId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    platformUser?: XOR<PlatformUserNullableRelationFilter, PlatformUserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    platformUserId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    platformUserId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type SystemSettingWhereInput = {
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    id?: StringFilter<"SystemSetting"> | string
    key?: StringFilter<"SystemSetting"> | string
    value?: StringFilter<"SystemSetting"> | string
    group?: StringFilter<"SystemSetting"> | string
    isSecret?: BoolFilter<"SystemSetting"> | boolean
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }

  export type SystemSettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrder
    isSecret?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    value?: StringFilter<"SystemSetting"> | string
    group?: StringFilter<"SystemSetting"> | string
    isSecret?: BoolFilter<"SystemSetting"> | boolean
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }, "id" | "key">

  export type SystemSettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrder
    isSecret?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemSettingCountOrderByAggregateInput
    _max?: SystemSettingMaxOrderByAggregateInput
    _min?: SystemSettingMinOrderByAggregateInput
  }

  export type SystemSettingScalarWhereWithAggregatesInput = {
    AND?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    OR?: SystemSettingScalarWhereWithAggregatesInput[]
    NOT?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemSetting"> | string
    key?: StringWithAggregatesFilter<"SystemSetting"> | string
    value?: StringWithAggregatesFilter<"SystemSetting"> | string
    group?: StringWithAggregatesFilter<"SystemSetting"> | string
    isSecret?: BoolWithAggregatesFilter<"SystemSetting"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"SystemSetting"> | Date | string
  }

  export type PlatformUserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.PlatformRole
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogCreateNestedManyWithoutPlatformUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutPlatformUserInput
  }

  export type PlatformUserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.PlatformRole
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPlatformUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutPlatformUserInput
  }

  export type PlatformUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumPlatformRoleFieldUpdateOperationsInput | $Enums.PlatformRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUpdateManyWithoutPlatformUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutPlatformUserNestedInput
  }

  export type PlatformUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumPlatformRoleFieldUpdateOperationsInput | $Enums.PlatformRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPlatformUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutPlatformUserNestedInput
  }

  export type PlatformUserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.PlatformRole
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumPlatformRoleFieldUpdateOperationsInput | $Enums.PlatformRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumPlatformRoleFieldUpdateOperationsInput | $Enums.PlatformRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    isRevoked?: boolean
    createdAt?: Date | string
    platformUser?: PlatformUserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    platformUserId?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platformUser?: PlatformUserUpdateOneWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platformUserId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    platformUserId?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platformUserId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPlanCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    billingCycle: $Enums.BillingCycle
    trialDays?: number
    maxStudents?: number
    maxTeachers?: number
    maxStaff?: number
    storageGB?: number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutPlanInput
  }

  export type SubscriptionPlanUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    billingCycle: $Enums.BillingCycle
    trialDays?: number
    maxStudents?: number
    maxTeachers?: number
    maxStaff?: number
    storageGB?: number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutPlanInput
  }

  export type SubscriptionPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle
    trialDays?: IntFieldUpdateOperationsInput | number
    maxStudents?: IntFieldUpdateOperationsInput | number
    maxTeachers?: IntFieldUpdateOperationsInput | number
    maxStaff?: IntFieldUpdateOperationsInput | number
    storageGB?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutPlanNestedInput
  }

  export type SubscriptionPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle
    trialDays?: IntFieldUpdateOperationsInput | number
    maxStudents?: IntFieldUpdateOperationsInput | number
    maxTeachers?: IntFieldUpdateOperationsInput | number
    maxStaff?: IntFieldUpdateOperationsInput | number
    storageGB?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type SubscriptionPlanCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    billingCycle: $Enums.BillingCycle
    trialDays?: number
    maxStudents?: number
    maxTeachers?: number
    maxStaff?: number
    storageGB?: number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle
    trialDays?: IntFieldUpdateOperationsInput | number
    maxStudents?: IntFieldUpdateOperationsInput | number
    maxTeachers?: IntFieldUpdateOperationsInput | number
    maxStaff?: IntFieldUpdateOperationsInput | number
    storageGB?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle
    trialDays?: IntFieldUpdateOperationsInput | number
    maxStudents?: IntFieldUpdateOperationsInput | number
    maxTeachers?: IntFieldUpdateOperationsInput | number
    maxStaff?: IntFieldUpdateOperationsInput | number
    storageGB?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResellerCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    company?: string | null
    commissionPct?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schools?: SchoolCreateNestedManyWithoutResellerInput
    commissions?: CommissionCreateNestedManyWithoutResellerInput
  }

  export type ResellerUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    company?: string | null
    commissionPct?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schools?: SchoolUncheckedCreateNestedManyWithoutResellerInput
    commissions?: CommissionUncheckedCreateNestedManyWithoutResellerInput
  }

  export type ResellerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schools?: SchoolUpdateManyWithoutResellerNestedInput
    commissions?: CommissionUpdateManyWithoutResellerNestedInput
  }

  export type ResellerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schools?: SchoolUncheckedUpdateManyWithoutResellerNestedInput
    commissions?: CommissionUncheckedUpdateManyWithoutResellerNestedInput
  }

  export type ResellerCreateManyInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    company?: string | null
    commissionPct?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResellerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResellerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    reseller: ResellerCreateNestedOneWithoutCommissionsInput
    school: SchoolCreateNestedOneWithoutCommissionsInput
  }

  export type CommissionUncheckedCreateInput = {
    id?: string
    resellerId: string
    schoolId: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reseller?: ResellerUpdateOneRequiredWithoutCommissionsNestedInput
    school?: SchoolUpdateOneRequiredWithoutCommissionsNestedInput
  }

  export type CommissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resellerId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionCreateManyInput = {
    id?: string
    resellerId: string
    schoolId: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resellerId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolCreateInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reseller?: ResellerCreateNestedOneWithoutSchoolsInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSchoolInput
    commissions?: CommissionCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingCreateNestedOneWithoutSchoolInput
  }

  export type SchoolUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    resellerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSchoolInput
    commissions?: CommissionUncheckedCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricUncheckedCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingUncheckedCreateNestedOneWithoutSchoolInput
  }

  export type SchoolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reseller?: ResellerUpdateOneWithoutSchoolsNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutSchoolNestedInput
    commissions?: CommissionUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUpdateOneWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    resellerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSchoolNestedInput
    commissions?: CommissionUncheckedUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUncheckedUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUncheckedUpdateOneWithoutSchoolNestedInput
  }

  export type SchoolCreateManyInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    resellerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SchoolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    resellerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolSettingCreateInput = {
    id?: string
    smtpHost?: string | null
    smtpPort?: number | null
    smtpUser?: string | null
    smtpPass?: string | null
    smtpFrom?: string | null
    smsProvider?: string | null
    smsApiKey?: string | null
    whatsappApiKey?: string | null
    razorpayKeyId?: string | null
    razorpayKeySecret?: string | null
    stripePubKey?: string | null
    stripeSecretKey?: string | null
    s3Bucket?: string | null
    s3Region?: string | null
    s3AccessKey?: string | null
    s3SecretKey?: string | null
    zoomApiKey?: string | null
    zoomApiSecret?: string | null
    firebaseServerKey?: string | null
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutSchoolSettingsInput
  }

  export type SchoolSettingUncheckedCreateInput = {
    id?: string
    schoolId: string
    smtpHost?: string | null
    smtpPort?: number | null
    smtpUser?: string | null
    smtpPass?: string | null
    smtpFrom?: string | null
    smsProvider?: string | null
    smsApiKey?: string | null
    whatsappApiKey?: string | null
    razorpayKeyId?: string | null
    razorpayKeySecret?: string | null
    stripePubKey?: string | null
    stripeSecretKey?: string | null
    s3Bucket?: string | null
    s3Region?: string | null
    s3AccessKey?: string | null
    s3SecretKey?: string | null
    zoomApiKey?: string | null
    zoomApiSecret?: string | null
    firebaseServerKey?: string | null
    updatedAt?: Date | string
  }

  export type SchoolSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPass?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
    smsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    smsApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeySecret?: NullableStringFieldUpdateOperationsInput | string | null
    stripePubKey?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3Bucket?: NullableStringFieldUpdateOperationsInput | string | null
    s3Region?: NullableStringFieldUpdateOperationsInput | string | null
    s3AccessKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3SecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseServerKey?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutSchoolSettingsNestedInput
  }

  export type SchoolSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPass?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
    smsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    smsApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeySecret?: NullableStringFieldUpdateOperationsInput | string | null
    stripePubKey?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3Bucket?: NullableStringFieldUpdateOperationsInput | string | null
    s3Region?: NullableStringFieldUpdateOperationsInput | string | null
    s3AccessKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3SecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseServerKey?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolSettingCreateManyInput = {
    id?: string
    schoolId: string
    smtpHost?: string | null
    smtpPort?: number | null
    smtpUser?: string | null
    smtpPass?: string | null
    smtpFrom?: string | null
    smsProvider?: string | null
    smsApiKey?: string | null
    whatsappApiKey?: string | null
    razorpayKeyId?: string | null
    razorpayKeySecret?: string | null
    stripePubKey?: string | null
    stripeSecretKey?: string | null
    s3Bucket?: string | null
    s3Region?: string | null
    s3AccessKey?: string | null
    s3SecretKey?: string | null
    zoomApiKey?: string | null
    zoomApiSecret?: string | null
    firebaseServerKey?: string | null
    updatedAt?: Date | string
  }

  export type SchoolSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPass?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
    smsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    smsApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeySecret?: NullableStringFieldUpdateOperationsInput | string | null
    stripePubKey?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3Bucket?: NullableStringFieldUpdateOperationsInput | string | null
    s3Region?: NullableStringFieldUpdateOperationsInput | string | null
    s3AccessKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3SecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseServerKey?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPass?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
    smsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    smsApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeySecret?: NullableStringFieldUpdateOperationsInput | string | null
    stripePubKey?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3Bucket?: NullableStringFieldUpdateOperationsInput | string | null
    s3Region?: NullableStringFieldUpdateOperationsInput | string | null
    s3AccessKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3SecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseServerKey?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutSubscriptionsInput
    plan: SubscriptionPlanCreateNestedOneWithoutSubscriptionsInput
    payments?: PaymentCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    schoolId: string
    planId: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutSubscriptionsNestedInput
    plan?: SubscriptionPlanUpdateOneRequiredWithoutSubscriptionsNestedInput
    payments?: PaymentUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    schoolId: string
    planId: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    gateway: string
    gatewayPayId?: string | null
    status?: $Enums.PayStatus
    receiptUrl?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: Date | string | null
    createdAt?: Date | string
    subscription: SubscriptionCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    subscriptionId: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    gateway: string
    gatewayPayId?: string | null
    status?: $Enums.PayStatus
    receiptUrl?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    gateway?: StringFieldUpdateOperationsInput | string
    gatewayPayId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPayStatusFieldUpdateOperationsInput | $Enums.PayStatus
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    gateway?: StringFieldUpdateOperationsInput | string
    gatewayPayId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPayStatusFieldUpdateOperationsInput | $Enums.PayStatus
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    subscriptionId: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    gateway: string
    gatewayPayId?: string | null
    status?: $Enums.PayStatus
    receiptUrl?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    gateway?: StringFieldUpdateOperationsInput | string
    gatewayPayId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPayStatusFieldUpdateOperationsInput | $Enums.PayStatus
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    gateway?: StringFieldUpdateOperationsInput | string
    gatewayPayId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPayStatusFieldUpdateOperationsInput | $Enums.PayStatus
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMetricCreateInput = {
    id?: string
    metricDate: Date | string
    students?: number
    teachers?: number
    staff?: number
    storageUsed?: Decimal | DecimalJsLike | number | string
    apiCalls?: number
    activeUsers?: number
    createdAt?: Date | string
    school: SchoolCreateNestedOneWithoutUsageMetricsInput
  }

  export type UsageMetricUncheckedCreateInput = {
    id?: string
    schoolId: string
    metricDate: Date | string
    students?: number
    teachers?: number
    staff?: number
    storageUsed?: Decimal | DecimalJsLike | number | string
    apiCalls?: number
    activeUsers?: number
    createdAt?: Date | string
  }

  export type UsageMetricUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricDate?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: IntFieldUpdateOperationsInput | number
    teachers?: IntFieldUpdateOperationsInput | number
    staff?: IntFieldUpdateOperationsInput | number
    storageUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutUsageMetricsNestedInput
  }

  export type UsageMetricUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    metricDate?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: IntFieldUpdateOperationsInput | number
    teachers?: IntFieldUpdateOperationsInput | number
    staff?: IntFieldUpdateOperationsInput | number
    storageUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMetricCreateManyInput = {
    id?: string
    schoolId: string
    metricDate: Date | string
    students?: number
    teachers?: number
    staff?: number
    storageUsed?: Decimal | DecimalJsLike | number | string
    apiCalls?: number
    activeUsers?: number
    createdAt?: Date | string
  }

  export type UsageMetricUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricDate?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: IntFieldUpdateOperationsInput | number
    teachers?: IntFieldUpdateOperationsInput | number
    staff?: IntFieldUpdateOperationsInput | number
    storageUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMetricUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    metricDate?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: IntFieldUpdateOperationsInput | number
    teachers?: IntFieldUpdateOperationsInput | number
    staff?: IntFieldUpdateOperationsInput | number
    storageUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    platformUser?: PlatformUserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    platformUserId?: string | null
    action: string
    entity: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platformUser?: PlatformUserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformUserId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    platformUserId?: string | null
    action: string
    entity: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformUserId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateInput = {
    id?: string
    key: string
    value: string
    group?: string
    isSecret?: boolean
    updatedAt?: Date | string
  }

  export type SystemSettingUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    group?: string
    isSecret?: boolean
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    group?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    group?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateManyInput = {
    id?: string
    key: string
    value: string
    group?: string
    isSecret?: boolean
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    group?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    group?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumPlatformRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.PlatformRole | EnumPlatformRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PlatformRole[] | ListEnumPlatformRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlatformRole[] | ListEnumPlatformRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformRoleFilter<$PrismaModel> | $Enums.PlatformRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlatformUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumPlatformRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlatformRole | EnumPlatformRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PlatformRole[] | ListEnumPlatformRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlatformRole[] | ListEnumPlatformRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformRoleWithAggregatesFilter<$PrismaModel> | $Enums.PlatformRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformRoleFilter<$PrismaModel>
    _max?: NestedEnumPlatformRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PlatformUserNullableRelationFilter = {
    is?: PlatformUserWhereInput | null
    isNot?: PlatformUserWhereInput | null
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    platformUserId?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    platformUserId?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    platformUserId?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumBillingCycleFilter<$PrismaModel = never> = {
    equals?: $Enums.BillingCycle | EnumBillingCycleFieldRefInput<$PrismaModel>
    in?: $Enums.BillingCycle[] | ListEnumBillingCycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillingCycle[] | ListEnumBillingCycleFieldRefInput<$PrismaModel>
    not?: NestedEnumBillingCycleFilter<$PrismaModel> | $Enums.BillingCycle
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionPlanCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    billingCycle?: SortOrder
    trialDays?: SortOrder
    maxStudents?: SortOrder
    maxTeachers?: SortOrder
    maxStaff?: SortOrder
    storageGB?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionPlanAvgOrderByAggregateInput = {
    price?: SortOrder
    trialDays?: SortOrder
    maxStudents?: SortOrder
    maxTeachers?: SortOrder
    maxStaff?: SortOrder
    storageGB?: SortOrder
    sortOrder?: SortOrder
  }

  export type SubscriptionPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    billingCycle?: SortOrder
    trialDays?: SortOrder
    maxStudents?: SortOrder
    maxTeachers?: SortOrder
    maxStaff?: SortOrder
    storageGB?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionPlanMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    billingCycle?: SortOrder
    trialDays?: SortOrder
    maxStudents?: SortOrder
    maxTeachers?: SortOrder
    maxStaff?: SortOrder
    storageGB?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionPlanSumOrderByAggregateInput = {
    price?: SortOrder
    trialDays?: SortOrder
    maxStudents?: SortOrder
    maxTeachers?: SortOrder
    maxStaff?: SortOrder
    storageGB?: SortOrder
    sortOrder?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumBillingCycleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BillingCycle | EnumBillingCycleFieldRefInput<$PrismaModel>
    in?: $Enums.BillingCycle[] | ListEnumBillingCycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillingCycle[] | ListEnumBillingCycleFieldRefInput<$PrismaModel>
    not?: NestedEnumBillingCycleWithAggregatesFilter<$PrismaModel> | $Enums.BillingCycle
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBillingCycleFilter<$PrismaModel>
    _max?: NestedEnumBillingCycleFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type SchoolListRelationFilter = {
    every?: SchoolWhereInput
    some?: SchoolWhereInput
    none?: SchoolWhereInput
  }

  export type CommissionListRelationFilter = {
    every?: CommissionWhereInput
    some?: CommissionWhereInput
    none?: CommissionWhereInput
  }

  export type SchoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResellerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    company?: SortOrder
    commissionPct?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResellerAvgOrderByAggregateInput = {
    commissionPct?: SortOrder
  }

  export type ResellerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    company?: SortOrder
    commissionPct?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResellerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    company?: SortOrder
    commissionPct?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResellerSumOrderByAggregateInput = {
    commissionPct?: SortOrder
  }

  export type EnumCommStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommStatus | EnumCommStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommStatus[] | ListEnumCommStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommStatus[] | ListEnumCommStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommStatusFilter<$PrismaModel> | $Enums.CommStatus
  }

  export type ResellerRelationFilter = {
    is?: ResellerWhereInput
    isNot?: ResellerWhereInput
  }

  export type SchoolRelationFilter = {
    is?: SchoolWhereInput
    isNot?: SchoolWhereInput
  }

  export type CommissionCountOrderByAggregateInput = {
    id?: SortOrder
    resellerId?: SortOrder
    schoolId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CommissionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CommissionMaxOrderByAggregateInput = {
    id?: SortOrder
    resellerId?: SortOrder
    schoolId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CommissionMinOrderByAggregateInput = {
    id?: SortOrder
    resellerId?: SortOrder
    schoolId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CommissionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumCommStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommStatus | EnumCommStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommStatus[] | ListEnumCommStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommStatus[] | ListEnumCommStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommStatusFilter<$PrismaModel>
    _max?: NestedEnumCommStatusFilter<$PrismaModel>
  }

  export type EnumSchoolStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SchoolStatus | EnumSchoolStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SchoolStatus[] | ListEnumSchoolStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SchoolStatus[] | ListEnumSchoolStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSchoolStatusFilter<$PrismaModel> | $Enums.SchoolStatus
  }

  export type ResellerNullableRelationFilter = {
    is?: ResellerWhereInput | null
    isNot?: ResellerWhereInput | null
  }

  export type UsageMetricListRelationFilter = {
    every?: UsageMetricWhereInput
    some?: UsageMetricWhereInput
    none?: UsageMetricWhereInput
  }

  export type SchoolSettingNullableRelationFilter = {
    is?: SchoolSettingWhereInput | null
    isNot?: SchoolSettingWhereInput | null
  }

  export type UsageMetricOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SchoolCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    website?: SortOrder
    logo?: SortOrder
    favicon?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    customDomain?: SortOrder
    dbName?: SortOrder
    status?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    resellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    website?: SortOrder
    logo?: SortOrder
    favicon?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    customDomain?: SortOrder
    dbName?: SortOrder
    status?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    resellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    website?: SortOrder
    logo?: SortOrder
    favicon?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    customDomain?: SortOrder
    dbName?: SortOrder
    status?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    resellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSchoolStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SchoolStatus | EnumSchoolStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SchoolStatus[] | ListEnumSchoolStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SchoolStatus[] | ListEnumSchoolStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSchoolStatusWithAggregatesFilter<$PrismaModel> | $Enums.SchoolStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSchoolStatusFilter<$PrismaModel>
    _max?: NestedEnumSchoolStatusFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SchoolSettingCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPass?: SortOrder
    smtpFrom?: SortOrder
    smsProvider?: SortOrder
    smsApiKey?: SortOrder
    whatsappApiKey?: SortOrder
    razorpayKeyId?: SortOrder
    razorpayKeySecret?: SortOrder
    stripePubKey?: SortOrder
    stripeSecretKey?: SortOrder
    s3Bucket?: SortOrder
    s3Region?: SortOrder
    s3AccessKey?: SortOrder
    s3SecretKey?: SortOrder
    zoomApiKey?: SortOrder
    zoomApiSecret?: SortOrder
    firebaseServerKey?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolSettingAvgOrderByAggregateInput = {
    smtpPort?: SortOrder
  }

  export type SchoolSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPass?: SortOrder
    smtpFrom?: SortOrder
    smsProvider?: SortOrder
    smsApiKey?: SortOrder
    whatsappApiKey?: SortOrder
    razorpayKeyId?: SortOrder
    razorpayKeySecret?: SortOrder
    stripePubKey?: SortOrder
    stripeSecretKey?: SortOrder
    s3Bucket?: SortOrder
    s3Region?: SortOrder
    s3AccessKey?: SortOrder
    s3SecretKey?: SortOrder
    zoomApiKey?: SortOrder
    zoomApiSecret?: SortOrder
    firebaseServerKey?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolSettingMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPass?: SortOrder
    smtpFrom?: SortOrder
    smsProvider?: SortOrder
    smsApiKey?: SortOrder
    whatsappApiKey?: SortOrder
    razorpayKeyId?: SortOrder
    razorpayKeySecret?: SortOrder
    stripePubKey?: SortOrder
    stripeSecretKey?: SortOrder
    s3Bucket?: SortOrder
    s3Region?: SortOrder
    s3AccessKey?: SortOrder
    s3SecretKey?: SortOrder
    zoomApiKey?: SortOrder
    zoomApiSecret?: SortOrder
    firebaseServerKey?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolSettingSumOrderByAggregateInput = {
    smtpPort?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumSubStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubStatus | EnumSubStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubStatus[] | ListEnumSubStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubStatus[] | ListEnumSubStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubStatusFilter<$PrismaModel> | $Enums.SubStatus
  }

  export type SubscriptionPlanRelationFilter = {
    is?: SubscriptionPlanWhereInput
    isNot?: SubscriptionPlanWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    amount?: SortOrder
    discount?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    amount?: SortOrder
    discount?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    amount?: SortOrder
    discount?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    amount?: SortOrder
    discount?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    amount?: SortOrder
    discount?: SortOrder
  }

  export type EnumSubStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubStatus | EnumSubStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubStatus[] | ListEnumSubStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubStatus[] | ListEnumSubStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubStatusFilter<$PrismaModel>
    _max?: NestedEnumSubStatusFilter<$PrismaModel>
  }

  export type EnumPayStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PayStatus | EnumPayStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PayStatus[] | ListEnumPayStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PayStatus[] | ListEnumPayStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPayStatusFilter<$PrismaModel> | $Enums.PayStatus
  }

  export type SubscriptionRelationFilter = {
    is?: SubscriptionWhereInput
    isNot?: SubscriptionWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    gateway?: SortOrder
    gatewayPayId?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    metadata?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    gateway?: SortOrder
    gatewayPayId?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    gateway?: SortOrder
    gatewayPayId?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPayStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PayStatus | EnumPayStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PayStatus[] | ListEnumPayStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PayStatus[] | ListEnumPayStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPayStatusWithAggregatesFilter<$PrismaModel> | $Enums.PayStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPayStatusFilter<$PrismaModel>
    _max?: NestedEnumPayStatusFilter<$PrismaModel>
  }

  export type UsageMetricSchoolIdMetricDateCompoundUniqueInput = {
    schoolId: string
    metricDate: Date | string
  }

  export type UsageMetricCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    metricDate?: SortOrder
    students?: SortOrder
    teachers?: SortOrder
    staff?: SortOrder
    storageUsed?: SortOrder
    apiCalls?: SortOrder
    activeUsers?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageMetricAvgOrderByAggregateInput = {
    students?: SortOrder
    teachers?: SortOrder
    staff?: SortOrder
    storageUsed?: SortOrder
    apiCalls?: SortOrder
    activeUsers?: SortOrder
  }

  export type UsageMetricMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    metricDate?: SortOrder
    students?: SortOrder
    teachers?: SortOrder
    staff?: SortOrder
    storageUsed?: SortOrder
    apiCalls?: SortOrder
    activeUsers?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageMetricMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    metricDate?: SortOrder
    students?: SortOrder
    teachers?: SortOrder
    staff?: SortOrder
    storageUsed?: SortOrder
    apiCalls?: SortOrder
    activeUsers?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageMetricSumOrderByAggregateInput = {
    students?: SortOrder
    teachers?: SortOrder
    staff?: SortOrder
    storageUsed?: SortOrder
    apiCalls?: SortOrder
    activeUsers?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    platformUserId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    platformUserId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    platformUserId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type SystemSettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrder
    isSecret?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrder
    isSecret?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrder
    isSecret?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogCreateNestedManyWithoutPlatformUserInput = {
    create?: XOR<AuditLogCreateWithoutPlatformUserInput, AuditLogUncheckedCreateWithoutPlatformUserInput> | AuditLogCreateWithoutPlatformUserInput[] | AuditLogUncheckedCreateWithoutPlatformUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPlatformUserInput | AuditLogCreateOrConnectWithoutPlatformUserInput[]
    createMany?: AuditLogCreateManyPlatformUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutPlatformUserInput = {
    create?: XOR<RefreshTokenCreateWithoutPlatformUserInput, RefreshTokenUncheckedCreateWithoutPlatformUserInput> | RefreshTokenCreateWithoutPlatformUserInput[] | RefreshTokenUncheckedCreateWithoutPlatformUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutPlatformUserInput | RefreshTokenCreateOrConnectWithoutPlatformUserInput[]
    createMany?: RefreshTokenCreateManyPlatformUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutPlatformUserInput = {
    create?: XOR<AuditLogCreateWithoutPlatformUserInput, AuditLogUncheckedCreateWithoutPlatformUserInput> | AuditLogCreateWithoutPlatformUserInput[] | AuditLogUncheckedCreateWithoutPlatformUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPlatformUserInput | AuditLogCreateOrConnectWithoutPlatformUserInput[]
    createMany?: AuditLogCreateManyPlatformUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutPlatformUserInput = {
    create?: XOR<RefreshTokenCreateWithoutPlatformUserInput, RefreshTokenUncheckedCreateWithoutPlatformUserInput> | RefreshTokenCreateWithoutPlatformUserInput[] | RefreshTokenUncheckedCreateWithoutPlatformUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutPlatformUserInput | RefreshTokenCreateOrConnectWithoutPlatformUserInput[]
    createMany?: RefreshTokenCreateManyPlatformUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumPlatformRoleFieldUpdateOperationsInput = {
    set?: $Enums.PlatformRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuditLogUpdateManyWithoutPlatformUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutPlatformUserInput, AuditLogUncheckedCreateWithoutPlatformUserInput> | AuditLogCreateWithoutPlatformUserInput[] | AuditLogUncheckedCreateWithoutPlatformUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPlatformUserInput | AuditLogCreateOrConnectWithoutPlatformUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPlatformUserInput | AuditLogUpsertWithWhereUniqueWithoutPlatformUserInput[]
    createMany?: AuditLogCreateManyPlatformUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPlatformUserInput | AuditLogUpdateWithWhereUniqueWithoutPlatformUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPlatformUserInput | AuditLogUpdateManyWithWhereWithoutPlatformUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutPlatformUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutPlatformUserInput, RefreshTokenUncheckedCreateWithoutPlatformUserInput> | RefreshTokenCreateWithoutPlatformUserInput[] | RefreshTokenUncheckedCreateWithoutPlatformUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutPlatformUserInput | RefreshTokenCreateOrConnectWithoutPlatformUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutPlatformUserInput | RefreshTokenUpsertWithWhereUniqueWithoutPlatformUserInput[]
    createMany?: RefreshTokenCreateManyPlatformUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutPlatformUserInput | RefreshTokenUpdateWithWhereUniqueWithoutPlatformUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutPlatformUserInput | RefreshTokenUpdateManyWithWhereWithoutPlatformUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutPlatformUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutPlatformUserInput, AuditLogUncheckedCreateWithoutPlatformUserInput> | AuditLogCreateWithoutPlatformUserInput[] | AuditLogUncheckedCreateWithoutPlatformUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPlatformUserInput | AuditLogCreateOrConnectWithoutPlatformUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPlatformUserInput | AuditLogUpsertWithWhereUniqueWithoutPlatformUserInput[]
    createMany?: AuditLogCreateManyPlatformUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPlatformUserInput | AuditLogUpdateWithWhereUniqueWithoutPlatformUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPlatformUserInput | AuditLogUpdateManyWithWhereWithoutPlatformUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutPlatformUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutPlatformUserInput, RefreshTokenUncheckedCreateWithoutPlatformUserInput> | RefreshTokenCreateWithoutPlatformUserInput[] | RefreshTokenUncheckedCreateWithoutPlatformUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutPlatformUserInput | RefreshTokenCreateOrConnectWithoutPlatformUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutPlatformUserInput | RefreshTokenUpsertWithWhereUniqueWithoutPlatformUserInput[]
    createMany?: RefreshTokenCreateManyPlatformUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutPlatformUserInput | RefreshTokenUpdateWithWhereUniqueWithoutPlatformUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutPlatformUserInput | RefreshTokenUpdateManyWithWhereWithoutPlatformUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PlatformUserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<PlatformUserCreateWithoutRefreshTokensInput, PlatformUserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: PlatformUserCreateOrConnectWithoutRefreshTokensInput
    connect?: PlatformUserWhereUniqueInput
  }

  export type PlatformUserUpdateOneWithoutRefreshTokensNestedInput = {
    create?: XOR<PlatformUserCreateWithoutRefreshTokensInput, PlatformUserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: PlatformUserCreateOrConnectWithoutRefreshTokensInput
    upsert?: PlatformUserUpsertWithoutRefreshTokensInput
    disconnect?: PlatformUserWhereInput | boolean
    delete?: PlatformUserWhereInput | boolean
    connect?: PlatformUserWhereUniqueInput
    update?: XOR<XOR<PlatformUserUpdateToOneWithWhereWithoutRefreshTokensInput, PlatformUserUpdateWithoutRefreshTokensInput>, PlatformUserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SubscriptionCreateNestedManyWithoutPlanInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumBillingCycleFieldUpdateOperationsInput = {
    set?: $Enums.BillingCycle
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SubscriptionUpdateManyWithoutPlanNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutPlanInput | SubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutPlanInput | SubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutPlanInput | SubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutPlanInput | SubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutPlanInput | SubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutPlanInput | SubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type SchoolCreateNestedManyWithoutResellerInput = {
    create?: XOR<SchoolCreateWithoutResellerInput, SchoolUncheckedCreateWithoutResellerInput> | SchoolCreateWithoutResellerInput[] | SchoolUncheckedCreateWithoutResellerInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutResellerInput | SchoolCreateOrConnectWithoutResellerInput[]
    createMany?: SchoolCreateManyResellerInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type CommissionCreateNestedManyWithoutResellerInput = {
    create?: XOR<CommissionCreateWithoutResellerInput, CommissionUncheckedCreateWithoutResellerInput> | CommissionCreateWithoutResellerInput[] | CommissionUncheckedCreateWithoutResellerInput[]
    connectOrCreate?: CommissionCreateOrConnectWithoutResellerInput | CommissionCreateOrConnectWithoutResellerInput[]
    createMany?: CommissionCreateManyResellerInputEnvelope
    connect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
  }

  export type SchoolUncheckedCreateNestedManyWithoutResellerInput = {
    create?: XOR<SchoolCreateWithoutResellerInput, SchoolUncheckedCreateWithoutResellerInput> | SchoolCreateWithoutResellerInput[] | SchoolUncheckedCreateWithoutResellerInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutResellerInput | SchoolCreateOrConnectWithoutResellerInput[]
    createMany?: SchoolCreateManyResellerInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type CommissionUncheckedCreateNestedManyWithoutResellerInput = {
    create?: XOR<CommissionCreateWithoutResellerInput, CommissionUncheckedCreateWithoutResellerInput> | CommissionCreateWithoutResellerInput[] | CommissionUncheckedCreateWithoutResellerInput[]
    connectOrCreate?: CommissionCreateOrConnectWithoutResellerInput | CommissionCreateOrConnectWithoutResellerInput[]
    createMany?: CommissionCreateManyResellerInputEnvelope
    connect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
  }

  export type SchoolUpdateManyWithoutResellerNestedInput = {
    create?: XOR<SchoolCreateWithoutResellerInput, SchoolUncheckedCreateWithoutResellerInput> | SchoolCreateWithoutResellerInput[] | SchoolUncheckedCreateWithoutResellerInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutResellerInput | SchoolCreateOrConnectWithoutResellerInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutResellerInput | SchoolUpsertWithWhereUniqueWithoutResellerInput[]
    createMany?: SchoolCreateManyResellerInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutResellerInput | SchoolUpdateWithWhereUniqueWithoutResellerInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutResellerInput | SchoolUpdateManyWithWhereWithoutResellerInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type CommissionUpdateManyWithoutResellerNestedInput = {
    create?: XOR<CommissionCreateWithoutResellerInput, CommissionUncheckedCreateWithoutResellerInput> | CommissionCreateWithoutResellerInput[] | CommissionUncheckedCreateWithoutResellerInput[]
    connectOrCreate?: CommissionCreateOrConnectWithoutResellerInput | CommissionCreateOrConnectWithoutResellerInput[]
    upsert?: CommissionUpsertWithWhereUniqueWithoutResellerInput | CommissionUpsertWithWhereUniqueWithoutResellerInput[]
    createMany?: CommissionCreateManyResellerInputEnvelope
    set?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    disconnect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    delete?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    connect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    update?: CommissionUpdateWithWhereUniqueWithoutResellerInput | CommissionUpdateWithWhereUniqueWithoutResellerInput[]
    updateMany?: CommissionUpdateManyWithWhereWithoutResellerInput | CommissionUpdateManyWithWhereWithoutResellerInput[]
    deleteMany?: CommissionScalarWhereInput | CommissionScalarWhereInput[]
  }

  export type SchoolUncheckedUpdateManyWithoutResellerNestedInput = {
    create?: XOR<SchoolCreateWithoutResellerInput, SchoolUncheckedCreateWithoutResellerInput> | SchoolCreateWithoutResellerInput[] | SchoolUncheckedCreateWithoutResellerInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutResellerInput | SchoolCreateOrConnectWithoutResellerInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutResellerInput | SchoolUpsertWithWhereUniqueWithoutResellerInput[]
    createMany?: SchoolCreateManyResellerInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutResellerInput | SchoolUpdateWithWhereUniqueWithoutResellerInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutResellerInput | SchoolUpdateManyWithWhereWithoutResellerInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type CommissionUncheckedUpdateManyWithoutResellerNestedInput = {
    create?: XOR<CommissionCreateWithoutResellerInput, CommissionUncheckedCreateWithoutResellerInput> | CommissionCreateWithoutResellerInput[] | CommissionUncheckedCreateWithoutResellerInput[]
    connectOrCreate?: CommissionCreateOrConnectWithoutResellerInput | CommissionCreateOrConnectWithoutResellerInput[]
    upsert?: CommissionUpsertWithWhereUniqueWithoutResellerInput | CommissionUpsertWithWhereUniqueWithoutResellerInput[]
    createMany?: CommissionCreateManyResellerInputEnvelope
    set?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    disconnect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    delete?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    connect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    update?: CommissionUpdateWithWhereUniqueWithoutResellerInput | CommissionUpdateWithWhereUniqueWithoutResellerInput[]
    updateMany?: CommissionUpdateManyWithWhereWithoutResellerInput | CommissionUpdateManyWithWhereWithoutResellerInput[]
    deleteMany?: CommissionScalarWhereInput | CommissionScalarWhereInput[]
  }

  export type ResellerCreateNestedOneWithoutCommissionsInput = {
    create?: XOR<ResellerCreateWithoutCommissionsInput, ResellerUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: ResellerCreateOrConnectWithoutCommissionsInput
    connect?: ResellerWhereUniqueInput
  }

  export type SchoolCreateNestedOneWithoutCommissionsInput = {
    create?: XOR<SchoolCreateWithoutCommissionsInput, SchoolUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutCommissionsInput
    connect?: SchoolWhereUniqueInput
  }

  export type EnumCommStatusFieldUpdateOperationsInput = {
    set?: $Enums.CommStatus
  }

  export type ResellerUpdateOneRequiredWithoutCommissionsNestedInput = {
    create?: XOR<ResellerCreateWithoutCommissionsInput, ResellerUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: ResellerCreateOrConnectWithoutCommissionsInput
    upsert?: ResellerUpsertWithoutCommissionsInput
    connect?: ResellerWhereUniqueInput
    update?: XOR<XOR<ResellerUpdateToOneWithWhereWithoutCommissionsInput, ResellerUpdateWithoutCommissionsInput>, ResellerUncheckedUpdateWithoutCommissionsInput>
  }

  export type SchoolUpdateOneRequiredWithoutCommissionsNestedInput = {
    create?: XOR<SchoolCreateWithoutCommissionsInput, SchoolUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutCommissionsInput
    upsert?: SchoolUpsertWithoutCommissionsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutCommissionsInput, SchoolUpdateWithoutCommissionsInput>, SchoolUncheckedUpdateWithoutCommissionsInput>
  }

  export type ResellerCreateNestedOneWithoutSchoolsInput = {
    create?: XOR<ResellerCreateWithoutSchoolsInput, ResellerUncheckedCreateWithoutSchoolsInput>
    connectOrCreate?: ResellerCreateOrConnectWithoutSchoolsInput
    connect?: ResellerWhereUniqueInput
  }

  export type SubscriptionCreateNestedManyWithoutSchoolInput = {
    create?: XOR<SubscriptionCreateWithoutSchoolInput, SubscriptionUncheckedCreateWithoutSchoolInput> | SubscriptionCreateWithoutSchoolInput[] | SubscriptionUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutSchoolInput | SubscriptionCreateOrConnectWithoutSchoolInput[]
    createMany?: SubscriptionCreateManySchoolInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type CommissionCreateNestedManyWithoutSchoolInput = {
    create?: XOR<CommissionCreateWithoutSchoolInput, CommissionUncheckedCreateWithoutSchoolInput> | CommissionCreateWithoutSchoolInput[] | CommissionUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: CommissionCreateOrConnectWithoutSchoolInput | CommissionCreateOrConnectWithoutSchoolInput[]
    createMany?: CommissionCreateManySchoolInputEnvelope
    connect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
  }

  export type UsageMetricCreateNestedManyWithoutSchoolInput = {
    create?: XOR<UsageMetricCreateWithoutSchoolInput, UsageMetricUncheckedCreateWithoutSchoolInput> | UsageMetricCreateWithoutSchoolInput[] | UsageMetricUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: UsageMetricCreateOrConnectWithoutSchoolInput | UsageMetricCreateOrConnectWithoutSchoolInput[]
    createMany?: UsageMetricCreateManySchoolInputEnvelope
    connect?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
  }

  export type SchoolSettingCreateNestedOneWithoutSchoolInput = {
    create?: XOR<SchoolSettingCreateWithoutSchoolInput, SchoolSettingUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: SchoolSettingCreateOrConnectWithoutSchoolInput
    connect?: SchoolSettingWhereUniqueInput
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<SubscriptionCreateWithoutSchoolInput, SubscriptionUncheckedCreateWithoutSchoolInput> | SubscriptionCreateWithoutSchoolInput[] | SubscriptionUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutSchoolInput | SubscriptionCreateOrConnectWithoutSchoolInput[]
    createMany?: SubscriptionCreateManySchoolInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type CommissionUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<CommissionCreateWithoutSchoolInput, CommissionUncheckedCreateWithoutSchoolInput> | CommissionCreateWithoutSchoolInput[] | CommissionUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: CommissionCreateOrConnectWithoutSchoolInput | CommissionCreateOrConnectWithoutSchoolInput[]
    createMany?: CommissionCreateManySchoolInputEnvelope
    connect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
  }

  export type UsageMetricUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<UsageMetricCreateWithoutSchoolInput, UsageMetricUncheckedCreateWithoutSchoolInput> | UsageMetricCreateWithoutSchoolInput[] | UsageMetricUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: UsageMetricCreateOrConnectWithoutSchoolInput | UsageMetricCreateOrConnectWithoutSchoolInput[]
    createMany?: UsageMetricCreateManySchoolInputEnvelope
    connect?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
  }

  export type SchoolSettingUncheckedCreateNestedOneWithoutSchoolInput = {
    create?: XOR<SchoolSettingCreateWithoutSchoolInput, SchoolSettingUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: SchoolSettingCreateOrConnectWithoutSchoolInput
    connect?: SchoolSettingWhereUniqueInput
  }

  export type EnumSchoolStatusFieldUpdateOperationsInput = {
    set?: $Enums.SchoolStatus
  }

  export type ResellerUpdateOneWithoutSchoolsNestedInput = {
    create?: XOR<ResellerCreateWithoutSchoolsInput, ResellerUncheckedCreateWithoutSchoolsInput>
    connectOrCreate?: ResellerCreateOrConnectWithoutSchoolsInput
    upsert?: ResellerUpsertWithoutSchoolsInput
    disconnect?: ResellerWhereInput | boolean
    delete?: ResellerWhereInput | boolean
    connect?: ResellerWhereUniqueInput
    update?: XOR<XOR<ResellerUpdateToOneWithWhereWithoutSchoolsInput, ResellerUpdateWithoutSchoolsInput>, ResellerUncheckedUpdateWithoutSchoolsInput>
  }

  export type SubscriptionUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<SubscriptionCreateWithoutSchoolInput, SubscriptionUncheckedCreateWithoutSchoolInput> | SubscriptionCreateWithoutSchoolInput[] | SubscriptionUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutSchoolInput | SubscriptionCreateOrConnectWithoutSchoolInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutSchoolInput | SubscriptionUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: SubscriptionCreateManySchoolInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutSchoolInput | SubscriptionUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutSchoolInput | SubscriptionUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type CommissionUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<CommissionCreateWithoutSchoolInput, CommissionUncheckedCreateWithoutSchoolInput> | CommissionCreateWithoutSchoolInput[] | CommissionUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: CommissionCreateOrConnectWithoutSchoolInput | CommissionCreateOrConnectWithoutSchoolInput[]
    upsert?: CommissionUpsertWithWhereUniqueWithoutSchoolInput | CommissionUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: CommissionCreateManySchoolInputEnvelope
    set?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    disconnect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    delete?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    connect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    update?: CommissionUpdateWithWhereUniqueWithoutSchoolInput | CommissionUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: CommissionUpdateManyWithWhereWithoutSchoolInput | CommissionUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: CommissionScalarWhereInput | CommissionScalarWhereInput[]
  }

  export type UsageMetricUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<UsageMetricCreateWithoutSchoolInput, UsageMetricUncheckedCreateWithoutSchoolInput> | UsageMetricCreateWithoutSchoolInput[] | UsageMetricUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: UsageMetricCreateOrConnectWithoutSchoolInput | UsageMetricCreateOrConnectWithoutSchoolInput[]
    upsert?: UsageMetricUpsertWithWhereUniqueWithoutSchoolInput | UsageMetricUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: UsageMetricCreateManySchoolInputEnvelope
    set?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
    disconnect?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
    delete?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
    connect?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
    update?: UsageMetricUpdateWithWhereUniqueWithoutSchoolInput | UsageMetricUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: UsageMetricUpdateManyWithWhereWithoutSchoolInput | UsageMetricUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: UsageMetricScalarWhereInput | UsageMetricScalarWhereInput[]
  }

  export type SchoolSettingUpdateOneWithoutSchoolNestedInput = {
    create?: XOR<SchoolSettingCreateWithoutSchoolInput, SchoolSettingUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: SchoolSettingCreateOrConnectWithoutSchoolInput
    upsert?: SchoolSettingUpsertWithoutSchoolInput
    disconnect?: SchoolSettingWhereInput | boolean
    delete?: SchoolSettingWhereInput | boolean
    connect?: SchoolSettingWhereUniqueInput
    update?: XOR<XOR<SchoolSettingUpdateToOneWithWhereWithoutSchoolInput, SchoolSettingUpdateWithoutSchoolInput>, SchoolSettingUncheckedUpdateWithoutSchoolInput>
  }

  export type SubscriptionUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<SubscriptionCreateWithoutSchoolInput, SubscriptionUncheckedCreateWithoutSchoolInput> | SubscriptionCreateWithoutSchoolInput[] | SubscriptionUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutSchoolInput | SubscriptionCreateOrConnectWithoutSchoolInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutSchoolInput | SubscriptionUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: SubscriptionCreateManySchoolInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutSchoolInput | SubscriptionUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutSchoolInput | SubscriptionUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type CommissionUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<CommissionCreateWithoutSchoolInput, CommissionUncheckedCreateWithoutSchoolInput> | CommissionCreateWithoutSchoolInput[] | CommissionUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: CommissionCreateOrConnectWithoutSchoolInput | CommissionCreateOrConnectWithoutSchoolInput[]
    upsert?: CommissionUpsertWithWhereUniqueWithoutSchoolInput | CommissionUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: CommissionCreateManySchoolInputEnvelope
    set?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    disconnect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    delete?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    connect?: CommissionWhereUniqueInput | CommissionWhereUniqueInput[]
    update?: CommissionUpdateWithWhereUniqueWithoutSchoolInput | CommissionUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: CommissionUpdateManyWithWhereWithoutSchoolInput | CommissionUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: CommissionScalarWhereInput | CommissionScalarWhereInput[]
  }

  export type UsageMetricUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<UsageMetricCreateWithoutSchoolInput, UsageMetricUncheckedCreateWithoutSchoolInput> | UsageMetricCreateWithoutSchoolInput[] | UsageMetricUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: UsageMetricCreateOrConnectWithoutSchoolInput | UsageMetricCreateOrConnectWithoutSchoolInput[]
    upsert?: UsageMetricUpsertWithWhereUniqueWithoutSchoolInput | UsageMetricUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: UsageMetricCreateManySchoolInputEnvelope
    set?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
    disconnect?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
    delete?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
    connect?: UsageMetricWhereUniqueInput | UsageMetricWhereUniqueInput[]
    update?: UsageMetricUpdateWithWhereUniqueWithoutSchoolInput | UsageMetricUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: UsageMetricUpdateManyWithWhereWithoutSchoolInput | UsageMetricUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: UsageMetricScalarWhereInput | UsageMetricScalarWhereInput[]
  }

  export type SchoolSettingUncheckedUpdateOneWithoutSchoolNestedInput = {
    create?: XOR<SchoolSettingCreateWithoutSchoolInput, SchoolSettingUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: SchoolSettingCreateOrConnectWithoutSchoolInput
    upsert?: SchoolSettingUpsertWithoutSchoolInput
    disconnect?: SchoolSettingWhereInput | boolean
    delete?: SchoolSettingWhereInput | boolean
    connect?: SchoolSettingWhereUniqueInput
    update?: XOR<XOR<SchoolSettingUpdateToOneWithWhereWithoutSchoolInput, SchoolSettingUpdateWithoutSchoolInput>, SchoolSettingUncheckedUpdateWithoutSchoolInput>
  }

  export type SchoolCreateNestedOneWithoutSchoolSettingsInput = {
    create?: XOR<SchoolCreateWithoutSchoolSettingsInput, SchoolUncheckedCreateWithoutSchoolSettingsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutSchoolSettingsInput
    connect?: SchoolWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SchoolUpdateOneRequiredWithoutSchoolSettingsNestedInput = {
    create?: XOR<SchoolCreateWithoutSchoolSettingsInput, SchoolUncheckedCreateWithoutSchoolSettingsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutSchoolSettingsInput
    upsert?: SchoolUpsertWithoutSchoolSettingsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutSchoolSettingsInput, SchoolUpdateWithoutSchoolSettingsInput>, SchoolUncheckedUpdateWithoutSchoolSettingsInput>
  }

  export type SchoolCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<SchoolCreateWithoutSubscriptionsInput, SchoolUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutSubscriptionsInput
    connect?: SchoolWhereUniqueInput
  }

  export type SubscriptionPlanCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<SubscriptionPlanCreateWithoutSubscriptionsInput, SubscriptionPlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: SubscriptionPlanCreateOrConnectWithoutSubscriptionsInput
    connect?: SubscriptionPlanWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EnumSubStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubStatus
  }

  export type SchoolUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<SchoolCreateWithoutSubscriptionsInput, SchoolUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutSubscriptionsInput
    upsert?: SchoolUpsertWithoutSubscriptionsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutSubscriptionsInput, SchoolUpdateWithoutSubscriptionsInput>, SchoolUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type SubscriptionPlanUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<SubscriptionPlanCreateWithoutSubscriptionsInput, SubscriptionPlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: SubscriptionPlanCreateOrConnectWithoutSubscriptionsInput
    upsert?: SubscriptionPlanUpsertWithoutSubscriptionsInput
    connect?: SubscriptionPlanWhereUniqueInput
    update?: XOR<XOR<SubscriptionPlanUpdateToOneWithWhereWithoutSubscriptionsInput, SubscriptionPlanUpdateWithoutSubscriptionsInput>, SubscriptionPlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type PaymentUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSubscriptionInput | PaymentUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSubscriptionInput | PaymentUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSubscriptionInput | PaymentUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSubscriptionInput | PaymentUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSubscriptionInput | PaymentUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSubscriptionInput | PaymentUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type SubscriptionCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPaymentsInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type EnumPayStatusFieldUpdateOperationsInput = {
    set?: $Enums.PayStatus
  }

  export type SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPaymentsInput
    upsert?: SubscriptionUpsertWithoutPaymentsInput
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutPaymentsInput, SubscriptionUpdateWithoutPaymentsInput>, SubscriptionUncheckedUpdateWithoutPaymentsInput>
  }

  export type SchoolCreateNestedOneWithoutUsageMetricsInput = {
    create?: XOR<SchoolCreateWithoutUsageMetricsInput, SchoolUncheckedCreateWithoutUsageMetricsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutUsageMetricsInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneRequiredWithoutUsageMetricsNestedInput = {
    create?: XOR<SchoolCreateWithoutUsageMetricsInput, SchoolUncheckedCreateWithoutUsageMetricsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutUsageMetricsInput
    upsert?: SchoolUpsertWithoutUsageMetricsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutUsageMetricsInput, SchoolUpdateWithoutUsageMetricsInput>, SchoolUncheckedUpdateWithoutUsageMetricsInput>
  }

  export type PlatformUserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<PlatformUserCreateWithoutAuditLogsInput, PlatformUserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: PlatformUserCreateOrConnectWithoutAuditLogsInput
    connect?: PlatformUserWhereUniqueInput
  }

  export type PlatformUserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<PlatformUserCreateWithoutAuditLogsInput, PlatformUserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: PlatformUserCreateOrConnectWithoutAuditLogsInput
    upsert?: PlatformUserUpsertWithoutAuditLogsInput
    disconnect?: PlatformUserWhereInput | boolean
    delete?: PlatformUserWhereInput | boolean
    connect?: PlatformUserWhereUniqueInput
    update?: XOR<XOR<PlatformUserUpdateToOneWithWhereWithoutAuditLogsInput, PlatformUserUpdateWithoutAuditLogsInput>, PlatformUserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumPlatformRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.PlatformRole | EnumPlatformRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PlatformRole[] | ListEnumPlatformRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlatformRole[] | ListEnumPlatformRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformRoleFilter<$PrismaModel> | $Enums.PlatformRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumPlatformRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlatformRole | EnumPlatformRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PlatformRole[] | ListEnumPlatformRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlatformRole[] | ListEnumPlatformRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformRoleWithAggregatesFilter<$PrismaModel> | $Enums.PlatformRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformRoleFilter<$PrismaModel>
    _max?: NestedEnumPlatformRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumBillingCycleFilter<$PrismaModel = never> = {
    equals?: $Enums.BillingCycle | EnumBillingCycleFieldRefInput<$PrismaModel>
    in?: $Enums.BillingCycle[] | ListEnumBillingCycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillingCycle[] | ListEnumBillingCycleFieldRefInput<$PrismaModel>
    not?: NestedEnumBillingCycleFilter<$PrismaModel> | $Enums.BillingCycle
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumBillingCycleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BillingCycle | EnumBillingCycleFieldRefInput<$PrismaModel>
    in?: $Enums.BillingCycle[] | ListEnumBillingCycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillingCycle[] | ListEnumBillingCycleFieldRefInput<$PrismaModel>
    not?: NestedEnumBillingCycleWithAggregatesFilter<$PrismaModel> | $Enums.BillingCycle
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBillingCycleFilter<$PrismaModel>
    _max?: NestedEnumBillingCycleFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumCommStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommStatus | EnumCommStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommStatus[] | ListEnumCommStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommStatus[] | ListEnumCommStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommStatusFilter<$PrismaModel> | $Enums.CommStatus
  }

  export type NestedEnumCommStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommStatus | EnumCommStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommStatus[] | ListEnumCommStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommStatus[] | ListEnumCommStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommStatusFilter<$PrismaModel>
    _max?: NestedEnumCommStatusFilter<$PrismaModel>
  }

  export type NestedEnumSchoolStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SchoolStatus | EnumSchoolStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SchoolStatus[] | ListEnumSchoolStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SchoolStatus[] | ListEnumSchoolStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSchoolStatusFilter<$PrismaModel> | $Enums.SchoolStatus
  }

  export type NestedEnumSchoolStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SchoolStatus | EnumSchoolStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SchoolStatus[] | ListEnumSchoolStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SchoolStatus[] | ListEnumSchoolStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSchoolStatusWithAggregatesFilter<$PrismaModel> | $Enums.SchoolStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSchoolStatusFilter<$PrismaModel>
    _max?: NestedEnumSchoolStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSubStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubStatus | EnumSubStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubStatus[] | ListEnumSubStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubStatus[] | ListEnumSubStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubStatusFilter<$PrismaModel> | $Enums.SubStatus
  }

  export type NestedEnumSubStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubStatus | EnumSubStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubStatus[] | ListEnumSubStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubStatus[] | ListEnumSubStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubStatusFilter<$PrismaModel>
    _max?: NestedEnumSubStatusFilter<$PrismaModel>
  }

  export type NestedEnumPayStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PayStatus | EnumPayStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PayStatus[] | ListEnumPayStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PayStatus[] | ListEnumPayStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPayStatusFilter<$PrismaModel> | $Enums.PayStatus
  }

  export type NestedEnumPayStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PayStatus | EnumPayStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PayStatus[] | ListEnumPayStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PayStatus[] | ListEnumPayStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPayStatusWithAggregatesFilter<$PrismaModel> | $Enums.PayStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPayStatusFilter<$PrismaModel>
    _max?: NestedEnumPayStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCreateWithoutPlatformUserInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutPlatformUserInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutPlatformUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutPlatformUserInput, AuditLogUncheckedCreateWithoutPlatformUserInput>
  }

  export type AuditLogCreateManyPlatformUserInputEnvelope = {
    data: AuditLogCreateManyPlatformUserInput | AuditLogCreateManyPlatformUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutPlatformUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    isRevoked?: boolean
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutPlatformUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    isRevoked?: boolean
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutPlatformUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutPlatformUserInput, RefreshTokenUncheckedCreateWithoutPlatformUserInput>
  }

  export type RefreshTokenCreateManyPlatformUserInputEnvelope = {
    data: RefreshTokenCreateManyPlatformUserInput | RefreshTokenCreateManyPlatformUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogUpsertWithWhereUniqueWithoutPlatformUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutPlatformUserInput, AuditLogUncheckedUpdateWithoutPlatformUserInput>
    create: XOR<AuditLogCreateWithoutPlatformUserInput, AuditLogUncheckedCreateWithoutPlatformUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutPlatformUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutPlatformUserInput, AuditLogUncheckedUpdateWithoutPlatformUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutPlatformUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutPlatformUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    platformUserId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutPlatformUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutPlatformUserInput, RefreshTokenUncheckedUpdateWithoutPlatformUserInput>
    create: XOR<RefreshTokenCreateWithoutPlatformUserInput, RefreshTokenUncheckedCreateWithoutPlatformUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutPlatformUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutPlatformUserInput, RefreshTokenUncheckedUpdateWithoutPlatformUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutPlatformUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutPlatformUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    platformUserId?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type PlatformUserCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.PlatformRole
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogCreateNestedManyWithoutPlatformUserInput
  }

  export type PlatformUserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.PlatformRole
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPlatformUserInput
  }

  export type PlatformUserCreateOrConnectWithoutRefreshTokensInput = {
    where: PlatformUserWhereUniqueInput
    create: XOR<PlatformUserCreateWithoutRefreshTokensInput, PlatformUserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type PlatformUserUpsertWithoutRefreshTokensInput = {
    update: XOR<PlatformUserUpdateWithoutRefreshTokensInput, PlatformUserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<PlatformUserCreateWithoutRefreshTokensInput, PlatformUserUncheckedCreateWithoutRefreshTokensInput>
    where?: PlatformUserWhereInput
  }

  export type PlatformUserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: PlatformUserWhereInput
    data: XOR<PlatformUserUpdateWithoutRefreshTokensInput, PlatformUserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type PlatformUserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumPlatformRoleFieldUpdateOperationsInput | $Enums.PlatformRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUpdateManyWithoutPlatformUserNestedInput
  }

  export type PlatformUserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumPlatformRoleFieldUpdateOperationsInput | $Enums.PlatformRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPlatformUserNestedInput
  }

  export type SubscriptionCreateWithoutPlanInput = {
    id?: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutSubscriptionsInput
    payments?: PaymentCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutPlanInput = {
    id?: string
    schoolId: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionCreateOrConnectWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type SubscriptionCreateManyPlanInputEnvelope = {
    data: SubscriptionCreateManyPlanInput | SubscriptionCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutPlanInput, SubscriptionUncheckedUpdateWithoutPlanInput>
    create: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutPlanInput, SubscriptionUncheckedUpdateWithoutPlanInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutPlanInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutPlanInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    schoolId?: StringFilter<"Subscription"> | string
    planId?: StringFilter<"Subscription"> | string
    status?: EnumSubStatusFilter<"Subscription"> | $Enums.SubStatus
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeFilter<"Subscription"> | Date | string
    amount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    discount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"Subscription"> | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type SchoolCreateWithoutResellerInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutSchoolInput
    commissions?: CommissionCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingCreateNestedOneWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutResellerInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSchoolInput
    commissions?: CommissionUncheckedCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricUncheckedCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingUncheckedCreateNestedOneWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutResellerInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutResellerInput, SchoolUncheckedCreateWithoutResellerInput>
  }

  export type SchoolCreateManyResellerInputEnvelope = {
    data: SchoolCreateManyResellerInput | SchoolCreateManyResellerInput[]
    skipDuplicates?: boolean
  }

  export type CommissionCreateWithoutResellerInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    school: SchoolCreateNestedOneWithoutCommissionsInput
  }

  export type CommissionUncheckedCreateWithoutResellerInput = {
    id?: string
    schoolId: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommissionCreateOrConnectWithoutResellerInput = {
    where: CommissionWhereUniqueInput
    create: XOR<CommissionCreateWithoutResellerInput, CommissionUncheckedCreateWithoutResellerInput>
  }

  export type CommissionCreateManyResellerInputEnvelope = {
    data: CommissionCreateManyResellerInput | CommissionCreateManyResellerInput[]
    skipDuplicates?: boolean
  }

  export type SchoolUpsertWithWhereUniqueWithoutResellerInput = {
    where: SchoolWhereUniqueInput
    update: XOR<SchoolUpdateWithoutResellerInput, SchoolUncheckedUpdateWithoutResellerInput>
    create: XOR<SchoolCreateWithoutResellerInput, SchoolUncheckedCreateWithoutResellerInput>
  }

  export type SchoolUpdateWithWhereUniqueWithoutResellerInput = {
    where: SchoolWhereUniqueInput
    data: XOR<SchoolUpdateWithoutResellerInput, SchoolUncheckedUpdateWithoutResellerInput>
  }

  export type SchoolUpdateManyWithWhereWithoutResellerInput = {
    where: SchoolScalarWhereInput
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyWithoutResellerInput>
  }

  export type SchoolScalarWhereInput = {
    AND?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
    OR?: SchoolScalarWhereInput[]
    NOT?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
    id?: StringFilter<"School"> | string
    name?: StringFilter<"School"> | string
    slug?: StringFilter<"School"> | string
    email?: StringFilter<"School"> | string
    phone?: StringNullableFilter<"School"> | string | null
    address?: StringNullableFilter<"School"> | string | null
    city?: StringNullableFilter<"School"> | string | null
    state?: StringNullableFilter<"School"> | string | null
    country?: StringFilter<"School"> | string
    pincode?: StringNullableFilter<"School"> | string | null
    website?: StringNullableFilter<"School"> | string | null
    logo?: StringNullableFilter<"School"> | string | null
    favicon?: StringNullableFilter<"School"> | string | null
    primaryColor?: StringFilter<"School"> | string
    secondaryColor?: StringFilter<"School"> | string
    customDomain?: StringNullableFilter<"School"> | string | null
    dbName?: StringFilter<"School"> | string
    status?: EnumSchoolStatusFilter<"School"> | $Enums.SchoolStatus
    timezone?: StringFilter<"School"> | string
    currency?: StringFilter<"School"> | string
    language?: StringFilter<"School"> | string
    resellerId?: StringNullableFilter<"School"> | string | null
    createdAt?: DateTimeFilter<"School"> | Date | string
    updatedAt?: DateTimeFilter<"School"> | Date | string
  }

  export type CommissionUpsertWithWhereUniqueWithoutResellerInput = {
    where: CommissionWhereUniqueInput
    update: XOR<CommissionUpdateWithoutResellerInput, CommissionUncheckedUpdateWithoutResellerInput>
    create: XOR<CommissionCreateWithoutResellerInput, CommissionUncheckedCreateWithoutResellerInput>
  }

  export type CommissionUpdateWithWhereUniqueWithoutResellerInput = {
    where: CommissionWhereUniqueInput
    data: XOR<CommissionUpdateWithoutResellerInput, CommissionUncheckedUpdateWithoutResellerInput>
  }

  export type CommissionUpdateManyWithWhereWithoutResellerInput = {
    where: CommissionScalarWhereInput
    data: XOR<CommissionUpdateManyMutationInput, CommissionUncheckedUpdateManyWithoutResellerInput>
  }

  export type CommissionScalarWhereInput = {
    AND?: CommissionScalarWhereInput | CommissionScalarWhereInput[]
    OR?: CommissionScalarWhereInput[]
    NOT?: CommissionScalarWhereInput | CommissionScalarWhereInput[]
    id?: StringFilter<"Commission"> | string
    resellerId?: StringFilter<"Commission"> | string
    schoolId?: StringFilter<"Commission"> | string
    amount?: DecimalFilter<"Commission"> | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFilter<"Commission"> | $Enums.CommStatus
    paidAt?: DateTimeNullableFilter<"Commission"> | Date | string | null
    createdAt?: DateTimeFilter<"Commission"> | Date | string
  }

  export type ResellerCreateWithoutCommissionsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    company?: string | null
    commissionPct?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schools?: SchoolCreateNestedManyWithoutResellerInput
  }

  export type ResellerUncheckedCreateWithoutCommissionsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    company?: string | null
    commissionPct?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schools?: SchoolUncheckedCreateNestedManyWithoutResellerInput
  }

  export type ResellerCreateOrConnectWithoutCommissionsInput = {
    where: ResellerWhereUniqueInput
    create: XOR<ResellerCreateWithoutCommissionsInput, ResellerUncheckedCreateWithoutCommissionsInput>
  }

  export type SchoolCreateWithoutCommissionsInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reseller?: ResellerCreateNestedOneWithoutSchoolsInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingCreateNestedOneWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutCommissionsInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    resellerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricUncheckedCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingUncheckedCreateNestedOneWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutCommissionsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutCommissionsInput, SchoolUncheckedCreateWithoutCommissionsInput>
  }

  export type ResellerUpsertWithoutCommissionsInput = {
    update: XOR<ResellerUpdateWithoutCommissionsInput, ResellerUncheckedUpdateWithoutCommissionsInput>
    create: XOR<ResellerCreateWithoutCommissionsInput, ResellerUncheckedCreateWithoutCommissionsInput>
    where?: ResellerWhereInput
  }

  export type ResellerUpdateToOneWithWhereWithoutCommissionsInput = {
    where?: ResellerWhereInput
    data: XOR<ResellerUpdateWithoutCommissionsInput, ResellerUncheckedUpdateWithoutCommissionsInput>
  }

  export type ResellerUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schools?: SchoolUpdateManyWithoutResellerNestedInput
  }

  export type ResellerUncheckedUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schools?: SchoolUncheckedUpdateManyWithoutResellerNestedInput
  }

  export type SchoolUpsertWithoutCommissionsInput = {
    update: XOR<SchoolUpdateWithoutCommissionsInput, SchoolUncheckedUpdateWithoutCommissionsInput>
    create: XOR<SchoolCreateWithoutCommissionsInput, SchoolUncheckedCreateWithoutCommissionsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutCommissionsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutCommissionsInput, SchoolUncheckedUpdateWithoutCommissionsInput>
  }

  export type SchoolUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reseller?: ResellerUpdateOneWithoutSchoolsNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUpdateOneWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    resellerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUncheckedUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUncheckedUpdateOneWithoutSchoolNestedInput
  }

  export type ResellerCreateWithoutSchoolsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    company?: string | null
    commissionPct?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    commissions?: CommissionCreateNestedManyWithoutResellerInput
  }

  export type ResellerUncheckedCreateWithoutSchoolsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    company?: string | null
    commissionPct?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    commissions?: CommissionUncheckedCreateNestedManyWithoutResellerInput
  }

  export type ResellerCreateOrConnectWithoutSchoolsInput = {
    where: ResellerWhereUniqueInput
    create: XOR<ResellerCreateWithoutSchoolsInput, ResellerUncheckedCreateWithoutSchoolsInput>
  }

  export type SubscriptionCreateWithoutSchoolInput = {
    id?: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: SubscriptionPlanCreateNestedOneWithoutSubscriptionsInput
    payments?: PaymentCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutSchoolInput = {
    id?: string
    planId: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionCreateOrConnectWithoutSchoolInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutSchoolInput, SubscriptionUncheckedCreateWithoutSchoolInput>
  }

  export type SubscriptionCreateManySchoolInputEnvelope = {
    data: SubscriptionCreateManySchoolInput | SubscriptionCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type CommissionCreateWithoutSchoolInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    reseller: ResellerCreateNestedOneWithoutCommissionsInput
  }

  export type CommissionUncheckedCreateWithoutSchoolInput = {
    id?: string
    resellerId: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommissionCreateOrConnectWithoutSchoolInput = {
    where: CommissionWhereUniqueInput
    create: XOR<CommissionCreateWithoutSchoolInput, CommissionUncheckedCreateWithoutSchoolInput>
  }

  export type CommissionCreateManySchoolInputEnvelope = {
    data: CommissionCreateManySchoolInput | CommissionCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type UsageMetricCreateWithoutSchoolInput = {
    id?: string
    metricDate: Date | string
    students?: number
    teachers?: number
    staff?: number
    storageUsed?: Decimal | DecimalJsLike | number | string
    apiCalls?: number
    activeUsers?: number
    createdAt?: Date | string
  }

  export type UsageMetricUncheckedCreateWithoutSchoolInput = {
    id?: string
    metricDate: Date | string
    students?: number
    teachers?: number
    staff?: number
    storageUsed?: Decimal | DecimalJsLike | number | string
    apiCalls?: number
    activeUsers?: number
    createdAt?: Date | string
  }

  export type UsageMetricCreateOrConnectWithoutSchoolInput = {
    where: UsageMetricWhereUniqueInput
    create: XOR<UsageMetricCreateWithoutSchoolInput, UsageMetricUncheckedCreateWithoutSchoolInput>
  }

  export type UsageMetricCreateManySchoolInputEnvelope = {
    data: UsageMetricCreateManySchoolInput | UsageMetricCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type SchoolSettingCreateWithoutSchoolInput = {
    id?: string
    smtpHost?: string | null
    smtpPort?: number | null
    smtpUser?: string | null
    smtpPass?: string | null
    smtpFrom?: string | null
    smsProvider?: string | null
    smsApiKey?: string | null
    whatsappApiKey?: string | null
    razorpayKeyId?: string | null
    razorpayKeySecret?: string | null
    stripePubKey?: string | null
    stripeSecretKey?: string | null
    s3Bucket?: string | null
    s3Region?: string | null
    s3AccessKey?: string | null
    s3SecretKey?: string | null
    zoomApiKey?: string | null
    zoomApiSecret?: string | null
    firebaseServerKey?: string | null
    updatedAt?: Date | string
  }

  export type SchoolSettingUncheckedCreateWithoutSchoolInput = {
    id?: string
    smtpHost?: string | null
    smtpPort?: number | null
    smtpUser?: string | null
    smtpPass?: string | null
    smtpFrom?: string | null
    smsProvider?: string | null
    smsApiKey?: string | null
    whatsappApiKey?: string | null
    razorpayKeyId?: string | null
    razorpayKeySecret?: string | null
    stripePubKey?: string | null
    stripeSecretKey?: string | null
    s3Bucket?: string | null
    s3Region?: string | null
    s3AccessKey?: string | null
    s3SecretKey?: string | null
    zoomApiKey?: string | null
    zoomApiSecret?: string | null
    firebaseServerKey?: string | null
    updatedAt?: Date | string
  }

  export type SchoolSettingCreateOrConnectWithoutSchoolInput = {
    where: SchoolSettingWhereUniqueInput
    create: XOR<SchoolSettingCreateWithoutSchoolInput, SchoolSettingUncheckedCreateWithoutSchoolInput>
  }

  export type ResellerUpsertWithoutSchoolsInput = {
    update: XOR<ResellerUpdateWithoutSchoolsInput, ResellerUncheckedUpdateWithoutSchoolsInput>
    create: XOR<ResellerCreateWithoutSchoolsInput, ResellerUncheckedCreateWithoutSchoolsInput>
    where?: ResellerWhereInput
  }

  export type ResellerUpdateToOneWithWhereWithoutSchoolsInput = {
    where?: ResellerWhereInput
    data: XOR<ResellerUpdateWithoutSchoolsInput, ResellerUncheckedUpdateWithoutSchoolsInput>
  }

  export type ResellerUpdateWithoutSchoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commissions?: CommissionUpdateManyWithoutResellerNestedInput
  }

  export type ResellerUncheckedUpdateWithoutSchoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commissions?: CommissionUncheckedUpdateManyWithoutResellerNestedInput
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutSchoolInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutSchoolInput, SubscriptionUncheckedUpdateWithoutSchoolInput>
    create: XOR<SubscriptionCreateWithoutSchoolInput, SubscriptionUncheckedCreateWithoutSchoolInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutSchoolInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutSchoolInput, SubscriptionUncheckedUpdateWithoutSchoolInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutSchoolInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutSchoolInput>
  }

  export type CommissionUpsertWithWhereUniqueWithoutSchoolInput = {
    where: CommissionWhereUniqueInput
    update: XOR<CommissionUpdateWithoutSchoolInput, CommissionUncheckedUpdateWithoutSchoolInput>
    create: XOR<CommissionCreateWithoutSchoolInput, CommissionUncheckedCreateWithoutSchoolInput>
  }

  export type CommissionUpdateWithWhereUniqueWithoutSchoolInput = {
    where: CommissionWhereUniqueInput
    data: XOR<CommissionUpdateWithoutSchoolInput, CommissionUncheckedUpdateWithoutSchoolInput>
  }

  export type CommissionUpdateManyWithWhereWithoutSchoolInput = {
    where: CommissionScalarWhereInput
    data: XOR<CommissionUpdateManyMutationInput, CommissionUncheckedUpdateManyWithoutSchoolInput>
  }

  export type UsageMetricUpsertWithWhereUniqueWithoutSchoolInput = {
    where: UsageMetricWhereUniqueInput
    update: XOR<UsageMetricUpdateWithoutSchoolInput, UsageMetricUncheckedUpdateWithoutSchoolInput>
    create: XOR<UsageMetricCreateWithoutSchoolInput, UsageMetricUncheckedCreateWithoutSchoolInput>
  }

  export type UsageMetricUpdateWithWhereUniqueWithoutSchoolInput = {
    where: UsageMetricWhereUniqueInput
    data: XOR<UsageMetricUpdateWithoutSchoolInput, UsageMetricUncheckedUpdateWithoutSchoolInput>
  }

  export type UsageMetricUpdateManyWithWhereWithoutSchoolInput = {
    where: UsageMetricScalarWhereInput
    data: XOR<UsageMetricUpdateManyMutationInput, UsageMetricUncheckedUpdateManyWithoutSchoolInput>
  }

  export type UsageMetricScalarWhereInput = {
    AND?: UsageMetricScalarWhereInput | UsageMetricScalarWhereInput[]
    OR?: UsageMetricScalarWhereInput[]
    NOT?: UsageMetricScalarWhereInput | UsageMetricScalarWhereInput[]
    id?: StringFilter<"UsageMetric"> | string
    schoolId?: StringFilter<"UsageMetric"> | string
    metricDate?: DateTimeFilter<"UsageMetric"> | Date | string
    students?: IntFilter<"UsageMetric"> | number
    teachers?: IntFilter<"UsageMetric"> | number
    staff?: IntFilter<"UsageMetric"> | number
    storageUsed?: DecimalFilter<"UsageMetric"> | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFilter<"UsageMetric"> | number
    activeUsers?: IntFilter<"UsageMetric"> | number
    createdAt?: DateTimeFilter<"UsageMetric"> | Date | string
  }

  export type SchoolSettingUpsertWithoutSchoolInput = {
    update: XOR<SchoolSettingUpdateWithoutSchoolInput, SchoolSettingUncheckedUpdateWithoutSchoolInput>
    create: XOR<SchoolSettingCreateWithoutSchoolInput, SchoolSettingUncheckedCreateWithoutSchoolInput>
    where?: SchoolSettingWhereInput
  }

  export type SchoolSettingUpdateToOneWithWhereWithoutSchoolInput = {
    where?: SchoolSettingWhereInput
    data: XOR<SchoolSettingUpdateWithoutSchoolInput, SchoolSettingUncheckedUpdateWithoutSchoolInput>
  }

  export type SchoolSettingUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPass?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
    smsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    smsApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeySecret?: NullableStringFieldUpdateOperationsInput | string | null
    stripePubKey?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3Bucket?: NullableStringFieldUpdateOperationsInput | string | null
    s3Region?: NullableStringFieldUpdateOperationsInput | string | null
    s3AccessKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3SecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseServerKey?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolSettingUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: NullableIntFieldUpdateOperationsInput | number | null
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPass?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFrom?: NullableStringFieldUpdateOperationsInput | string | null
    smsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    smsApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayKeySecret?: NullableStringFieldUpdateOperationsInput | string | null
    stripePubKey?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3Bucket?: NullableStringFieldUpdateOperationsInput | string | null
    s3Region?: NullableStringFieldUpdateOperationsInput | string | null
    s3AccessKey?: NullableStringFieldUpdateOperationsInput | string | null
    s3SecretKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    zoomApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseServerKey?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolCreateWithoutSchoolSettingsInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reseller?: ResellerCreateNestedOneWithoutSchoolsInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSchoolInput
    commissions?: CommissionCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutSchoolSettingsInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    resellerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSchoolInput
    commissions?: CommissionUncheckedCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutSchoolSettingsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutSchoolSettingsInput, SchoolUncheckedCreateWithoutSchoolSettingsInput>
  }

  export type SchoolUpsertWithoutSchoolSettingsInput = {
    update: XOR<SchoolUpdateWithoutSchoolSettingsInput, SchoolUncheckedUpdateWithoutSchoolSettingsInput>
    create: XOR<SchoolCreateWithoutSchoolSettingsInput, SchoolUncheckedCreateWithoutSchoolSettingsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutSchoolSettingsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutSchoolSettingsInput, SchoolUncheckedUpdateWithoutSchoolSettingsInput>
  }

  export type SchoolUpdateWithoutSchoolSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reseller?: ResellerUpdateOneWithoutSchoolsNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutSchoolNestedInput
    commissions?: CommissionUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutSchoolSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    resellerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSchoolNestedInput
    commissions?: CommissionUncheckedUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reseller?: ResellerCreateNestedOneWithoutSchoolsInput
    commissions?: CommissionCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingCreateNestedOneWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    resellerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    commissions?: CommissionUncheckedCreateNestedManyWithoutSchoolInput
    usageMetrics?: UsageMetricUncheckedCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingUncheckedCreateNestedOneWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutSubscriptionsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutSubscriptionsInput, SchoolUncheckedCreateWithoutSubscriptionsInput>
  }

  export type SubscriptionPlanCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    billingCycle: $Enums.BillingCycle
    trialDays?: number
    maxStudents?: number
    maxTeachers?: number
    maxStaff?: number
    storageGB?: number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionPlanUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    billingCycle: $Enums.BillingCycle
    trialDays?: number
    maxStudents?: number
    maxTeachers?: number
    maxStaff?: number
    storageGB?: number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionPlanCreateOrConnectWithoutSubscriptionsInput = {
    where: SubscriptionPlanWhereUniqueInput
    create: XOR<SubscriptionPlanCreateWithoutSubscriptionsInput, SubscriptionPlanUncheckedCreateWithoutSubscriptionsInput>
  }

  export type PaymentCreateWithoutSubscriptionInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    gateway: string
    gatewayPayId?: string | null
    status?: $Enums.PayStatus
    receiptUrl?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    gateway: string
    gatewayPayId?: string | null
    status?: $Enums.PayStatus
    receiptUrl?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput>
  }

  export type PaymentCreateManySubscriptionInputEnvelope = {
    data: PaymentCreateManySubscriptionInput | PaymentCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type SchoolUpsertWithoutSubscriptionsInput = {
    update: XOR<SchoolUpdateWithoutSubscriptionsInput, SchoolUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<SchoolCreateWithoutSubscriptionsInput, SchoolUncheckedCreateWithoutSubscriptionsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutSubscriptionsInput, SchoolUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type SchoolUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reseller?: ResellerUpdateOneWithoutSchoolsNestedInput
    commissions?: CommissionUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUpdateOneWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    resellerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commissions?: CommissionUncheckedUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUncheckedUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUncheckedUpdateOneWithoutSchoolNestedInput
  }

  export type SubscriptionPlanUpsertWithoutSubscriptionsInput = {
    update: XOR<SubscriptionPlanUpdateWithoutSubscriptionsInput, SubscriptionPlanUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<SubscriptionPlanCreateWithoutSubscriptionsInput, SubscriptionPlanUncheckedCreateWithoutSubscriptionsInput>
    where?: SubscriptionPlanWhereInput
  }

  export type SubscriptionPlanUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: SubscriptionPlanWhereInput
    data: XOR<SubscriptionPlanUpdateWithoutSubscriptionsInput, SubscriptionPlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type SubscriptionPlanUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle
    trialDays?: IntFieldUpdateOperationsInput | number
    maxStudents?: IntFieldUpdateOperationsInput | number
    maxTeachers?: IntFieldUpdateOperationsInput | number
    maxStaff?: IntFieldUpdateOperationsInput | number
    storageGB?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPlanUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    billingCycle?: EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle
    trialDays?: IntFieldUpdateOperationsInput | number
    maxStudents?: IntFieldUpdateOperationsInput | number
    maxTeachers?: IntFieldUpdateOperationsInput | number
    maxStaff?: IntFieldUpdateOperationsInput | number
    storageGB?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutSubscriptionInput, PaymentUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutSubscriptionInput, PaymentUncheckedUpdateWithoutSubscriptionInput>
  }

  export type PaymentUpdateManyWithWhereWithoutSubscriptionInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    subscriptionId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    gateway?: StringFilter<"Payment"> | string
    gatewayPayId?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPayStatusFilter<"Payment"> | $Enums.PayStatus
    receiptUrl?: StringNullableFilter<"Payment"> | string | null
    metadata?: JsonFilter<"Payment">
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type SubscriptionCreateWithoutPaymentsInput = {
    id?: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutSubscriptionsInput
    plan: SubscriptionPlanCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutPaymentsInput = {
    id?: string
    schoolId: string
    planId: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutPaymentsInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
  }

  export type SubscriptionUpsertWithoutPaymentsInput = {
    update: XOR<SubscriptionUpdateWithoutPaymentsInput, SubscriptionUncheckedUpdateWithoutPaymentsInput>
    create: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutPaymentsInput, SubscriptionUncheckedUpdateWithoutPaymentsInput>
  }

  export type SubscriptionUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutSubscriptionsNestedInput
    plan?: SubscriptionPlanUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolCreateWithoutUsageMetricsInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reseller?: ResellerCreateNestedOneWithoutSchoolsInput
    subscriptions?: SubscriptionCreateNestedManyWithoutSchoolInput
    commissions?: CommissionCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingCreateNestedOneWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutUsageMetricsInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    resellerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutSchoolInput
    commissions?: CommissionUncheckedCreateNestedManyWithoutSchoolInput
    schoolSettings?: SchoolSettingUncheckedCreateNestedOneWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutUsageMetricsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutUsageMetricsInput, SchoolUncheckedCreateWithoutUsageMetricsInput>
  }

  export type SchoolUpsertWithoutUsageMetricsInput = {
    update: XOR<SchoolUpdateWithoutUsageMetricsInput, SchoolUncheckedUpdateWithoutUsageMetricsInput>
    create: XOR<SchoolCreateWithoutUsageMetricsInput, SchoolUncheckedCreateWithoutUsageMetricsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutUsageMetricsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutUsageMetricsInput, SchoolUncheckedUpdateWithoutUsageMetricsInput>
  }

  export type SchoolUpdateWithoutUsageMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reseller?: ResellerUpdateOneWithoutSchoolsNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutSchoolNestedInput
    commissions?: CommissionUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUpdateOneWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutUsageMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    resellerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSchoolNestedInput
    commissions?: CommissionUncheckedUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUncheckedUpdateOneWithoutSchoolNestedInput
  }

  export type PlatformUserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.PlatformRole
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutPlatformUserInput
  }

  export type PlatformUserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.PlatformRole
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutPlatformUserInput
  }

  export type PlatformUserCreateOrConnectWithoutAuditLogsInput = {
    where: PlatformUserWhereUniqueInput
    create: XOR<PlatformUserCreateWithoutAuditLogsInput, PlatformUserUncheckedCreateWithoutAuditLogsInput>
  }

  export type PlatformUserUpsertWithoutAuditLogsInput = {
    update: XOR<PlatformUserUpdateWithoutAuditLogsInput, PlatformUserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<PlatformUserCreateWithoutAuditLogsInput, PlatformUserUncheckedCreateWithoutAuditLogsInput>
    where?: PlatformUserWhereInput
  }

  export type PlatformUserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: PlatformUserWhereInput
    data: XOR<PlatformUserUpdateWithoutAuditLogsInput, PlatformUserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type PlatformUserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumPlatformRoleFieldUpdateOperationsInput | $Enums.PlatformRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutPlatformUserNestedInput
  }

  export type PlatformUserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumPlatformRoleFieldUpdateOperationsInput | $Enums.PlatformRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutPlatformUserNestedInput
  }

  export type AuditLogCreateManyPlatformUserInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateManyPlatformUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    isRevoked?: boolean
    createdAt?: Date | string
  }

  export type AuditLogUpdateWithoutPlatformUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutPlatformUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutPlatformUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUpdateWithoutPlatformUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutPlatformUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutPlatformUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyPlanInput = {
    id?: string
    schoolId: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutSubscriptionsNestedInput
    payments?: PaymentUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolCreateManyResellerInput = {
    id?: string
    name: string
    slug: string
    email: string
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string
    pincode?: string | null
    website?: string | null
    logo?: string | null
    favicon?: string | null
    primaryColor?: string
    secondaryColor?: string
    customDomain?: string | null
    dbName: string
    status?: $Enums.SchoolStatus
    timezone?: string
    currency?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommissionCreateManyResellerInput = {
    id?: string
    schoolId: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SchoolUpdateWithoutResellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutSchoolNestedInput
    commissions?: CommissionUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUpdateOneWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutResellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutSchoolNestedInput
    commissions?: CommissionUncheckedUpdateManyWithoutSchoolNestedInput
    usageMetrics?: UsageMetricUncheckedUpdateManyWithoutSchoolNestedInput
    schoolSettings?: SchoolSettingUncheckedUpdateOneWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateManyWithoutResellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    favicon?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    dbName?: StringFieldUpdateOperationsInput | string
    status?: EnumSchoolStatusFieldUpdateOperationsInput | $Enums.SchoolStatus
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionUpdateWithoutResellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutCommissionsNestedInput
  }

  export type CommissionUncheckedUpdateWithoutResellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionUncheckedUpdateManyWithoutResellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManySchoolInput = {
    id?: string
    planId: string
    status?: $Enums.SubStatus
    startDate: Date | string
    endDate: Date | string
    amount: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommissionCreateManySchoolInput = {
    id?: string
    resellerId: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.CommStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UsageMetricCreateManySchoolInput = {
    id?: string
    metricDate: Date | string
    students?: number
    teachers?: number
    staff?: number
    storageUsed?: Decimal | DecimalJsLike | number | string
    apiCalls?: number
    activeUsers?: number
    createdAt?: Date | string
  }

  export type SubscriptionUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: SubscriptionPlanUpdateOneRequiredWithoutSubscriptionsNestedInput
    payments?: PaymentUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubStatusFieldUpdateOperationsInput | $Enums.SubStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reseller?: ResellerUpdateOneRequiredWithoutCommissionsNestedInput
  }

  export type CommissionUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    resellerId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    resellerId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumCommStatusFieldUpdateOperationsInput | $Enums.CommStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMetricUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricDate?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: IntFieldUpdateOperationsInput | number
    teachers?: IntFieldUpdateOperationsInput | number
    staff?: IntFieldUpdateOperationsInput | number
    storageUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMetricUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricDate?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: IntFieldUpdateOperationsInput | number
    teachers?: IntFieldUpdateOperationsInput | number
    staff?: IntFieldUpdateOperationsInput | number
    storageUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMetricUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricDate?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: IntFieldUpdateOperationsInput | number
    teachers?: IntFieldUpdateOperationsInput | number
    staff?: IntFieldUpdateOperationsInput | number
    storageUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apiCalls?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManySubscriptionInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    gateway: string
    gatewayPayId?: string | null
    status?: $Enums.PayStatus
    receiptUrl?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    gateway?: StringFieldUpdateOperationsInput | string
    gatewayPayId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPayStatusFieldUpdateOperationsInput | $Enums.PayStatus
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    gateway?: StringFieldUpdateOperationsInput | string
    gatewayPayId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPayStatusFieldUpdateOperationsInput | $Enums.PayStatus
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    gateway?: StringFieldUpdateOperationsInput | string
    gatewayPayId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPayStatusFieldUpdateOperationsInput | $Enums.PayStatus
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PlatformUserCountOutputTypeDefaultArgs instead
     */
    export type PlatformUserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlatformUserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubscriptionPlanCountOutputTypeDefaultArgs instead
     */
    export type SubscriptionPlanCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubscriptionPlanCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ResellerCountOutputTypeDefaultArgs instead
     */
    export type ResellerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ResellerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SchoolCountOutputTypeDefaultArgs instead
     */
    export type SchoolCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchoolCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubscriptionCountOutputTypeDefaultArgs instead
     */
    export type SubscriptionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlatformUserDefaultArgs instead
     */
    export type PlatformUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlatformUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RefreshTokenDefaultArgs instead
     */
    export type RefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RefreshTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubscriptionPlanDefaultArgs instead
     */
    export type SubscriptionPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubscriptionPlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ResellerDefaultArgs instead
     */
    export type ResellerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ResellerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommissionDefaultArgs instead
     */
    export type CommissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SchoolDefaultArgs instead
     */
    export type SchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchoolDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SchoolSettingDefaultArgs instead
     */
    export type SchoolSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchoolSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubscriptionDefaultArgs instead
     */
    export type SubscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubscriptionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsageMetricDefaultArgs instead
     */
    export type UsageMetricArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsageMetricDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemSettingDefaultArgs instead
     */
    export type SystemSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemSettingDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}