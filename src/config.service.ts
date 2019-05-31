import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {

  private readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig =
      this.validateInput(dotenv.parse(fs.readFileSync(this.getEnvironment())));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production'])
        .default('development'),
      PORT: Joi.number().default(3000),
      TWITTER_CONSUMER_KEY: Joi.string().required(),
      TWITTER_CONSUMER_SECRET: Joi.string().required(),
      TWITTER_ACCESS_TOKEN_KEY: Joi.string().required(),
      TWITTER_ACCESS_TOKEN_SECRET: Joi.string().required(),
      VAPID_PUBLIC_KEY: Joi.string().required(),
      VAPID_PRIVATE_KEY: Joi.string().required(),
    });

    const {error, value: validatedEnvConfig} = Joi.validate(envConfig, envVarSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  private getEnvironment(): string {
    return `${process.env.NODE_ENV ? process.env.NODE_ENV : ''}.env`;
  }
}
