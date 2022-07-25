// <reference types="cypress" />


describe('Cypress basics', () => {

    before('Access the training field', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Reload field', () => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve fazer retries', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
        .should('exist')
        .type('funciona')
    })

    it('Uso do find', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 1')
        // cy.get('#lista li')
        // .find('span')
        // .should('contain', 'Item 2')
        cy.get('#lista li span')
        .should('contain', 'Item 1')
    })

    it('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', {timeout:1000}).should('exist')

        // cy.get('#buttonListDOM').click()
        // cy.wait(5000)
        // cy.get('#lista li span', {timeout: 30000})
        // .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
        .should('have.lenght', 1)
        cy.get('#lista li span')
        .should('have.lenght', 2)
    })

    it('Click retry', () => {
        cy.get('#buttonCount')
        .click()
        .click()
        .should('have.value', '111')
    })
})