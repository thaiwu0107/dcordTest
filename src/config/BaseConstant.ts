export enum BaseConstant {
    /**
     * Format DB DateTime
     * @constant
     */
    DB_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS',
    /**
     * Format DateTime
     * @constant
     */
    DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss',
    /**
     * Format PDF DateTime
     * @constant
     */
    PDF_HOURS_TIME_FORMAT = 'YYYY-MM-DD-HH',
    /**
     * Unix Millisecond Timestamp
     * @constant
     */
    PDF_TIME_FORMAT = 'x',
    /**
     * Format Birthday Time
     * @constant
     */
    BIRTHDAY_TIME_FORMAT = 'YYYY-MM-DD',
    DB_PASSWORD_KEY = 'T2T0E1H8S0A1T0I1',

    OPCARD_MAGIC_NUMBER = 1397,
    OPCARD_MAGIC_PAIR_NUMBER = 53,
    OPCARD_PRINTER_HEAD_EMPTY = ';',
    OPCARD_LONG_PRINTER_MAGICSTRING1 = '00',
    OPCARD_LONG_PRINTER_MAGICSTRING2 = ':',
    OPCARD_PRINTER_AFTER9END = '?',
    OPCARD_PRINTER_SHORTEND = '?',
    OPCARD_PRINTER_BE10END = ':?',
    OPCARD_PRINTER_BE11END = ';?',
    OPCARD_PRINTER_BE12END = '<?',
    OPCARD_PRINTER_BE13END = '=?',
    OPCARD_PRINTER_BE14END = '>?',

    // tslint:disable-next-line:max-line-length
    NO_IMAGE = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    AES_128_ECB_KEY = 'T2T0E1H8S0A1T0I1',
    AES_CLEAR_ENCODING = 'utf8',
    AES_CIPHER_ENCODING = 'hex',
    AES_CIPHER = 'aes-128-ecb',
    AES_CIPHER_IV = ''
}
