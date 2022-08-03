const buildEnv = () => {
  cy.server();

  cy.route({
    method: "POST",
    url: "/signin",
    response: {
      id: 1000,
      nome: "test user",
      token: "token123",
    },
  }).as("signin");
  
  cy.route({
    method: "GET",
    url: "/saldo",
    response: [
      {
        conta_id: 1,
        conta: "Nubank",
        saldo: "1000.00",
      },
      {
        conta_id: 2,
        conta: "Itau",
        saldo: "1530.00",
      },
    ],
  }).as("saldo");

  cy.route({
    method: "GET",
    url: "/contas",
    response: [
      {
        id: 1,
        nome: "Conta",
        visivel: true,
        usuario_id: 3,
      },
      {
        id: 2,
        nome: "Banco",
        visivel: true,
        usuario_id: 3,
      },
      {
        id: 2,
        nome: "Loterica",
        visivel: true,
        usuario_id: 3,
      },
    ],
  }).as("accounts");

  cy.route({
    method: "GET",
    url: "/extrato/**",
    response: [
      {
        conta: "Conta mesmo nome",
        id: 1230002,
        descricao: "sadas",
        envolvido: "dasdas",
        observacao: null,
        tipo: "REC",
        data_transacao: "2022-08-03T03:00:00.000Z",
        data_pagamento: "2022-08-03T03:00:00.000Z",
        valor: "12131231.00",
        status: true,
        conta_id: 1318596,
        usuario_id: 31640,
        transferencia_id: null,
        parcelamento_id: null,
      },
      {
        conta: "Conta com movimentacao",
        id: 1229542,
        descricao: "Movimentacao de conta",
        envolvido: "BBB",
        observacao: null,
        tipo: "DESP",
        data_transacao: "2022-08-03T03:00:00.000Z",
        data_pagamento: "2022-08-03T03:00:00.000Z",
        valor: "-1500.00",
        status: true,
        conta_id: 1318598,
        usuario_id: 31640,
        transferencia_id: null,
        parcelamento_id: null,
      },
      {
        conta: "Conta para saldo",
        id: 1229543,
        descricao: "Movimentacao 1, calculo saldo",
        envolvido: "CCC",
        observacao: null,
        tipo: "REC",
        data_transacao: "2022-08-03T03:00:00.000Z",
        data_pagamento: "2022-08-03T03:00:00.000Z",
        valor: "3500.00",
        status: false,
        conta_id: 1318599,
        usuario_id: 31640,
        transferencia_id: null,
        parcelamento_id: null,
      },
      {
        conta: "Conta para saldo",
        id: 1229544,
        descricao: "Movimentacao 2, calculo saldo",
        envolvido: "DDD",
        observacao: null,
        tipo: "DESP",
        data_transacao: "2022-08-03T03:00:00.000Z",
        data_pagamento: "2022-08-03T03:00:00.000Z",
        valor: "-1000.00",
        status: true,
        conta_id: 1318599,
        usuario_id: 31640,
        transferencia_id: null,
        parcelamento_id: null,
      },
      {
        conta: "Conta para saldo",
        id: 1229545,
        descricao: "Movimentacao 3, calculo saldo",
        envolvido: "EEE",
        observacao: null,
        tipo: "REC",
        data_transacao: "2022-08-03T03:00:00.000Z",
        data_pagamento: "2022-08-03T03:00:00.000Z",
        valor: "1534.00",
        status: true,
        conta_id: 1318599,
        usuario_id: 31640,
        transferencia_id: null,
        parcelamento_id: null,
      },
      {
        conta: "Conta para extrato",
        id: 1229546,
        descricao: "Movimentacao para extrato",
        envolvido: "FFF",
        observacao: null,
        tipo: "DESP",
        data_transacao: "2022-08-03T03:00:00.000Z",
        data_pagamento: "2022-08-03T03:00:00.000Z",
        valor: "-220.00",
        status: true,
        conta_id: 1318600,
        usuario_id: 31640,
        transferencia_id: null,
        parcelamento_id: null,
      },
    ],
  });
};

export default buildEnv;
