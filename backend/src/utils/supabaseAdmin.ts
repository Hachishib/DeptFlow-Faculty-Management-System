import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) throw new Error('SUPABASE_URL is missing from .env');
if (!supabaseServiceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing from .env');

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);