import { createClient } from '@supabase/supabase-js'
// import { SUPABASE_URL, SUPABASE_KEY } from '@env';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const client = async (accessToken) => {
  const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
      schema: 'public',
    },
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    },
  );

  return supabase;
};

export default client