CREATE TABLE IF NOT EXISTS blip_messages (
  id                   SERIAL    PRIMARY KEY,
  user_identity        TEXT      NOT NULL,
  telefone             TEXT      NOT NULL,
  nome                 TEXT,
  data_hora_criacao    TIMESTAMPTZ NOT NULL,
  data_hora_atualizacao TIMESTAMPTZ NOT NULL,
  status_mensagem      TEXT,
  mensagem             TEXT,
  status_transmissao   TEXT,
  UNIQUE(user_identity, telefone, data_hora_criacao)
);
