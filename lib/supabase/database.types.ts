export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          product_count: number | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          product_count?: number | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          product_count?: number | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          min_order: number | null
          type: string
          used_count: number | null
          value: number
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_order?: number | null
          type: string
          used_count?: number | null
          value: number
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_order?: number | null
          type?: string
          used_count?: number | null
          value?: number
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          discount_sent: boolean | null
          email: string
          id: string
          is_active: boolean | null
          subscribed_at: string | null
        }
        Insert: {
          discount_sent?: boolean | null
          email: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string | null
        }
        Update: {
          discount_sent?: boolean | null
          email?: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          product_id: string
          product_image: string | null
          product_name: string
          quantity: number
          selected_color: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          product_id: string
          product_image?: string | null
          product_name: string
          quantity: number
          selected_color?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          product_id?: string
          product_image?: string | null
          product_name?: string
          quantity?: number
          selected_color?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string
          city: string
          created_at: string | null
          discount: number | null
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_status: string | null
          phone: string
          pincode: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          shipping: number | null
          state: string
          status: string | null
          subtotal: number
          total: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          discount?: number | null
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_status?: string | null
          phone: string
          pincode: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          shipping?: number | null
          state: string
          status?: string | null
          subtotal: number
          total: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          discount?: number | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_status?: string | null
          phone?: string
          pincode?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          shipping?: number | null
          state?: string
          status?: string | null
          subtotal?: number
          total?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      product_features: {
        Row: {
          description: string | null
          icon: string
          id: string
          product_id: string
          sort_order: number | null
          title: string
        }
        Insert: {
          description?: string | null
          icon: string
          id?: string
          product_id: string
          sort_order?: number | null
          title: string
        }
        Update: {
          description?: string | null
          icon?: string
          id?: string
          product_id?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          product_id: string
          sort_order: number | null
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          product_id: string
          sort_order?: number | null
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          product_id?: string
          sort_order?: number | null
          url?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          badges: string[] | null
          category_id: string | null
          category_name: string | null
          colors: string[] | null
          compare_price: number
          created_at: string | null
          description: string | null
          dimensions: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          material: string | null
          name: string
          price: number
          rating: number | null
          review_count: number | null
          short_description: string | null
          slug: string
          sold: number | null
          stock: number | null
          subcategory: string | null
          updated_at: string | null
          weight: string | null
        }
        Insert: {
          badges?: string[] | null
          category_id?: string | null
          category_name?: string | null
          colors?: string[] | null
          compare_price: number
          created_at?: string | null
          description?: string | null
          dimensions?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          material?: string | null
          name: string
          price: number
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          slug: string
          sold?: number | null
          stock?: number | null
          subcategory?: string | null
          updated_at?: string | null
          weight?: string | null
        }
        Update: {
          badges?: string[] | null
          category_id?: string | null
          category_name?: string | null
          colors?: string[] | null
          compare_price?: number
          created_at?: string | null
          description?: string | null
          dimensions?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          material?: string | null
          name?: string
          price?: number
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          slug?: string
          sold?: number | null
          stock?: number | null
          subcategory?: string | null
          updated_at?: string | null
          weight?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          avatar_url: string | null
          body: string | null
          created_at: string | null
          helpful: number | null
          id: string
          images: string[] | null
          is_approved: boolean | null
          is_verified: boolean | null
          product_id: string
          rating: number
          title: string | null
          user_id: string | null
          user_name: string
        }
        Insert: {
          avatar_url?: string | null
          body?: string | null
          created_at?: string | null
          helpful?: number | null
          id?: string
          images?: string[] | null
          is_approved?: boolean | null
          is_verified?: boolean | null
          product_id: string
          rating: number
          title?: string | null
          user_id?: string | null
          user_name: string
        }
        Update: {
          avatar_url?: string | null
          body?: string | null
          created_at?: string | null
          helpful?: number | null
          id?: string
          images?: string[] | null
          is_approved?: boolean | null
          is_verified?: boolean | null
          product_id?: string
          rating?: number
          title?: string | null
          user_id?: string | null
          user_name?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: { Args: Record<never, never>; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
