import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for better TypeScript support
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          email: string
          password: string
          password_hash: string
          role: 'user' | 'admin'
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          password: string
          password_hash: string
          role?: 'user' | 'admin'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          password?: string
          password_hash?: string
          role?: 'user' | 'admin'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          username: string
          password_hash: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          password_hash: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          password_hash?: string
          created_at?: string
          updated_at?: string
        }
      }
      habilitadas: {
        Row: {
          id: string
          name: string
          email: string
          whatsapp: string
          cpf: string
          estado: string
          bio: string
          profile_image_url: string | null
          enrollment_date: string
          enrollment_status: string
          course_progress: any
          is_active: boolean
          failed_login_attempts: number
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          whatsapp: string
          cpf?: string
          estado?: string
          bio?: string
          profile_image_url?: string | null
          enrollment_date?: string
          enrollment_status?: string
          course_progress?: any
          is_active?: boolean
          failed_login_attempts?: number
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          whatsapp?: string
          cpf?: string
          estado?: string
          bio?: string
          profile_image_url?: string | null
          enrollment_date?: string
          enrollment_status?: string
          course_progress?: any
          is_active?: boolean
          failed_login_attempts?: number
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          featured_image_url: string | null
          author_id: string
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          featured_image_url?: string | null
          author_id: string
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          featured_image_url?: string | null
          author_id?: string
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          duration_minutes: number
          category: string
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          duration_minutes: number
          category: string
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          duration_minutes?: number
          category?: string
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          location: string
          max_participants: number
          current_participants: number
          price: number
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          event_date: string
          location: string
          max_participants: number
          current_participants?: number
          price: number
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_date?: string
          location?: string
          max_participants?: number
          current_participants?: number
          price?: number
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}