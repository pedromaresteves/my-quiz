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

Cypress.Commands.add('answerQuestion', () => {
    cy.get('button.answer-btn').then($elementList => {
        const min = Math.ceil(1);
        const max = Math.floor($elementList.length + 1);
        const answerPosition = Math.floor(Math.random() * ((max) - min + 1) + min);
        if(answerPosition <= $elementList.length) {
            cy.get(`.answer-btn:nth-child(${answerPosition})`).click()
        }
        cy.get('.next-question-btn').click()
    })
})