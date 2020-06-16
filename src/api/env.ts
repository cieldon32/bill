const ENV = {
  API_BASE: '',
};

switch (process.env.APP_ENV) {
  case 'local': {
    ENV.API_BASE = 'http://localhost:3000/mock/api';
    break;
  }
  case 'dev': {
    ENV.API_BASE = '';
    break;
  }
  case 'test': {
    ENV.API_BASE = '';
    break;
  }
  case 'prod': {
    ENV.API_BASE = '';
    break;
  }
}

export default ENV;
