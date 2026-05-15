export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      farms: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          owner_id: string
          name: string
          description: string | null
          location: string | null
          phone: string | null
          email: string | null
          country: string | null
          timezone: string
          currency_code: string
          is_active: boolean
          subscription_plan: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          owner_id: string
          name: string
          description?: string | null
          location?: string | null
          phone?: string | null
          email?: string | null
          country?: string | null
          timezone?: string
          currency_code?: string
          is_active?: boolean
          subscription_plan?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          owner_id?: string
          name?: string
          description?: string | null
          location?: string | null
          phone?: string | null
          email?: string | null
          country?: string | null
          timezone?: string
          currency_code?: string
          is_active?: boolean
          subscription_plan?: string
        }
      }
      branches: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          farm_id: string
          name: string
          location: string | null
          phone: string | null
          manager_id: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          farm_id: string
          name: string
          location?: string | null
          phone?: string | null
          manager_id?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          farm_id?: string
          name?: string
          location?: string | null
          phone?: string | null
          manager_id?: string | null
          is_active?: boolean
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          farm_id: string
          name: string
          category: string
          description: string | null
          unit_of_measure: string
          reorder_level: number
          price_per_unit: number | null
          supplier_id: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          farm_id: string
          name: string
          category: string
          description?: string | null
          unit_of_measure?: string
          reorder_level?: number
          price_per_unit?: number | null
          supplier_id?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          farm_id?: string
          name?: string
          category?: string
          description?: string | null
          unit_of_measure?: string
          reorder_level?: number
          price_per_unit?: number | null
          supplier_id?: string | null
          is_active?: boolean
        }
      }
      inventory: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          branch_id: string
          product_id: string
          quantity_on_hand: number
          quantity_reserved: number
          quantity_available: number
          last_counted_at: string | null
          warehouse_location: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          branch_id: string
          product_id: string
          quantity_on_hand?: number
          quantity_reserved?: number
          quantity_available?: number
          last_counted_at?: string | null
          warehouse_location?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          branch_id?: string
          product_id?: string
          quantity_on_hand?: number
          quantity_reserved?: number
          quantity_available?: number
          last_counted_at?: string | null
          warehouse_location?: string | null
        }
      }
      production_batches: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          branch_id: string
          batch_type: string
          batch_number: string
          start_date: string | null
          expected_end_date: string | null
          actual_end_date: string | null
          quantity_started: number | null
          quantity_alive: number | null
          expected_yield: number | null
          actual_yield: number | null
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          branch_id: string
          batch_type: string
          batch_number: string
          start_date?: string | null
          expected_end_date?: string | null
          actual_end_date?: string | null
          quantity_started?: number | null
          quantity_alive?: number | null
          expected_yield?: number | null
          actual_yield?: number | null
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          branch_id?: string
          batch_type?: string
          batch_number?: string
          start_date?: string | null
          expected_end_date?: string | null
          actual_end_date?: string | null
          quantity_started?: number | null
          quantity_alive?: number | null
          expected_yield?: number | null
          actual_yield?: number | null
          status?: string
          notes?: string | null
        }
      }
      expenses: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          branch_id: string
          category: string
          description: string | null
          amount: number
          expense_date: string
          payment_method: string | null
          reference_number: string | null
          approved_by: string | null
          status: string
          notes: string | null
          recorded_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          branch_id: string
          category: string
          description?: string | null
          amount: number
          expense_date: string
          payment_method?: string | null
          reference_number?: string | null
          approved_by?: string | null
          status?: string
          notes?: string | null
          recorded_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          branch_id?: string
          category?: string
          description?: string | null
          amount?: number
          expense_date?: string
          payment_method?: string | null
          reference_number?: string | null
          approved_by?: string | null
          status?: string
          notes?: string | null
          recorded_by?: string | null
        }
      }
      sales: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          branch_id: string
          batch_id: string | null
          customer_name: string
          product_sold: string
          quantity_sold: number
          unit_of_measure: string | null
          price_per_unit: number
          total_amount: number
          sale_date: string
          payment_status: string
          notes: string | null
          recorded_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          branch_id: string
          batch_id?: string | null
          customer_name: string
          product_sold: string
          quantity_sold: number
          unit_of_measure?: string | null
          price_per_unit: number
          total_amount: number
          sale_date: string
          payment_status?: string
          notes?: string | null
          recorded_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          branch_id?: string
          batch_id?: string | null
          customer_name?: string
          product_sold?: string
          quantity_sold?: number
          unit_of_measure?: string | null
          price_per_unit?: number
          total_amount?: number
          sale_date?: string
          payment_status?: string
          notes?: string | null
          recorded_by?: string | null
        }
      }
      debtors: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          farm_id: string
          customer_name: string
          phone: string | null
          email: string | null
          total_debt: number
          paid_amount: number
          outstanding_amount: number
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          farm_id: string
          customer_name: string
          phone?: string | null
          email?: string | null
          total_debt?: number
          paid_amount?: number
          outstanding_amount?: number
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          farm_id?: string
          customer_name?: string
          phone?: string | null
          email?: string | null
          total_debt?: number
          paid_amount?: number
          outstanding_amount?: number
          status?: string
        }
      }
      staff: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          farm_id: string
          branch_id: string | null
          auth_user_id: string | null
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          role: string
          position: string | null
          hire_date: string | null
          salary: number | null
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          farm_id: string
          branch_id?: string | null
          auth_user_id?: string | null
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          role: string
          position?: string | null
          hire_date?: string | null
          salary?: number | null
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          farm_id?: string
          branch_id?: string | null
          auth_user_id?: string | null
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          role?: string
          position?: string | null
          hire_date?: string | null
          salary?: number | null
          status?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          phone: string | null
          country: string | null
          timezone: string
          theme: string
          language: string
          two_factor_enabled: boolean
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          country?: string | null
          timezone?: string
          theme?: string
          language?: string
          two_factor_enabled?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          country?: string | null
          timezone?: string
          theme?: string
          language?: string
          two_factor_enabled?: boolean
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
