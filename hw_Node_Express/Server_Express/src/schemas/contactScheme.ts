// import Ajv, { Schema } from 'ajv';
// import { logger } from '../middleware/loggerMiddleware';

// const ajv = new Ajv();

// const contactSchema = {
//     "$schema": "http://json-schema.org/draft-04/schema#",
//     "type": "object",
//     "properties": {
//         "id": {
//             "type": "integer"
//         },
//         "first_name": {
//             "type": "string"
//         },
//         "last_name": {
//             "type": "string"
//         },
//         "phone": {
//             "type": "string"
//         },
//         "email": {
//             "type": "string"
//         }
//     },
//     "required": [
//         "id",
//         "first_name",
//         "last_name",
//         "phone",
//         "email"
//     ]
// };


// function validateData(schema: Schema, data: any) {
//     const validate = ajv.compile(schema);
//     const valid = validate(data);
//     if (!valid) {
//       logger.error(validate.errors);
//       throw new Error('Ошибка проверки данных');
//     }
//   }

// export { contactSchema, validateData };
