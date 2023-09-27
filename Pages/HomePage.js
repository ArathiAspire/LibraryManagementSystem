exports.HomePage=
class HomePage{

    constructor(page){
        this.page=page;
        this.adminButton="link", { name: "Admin" };
        this.librarianButton="link", { name: "Librarian" };
        this.usernameInput ="#email";
        this.passwordInput="#password";
        this.addBookButton ="//button[normalize-space()='Add Book']";

    }

    async launchUrl(){
        await this.page.goto("http://localhost:3000/");
    }

    async clickOnAdminButton(){
        await this.page.locator(this.adminButton).click();
    }

    async clickOnLibrarianButton(){
        await this.page.locator(this.adminButton).click();
    }



}