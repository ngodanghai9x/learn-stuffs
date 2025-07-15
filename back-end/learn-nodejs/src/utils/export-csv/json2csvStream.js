const { Readable } = require('stream');
const { Parser } = require('json2csv');
const os = require('os');

const _parseName = (fileName) => {
    const trimmedName = typeof fileName === 'string' ? fileName.toString().trim() : '';

    const defaultName = `${Date.now()}.csv`;
    const vFileName = trimmedName || defaultName;
    const isWithCSV = vFileName.endsWith('.csv');

    return isWithCSV ? vFileName : `${vFileName}.csv`;
};

const _validateOptions = (opts) => {
    const { header, getRecords, fileName, stopOnError } = Object.assign({}, opts);

    if (!header || !Array.isArray(header) || !header.length) {
        throw new Error('Header is required and must be an array.');
    }

    if (!getRecords || typeof getRecords !== 'function') {
        throw new Error('getRecords is required ans must be a function');
    }

    const vFileName = _parseName(fileName);

    return {
        header,
        getRecords,
        fileName: vFileName,
        stopOnError: !!stopOnError,
    };
};

const _getHeaderText = (fields) => {
    const parser = new Parser({ fields, header: true });

    return parser.parse([]);
};

const _getRowText = (fields, data) => {
    const parser = new Parser({ fields, header: false });

    return parser.parse(data);
};

class MyFileStreaming extends Readable {
    constructor(opt) {
        const options = opt.options;
        delete opt.options;
        super(opt);

        this._options = _validateOptions(options);
        this._index = 0;
        this._page = 0;
        this._lastId = null;
        this.fileName = this._options.fileName;
    }

    _increaseIndex() {
        this._index = this._index + 1;
    }

    _increasePage() {
        this._page = this._page + 1;
    }

    _setLastId(newLastId = null) {
        this._lastId = newLastId;
    }

    _pushRow(text) {
        this._increaseIndex();

        if (!text) return this.push(null);

        const str = String(text);
        const row = str + os.EOL;
        const buffer = Buffer.from(row, 'utf8');

        return this.push(buffer);
    }

    _addRecords(records) {
        const { header } = this._options;

        const vRecords = Array.isArray(records) ? records : [records];
        const filteredRecords = vRecords.filter((record) => typeof record === 'object');

        if (!filteredRecords.length) return true;

        filteredRecords.forEach((record) => {
            const text = _getRowText(header, record);
            this._pushRow(text);
        });

        return true;
    }

    _readHeader() {
        const { header } = this._options;
        const text = _getHeaderText(header);
        this._pushRow(text);

        return true;
    }

    async _deepGetRecords() {
        const { getRecords } = this._options;

        try {
            const result = await getRecords(this._lastId, this._page, this._index);

            if (!result || typeof result !== 'object') {
                return null;
            }

            const { data, lastId } = result;

            this._setLastId(lastId);

            if (!data || data.length > 0) return result;

            return this._deepGetRecords();
        } catch (e) {
            if (this._options.stopOnError) {
                this._pushRow(`STOP STREAMING BECAUSE OF ERROR: ${e.message}`);

                return null;
            }

            throw e;
        }
    }

    async _readRow() {
        const result = await this._deepGetRecords();

        if (!result || typeof result !== 'object') {
            return this.push(null);
        }

        const { data, lastId } = result;
        this._setLastId(lastId);

        if (!data) {
            return this.push(null);
        }

        this._addRecords(data);

        return true;
    }

    _read(size) {
        if (this._index <= 0) {
            return this._readHeader();
        }

        this._increasePage();

        return this._readRow();
    }
}

const _create = (options) =>
    class _MyFileStreaming extends Readable {
        constructor(opt) {
            super(opt);

            this._options = _validateOptions(options);
            this._index = 0;
            this._page = 0;
            this._lastId = null;
            this.fileName = this._options.fileName;
        }

        _increaseIndex() {
            this._index = this._index + 1;
        }

        _increasePage() {
            this._page = this._page + 1;
        }

        _setLastId(newLastId = null) {
            this._lastId = newLastId;
        }

        _pushRow(text) {
            this._increaseIndex();

            if (!text) return this.push(null);

            const str = String(text);
            const row = str + os.EOL;
            const buffer = Buffer.from(row, 'utf8');

            return this.push(buffer);
        }

        _addRecords(records) {
            const { header } = this._options;

            const vRecords = Array.isArray(records) ? records : [records];
            const filteredRecords = vRecords.filter((record) => typeof record === 'object');

            if (!filteredRecords.length) return true;

            filteredRecords.forEach((record) => {
                const text = _getRowText(header, record);
                this._pushRow(text);
            });

            return true;
        }

        _readHeader() {
            const { header } = this._options;
            const text = _getHeaderText(header);
            this._pushRow(text);

            return true;
        }

        async _deepGetRecords() {
            const { getRecords } = this._options;

            try {
                const result = await getRecords(this._lastId, this._page, this._index);

                if (!result || typeof result !== 'object') {
                    return null;
                }

                const { data, lastId } = result;

                this._setLastId(lastId);

                if (!data || data.length > 0) return result;

                return this._deepGetRecords();
            } catch (e) {
                if (this._options.stopOnError) {
                    this._pushRow(`STOP STREAMING BECAUSE OF ERROR: ${e.message}`);

                    return null;
                }

                throw e;
            }
        }

        async _readRow() {
            const result = await this._deepGetRecords();

            if (!result || typeof result !== 'object') {
                return this.push(null);
            }

            const { data, lastId } = result;
            this._setLastId(lastId);

            if (!data) {
                return this.push(null);
            }

            this._addRecords(data);

            return true;
        }

        _read(size) {
            if (this._index <= 0) {
                return this._readHeader();
            }

            this._increasePage();

            return this._readRow();
        }
    };

const test = (options) => {
    const _MyFileStreaming = _create(options);

    const instance1 = new _MyFileStreaming();
    console.log('🚀 ~ instance1:', instance1);
    const instance2 = new MyFileStreaming({ options });

    console.log('🚀 ~ instance2:', instance2);
    return instance1;
};

test({
    header: [
        {
            label: 'ID',
            value: 'order.id',
        },
        {
            label: 'Order Code',
            value: 'order.code',
        },
    ],
    getRecords: async (lastId, page, index) => {
        try {
            return {
                data: [],
                lastId: page + 100000,
            };
        } catch (error) {
            throw error;
        }
    },
    fileName: 'fileName123.csv',
});

module.exports = test;
