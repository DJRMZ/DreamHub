import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { useAuth } from "@clerk/clerk-expo/dist";

const client = async (accessToken) => {
  const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return supabase;
};

export default client