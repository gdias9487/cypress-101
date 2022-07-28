// <reference types="cypress" />

describe('Dynamic tests', () => {
    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    before('Access the training field', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Reload field', () => {
        cy.reload()
    })

    foods.forEach(food => {
        it(`Cadastro com a comida ${food}`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(.,${food})]/../input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
        })
    })

    it.only('Deve selecionar todos usando o each', () => {
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('Qualquer')
        cy.get(`[name=formSexo][value=F]`).click()

        cy.get('[name=formComidaFavorita]').each($el => {
            if($el.val() !== 'vegetariano'){
                cy.wrap($el).click()
            }
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
        })
    })


})