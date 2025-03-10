import {ControllerEnum, StatusEnum, ActionEnum, ServiceEnum, ValidationEnum} from './enums';
import {logger} from './logger';
import { User } from '../models/user';
import mongoose from "mongoose";

export class Validator {


    static validateAttribute(attribute: any, type: any): any | null {
        switch (type) {
            case ControllerEnum.ID_CONTROLLER:
                return this.idValidator(attribute, type);
            case ControllerEnum.USER_CONTROLLER:
                return this.userValidator(attribute, type);
            case ServiceEnum.USER_SERVICE:
                return this.serviceUserValidator(attribute, type);
            case ValidationEnum.PHONE_DB:
                return this.phoneValidator(attribute, type);
            case ValidationEnum.PHONE:
                return this.isPhoneNumberValid(attribute, type);
            default:
                logger.logError('Validator', 'validateAttribute', `Validation failed: Unrecognized type ${type}.`, null);
                return StatusEnum.BAD_REQUEST;
        }
    }

    private static userValidator(attribute: any, type: ControllerEnum.USER_CONTROLLER): any | null {
        if (attribute === null || attribute === undefined || attribute === '') {
            logger.logError('Validator', 'userValidator', `Controller validation failed for type ${type}: Attribute is null, undefined, or empty.`, null);
            return StatusEnum.BAD_REQUEST;
        }

        if (typeof attribute !== 'string') {
            logger.logError('Validator', 'userValidator', `Controller validation failed for type ${type}: Attribute must be a string.`, null);
            return StatusEnum.BAD_REQUEST;
        }

        if (attribute.trim().length < 3 || attribute.trim().length > 30) {
            logger.logError('Validator', 'userValidator', `Controller validation failed for type ${type}: Attribute must have length between 3 and 30 after trimming.`, null);
            return StatusEnum.BAD_REQUEST;
        }


        if (!this.isNameValid(attribute, type)) {
            logger.logError('Validator', 'userValidator', `Controller validation failed for type ${type}: Attribute is not a valid name or phone number.`, null);
            return StatusEnum.BAD_REQUEST;
        }

        logger.logInfo('Validator', 'userValidator', `Controller validation succeeded for type ${type}: Attribute is valid.`);
        return StatusEnum.OK;
    }


    private static idValidator(attribute: any, type: any): any | null {
        if (attribute === null || attribute === undefined || attribute === '') {
            logger.logError('Validator', 'idValidator', `Controller validation failed for type ${type}: Attribute is null, undefined, or empty.`, null);
            return StatusEnum.BAD_REQUEST;
        }

        if (typeof attribute !== 'string' || !mongoose.Types.ObjectId.isValid(attribute)) {
            logger.logError('Validator', 'idValidator', `Controller validation failed for type ${type}: Attribute must be a valid ObjectId.`, null);
            return StatusEnum.BAD_REQUEST;
        }

        logger.logInfo('Validator', 'idValidator', `Controller validation succeeded for type ${type}: Attribute is valid.`);
        return StatusEnum.OK;
    }

    private static isNameValid(str: string, type: any): boolean {
        const regex = /^[a-zA-Z\u0400-\u04FF\u0410-\u042F]+$/;
        if (!regex.test(str)) {
            logger.logError('Validator', 'isNameValid', `Controller validation failed for type ${type}: Attribute is not a valid name.`, null);
            return false;
        }

        return true;
    }

    private static isPhoneNumberValid(phone: string, type: any): StatusEnum {
        if (phone.length < 10) {
            logger.logError('Validator', 'isPhoneNumberValid', `Controller validation failed for type ${type}: Attribute must have length at least 10.`, null);
            return StatusEnum.BAD_REQUEST;
        }

        const regex = /^\+?\d{1,3}?\s?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        const cleanPhone = phone.replace(/[\s\(\)\-]/g, '');
        if (!regex.test(cleanPhone)) {
            logger.logError('Validator', 'isPhoneNumberValid', `Controller validation failed for type ${type}: Attribute is not a valid phone number.`, null);
            return StatusEnum.BAD_REQUEST;
        }

        if (cleanPhone[0] !== '+' && !/^\d{10}$/.test(cleanPhone)) {
            logger.logError('Validator', 'isPhoneNumberValid', `Controller validation failed for type ${type}: Attribute must have format "+XXXXXXXXXXX" or "XXXXXXXXXX".`, null);
            return StatusEnum.BAD_REQUEST;
        }

        logger.logInfo('Validator', 'isPhoneNumberValid', `Controller validation succeeded for type ${type}: Attribute is valid.`);
        return StatusEnum.OK;
    }

    private static async serviceUserValidator(attribute: any, type: any) {
        if (!mongoose.Types.ObjectId.isValid(attribute)) {
            logger.logError('Validator', 'serviceUserValidator', `Service validation failed for type ${type}: Attribute is not a valid ObjectId.`, null);
            return StatusEnum.BAD_REQUEST;
        }

        const user = await User.findById(attribute);
        if (!user) {
            logger.logError('Validator', 'serviceUserValidator', `Service validation failed for type ${type}: User not found.`, null);
            return StatusEnum.NOT_FOUND;
        }

        logger.logInfo('Validator', 'serviceUserValidator', `Service validation succeeded for type ${type}: Attribute is valid.`);
        return StatusEnum.OK;
    }

    private static async phoneValidator(attribute: any, type: any) {
        const userPhone = await User.findOne({phone: attribute});
        if (!userPhone) {
            logger.logInfo('Validator', 'phoneValidator', `Service validation succeeded for type ${type}: Attribute is valid.`);
            return StatusEnum.NOT_FOUND;
        }

        logger.logError('Validator', 'phoneValidator', `Service validation failed for type ${type}: User with such phone number already exists, this is an error.`, null);
        return StatusEnum.FOUND;
    }
}