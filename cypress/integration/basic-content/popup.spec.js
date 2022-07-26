// <reference types="cypress" />

describe('Work with popup', () => {
    before('Access the training field', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach('Reload field', () => {
        cy.reload()
    })

    it('Deve verificar se o popup foi invocado', () => {
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#popupButton').click()
        cy.get('@winOpen').should('be.called')
    })


})

it('Deve testar o popup diretamente', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html')
    cy.get('#otherButton').click()
    cy.on('window:alert', msg => {
        console.log(msg)
        expect(msg).to.be.equal('Click OK!')
    })

    describe('Work links...', () => {
        before('Access the training field', () => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('Check popup url', () => {
            cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })
        
        it('Deve acessar popup imediatamente', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('tfield').type('funciona')
            })
        })

        it('Force o link para abrir na mesma pagina', () => {
            cy.visit('https://wcaquino.me/cypress/frame.html')
            cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            cy.get('#tfield').type('funciona')
        })
    })
})
