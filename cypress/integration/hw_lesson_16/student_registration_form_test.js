import faker from "faker";

let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let userEmail = faker.internet.email();
// let randomGender = ['#gender-radio-1', '#gender-radio-2', '#gender-radio-3'];
// let randomGenderOfArray = randomGender[Math.floor(Math.random()*randomGender.length)];
// let gender = randomGenderOfArray;
let userNumber = faker.phone.phoneNumber('##########');

let randomYearSelect = faker.datatype.number({ min: 1900, max: 2100 });
let yearSelect = randomYearSelect.toString();

let randomMonthSelect = faker.datatype.number({ min: 0, max: 11 });
let monthSelect = randomMonthSelect.toString();

let randomDaySelect = faker.datatype.number({ min: 1, max: 28 });
let daySelect = randomDaySelect.toString()

describe('HW Lesson 16', () => {
    it('Navigation', () => {
        cy.visit('https://demoqa.com/automation-practice-form')

        // Should be on a new URL which includes '/automation-practice-forms'
        cy.url().should('include', '/automation-practice-form')

    });
    it('Filling in the registration form', () => {

        cy.get('#firstName')
            .type(firstName)
            .should('have.value', firstName);

        cy.get('#lastName')
            .type(lastName)
            .should('have.value', lastName);


        cy.get('#userEmail')
            .type(userEmail)
            .should('have.value', userEmail);

        cy.get('[type="radio"].custom-control-input').first().check({ force: true })

        cy.get('#userNumber')
            .type(userNumber)
            .should('have.value', userNumber);

        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__year-select')
            .select(yearSelect).should('have.value', yearSelect)

        cy.get('.react-datepicker__month-select')
            .select(monthSelect).should('have.value', monthSelect)

        cy.get('.react-datepicker__week').contains(daySelect).click()

    });

    it('File Upload using cypress-file-upload npm package', () => {
        const filepath = './fun.jpg'
        cy.get('input[type="file"]').attachFile(filepath)
    })

    it('checkbox test', () => {

        cy.get('[type="checkbox"]').check({ force: true })
            .should('be.checked')

    })

    it('Add curent adress', () => {
        cy.get('#stateCity-wrapper').type('NCR{enter}')
        cy.get('#city').type('Noida{enter}')
    })

    it('submit', () => {

        cy.get('#submit').click();

        cy.get('table').contains('td', firstName).should('be.visible');
        cy.get('table').contains('td', lastName).should('be.visible');
        cy.get('table').contains('td', userEmail).should('be.visible');
        cy.get('table').contains('td', 'Male').should('be.visible');
        cy.get('table').contains('td', userNumber).should('be.visible');
        cy.get('table').contains('td', daySelect, monthSelect, yearSelect).should('be.visible');
        cy.get('table').contains('td', 'Sports').should('be.visible');
        cy.get('table').contains('td', 'NCR', 'Noida');


    })

})



