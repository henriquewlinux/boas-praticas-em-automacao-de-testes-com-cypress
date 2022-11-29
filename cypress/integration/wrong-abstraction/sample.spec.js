describe('Wrong abstraction bad practice', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/search**').as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@getStories')
  })

  const search = ['cypress', 'selenium', 'playwright']

  search.forEach(world => {
    it.only('uses custom command for assertion just for the sake of reusability', () => {
      cy.search(world)
      cy.wait('@getStories')

      cy.get('.table-row').its('length').should('be.at.least', 1)
    })
  })
})
