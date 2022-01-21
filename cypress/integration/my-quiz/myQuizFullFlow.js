const {testData} = require('../../fixtures/myQuizGameSettings.json')

describe('Full Quiz Flow', () => {
  testData.forEach(data => {
    it(`Complete a ${data.numOfQuestions} question quiz`, () => {
      cy.visit('')
      cy.get('#home button').click()
      cy.get('input[name="name"]')
        .clear()
        .should('have.value', '')
        .type(data.playerName)
        .should('have.value', data.playerName);
      cy.get('[name="numberOfQuestions"]').select(`${data.numOfQuestions}`)
      cy.get('button').click()
      cy.get('#start-game').click()
      cy.get('#possible-answers-list', {timeout: 5000})
      for(let i = 0; i < data.numOfQuestions; i++){
        cy.answerQuestion()
      }
      cy.get('h2').should('contain.text', data.playerName)
      for(let i = 0; i < data.numOfQuestions; i++){
        cy.get(`tr:nth-child(${2+i}) td:nth-child(2)`).then(correctAnswer => {
          const correctAnswerText = correctAnswer.text();
          cy.get(`tr:nth-child(${2+i}) td:nth-child(3)`).then(playerGuess => {
            const playerGuessText = playerGuess.text();
            if(playerGuessText === correctAnswerText) {
              expect(playerGuess).to.have.class('correct')
            } else {
              expect(playerGuess).to.have.class('incorrect')
            }
          })
        })
      }
    });
  });
})