await page.locator()
await page.locator("ff").all() // returns a list of locators
await locator.selectOption({value:"",})
await locator.selectOption([{value:"",}, {label:""},{index: 0}]) // nultiple

// get the selecteed option from dopdown
const dropdownSelector = 'select#yourDropdownId';
const selectedValue = await page.$eval(dropdownSelector, select => select.value);

/handleing single window

const [newWindow] = await Promise.all([
context.waitForEvenet("page")
await page.click("#home")
])
await newWindow.waitForloadState() // to waot for page to be loaded
await newWindow.click("login")
await newWindow.waitForNavigation() to wait for navigation to be completed
await page.bringTOFront() // to switch focus from newWindo to the old window

/handleing multipe window
const [multiPage] = await Promise.all([
context.waitForEvenet("page")
await page.click("#multi")
])
await multiPage.waitForLoadState()
const pages = multiPage.context.pages() //return all open pages
console.log(pages.length)
pages.forEach(page => console.log(page.url()))

//access pages
await pages[1].bringTOFront()
await pages[1].click("#locator")

Filtering Locators

<ul>
  <li>
    <h3>Product 1</h3>
    <button>Add to cart</button>
  </li>
  <li>
    <h3>Product 2</h3>
    <button>Add to cart</button>
  </li>
</ul>

await page
.getByRole('listitem')
.filter({ hasText: 'Product 2' })
.getByRole('button', { name: 'Add to cart' })
.click();
or
await expect(page.getByRole('listitem').filter({ hasNotText: 'Out of stock' })).toHaveCount(5);

there are textContent() and innerText() for getting the text
