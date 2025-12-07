import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pgtpjisiszpngiaxfcap.supabase.co";
const supabasePublishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBndHBqaXNpc3pwbmdpYXhmY2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTk1NDcsImV4cCI6MjA3ODM3NTU0N30.xlPK8h5qbqXpXZcX8NzQMlYYV58TJhIp5m8QjZ75jP8";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

