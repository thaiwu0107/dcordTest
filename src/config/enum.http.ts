export enum HttpStatusCode {

    /**
     * 成功
     * @constant
     */
    STATUS_OK = 1,

    // 9xxx 錯誤資訊 ==========================

    /**
     * Mock還未實作的資料
     * @constant
     */
    Mock_Data = 9999,
    /**
     * Server失敗沒有明確定義
     * @constant
     */
    STATUS_FAIL = 9001,

    // 8xxx 警告資訊 ==========================

    /**
     * 沒有找到任何資料
     * @constant
     */
    STATUS_NO_MATCH_DATA = 8001,
    /**
     * 驗證不成功
     * @constant
     */
    STATUS_NOT_AUTHORIZED = 8002,
    /**
     * 使用者不存在
     * @constant
     */
    STATUS_USER_NOT_EXIST = 8003,
    /**
     * 使用者被鎖
     * @constant
     */
    STATUS_USER_LOCKED = 8004,
    /**
     * 密碼錯誤
     * @constant
     */
    STATUS_INCORRECT_PASSWORD = 8005,
    /**
     * 操作達上限
     * @constant
     */
    STATUS_SUPERVISOR_LIMIT_EXCEEDED = 8006,
    /**
     * 重複登入(已經在線上)
     * @constant
     */
    PLAYER_ONLINE = 8007,
    /**
     * 玩家點數不足
     * @constant
     */
    PLAYER_POINT_NOTENOUGH = 8008,
    /**
     * 密碼輸入錯誤次數已達上限
     * @constant
     */
    STATUS_PASSWORD_FAILED_LIMIT_EXCEEDED = 8009,
    /**
     * 沒有對應到任何員工組群
     * @constant
     */
    STATUS_NO_MAPPING_OPERATORGROUPS = 8010,
    /**
     * 交易失敗
     * @constant
     */
    STATUS_TRANSACTION_FAILS = 8011,
    /**
     * 沒有對應到任何功能群組
     * @constant
     */
    STATUS_NO_MAPPING_GROUPS = 8012,
    /**
     * 玩家被鎖卡
     * @constant
     */
    PLAYER_CARD_LOCKED = 8013,
    /**
     * 卡片量已達上限
     * @constant
     */
    PLAYER_CARD_LIMITED = 8014,
    /**
     * 班別已存在
     * @constant
     */
    STATUS_SESSION_EXIST = 8015,
    /**
     * capital請求未全部完成
     * @constant
     */
    VAULT_CAPITAL_UNFINISHED = 8016,
    /**
     * 會員ID已經存在
     * @constant
     */
    PATRON_MEMBERID_EXIST = 8017,
    /**
     * 沒有這個Operator
     * @constant
     */
    STATUS_NO_MAPPING_OPERATOR = 8018,
    /**
     * 班別不存在
     * @constant
     */
    STATUS_SESSION_NOT_EXIST = 8019,
    /**
     * Operator已經存在
     * @constant
     */
    STATUS_OPERATOR_EXIST = 8020,
    /**
     * 沒有對應到任何OpCard
     * @constant
     */
    STATUS_NO_MAPPING_OPCARD = 8021,
    /**
     * MagneticStripe長度錯誤
     * @constant
     */
    STATUS_MAGNETIC_STRIPE_SIZE_ERROR = 8022,
    /**
     * CardSerial長度錯誤
     * @constant
     */
    STATUS_CARD_SERIAL_SIZE_ERROR = 8023,
    /**
     * 禮物不存在
     * @constant
     */
    STATUS_GIFT_NOT_EXIST = 8024,
    /**
     * 工作站已經存在
     * @constant
     */
    STATUS_WORKSTATION_EXIST = 8025,
    /**
     * 工作站不存在
     * @constant
     */
    STATUS_WORKSTATION_NOT_EXIST = 8026,
    /**
     * 參數不存在
     * @constant
     */
    STATUS_PARAMETER_NOT_EXIST = 8027,
    /**
     * 帳務日修改不可一樣
     * @constant
     */
    STATUS_ACCOUNTING_DATE_IS_SAME = 8028,
    /**
     * 權限不存在
     * @constant
     */
    STATUS_PRIVILEGE_NOT_EXIST = 8029,
    /**
     * 群組名稱已存在
     * @constant
     */
    STATUS_GROUP_NAME_EXIST = 8030,
    /**
     * Section已存在
     * @constant
     */
    STATUS_SECTION_EXIST = 8031,
    /**
     * Section不存在
     * @constant
     */
    STATUS_SECTION_NOT_EXIST = 8032,
    /**
     * PlayerCountGroup 不存在
     * @constant
     */
    STATUS_PLAYER_COUNT_GROUP_NOT_EXIST = 8033,
    /**
     * msConfig 不存在
     * @constant
     */
    STATUS_MS_CONFIG_NOT_EXIST = 8034,
    /**
     * 班別已關班
     * @constant
     */
    STATUS_SESSION_IS_CLOSED = 8035,
    /**
     * 班別已開班
     * @constant
     */
    STATUS_SESSION_IS_OPENING = 8036,
    /**
     * 更新 Section MaxCardNum fail
     * @constant
     */
    UPDATE_SECTION_MAX_CARD_NUMBER_FAIL = 8037,
    /**
     * 今日上限超過
     * @constant
     */
    LIMIT_EXCEEDED = 8038,
    /**
     * PORCEDURE報錯警告
     * @constant
     */
    PORCEDURE_WARN = 8039,
    /**
     * ExpireDate過期
     * @constant
     */
    EXPIREDATE_EXPIRED = 8040,
    /**
     * LOYALTY_CREDIT_BLOCKED
     * @constant
     */
    LOYALTY_CREDIT_BLOCKED = 8041,
    /**
     * 密碼過期
     * @constant
     */
    PASSWORD_EXPIRED = 8042,
    /**
     * BetCoupon_Config不存在
     * @constant
     */
    BET_COUPON_CONFIG_NOT_EXIST = 8043,
    /**
     * STATUS_INCORRECT_PASSWORD_LIMIT_EXCEEDED
     * @constant
     */
    STATUS_INCORRECT_PASSWORD_LIMIT_EXCEEDED = 8044,
    /**
     * 需要密碼操作
     * @constant
     */
    STATUS_NEED_PASSWORD = 8045,
    /**
     * 權限不足夠
     * @constant
     */
    STATUS_PRIVILEGE_NOT_ENOUGH = 8046,
    /**
     * LOYALTY_CREDIT_NOT_ENOUGH
     * @constant
     */
    LOYALTY_CREDIT_NOT_ENOUGH = 8047,
    /**
     * 需要不同操作者
     * @constant
     */
    NEED_OTHER_OPERSTOR = 8048,
    /**
     * NEED_EXPIRED_DAY_LATER_THAN_BEFORE
     * @constant
     */
    NEED_EXPIRED_DAY_LATER_THAN_BEFORE = 8049,
    /**
     * NO_EXCHANGE_TIME
     * @constant
     */
    NO_EXCHANGE_TIME = 8050,
    /**
     * PLAYER_IS_ONLINE
     * @constant
     */
    PLAYER_IS_ONLINE = 8051,
    /**
     * CARD_ONLINE
     * @constant
     */
    CARD_ONLINE = 8052,
    /**
     * NEGATIVE_BONUS
     * @constant
     */
    NEGATIVE_BONUS = 8053,
    /**
     * FAIL_UNDEFINED
     * @constant
     */
    FAIL_UNDEFINED = 8054,
    /**
     * FAIL_MEMBER_CARD_IN
     * @constant
     */
    FAIL_MEMBER_CARD_IN = 8055,
    /**
     * FAIL_BINGO_BETCOUPON_DISABLED
     * @constant
     */
    FAIL_BINGO_BETCOUPON_DISABLED = 8056,
    /**
     * FAIL_POSDEALPIECE_SMALL_THAN_ZERMO
     * @constant
     */
    FAIL_POSDEALPIECE_SMALL_THAN_ZERMO = 8057,
    /**
     * FAIL_UNDEFINED_BEHAVIOR
     * @constant
     */
    FAIL_UNDEFINED_BEHAVIOR = 8058,
    /**
     * FAIL_TRANS_ROLL_BACK
     * @constant
     */
    FAIL_TRANS_ROLL_BACK = 8059,
    /**
     *  STATUS_HANDPAY_HAVE_BEEN_CONFIRMED
     * @constant
     */
    STATUS_HANDPAY_HAVE_BEEN_CONFIRMED = 8060,
    /**
     *  STATUS_HANDPAY_FEATURE_TIME
     * @constant
     */
    STATUS_HANDPAY_FEATURE_TIME = 8061,
    /**
     *  請檢查權限設定值
     * @constant
     */
    STATUS_PRIVILEGE_CHECK_VALUE = 8062,
    /**
     *  PARAMETER_MISSING
     * @constant
     */
    PARAMETER_MISSING = 8063,
    /**
     *  PARAMETER_FORMAT_ERROR
     * @constant
     */
    PARAMETER_FORMAT_ERROR = 8064,
    /**
     *  TKT_TXN_INVALID_STATE
     * @constant
     */
    TKT_TXN_INVALID_STATE = 8065,
    /**
     *  TKT_EXPIRE
     * @constant
     */
    TKT_EXPIRE = 8066,
    /**
     *  TKT_TXN_OVER_LIMIT
     * @constant
     */
    TKT_TXN_OVER_LIMIT = 8067,
    /**
     *  TKT_TXN_NO_AUTH
     * @constant
     */
    TKT_TXN_NO_AUTH = 8068,
    /**
     *  會員帳號停用
     * @constant
     */
    STATUS_MEMBER_ACCOUNT_FREEZEN = 8069,
    /**
     *  超過帳號單日次數上限
     * @constant
     */
    STATUS_CASHLESS_EXCEED_DAILY_TIME_LIMIT = 8070,
    /**
     *  超過帳號單日金額上限
     * @constant
     */
    STATUS_CASHLESS_EXCEED_DAILY_AMOUNT_LIMIT = 8071,
    /**
     *  超過班別可處理金額上限
     * @constant
     */
    STATUS_CASHLESS_EXCEED_SESSION_AMOUNT_LIMIT = 8072,
    /**
     *  帳戶餘額不足
     * @constant
     */
    STATUS_CASHLESS_REMAINING_IS_NEGATIVE = 8073,
    /**
     *  STATUS_CASHLESS_RESOLVE_PENDING_FAIL
     * @constant
     */
    STATUS_CASHLESS_RESOLVE_PENDING_FAIL = 8074,
    /**
     *  NO_DIPLICATE
     * @constant
     */
    NO_DIPLICATE = 0
}
