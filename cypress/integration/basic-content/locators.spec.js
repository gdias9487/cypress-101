// <reference types="cypress" />

describe('Working with locators', () => {
    before('Access the training field', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Reload field', () => {
        cy.reload()
    })

    it('Using jquery selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr td:nth-child(3) > input')
        cy.get('[onclick*="Francisco"]')
        cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input')
        cy.get('#tabelaUsuarios tr:contains("Doutorado"):eq(0) > td:eq(5)')
    })

    it('Using xpath', () => {
        // cy.xpath('//input[contains(@onclick, `Francisco`)]')
        // cy.xpath('//table[@id=`tabelaUsuarios`]//td[contains(., `Francisco`)/follow-sibling::td-input]')
    })
})