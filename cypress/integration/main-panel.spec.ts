describe('Pizza-form select toppings and price Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('New')
    cy.contains('Select toppings')
  })
  it('input pizza name ',()=>{
    cy.get('[formControlName=name]').type('aa')
  })
  it('select topping', ()=> {
    cy.get('[formControlName=toppings]').contains('anchovy').click()
    cy.get('[formControlName=toppings]').contains('anchovy').click()
    cy.get('[formControlName=toppings]').contains('bacon').click()
    cy.get('[formControlName=toppings]').contains('basil').click()
  })
  it('assert price', ()=> {
    cy.get('[formControlName=price]').invoke('prop', 'value')
      .should('contains', '4,000원')
  })

  it('Selected toppings overlay value is 2', ()=> {
    cy.get('selected-topping-item').eq(0).contains(2)
    cy.get('selected-topping-item').eq(0).contains('anchovy')
  })
  it('Selected toppings overlay value is 1', ()=> {
    cy.get('selected-topping-item').eq(1).contains(1)
    cy.get('selected-topping-item').eq(1).contains('bacon')
  })
  it('Selected toppings overlay value is 1', ()=> {
    cy.get('selected-topping-item').eq(2).contains(1)
    cy.get('selected-topping-item').eq(2).contains('basil')
  })
  it('Create pizza', ()=> {
    cy.contains('Create Pizza').click()
    cy.get('[class="flex flex-wrap -m-1"]').contains('aa')
  })

/*
    cy.get('[formControlName=price]').find('input').then(input => {
      cy.wrap(input).invoke('prop','value').should('contains','3800')
    })
*/
})
