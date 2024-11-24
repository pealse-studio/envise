import { readFileSync } from 'fs';

class Envise {
    #variables;
    
    constructor(envPath = process.cwd() + '/.env') {
        try {
            const content = readFileSync(envPath, 'utf8');
            this.#variables = this.parseEnvContent(content);
        } catch (error) {
            console.error(`Error loading .env at ${envPath}: ${error.message}`);
            this.#variables = {};
        }

        const getFunction = (key) => this.#variables[key];
        
        this.get = new Proxy(getFunction, {
            get: (target, prop) => {
                if (prop === 'prototype') return target.prototype;
                return this.#variables[prop];
            },
            apply: (target, thisArg, args) => {
                return target(...args);
            }
        });

        const existsFunction = (key) => key in this.#variables;
        
        this.exists = new Proxy(existsFunction, {
            get: (target, prop) => {
                if (prop === 'prototype') return target.prototype;
                return prop in this.#variables;
            },
            apply: (target, thisArg, args) => {
                return target(...args);
            }
        });
    }

    parseEnvContent(content) {
        return content.split(/\r?\n/).reduce((acc, line) => {
            if (!line || line.startsWith('#') || !line.includes('=')) return acc;
            const [key, ...valueParts] = line.split('=');
            const value = valueParts.join('=');
            acc[key.trim()] = value.trim().replace(/^['"]|['"]$/g, '');
            return acc;
        }, {});
    }
}

module.exports = new Envise();