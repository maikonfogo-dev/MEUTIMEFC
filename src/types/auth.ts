export type PermissionKey = 
  // Loja
  | 'loja.ver' 
  | 'loja.comprar' 
  | 'loja.criar_produto' 
  | 'loja.editar_produto' 
  | 'loja.ver_pedidos' 
  // Ligas
  | 'liga.criar' 
  | 'liga.editar' 
  | 'liga.publicar' 
  | 'liga.ver_dashboard'
  // Transmissão
  | 'transmissao.iniciar' 
  | 'transmissao.encerrar' 
  | 'transmissao.ver_metricas'
  // Auth/Sistema
  | 'auth.gerenciar_usuarios' 
  | 'auth.gerenciar_permissoes' 
  | 'sistema.configuracoes'
  // Legacy/Compatibility (will map to new ones)
  | 'view_loja' 
  | 'comprar_produto' 
  | 'ver_campeonatos' 
  | 'checkout_1_click' 
  | 'acesso_beneficios' 
  | 'gerenciar_produtos' 
  | 'gerenciar_pedidos' 
  | 'ver_relatorios' 
  | 'criar_campeonato' 
  | 'gerenciar_times' 
  | 'gerenciar_tabela' 
  | 'ver_escalas' 
  | 'registrar_resultados';

export type RoleScope = 'global' | 'team' | 'league';

export interface Permission {
  id: string;
  key: PermissionKey;
  description?: string;
  module: 'loja' | 'ligas' | 'auth' | 'transmissao' | 'sistema' | 'financeiro';
}

export interface Role {
  id: string;
  name: string;
  scope: RoleScope;
  permissions: PermissionKey[];
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  password_hash?: string;
  role: string; // References Role.name
  is_socio: boolean;
  team_id: string;
  created_at: string;
  permissions?: PermissionKey[]; // Calculated permissions
  scope?: RoleScope; // Context of the role
}

export interface OTP {
  id: string;
  phone: string;
  code: string;
  expires_at: string;
  verified: boolean;
}

export interface PasswordReset {
  id: string;
  userId: string;
  channel: 'email' | 'whatsapp';
  contact: string;
  expires_at: string;
  used: boolean;
}
