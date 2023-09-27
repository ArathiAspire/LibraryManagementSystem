import { test, expect } from "@playwright/test";

test("Admin test", async ({ page }) => {
  /*Book Details */
  const bookTitle = "To Kill a Mockingbird";
  const authorName = "Harper Lee";
  const Genre = "Classic Fiction";
  const editedGenre = "Novel";
  const studentName = "Dilna Daison";

  /*Locators */
  const adminButton = page.getByRole("link", { name: "Admin" });
  const loginButton = page.locator("[type='submit']");
  const emailField = page.locator("#email");
  const passwordField = page.locator("#password");
  const addBookButton = page.locator("//button[normalize-space()='Add Book']");
  const bookTitleInput = page.locator("[placeholder='Enter Book Title']");
  const bookAuthorInput = page.locator("[placeholder='Enter Book Author']");
  const bookGenreInput = page.locator("[placeholder='Enter Book Genre']");
  const addButton = page.locator("//button[normalize-space()='Add']");
  // const toastMessage = page.locator(".Toastify__toast-container Toastify__toast-container--top-center .Toastify__toast Toastify__toast-theme--light Toastify__toast--success Toastify__toast--close-on-click Toastify--animate Toastify__bounce-enter--top-center");
  // const toastMessageText = page.locator("[class='Toastify__toast-body'] 'div:has-text('Book Added Successfully')")
  // ('div:has-text ("Search")')
  const toastMessage = page.locator(
    "[class='Toastify__toast-body'] [style*=none]"
  );
  const nextPageButton = page.locator("//button[normalize-space()='next']");
  const addedBookRow = page.locator("table tbody tr");
  const deleteIcon = page.locator("//tbody/tr[last()]/td[last()]/button[1]");
  const deleteButton = page.locator(
    "button[class='bg-red-600 hover:bg-red-600 text-white py-1 px-3 rounded-md']"
  );
  const editIcon = page.locator("//tbody/tr[last()]/td[last()]/button[2]");
  const editButton = page.locator("button[type='submit']");
  const viewStudentLink = page.getByRole("link", { name: "View Students" });
  const studentsFullName = page.locator("//tbody/tr/td[2]");
  const nextArrowStudentPage = page.locator("[aria-label='next page']");
  /*Hit the Url */
  await page.goto("http://localhost:3000/");
  await adminButton.click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL("http://localhost:3000/signin");
  await emailField.fill("admin@gmail.com");
  await passwordField.fill("admin@123");
  /* Submit Button */
  await loginButton.click();
  /*icon button*/
  await page.locator("[id='composition-button']").click();
  await page.waitForTimeout(5000);
  await page.waitForURL("http://localhost:3000/admin");
  await expect(page).toHaveURL("http://localhost:3000/admin");
  await expect(addBookButton).toBeVisible();
  await addBookButton.click();
  await expect(bookTitleInput).toBeVisible();
  await bookTitleInput.fill(bookTitle);
  await bookAuthorInput.fill(authorName);
  await bookGenreInput.fill(Genre);
  await addButton.click();
  await page.waitForTimeout(5000);

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

    const nextPageButtonDisabledAttr = await nextPageButton.getAttribute(
      "disabled"
    );
    if (nextPageButtonDisabledAttr === "true") {
      // If the "Next Page" button is disabled and the book title is not found, exit the loop
      break;
    } else {
      // Click the "Next Page" button to go to the next page
      await nextPageButton.click();
      // Wait for some time to allow the next page to load
      await page.waitForTimeout(2000);
      // Adjust the time as needed
    }
  }
  //EDIT OPERATION
  await expect(editIcon).toBeVisible({ timeout: 2000 });
  await editIcon.click();

  await bookGenreInput.fill("");
  await bookGenreInput.fill(editedGenre);
  await editButton.click();
  //DELETE OPERATION

  await expect(deleteIcon).toBeVisible();
  await deleteIcon.click();
  await expect(deleteButton).toBeVisible({ timeout: 2000 });
  await deleteButton.click();
  await expect(viewStudentLink).toBeVisible({ timeout: 2000 });
  // await toastMessage.waitFor({state:"visible"});
  // await expect(toastMessage).toBeVisible({timeout: 10000});
  // console.log(toastMessageText.getByAltText());

  // // await page.waitForTimeout(3000);
  await viewStudentLink.click();
  await page.waitForURL("http://localhost:3000/admin/studentlist");
  await expect(page).toHaveURL("http://localhost:3000/admin/studentlist");

  // // Get Students Name

  // let studentNameFound = false;

  // while (!studentNameFound) {
  //   const namesOnCurrentPage = await studentsFullName.allTextContents();

  //   // Check if the desired Student name exists in the current page
  //   if (namesOnCurrentPage.includes(studentName)) {
  //     studentNameFound = true;
  //     expect(studentNameFound).toBe(true);
  //     break;
  //   }

  //   const nextPageButtonDisabledAttr = await nextArrowStudentPage.getAttribute(
  //     "disabled"
  //   );
  //   if (nextPageButtonDisabledAttr === "true") {
  //     // If the "Next Page" button is disabled and the student name is not found, exit the loop
  //     break;
  //   } else {
  //     // Click the "Next Page" button to go to the next page
  //     await nextArrowStudentPage.click();
  //     // Wait for some time to allow the next page to load
  //     await page.waitForTimeout(2000);
  //     // Adjust the time as needed
  //   }
  // }

  await page.getByRole("link", { name: "Add Librarian" }).click();
  await page.waitForURL("http://localhost:3000/admin/addlibrarian");
  await expect(page).toHaveURL("http://localhost:3000/admin/addlibrarian");
  //SignOut
  await page.locator("[id='composition-button']").click();
  await page
    .locator(
      "div[class='MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-hyum1k-MuiToolbar-root'] div li:nth-child(2)"
    )
    .click();
  await page.waitForTimeout(5000);
});
