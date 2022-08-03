// <reference types="cypress" />

import buildEnv from "../../support/buildEnv";

describe("Frontend testing", () => {
  const conta1 = "Conta 1";
  const newConta1 = "Conta alterada";
  const contaDuplicada = "Conta 2";
  const description = "A description";
  const value = "1000";
  const involved = "geralt";
  const successPopupLocator = ".toast.toast-success";
  const errorPopupLocator = ".toast.toast-error";
  const popupCloseButtonLocator = ".toast-close-button";
  const menuSettingsLocator = '[data-test="menu-settings"]';
  const contasSelectLocator = '[href*="contas"]';

  after(() => {
    cy.clearLocalStorage();
  });

  beforeEach("Accessing site", () => {
    buildEnv();
    cy.visit("https://barrigareact.wcaquino.me");
    cy.fillLoginFields("test@test.com", "1234");
    cy.get("[type=submit]").click();
  });

  it("Insert new account", () => {
    cy.route({
      method: "POST",
      url: "/contas",
      response: [
        {
          id: 4,
          nome: "Conta mock",
          visivel: true,
          usuario_id: 3,
        },
      ],
    }).as("saveAccount");

    cy.get(popupCloseButtonLocator).click();
    cy.get(menuSettingsLocator).click();
    cy.get(contasSelectLocator).should("be.visible").click();

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
          id: 3,
          nome: "Loterica",
          visivel: true,
          usuario_id: 3,
        },
        {
          id: 4,
          nome: "Conta mock",
          visivel: true,
          usuario_id: 3,
        },
      ],
    }).as("savedAccounts");

    cy.insertAccount("Conta mock");

    cy.get(successPopupLocator).should("be.visible");
    cy.wait(500);
    cy.get(popupCloseButtonLocator).click();
  });

  it("Edit account", () => {
    cy.get(popupCloseButtonLocator).click();
    cy.get(menuSettingsLocator).click();
    cy.get(contasSelectLocator).should("be.visible").click();

    cy.route({
      method: "PUT",
      url: "/contas/**",
      response: {
        id: 1,
        nome: "Conta alterada",
        visivel: true,
        usuario_id: 3,
      },
    }).as("editAccount");

    cy.route({
      method: "GET",
      url: "/contas",
      response: [
        {
          id: 1,
          nome: "Conta alterada",
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
    }).as("modifiedAccounts");

    cy.editAccount("Conta", "Conta alterada");
  });

  it("Insert duplicated account", () => {
    cy.route({
      method: "POST",
      url: "/contas",
      response: { error: "Ja existe uma conta com esse nome!" },
      status: 400,
    }).as("errorDuplicate");
    cy.get(menuSettingsLocator).click();
    cy.get(contasSelectLocator).should("be.visible").click();
    cy.insertAccount("Loterica");
    cy.get(errorPopupLocator).should("contain", "code 400");
  });

  it("Insert account movementation", () => {
    cy.route({
        method: "POST",
        url: "/transacoes",
        response: {
          id: 1,
          descricao: description,
          envolvido: involved,
          observacao: null,
          tipo: "REC",
          data_transacao: "2022-08-03T03:00:00.000Z",
          data_pagamento: "2022-08-03T03:00:00.000Z",
          valor: `${value}`,
          status: true,
          conta_id: 2,
          usuario_id: 1000,
          transferencia_id: null,
          parcelamento_id: null,
        },
      }).as("insertMov");
    cy.get('[data-test="menu-movimentacao"]').click();
    cy.insertAccountMovimentation(description, value, involved, "Banco");
    cy.get(successPopupLocator).should('contain', 'sucesso')
  });

  it("Remove account movementation", () => {
    cy.route({
        method: 'DELETE',
        url: '/transacoes/**',
        response: {},
        status: 204
    }).as('deleteMov')
    cy.get('[data-test="menu-extrato"]').click();
    cy.removeAccountMovimentation('dasdas');
    cy.get(successPopupLocator).should("be.visible");
  });
});
