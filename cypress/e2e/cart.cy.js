describe('Testando Carrinho', () => {
    beforeEach(() =>{
        cy.login('problem_user', 'secret_sauce')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
    })

    it('Remover item dentro da tela do carrinho', () => {
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')
    });

    it('Navegar para detalhes via carrinho', () => {
        //Conferir se as informações são do mesmo produto
        cy.get('[data-test="inventory-item-name"]').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack')
    })

    it('Voltar para a loja (Continue Shopping)', () => {
        cy.get('[data-test="continue-shopping"]').click()
        cy.get('[data-test="title"]').should('contain', 'Products')
    })

    it('Iniciar checkout', () =>  {
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="title"]').should('contain', 'Checkout')
    })
})