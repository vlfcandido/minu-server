export interface BlipMessage {
  from: string;
  timestamp: string;
  status: string;
  content: any;
}

export interface MessageRecord {
  id?: number;
  userIdentity: string;
  telefone: string;
  nome?: string;
  dataHoraCriacao: Date;
  dataHoraAtualizacao: Date;
  statusMensagem?: string;
  mensagem?: string;
  statusTransmissao?: string;
}
