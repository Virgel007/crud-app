// Перечисления для контроллеров
export enum ControllerEnum {
    USER_CONTROLLER = 'UserController',
    CONTACT_CONTROLLER = 'ContactController',
    ID_CONTROLLER = 'IdController',
}

// Перечисления для сервисов
export enum ServiceEnum {
    USER_SERVICE = 'UserService',
    CONTACT_SERVICE = 'ContactService',
}

// Общие статусы или действия
export enum ActionEnum {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
    ERROR = 'error',
}

export enum StatusEnum {
    OK = 'ok',
    BAD_REQUEST = 'bad_request',
    ERROR = 'error',
    NOT_FOUND = 'not_found',
    FOUND = 'found',
}

export enum ValidationEnum {
    NAME = 'name',
    EMAIL = 'email',
    PHONE_DB = 'phoneDB',
    ID = 'id',
    MESSAGE = 'message',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    PHONE = 'phone',
}