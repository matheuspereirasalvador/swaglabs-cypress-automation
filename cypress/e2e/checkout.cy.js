describe('Testando checkout', () => {
    beforeEach(() =>{
        cy.login('problem_user', 'secret_sauce')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
    })

    it('Preencher informações corretamente', () => {
        cy.fillCheckout('Teste', 'da Silva', '40028922')
        cy.get('[data-test="title"]').should('contain', 'Overview')
    });

    it('Tentar avançar sem preencher as informaçoes corretamente', () =>{
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required')
    })

    /* Os dois testes abaixo estão pulando pois estão bloqueados devido aos erros das funções que chegam naquela parte,
    deve ser apagado o 'skip' depois que for corrigido.*/

    it.skip('Finalizar compra', () => {
        cy.fillCheckout('Teste', 'da Silva', '4002892bpois estão2')
        cy.get('[data-test="title"]').should('contain', 'Overview')
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order')
    });

    it.skip('Voltar para a Home após a compra', () => {
        cy.fillCheckout('Teste', 'da Silva', '40028922')
        cy.get('[data-test="title"]').should('contain', 'Overview')
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order')
        cy.get('[data-test="back-to-products"]').click()
        cy.get('[data-test="title"]').should('contain', 'Products')
    });
}) 
