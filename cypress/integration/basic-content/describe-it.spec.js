// <reference types="cypress" />

it.skip('A external test...', () => {

})


describe('Should group tests...', () => {
    describe('Should group more specific tests...', () => {
        it('A specific test...', () => {

        })
    })

    describe('Should group more specific tests 2...', () => {
        it.only('A specific test...', () => {
            
        })
    })

    it.skip('A internal test...', () => {
        
    })
})