import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DB_PATH = join(__dirname, '..', 'data', 'kakaran.db');