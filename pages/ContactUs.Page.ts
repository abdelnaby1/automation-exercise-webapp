import { Locator, Page } from "@playwright/test";

class ContactUs{
    readonly page: Page;
    readonly title: Locator;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly subjectField: Locator;
    readonly messageField: Locator;
    readonly fileField: Locator;
    readonly submitBtn: Locator;

    readonly status: Locator;
    readonly homeBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = this.page.locator('.contact-form h2');
        this.nameField = this.page.locator('input[data-qa="name"]');
        this.emailField = this.page.locator('input[data-qa="email"]');
        this.subjectField = this.page.locator('input[data-qa="subject"]');
        this.messageField = this.page.locator('textarea[data-qa="message"]');
        this.fileField = this.page.locator('input[name="upload_file"]');
        this.submitBtn = this.page.locator('input[data-qa="submit-button"]');

        this.status = this.page.locator('.status');
        this.homeBtn = this.page.locator('#form-section a[href="/"]');
    }
    async fillTheForm(name: string,email: string,subject: string,message: string,file: string){
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.subjectField.fill(subject);
        await this.messageField.fill(message);
        this.page.on("filechooser", async (filechooser) => {
            await filechooser.setFiles(file);
        });
        this.page.on("dialog", async (dialog) =>{
            await dialog.accept();
        })
        await this.fileField.click();
        await this.submitBtn.click();
    }
    async clickHomeBtn(){
        await this.homeBtn.click();
    }
}

export default ContactUs