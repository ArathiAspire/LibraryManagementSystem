import { test, expect } from "@playwright/test";

test("Librarian test", async ({ page }) => {
  /*Book Details */
  const bookTitle = "Balyakalasakhi";
  /*Student Detail */
  const firstName = "Rajani";
  const lastName = "Pai";
  const emailId = "rajanipai@gmail.com";
  const department = "MCA";
  const batch = "2022";
  const contact = "1234567893";
  const studentName = "Rajani Pai";
  /*Locators */
  const librarianButton = page.getByRole("link", { name: "Librarian" });
  const loginButton = page.locator("[type='submit']");
  const emailField = page.locator("#email");
  const passwordField = page.locator("#password");
  const profileIcon = page.locator("[id='composition-button']");
  const booksLink = page.locator("[href='/librarian/booklist']");
  const studentsLink = page.locator("[href='/librarian/studentlist']");
  const studentsFullName = page.locator("//tbody/tr/td[2]");
  const nextArrowStudentPage = page.locator("[aria-label='next page']");
  const addStudentButton = page.locator(
    "//button[normalize-space()='Add Students']"
  );
  const firstNameInput = page.locator("[placeholder='Enter First name']");
  const lastNameInput = page.locator("[placeholder='Enter last name']");
  const emailInput = page.locator("[placeholder='Enter email']");
  const departmentNameInput = page.locator("[placeholder='Enter Department']");
  const batchInput = page.locator("[placeholder='Enter batch']");
  const contactInput = page.locator("[placeholder='Enter contact']");
  const addButton = page.locator("//button[normalize-space()='Add']");
  const editStudentIcon = page.locator(
    "//tbody//tr[contains(td[2],'Rajani Pai')]//button[2]"
  );
  const updateButton = page.locator("//button[normalize-space()='Update']");
  const deleteStudentIcon = page.locator(
    "//tbody//tr[contains(td[2],'Rajani Pai')]//button[1]"
  );
  const deleteStudentButton = page.locator(
    "//button[normalize-space()='Delete']"
  );
  const issueBookButton = page.locator(
    "//button[normalize-space()='Issue Book']"
  );
  const issueDateInput = page.locator("[placeholder='Enter date of issue']");
  const issueDropDowns = page.locator(
    "[class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl  css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root']"
  );
  const bookBalyakalasakhiOption = page.locator(
    "//li[normalize-space()='Balyakalasakhi']"
  );
  const studentDropdown = page.locator(
    "//body[1]/div[3]/div[3]/div[1]/div[1]/form[1]/div[3]/div[1]/div[1]"
  );
  const studentRajaniOption = page.locator(
    "//li[normalize-space()='Rajani Pai']"
  );
  const issueButton = page.locator("//button[normalize-space()='Issue']");
  const bookEntriesLink = page.locator("[href='/librarian/bookentries']");
  const bookEntriesIssuedToName = page.locator("//tbody/tr/td[4]");
  const returnBookButton = page.locator(
    "//button[normalize-space()='Return Book']"
  );

  const returnBookDate = page.locator("[placeholder='Enter date of return']");
  const returnBookDropDowns = page.locator(
    "[class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl  css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root']"
  );

  const returnButton = page.locator("//button[normalize-space()='Return']");
  /*Hit the Url */
  await page.goto("http://localhost:3000/");
  await librarianButton.click();
  await page.waitForURL("http://localhost:3000/signin");
  await expect(page).toHaveURL("http://localhost:3000/signin");
  await emailField.fill("akshay@gmail.com");
  await passwordField.fill("akshay@123");
  /* Submit Button */
  await loginButton.click();
  /*icon button*/
  await profileIcon.click();
  await page.waitForURL("http://localhost:3000/librarian");
  await expect(page).toHaveURL("http://localhost:3000/librarian");
  await expect(booksLink).toBeVisible();
  await booksLink.click();
  const addedBookTitle = page.locator("td:nth-child(2)");
  let bookTitleFound = false;

  while (!bookTitleFound) {
    const titlesOnCurrentPage = await addedBookTitle.allTextContents();

    // Check if the desired book title exists in the current page
    if (titlesOnCurrentPage.includes(bookTitle)) {
      bookTitleFound = true;
      expect(bookTitleFound).toBe(true);
      break;
    }

    const nextPageButtonDisabledAttr = await nextArrowStudentPage.getAttribute(
      "disabled"
    );
    if (nextPageButtonDisabledAttr === "true") {
      // If the "Next Page" button is disabled and the book title is not found, exit the loop
      break;
    } else {
      // Click the "Next Page" button to go to the next page
      await nextArrowStudentPage.click();
      // Wait for some time to allow the next page to load
      await page.waitForTimeout(2000);
      // Adjust the time as needed
    }
  }
  await expect(studentsLink).toBeVisible();
  await studentsLink.click();
  await page.waitForURL("http://localhost:3000/librarian/studentlist");
  await expect(page).toHaveURL("http://localhost:3000/librarian/studentlist");
  //Add New Student
  await addStudentButton.click();

  await firstNameInput.fill(firstName);
  await lastNameInput.fill(lastName);
  await emailInput.fill(emailId);
  await departmentNameInput.fill(department);
  await batchInput.fill(batch);
  await contactInput.fill(contact);
  await addButton.click();

  // Get Students Name
  await page.waitForTimeout(2000);
  let studentNameFound = false;

  while (!studentNameFound) {
    const namesOnCurrentPage = await studentsFullName.allTextContents();

    // Check if the desired Student name exists in the current page
    if (namesOnCurrentPage.includes(studentName)) {
      studentNameFound = true;
      expect(studentNameFound).toBe(true);
      break;
    }

    const nextPageButtonDisabledAttr = await nextArrowStudentPage.getAttribute("disabled");
    if (nextPageButtonDisabledAttr === "true") {
      // If the "Next Page" button is disabled and the student name is not found, exit the loop
      break;
    } else {
      // Click the "Next Page" button to go to the next page
      await nextArrowStudentPage.click();
      // Wait for some time to allow the next page to load
      await page.waitForTimeout(2000);
      // Adjust the time as needed
    }
  }
  /*Edit Student */
  await editStudentIcon.click();
  await departmentNameInput.fill("");
  await departmentNameInput.fill("B.Tech");
  await updateButton.click();
  await page.waitForTimeout(3000);
  /*Issue Book */
  await issueBookButton.click();
  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate); // "2022-06-17"
  await issueDateInput.fill(currentDate);
  await issueDropDowns.first().click();
  await bookBalyakalasakhiOption.click();
  await studentDropdown.click();
  await studentRajaniOption.click();
  await issueButton.click();
  await page.waitForTimeout(2000);

  /*Book Entries */
  await bookEntriesLink.click();

  let studentEntryName = false;
  let entryName = "RajaniPai";
  while (!studentEntryName) {
    const namesOnCurrentPage = await bookEntriesIssuedToName.allTextContents();

    // Check if the desired Student name exists in the current page
    if (namesOnCurrentPage.includes(entryName)) {
      studentEntryName = true;
      expect(studentNameFound).toBe(true);
      break;
    }

    const nextPageButtonDisabledAttr = await nextArrowStudentPage.getAttribute(
      "disabled"
    );
    if (nextPageButtonDisabledAttr === "true") {
      // If the "Next Page" button is disabled and the student name is not found, exit the loop
      break;
    } else {
      // Click the "Next Page" button to go to the next page
      await nextArrowStudentPage.click();
      // Wait for some time to allow the next page to load
      await page.waitForTimeout(2000);
      // Adjust the time as needed
    }
  }
  /*Return Book */
  await page.waitForTimeout(2000);
  await returnBookButton.click();
  await returnBookDate.fill(currentDate);
  await returnBookDropDowns.first().click();
  await bookBalyakalasakhiOption.click();
  await page.waitForTimeout(2000);
  await returnButton.click();

  /*Book Entries */
  await bookEntriesLink.click();

  while (!studentEntryName) {
    const namesOnCurrentPage = await bookEntriesIssuedToName.allTextContents();

    // Check if the desired Student name exists in the current page
    if (namesOnCurrentPage.includes(entryName)) {
      studentEntryName = true;
      expect(studentNameFound).toBe(true);
      break;
    }

    const nextPageButtonDisabledAttr = await nextArrowStudentPage.getAttribute(
      "disabled"
    );
    if (nextPageButtonDisabledAttr === "true") {
      // If the "Next Page" button is disabled and the student name is not found, exit the loop
      break;
    } else {
      // Click the "Next Page" button to go to the next page
      await nextArrowStudentPage.click();
      // Wait for some time to allow the next page to load
      await page.waitForTimeout(2000);
      // Adjust the time as needed
    }
  }
  

  /*Delete Student */
  await expect(studentsLink).toBeVisible();
  await studentsLink.click();
  await page.waitForURL("http://localhost:3000/librarian/studentlist");
  await expect(page).toHaveURL("http://localhost:3000/librarian/studentlist");
  await page.waitForTimeout(2000);
  let newStudentNameFound = false;
  while (!newStudentNameFound) {
    const namesOnCurrentPage = await studentsFullName.allTextContents();

    // Check if the desired Student name exists in the current page
    if (namesOnCurrentPage.includes(studentName)) {
      newStudentNameFound = true;
      expect(newStudentNameFound).toBe(true);
      break;
    }

    const nextPageButtonDisabledAttr = await nextArrowStudentPage.getAttribute(
      "disabled"
    );
    if (nextPageButtonDisabledAttr === "true") {
      // If the "Next Page" button is disabled and the student name is not found, exit the loop
      break;
    } else {
      // Click the "Next Page" button to go to the next page
      await nextArrowStudentPage.click();
      // Wait for some time to allow the next page to load
      await page.waitForTimeout(2000);
      // Adjust the time as needed
    }
  }

  await deleteStudentIcon.click();
  await deleteStudentButton.click();
  //SignOut
  await page.locator("[id='composition-button']").click();
  await page
    .locator(
      "div[class='MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-hyum1k-MuiToolbar-root'] div li:nth-child(2)"
    )
    .click();
  await page.waitForTimeout(5000);
});
