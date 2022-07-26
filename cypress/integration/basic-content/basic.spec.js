// <reference types="cypress" />

describe('Cypress basics', () => {
    before('Access the training field', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach('Reload field', () => {
        cy.reload()
    })

    it('Should visit a page and assert title', () => {
        

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Contain')

        cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo')

        cy.title().then(title => {
            console.log(title)
        })

        let syncTitle
        
        cy.title().then(title => {
            cy.get('#formNome').type(title)
            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el=>{
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el=>{
            cy.wrap($el).type(syncTitle)
        })
        
    })

    it('Should find and interact with an element', () => {
        cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!')
    })
})