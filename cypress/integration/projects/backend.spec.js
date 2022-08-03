// <reference types="cypress" />

describe("Backend testing", () => {
  let token;

  before("Get login token", () => {
    cy.getToken("facelessman@test.com", "1234").then((tkn) => {
      token = tkn;
    });
  });

  beforeEach("Reset website state", () => {
    cy.restReset("facelessman@test.com", "1234");
  });

  it("Insert new account", () => {
    cy.request({
      method: "POST",
      url: "/contas",
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: "Conta rest",
      },
    }).as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", "Conta rest");
    });
  });

  it("Edit account", () => {
    cy.getAccountId("Conta para alterar", "facelessman@test.com", "1234").then(
      (res) => {
        cy.request({
          url: `/contas/${res}`,
          method: "PUT",
          headers: { Authorization: `JWT ${token}` },
          body: {
            nome: "Conta alterada via rest",
          },
        }).as("response");
      }
    );
    cy.get("@response").its("status").should("be.equal", 200);
  });

  it("Insert duplicated account", () => {
    cy.request({
      method: "POST",
      url: "/contas",
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: "Conta mesmo nome",
      },
      failOnStatusCode: false,
    }).as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!");
    });
  });

  it("Insert account movementation", () => {
    cy.getAccountId(
      "Conta para movimentacoes",
      "facelessman@test.com",
      "1234"
    ).then((res) => {
      cy.request({
        url: "/transacoes",
        method: "POST",
        headers: { Authorization: `JWT ${token}` },
        body: {
          conta_id: res,
          data_pagamento: '03/08/2022',
          data_transacao: '02/08/2022',
          descricao: "something",
          envolvido: "nubank",
          status: true,
          tipo: "REC",
          valor: "2000",
        },
      }).as('response');
    });
    cy.get('@response').its('status').should('be.equal', 201)
  });

  it("Remove account movementation", () => {
    cy.request({
      method: 'GET',
      url: '/transacoes',
      headers: { Authorization: `JWT ${token}` },
      qs: {descricao: 'Movimentacao para exclusao'}
    }).then(res => {
      cy.request({
        url: `/transacoes/${res.body[0].id}`,
        method: 'DELETE',
        headers: { Authorization: `JWT ${token}` },
      }).its('status').should('be.equal', 204)
    })
  });
});
