// <reference types="cypress" />

describe('Functional testing', () => {
    const conta1 = 'Conta 1'
    const newConta1 = 'Conta alterada'
    const contaDuplicada = 'Conta 2'
    const description = 'A description'
    const value = '1000'
    const involved = 'geralt'
    const successPopupLocator = '.toast.toast-success'
    const errorPopupLocator = '.toast.toast-error'
    const popupCloseButtonLocator = '.toast-close-button'
    const menuSettingsLocator = '[data-test="menu-settings"]'
    const contasSelectLocator = '[href*="contas"]'


    before('Accessing site', () => {
        cy.visit('https://barrigareact.wcaquino.me')
    })

    it('Register', () => {
        cy.get('[href*=registro]').click()
        cy.fixture('userInfo').as('user').then(function () {
            cy.fillRegisterFields(this.user.name, this.user.email, this.user.password)
        })
        cy.get('.btn.btn-primary').click()
        cy.get('.toast-message').should('be.visible')
        cy.get(popupCloseButtonLocator).click()
        cy.get('[href*="login"]').click()
    })

    it('Login', () => {
        cy.fixture('userInfo').as('user').then(function () {
            cy.fillLoginFields(this.user.email, this.user.password)
        })
        cy.get('.btn.btn-block').click()
        cy.wait(500)
        cy.get(popupCloseButtonLocator).click()
    })

    it('Insert new account', () => {
        cy.get(popupCloseButtonLocator).click()
        cy.get(menuSettingsLocator).click()
        cy.get(contasSelectLocator).should('be.visible').click()
        cy.insertAccount(conta1)
        cy.get(successPopupLocator).should('be.visible')
    })

    it('Edit account', () => {
        cy.get(popupCloseButtonLocator).click()
        cy.get(menuSettingsLocator).click()
        cy.get(contasSelectLocator).should('be.visible').click()
        cy.editAccount(conta1, newConta1)
    })

    it('Insert duplicated account', () => {
        cy.get(menuSettingsLocator).click()
        cy.get(contasSelectLocator).should('be.visible').click()
        cy.insertAccount(contaDuplicada)
        cy.get(successPopupLocator).should('be.visible')
        cy.get(popupCloseButtonLocator).click()
        cy.insertAccount(contaDuplicada)
        cy.get(errorPopupLocator).should('be.visible').find(popupCloseButtonLocator).click()
    })

    it('Insert account movementation', () => {
        cy.get('[data-test="menu-movimentacao"]').click()
        cy.insertAccountMovimentation(description, value, involved, newConta1)
    })

    it('Remove account movementation', () => {
        cy.get('[data-test="menu-extrato"]').click()
        cy.removeAccountMovimentation(involved)
        cy.get(successPopupLocator).should('be.visible')
    })
})