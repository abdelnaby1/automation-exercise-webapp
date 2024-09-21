import { Locator, Page } from "@playwright/test";
import { Person } from "../types";
class Register {
  readonly page: Page;

  readonly url = "/login";
  readonly signUpForm: Locator;
  readonly signUpFormTitile: Locator;

  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly sginupBtn: Locator;

  //aaccount info
  readonly accInfoHeading: Locator;
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

  constructor(page: Page) {
    this.page = page;
    this.signUpForm = this.page.locator(".signup-form");
    this.signUpFormTitile = this.page.locator(".signup-form h2");
    this.nameField = this.page.locator("input[data-qa='signup-name']");
    this.emailField = this.page.locator("input[data-qa='signup-email']");
    this.sginupBtn = this.page.locator('button[data-qa="signup-button"]');
    this.accInfoHeading = this.page.locator(
      '.login-form b:has-text("Enter Account Information")'
    );
    this.genderField = this.page.locator("#id_gender1");
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
    this.mobileNumberField = this.page.locator(
      'input[data-qa="mobile_number"]'
    );
    this.createBtn = this.page.locator('button[data-qa="create-account"]');

    this.accountMsg = this.page.locator("h2.title");
    this.continueBtn = this.page.locator('a:has-text("Continue")');

    this.signupErrorMsg = this.page.locator(
      'p[style="color: red;"]:below(input[data-qa="signup-email"])'
    );
  }

  async signup(name: string, email: string) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.sginupBtn.click();
  }
  async completeSignup(person: Person) {
    await this.passwordField.fill(person.password);
    await this.daysField.selectOption({ value: person.dayOfBirth });
    await this.monthsField.selectOption({ value: person.monthOfBirth });
    await this.yearsField.selectOption({ value: person.yearOfBirth });
    await this.newsleeterField.click();
    await this.optionField.click();
    await this.firstnameField.fill(person.firstname);
    await this.lastnameField.fill(person.lastname);
    await this.companyField.fill(person.company);
    await this.addressField.fill(person.address);
    await this.address2Field.fill(person.address2);
    await this.countryField.selectOption({ value: person.country });
    await this.stateField.fill(person.state);
    await this.cityField.fill(person.city);

    await this.zipcodeField.fill(person.zipcode);
    await this.mobileNumberField.fill(person.mobileNumber);
    await this.createBtn.click();
  }
  async continue() {
    await this.continueBtn.click();
  }
}

export default Register;
