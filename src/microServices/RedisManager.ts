import * as fs from 'fs';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as path from 'path';
import 'reflect-metadata';
import { promisify } from 'util';
import { LibsExceptions } from '../models/LibsExceptions';
import { GamaHttpStatusCode } from './../config/GamaHttpStatusCode';

const _log = log4js.getLogger('RedisManger');
export default class RedisManger {
}
