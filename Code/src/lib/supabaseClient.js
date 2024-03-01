// import { createClient } from '@supabase/supabase-js'

// // Load environment variables
// const SUPABASE_URL= "https://dstlxmnajsywdftqcamk.supabase.co"
//  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdGx4bW5hanN5d2RmdHFjYW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzNTQ2NzcsImV4cCI6MjAxMzkzMDY3N30.nS-L05Ek-7lecJjSegFsVP-U_gzjlTFLKL9wekEZKjA"

//  export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

 import { createClient } from '@supabase/supabase-js'
 const supabaseUrl = 'https://hhcavpgizxwiyqebxscn.supabase.co'
 const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoY2F2cGdpenh3aXlxZWJ4c2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMzU2MjMsImV4cCI6MjAyNDcxMTYyM30.29PI4XAY-Rb6lWyp0FcBDyJspPza4wi-UpTprq08d7M"
 export const supabase = createClient(supabaseUrl, supabaseKey)