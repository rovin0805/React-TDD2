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

  it('searches by keyword', () => {
    cy.findByPlaceholderText('Search...').type('bts');
    cy.findByRole('button').click();
    cy.findByText('Search Result1').should('exist');
  });

  it('goes to video detail page', () => {
    cy.findAllByRole('listitem').first().click();
    cy.findByTitle('Survive 100 Days In Circle, Win $500,000').should('exist');
    cy.findByText('Survive 100 Days In Circle, Win $500,000').should('exist');
    cy.findByText(/(THE LAST OF US Trailer)/g).should('exist');
  });
});
