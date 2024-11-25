const { readFileSync, existsSync } = require('fs');
const { resolve } = require('path');

class Envise {
    #variables = {};

    constructor(defaultPath = '.env') {
        const envPath = resolve(process.cwd(), defaultPath);
        if (existsSync(envPath)) {
            this.#load(envPath);
        } else {
            console.warn(`[Envise] Default .env file not found: ${envPath}`);
        }
        
        this.get = this.proxy((key) => this.#variables[key]);
        this.exists = this.proxy((key) => key in this.#variables);
    }

    #load(envPath) {
        try {
            const content = readFileSync(envPath, 'utf8');
            Object.assign(this.#variables, this.#parse(content));
        } catch (error) {
            console.error(`[Envise] Failed to load .env file: ${envPath}: ${error.message}`);
        }
    }

    #parse(content) {
        return content
            .split(/\r?\n/)
            .filter(line => line.trim() && !line.startsWith('#') && line.includes('='))
            .reduce((acc, line) => {
                const [key, ...valueParts] = line.split('=');
                acc[key.trim()] = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
                return acc;
            }, {});
    }

    load(path) {
        const envPath = resolve(process.cwd(), path);
        if (existsSync(envPath)) {
            this.#load(envPath);
        } else {
            console.warn(`[Envise] .env file not found: ${envPath}`);
        }
    }
    
    proxy(handler) {
        return new Proxy(handler, {
            get: (target, prop) => {
                if (prop === 'prototype') return target.prototype;
                return this.#variables[prop];
            },
            apply: (target, thisArg, args) => target(...args),
        });
    }
}

const enviseInstance = new Envise();

function config({ path } = {}) {
    if (path) enviseInstance.load(path);
    return enviseInstance;
}

module.exports = enviseInstance;
module.exports.config = config;
