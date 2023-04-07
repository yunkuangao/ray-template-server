import {join} from "path";

export = {
  name: String(process.env.APP_NAME),
  host: String(process.env.APP_HOST),
  port: Number(process.env.APP_PORT),
  secret: String(process.env.APP_SECRET),
  jwt: {
    secret: String(process.env.APP_JWT_SECRET),
    signOptions: {
      expiresIn: Number(process.env.APP_JWT_EXPIRES),
    },
  },
  // OnlyOffice 配置項
  staticPath: join(process.cwd(), '/static'),
  onlyoffice: {
    jwtEnable: process.env.ONLYOFFICE_JWT_ENABLE,
    secret: process.env.ONLYOFFICE_SECRET,
    domain: process.env.ONLYOFFICE_DOMAIN,
    commandUrl: process.env.ONLYOFFICE_COMMAND_URL,
    callback: process.env.ONLYOFFICE_CALLBACK,
  },
};
