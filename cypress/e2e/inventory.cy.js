describe('Testando Catálogo de Produtos', () => {
    beforeEach(() => {
        cy.login('problem_user', 'secret_sauce')
    })

    it('Adicionar produto ao carrinho via Home (Teste de confirmação)', () => {
        /*No primeiro teste estava dando erro para adicionar esses 3 produtos ao carrinho, 
        então deixei eles separados para que eles não interfiram nos outros testes*/
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('.shopping_cart_badge').should('contain', '1')

        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('.shopping_cart_badge').should('contain', '2')

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('.shopping_cart_badge').should('contain', '3')
    })

    it ('Adicionar o produto ao carrinho via Home (Demais produtos)', () => {
        /* Estou fazendo esse teste para os demais produtos que podem parar de funcionar futuramente,
         quando o desenvolvedor for consertar os de cima (teste regressivo) */
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('contain', '1')
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_badge').should('contain', '2')
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_badge').should('contain', '3')
    })

    it ('Remover produto do carrinho via Home', () => {
        // Aqui estou testando apenas os produtos que consegui adicionar no teste anterior
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')

        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="remove-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')
    })

    it ('Visualizar detalhes do produto', () => {
        // Testando se os links dos produtos estão levando para a página correta (informações do produto)
        cy.get('[data-test="item-4-title-link"]').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack')

        cy.go(-1)
        cy.get('[data-test="item-0-title-link"]').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bike Light')

        cy.go(-1)
        cy.get('[data-test="item-1-title-link"]').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bolt T-Shirt')

        cy.go(-1)
        cy.get('[data-test="item-5-title-link"]').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Fleece Jacket')
        
        cy.go(-1)
        cy.get('[data-test="item-2-title-link"]').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Onesie')

        cy.go(-1)
        cy.get('[data-test="item-3-title-link"]').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Test.allTheThings() T-Shirt (Red)')
    })

    it ('Filtrar produtos por preço (maior para o menor)', () => {
        // Filtrando produtos por preço em ordem crescente
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        cy.get('.inventory_item_price').eq(0).should('contain', '7.99')
    })

    it ('Filtrar produtos por valor (maior para o menor)', () =>{
        // Filtrando produtos por preço em ordem decrescente
        cy.get('[data-test="product-sort-container"]').select('Price (high to low)')
        cy.get('.inventory_item_price').eq(0).should('contain', '49.99')
    })

    it ('FIltrar produtos por ordem alfabética (A - Z)', () => {
        // FIltrando produtos por ordem alfabética
        // Observação: Os produtos já vem ordenados em ordem alfabética por padrão, então vamos tirar dessa ordem e depois clicar no botão
        cy.get('[data-test="product-sort-container"]').select('Name (Z to A)')

        //Aqui vou testar se essa "reordenação" funcionou
        cy.get('.inventory_item_name').eq(0).should('contain', 'Test.allTheThings() T-Shirt (Red)')

        //Aqui é o teste de verdade
        cy.get('[data-test="product-sort-container"]').select('Name (A to Z)')
        cy.get('.inventory_item_name').eq(0).should('contain', 'Sauce Labs Backpack')
        
    })
    
    it ('Filtrar produtos por ordem alfabética inversa (Z - A)', () => {
        //Ordenando e verificando se o primeiro produto é o com as iniciais mais distantes do A
        cy.get('[data-test="product-sort-container"]').select('Name (Z to A)')
        cy.get('.inventory_item_name').eq(0).should('contain', 'Test.allTheThings() T-Shirt (Red)')
    })

})