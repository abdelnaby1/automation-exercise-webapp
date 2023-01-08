import {Locator, Page} from "@playwright/test"
class Register{
    readonly page: Page;

    readonly url = '/login'
    readonly signUpForm: Locator;
    readonly signUpFormTitile: Locator;

    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly sginupBtn: Locator;

    //aaccount info
    readonly accInfoHeading: Locator
    readonly genderField: Locator;
    readonly passwordField: Locator;
    readonly daysField: Locator;
    readonly monthsField: Locator;
    readonly yearsField: Locator;

    readonly newsleeterField: Locator;
    readonly optionField: Locator;

    //address info
    readonly firstnameField: Locator;
    readonly lastnameField: Locator;
    readonly companyField: Locator;
    readonly addressField: Locator;
    readonly address2Field: Locator;
    readonly countryField: Locator;
    readonly stateField: Locator;
    readonly cityField: Locator;
    readonly zipcodeField: Locator;
    readonly mobileNumberField: Locator;
    readonly createBtn: Locator;


    readonly accountMsg: Locator;
    readonly continueBtn: Locator;


    readonly accDeletedMsg: Locator;

    readonly signupErrorMsg: Locator;

    constructor(page: Page){
        this.page = page;
        this.signUpForm = this.page.locator('.signup-form');
        this.signUpFormTitile = this.page.locator('.signup-form h2');
        this.nameField = this.page.locator("input[data-qa='signup-name']");
        this.emailField = this.page.locator("input[data-qa='signup-email']");
        this.sginupBtn = this.page.locator('button[data-qa="signup-button"]');
        this.accInfoHeading = this.page.locator('.login-form b:has-text("Enter Account Information")');
        this.genderField = this.page.locator('#id_gender1');
        this.passwordField = this.page.locator('input[data-qa="password"]');
        this.daysField = this.page.locator("select[data-qa='days']");
        this.monthsField = this.page.locator("select[data-qa='months']");
        this.yearsField = this.page.locator("select[data-qa='years']");
        this.newsleeterField = this.page.locator("#newsletter");
        this.optionField = this.page.locator("#optin");

        this.firstnameField = this.page.locator('input[data-qa="first_name"]');
        this.lastnameField = this.page.locator('input[data-qa="last_name"]');
        this.companyField = this.page.locator('input[data-qa="company"]');
        this.addressField = this.page.locator('input[data-qa="address"]');
        this.address2Field = this.page.locator('input[data-qa="address2"]');
        this.countryField = this.page.locator("select[data-qa='country']");
        this.stateField = this.page.locator('input[data-qa="state"]');
        this.cityField = this.page.locator('input[data-qa="city"]');
        this.zipcodeField = this.page.locator('input[data-qa="zipcode"]');
        this.mobileNumberField = this.page.locator('input[data-qa="mobile_number"]');
        this.createBtn = this.page.locator('button[data-qa="create-account"]')
        
        this.accountMsg = this.page.locator("h2.title");
        this.continueBtn = this.page.locator('a:has-text("Continue")');

        this.signupErrorMsg = this.page.locator('p[style="color: red;"]:below(input[data-qa="signup-email"])');


        
            
    }

    async signup(name: string,email: string){
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.sginupBtn.click();
    }
    async completeSignup(
        password:string,day:string,month:string,year:string,
        firstname:string,lastname:string,company:string,
        address:string,address2:string,country:string,state:string,
        city:string,zipcode:string,mobileNumber:string
        )
    {
        await this.passwordField.fill(password);
        await this.daysField.selectOption({value: day});
        await this.monthsField.selectOption({value: month});
        await this.yearsField.selectOption({value: year});
        await this.newsleeterField.click();
        await this.optionField.click();
        await this.firstnameField.fill(firstname);
        await this.lastnameField.fill(lastname);
        await this.companyField.fill(company);
        await this.addressField.fill(address);
        await this.address2Field.fill(address2);
        await this.countryField.selectOption({value: country});
        await this.stateField.fill(state);
        await this.cityField.fill(city);
        
        await this.zipcodeField.fill(zipcode);
        await this.mobileNumberField.fill(mobileNumber);
        await this.createBtn.click();
    }
    async continue(){
        await this.continueBtn.click();
    }
   
}

export default Register