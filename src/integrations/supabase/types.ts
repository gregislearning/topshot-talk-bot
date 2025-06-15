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
      challenge_analysis: {
        Row: {
          ai_raw_response: string | null
          analysis_duration_ms: number | null
          analysis_method: string
          analysis_summary: string | null
          analyzer_version: string | null
          can_complete: boolean
          challenge_id: string
          challenge_scraped_at: string | null
          challenge_title: string
          completion_percentage: number
          created_at: string | null
          exact_matches: number | null
          id: string
          library_size: number
          matching_cards: Json | null
          missing_cards: number | null
          missing_cards_details: Json | null
          potential_matches: number | null
          potential_matches_details: Json | null
          rarity_upgrades: number | null
          recommendations: Json | null
          total_required_cards: number
          updated_at: string | null
        }
        Insert: {
          ai_raw_response?: string | null
          analysis_duration_ms?: number | null
          analysis_method: string
          analysis_summary?: string | null
          analyzer_version?: string | null
          can_complete: boolean
          challenge_id: string
          challenge_scraped_at?: string | null
          challenge_title: string
          completion_percentage: number
          created_at?: string | null
          exact_matches?: number | null
          id?: string
          library_size: number
          matching_cards?: Json | null
          missing_cards?: number | null
          missing_cards_details?: Json | null
          potential_matches?: number | null
          potential_matches_details?: Json | null
          rarity_upgrades?: number | null
          recommendations?: Json | null
          total_required_cards: number
          updated_at?: string | null
        }
        Update: {
          ai_raw_response?: string | null
          analysis_duration_ms?: number | null
          analysis_method?: string
          analysis_summary?: string | null
          analyzer_version?: string | null
          can_complete?: boolean
          challenge_id?: string
          challenge_scraped_at?: string | null
          challenge_title?: string
          completion_percentage?: number
          created_at?: string | null
          exact_matches?: number | null
          id?: string
          library_size?: number
          matching_cards?: Json | null
          missing_cards?: number | null
          missing_cards_details?: Json | null
          potential_matches?: number | null
          potential_matches_details?: Json | null
          rarity_upgrades?: number | null
          recommendations?: Json | null
          total_required_cards?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      challenges: {
        Row: {
          countdown_days: number | null
          countdown_formatted: string | null
          countdown_hours: number | null
          countdown_minutes: number | null
          countdown_seconds: number | null
          created_at: string | null
          description: string | null
          full_url: string | null
          id: string
          scraped_at: string | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          countdown_days?: number | null
          countdown_formatted?: string | null
          countdown_hours?: number | null
          countdown_minutes?: number | null
          countdown_seconds?: number | null
          created_at?: string | null
          description?: string | null
          full_url?: string | null
          id?: string
          scraped_at?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          countdown_days?: number | null
          countdown_formatted?: string | null
          countdown_hours?: number | null
          countdown_minutes?: number | null
          countdown_seconds?: number | null
          created_at?: string | null
          description?: string | null
          full_url?: string | null
          id?: string
          scraped_at?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          created_at: string
          id: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      required_cards: {
        Row: {
          challenge_id: string | null
          created_at: string | null
          id: string
          rarity: string | null
          title: string
          type: string | null
        }
        Insert: {
          challenge_id?: string | null
          created_at?: string | null
          id?: string
          rarity?: string | null
          title: string
          type?: string | null
        }
        Update: {
          challenge_id?: string | null
          created_at?: string | null
          id?: string
          rarity?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "required_cards_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "required_cards_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges_with_cards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      analysis_method_comparison: {
        Row: {
          challenge_id: string | null
          challenge_title: string | null
          huggingface_can_complete: boolean | null
          huggingface_completion: number | null
          last_analyzed: string | null
          methods_tested: number | null
          ollama_can_complete: boolean | null
          ollama_completion: number | null
          openai_can_complete: boolean | null
          openai_completion: number | null
          rule_based_can_complete: boolean | null
          rule_based_completion: number | null
        }
        Relationships: []
      }
      challenge_analysis_summary: {
        Row: {
          analysis_method: string | null
          analysis_rank: number | null
          analysis_summary: string | null
          can_complete: boolean | null
          challenge_id: string | null
          challenge_title: string | null
          completion_percentage: number | null
          created_at: string | null
          exact_matches: number | null
          missing_cards: number | null
          rarity_upgrades: number | null
        }
        Relationships: []
      }
      challenges_with_cards: {
        Row: {
          countdown_days: number | null
          countdown_formatted: string | null
          countdown_hours: number | null
          countdown_minutes: number | null
          countdown_seconds: number | null
          created_at: string | null
          description: string | null
          full_url: string | null
          id: string | null
          required_cards: Json | null
          scraped_at: string | null
          title: string | null
          updated_at: string | null
          url: string | null
        }
        Relationships: []
      }
      latest_challenge_analysis: {
        Row: {
          analysis_method: string | null
          analysis_rank: number | null
          analysis_summary: string | null
          can_complete: boolean | null
          challenge_id: string | null
          challenge_title: string | null
          completion_percentage: number | null
          created_at: string | null
          exact_matches: number | null
          missing_cards: number | null
          rarity_upgrades: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
