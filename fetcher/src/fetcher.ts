import { schedule } from 'node-cron';
import { blipClient }    from '../common/blipClient';
import { dbClient }      from '../common/dbClient';
import { MessageRecord } from '../common/types';

schedule('*/5 * * * *', async () => {
  const items = await blipClient.getActiveMessages(process.env.BLIP_CONTRACT_ID!);
  const now = new Date();
  const records: MessageRecord[] = items.map(item => ({
    userIdentity: item.from,             // ou outro campo do BLiP
    telefone:     item.from,             // se “from” for o telefone
    nome:         item.content.senderName || null,
    dataHoraCriacao:    new Date(item.timestamp),
    dataHoraAtualizacao: now,
    statusMensagem:     item.status,
    mensagem:           item.content.text || JSON.stringify(item.content),
    statusTransmissao:   'pending'       // ou outro valor padrão
  }));

  for (const r of records) {
    await dbClient.saveMessage(r);
  }
});
