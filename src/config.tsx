import configData from './config.json';

interface Config {
  NATIONAL_SOCIETY_NAME: string;
}

const config: Config = {
  NATIONAL_SOCIETY_NAME: configData.NATIONAL_SOCIETY_NAME
};

export default config;