// <reference types="cypress" />

describe('Work with iframe', () => {
    before('Access the training field', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach('Reload field', () => {
        cy.reload()
    })

    it('Deve preencher campo de texto', () => {
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
            .type('funciona?')
            .should('have.value', 'funciona?')

            cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')

            // cy.wrap(body)
            // .get('#otherButton')
            // .click()
        })
        })

        
    })

    it('Deve testar o frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Click OK!')
        })
    })
})