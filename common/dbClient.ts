import { Pool } from 'pg';
import { MessageRecord } from './types';

export class DbClient {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }

  async connect(): Promise<void> {
    await this.pool.connect();
  }

  async saveMessage(msg: MessageRecord): Promise<void> {
    const sql = `
      INSERT INTO blip_messages
        (user_identity, telefone, nome, data_hora_criacao,
         data_hora_atualizacao, status_mensagem, mensagem, status_transmissao)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT(user_identity, telefone, data_hora_criacao)
      DO UPDATE SET
        nome                 = EXCLUDED.nome,
        data_hora_atualizacao = EXCLUDED.data_hora_atualizacao,
        status_mensagem      = EXCLUDED.status_mensagem,
        mensagem             = EXCLUDED.mensagem,
        status_transmissao   = EXCLUDED.status_transmissao;
    `;
    await this.pool.query(sql, [
      msg.userIdentity,
      msg.telefone,
      msg.nome || null,
      msg.dataHoraCriacao,
      msg.dataHoraAtualizacao,
      msg.statusMensagem || null,
      msg.mensagem || null,
      msg.statusTransmissao || null,
    ]);
  }

  /**
   * Retorna mensagens desde a data informada.
   */
  async getMessagesSince(
    since: Date,
    onlyUnconsumed = false
  ): Promise<MessageRecord[]> {
    let sql = `
      SELECT
        id,
        user_identity,
        telefone,
        nome,
        data_hora_criacao,
        data_hora_atualizacao,
        status_mensagem,
        mensagem,
        status_transmissao
      FROM blip_messages
      WHERE data_hora_criacao >= $1
    `;
    const params: any[] = [since];

    sql += ' ORDER BY data_hora_criacao ASC;';

    const { rows } = await this.pool.query(sql, params);

    return rows.map((r: any) => ({
      id: r.id,
      userIdentity: r.user_identity,
      telefone: r.telefone,
      nome: r.nome,
      dataHoraCriacao: r.data_hora_criacao,
      dataHoraAtualizacao: r.data_hora_atualizacao,
      statusMensagem: r.status_mensagem,
      mensagem: r.mensagem,
      statusTransmissao: r.status_transmissao,
    }));
  }

  async updateMessageStatus(id: number, status: string): Promise<void> {
    await this.pool.query('UPDATE blip_messages SET status_mensagem = $1 WHERE id = $2', [status, id]);
  }

  async markConsumed(id: number): Promise<void> {
    await this.pool.query('UPDATE blip_messages SET status_transmissao = $1 WHERE id = $2', ['CONSUMED', id]);
  }
}

export const dbClient = new DbClient();
