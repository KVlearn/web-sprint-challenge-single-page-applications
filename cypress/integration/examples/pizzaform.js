describe ("Testing Pizza OrderForm",function(){
    beforeEach(()=>{
        cy.visit("http://localhost:3002/");
    });
    it("Go to Order form and place order",function(){
        cy.get('[data-cy="order"]').click();
        cy.get('[data-cy="name"]').type("Starman").should("have.value", "Starman");
        cy.get('[data-cy="email"]').type("star@gmail.com").should("have.value", "star@gmail.com");
        cy.get('[data-cy="size"]').select("Small").should("have.value", "Small");
        cy.screenshot("image before submit");
        cy.get('[data-cy="add"]').click();
        cy.get('[data-cy="confirm"]').click();
        cy.get('[data-cy="congrats"]').should("exist");
       
    })   
    it("Go to Order form case for toppings",function(){
        cy.get('[data-cy="order"]').click();
        cy.get('[data-cy="name"]').type("Marsman").should("have.value", "Marsman");
        cy.get('[data-cy="email"]').type("mars@gmail.com").should("have.value", "mars@gmail.com");
        cy.get('[data-cy="size"]').select("Large").should("have.value", "Large");

        //Check choosing of sauce radio button
        // cy.get("#ranch").check().should("be.checked");
        // cy.get('[type="radio"]').first().check()  // Check first radio element
        cy.get('[type="radio"]').check('Garlic Ranch')
        //Check choosing of toppings
        cy.get("#olive").check().should("be.checked")
        cy.get("#onion").check().should("be.checked")
        cy.get("#pepper").check().should("be.checked")

        cy.screenshot("image before submit");
        cy.get('[data-cy="add"]').click();
        cy.get('[data-cy="confirm"]').click();
        cy.get('[data-cy="congrats"]').should("exist");
       
    })      
    it("Go to Order form case for error when count > 50",function(){
        cy.get('[data-cy="order"]').click();
        cy.get('[data-cy="name"]').type("Marsman").should("have.value", "Marsman");
        cy.get('[data-cy="email"]').type("mars@gmail.com").should("have.value", "mars@gmail.com");
        cy.get('[data-cy="size"]').select("Large").should("have.value", "Large");

        //Check choosing of sauce radio button
         cy.get('[type="radio"]').check('Garlic Ranch')
        //Check choosing of toppings
        cy.get("#olive").check().should("be.checked")
        cy.get("#onion").check().should("be.checked")
        cy.get("#pepper").check().should("be.checked")
        cy.get("#count").type("60").should("have.value","60");
        cy.screenshot("image before submit");
        cy.get('[data-cy="add"]').click();
        cy.get('[data-cy="confirm"]').click();
        cy.get('[data-cy="congrats"]').should("exist");
        
    }) 

});