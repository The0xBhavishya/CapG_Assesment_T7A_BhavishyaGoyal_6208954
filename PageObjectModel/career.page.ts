class Career {
    page: any
    click_career: any
    find_role: any
    univ_role: any
    select_job: any  
    apply_job: any    

    constructor(page) {
        this.page = page

        this.click_career = page.locator('//a[@href="https://amazon.jobs"]')
        this.find_role = page.locator('//a[@class="btn btn-quarternary"]').first()
        this.univ_role = page.locator("//div[text()='Find open university roles']")
          this.select_job = page.locator('//a[contains(@class,"header-module_title")]').nth(1)
        this.apply_job = page.locator('a#apply-button')
    }

    async navi(url: string) {
        await this.page.goto(url);
    }

    async findCareer() {
        await this.click_career.click()
    }

    async findRole() {
        await this.find_role.click();
    }

    async univrole() {
        await this.univ_role.click();
    }

    async selectFilter(index: number, value: string) {
        await this.page.waitForSelector('//ul[contains(@class,"filter-values")]')
         const filter = this.page.locator('//ul[contains(@class,"filter-values")]').nth(index)
        await filter.locator(`text=${value}`).click()
    }

    async selectJob() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.select_job.click()
        ])
        await newPage.waitForLoadState()
        return newPage
    }

    async applyJob(newPage) {
        await newPage.locator('a#apply-button').click()
    }

    async takeScreenshot() {
        await this.page.screenshot({ path: 'Day21_amazonCareer.png', fullPage: true })
    }
}

export default Career



// export default Career
//  //div[text()='Germany']
// //div[text()='North-Rhine-Westphalia']
// //div[text()='Horn-Bad Meinberg']
// //div[@class="filter-value-module_label__Pet6N css-gb1y2i"]
