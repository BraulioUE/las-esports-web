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
      teams: {
        Row: {
          id: string
          nombre: string
          siglas: string
          logo_url: string | null
          representante: string | null
          discord_url: string | null
          activo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          siglas: string
          logo_url?: string | null
          representante?: string | null
          discord_url?: string | null
          activo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          siglas?: string
          logo_url?: string | null
          representante?: string | null
          discord_url?: string | null
          activo?: boolean
          created_at?: string
        }
      }
      players: {
        Row: {
          id: string
          team_id: string
          nombre: string
          nick: string | null
          rol: 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support'
          suplente: boolean
          pais: string | null
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          nombre: string
          nick?: string | null
          rol: 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support'
          suplente?: boolean
          pais?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          nombre?: string
          nick?: string | null
          rol?: 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support'
          suplente?: boolean
          pais?: string | null
          created_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          team_a_id: string
          team_b_id: string
          ganador_id: string | null
          fecha: string
          hora: string | null
          transmitido: boolean
          created_at: string
        }
        Insert: {
          id?: string
          team_a_id: string
          team_b_id: string
          ganador_id?: string | null
          fecha: string
          hora?: string | null
          transmitido?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          team_a_id?: string
          team_b_id?: string
          ganador_id?: string | null
          fecha?: string
          hora?: string | null
          transmitido?: boolean
          created_at?: string
        }
      }
      sponsors: {
        Row: {
          id: string
          nombre: string
          logo_url: string
          link: string | null
          activo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          logo_url: string
          link?: string | null
          activo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          logo_url?: string
          link?: string | null
          activo?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      standings: {
        Row: {
          id: string
          nombre: string
          siglas: string
          logo_url: string | null
          jugados: number
          ganados: number
          perdidos: number
          win_rate: number
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Team    = Database['public']['Tables']['teams']['Row']
export type Player  = Database['public']['Tables']['players']['Row']
export type Match   = Database['public']['Tables']['matches']['Row']
export type Sponsor = Database['public']['Tables']['sponsors']['Row']
export type Standing = Database['public']['Views']['standings']['Row']

export type Rol = Player['rol']
export const ROLES: Rol[] = ['Top', 'Jungle', 'Mid', 'ADC', 'Support']
