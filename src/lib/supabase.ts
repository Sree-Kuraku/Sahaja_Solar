import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeadRequest {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  state: string;
  mandal: string;
  full_address: string;
  property_type: 'Residential' | 'Commercial';
  avg_monthly_bill: string;
  created_at?: string;
}

export interface Project {
  id?: string;
  project_id: string;
  lead_id?: string;
  customer_name: string;
  mandal: string;
  panel_type: string;
  capacity: number;
  document_url?: string;
  status: 'Pending' | 'Surveying' | 'Completed';
  progress_percentage: number;
  created_at?: string;
  updated_at?: string;
}
