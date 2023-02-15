/// <reference types="cypress" />

describe('Youtube App', () => {
  beforeEach(() => {
    cy.intercept('GET', /(mostPopular)/g, {
      fixture: 'popular.json',
    });
    cy.intercept('GET', /(search)/g, {
      fixture: 'search.json',
    });
    cy.viewport(1200, 800);
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByText('Youtube').should('exist');
  });

  it('shows popular videos first', () => {
    cy.findByText('Survive 100 Days In Circle, Win $500,000').should('exist');
  });
});
