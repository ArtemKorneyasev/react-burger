describe('Test for drag and drop ingredients to constructor', () => {
    before(() => cy.visit('http://localhost:3000'));

    it('should open constructor page by default', () => {
        cy.contains('Соберите бургер');
    });

    it('should drag and drop ingredients to constructor', () => {
        cy.get('[class^=burger-constructor_ingredientsWrapper]').first().as('dropSection');

        cy.get('div').contains('Краторная булка N-200i').trigger('dragstart');
        cy.get('@dropSection').trigger('drop');

        cy.get('div').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart');
        cy.get('@dropSection').trigger('drop');

        cy.get('div').contains('Соус фирменный Space Sauce').trigger('dragstart');
        cy.get('@dropSection').trigger('drop');

        cy.get('div').contains('Сыр с астероидной плесенью').trigger('dragstart');
        cy.get('@dropSection').trigger('drop');

        cy.get('div').contains('Соус фирменный Space Sauce').trigger('dragstart');
        cy.get('@dropSection').trigger('drop');
    });
});
