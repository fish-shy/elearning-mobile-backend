"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, res, next) => {
        const errors = [];
        for (const [field, rules] of Object.entries(schema)) {
            const value = req.body[field];
            if (rules.required && (value === undefined || value === null || value === '')) {
                errors.push(`${field} is required`);
                continue;
            }
            if (value !== undefined && value !== null) {
                if (rules.type && typeof value !== rules.type) {
                    if (!(rules.type === 'array' && Array.isArray(value))) {
                        errors.push(`${field} must be a ${rules.type}`);
                    }
                }
                if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
                    errors.push(`${field} must be at least ${rules.minLength} characters`);
                }
                if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
                    errors.push(`${field} must be at most ${rules.maxLength} characters`);
                }
                if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
                    errors.push(`${field} has invalid format`);
                }
            }
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        next();
    };
};
exports.validateBody = validateBody;
const validateParams = (params) => {
    return (req, res, next) => {
        const errors = [];
        for (const param of params) {
            if (!req.params[param]) {
                errors.push(`${param} parameter is required`);
            }
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        next();
    };
};
exports.validateParams = validateParams;
