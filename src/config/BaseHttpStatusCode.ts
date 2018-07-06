export enum BaseHttpStatusCode {

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
     * PROCEDURE報錯警告
     * @constant
     */
    PROCEDURE_WARN = 8039
}
