import { createClient } from '@supabase/supabase-js'
// import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { useAuth } from "@clerk/clerk-expo/dist";

const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

const client = async (accessToken) => {
  const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
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