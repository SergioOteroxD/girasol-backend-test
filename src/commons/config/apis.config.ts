import { registerAs } from '@nestjs/config';

export default registerAs('apis', () => ({
  api_url_fast_forest: process.env.API_URL_FAST_FOREST,
  api_key_fast_forest: process.env.API_KEY_FAST_FOREST,
}));
