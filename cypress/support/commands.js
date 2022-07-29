// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        console.log(msg)
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('fillLoginFields', (email, password) => {
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test=passwd').type(password)
})

Cypress.Commands.add('fillRegisterFields', (name, email, password) => {
    cy.get('[placeholder="Nome"]').type(name)
    cy.get('[type="email"]').type(email)
    cy.get('[type="password"]').type(password)
})

Cypress.Commands.add('editAccount', (name, newName) => {
    cy.xpath(`//tbody/tr/td[.="${name}"]/../td[2]/a/*[@class="far fa-edit"]`).click()
    cy.get('[data-test="nome"]').clear().type(newName)
    cy.get('[alt="Salvar"]').click()
    cy.get('.toast.toast-success').should('be.visible')
    cy.get('.toast-close-button').click()
})

Cypress.Commands.add('insertAccount', (name) => {
    cy.get('[data-test="nome"]').clear().type(`${name}`)
    cy.get('[alt="Salvar"]').click()
})

Cypress.Commands.add('insertAccountMovimentation', (description, value, involved, account) => {
    cy.get('[data-test="descricao"]').clear().type(description)
    cy.get('[data-test="valor"]').clear().type(value)
    cy.get('[data-test="envolvido"]').clear().type(involved)
    cy.get('[data-test="conta"]').select(account)
    cy.get('[alt="Salvar"]').click()
})

Cypress.Commands.add('removeAccountMovimentation', (involved) => {
    cy.xpath(`//div/*[@class="list-group"]/li//div/div/div/small[.="${involved}"]/../../../div/a/*[@class="far fa-trash-alt"]`)
    .click()
})