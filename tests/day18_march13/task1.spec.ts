import { test } from '@playwright/test'
import * as path from 'path'
import * as excel from 'exceljs'

test("day19 task 1", async ({ page }) => {
    let workbook = new excel.Workbook()
    await workbook.xlsx.readFile(path.join(__dirname, "../testdata/day19-task1.xlsx"))
    let sheet = workbook.getWorksheet("Sheet1")
    if (!sheet) {
        throw new Error("Sheet doesnt exist")
    }
    for (let i = 2; i <= sheet.actualRowCount; i++) {
        let row = sheet.getRow(i)
        const firstName = row.getCell(1).value?.toString() ?? ''
        const lastName = row.getCell(2).value?.toString() ?? ''
        const email = row.getCell(3).value?.toString() ?? ''
        const gender = row.getCell(4).value?.toString() ?? ''
        const mobile = row.getCell(5).value?.toString() ?? ''
        const subject = row.getCell(6).value?.toString() ?? ''
        const hobby = row.getCell(7).value?.toString() ?? ''
        const image = row.getCell(8).value?.toString() ?? ''
        const address = row.getCell(9).value?.toString() ?? ''
        const state = row.getCell(10).value?.toString() ?? ''
        const city = row.getCell(11).value?.toString() ?? ''

        await page.goto('https://demoqa.com/automation-practice-form')
        await page.locator('#firstName').fill(firstName)
        await page.locator('#lastName').fill(lastName)
        await page.locator('#userEmail').fill(email)

        if (gender === 'Male') {
            await page.locator('label[for="gender-radio-1"]').click()
        } else if (gender === 'Female') {
            await page.locator('label[for="gender-radio-2"]').click()
        } else {
            await page.locator('label[for="gender-radio-3"]').click()
        }

        await page.locator('#userNumber').fill(mobile)
        await page.locator('#subjectsInput').fill(subject)
        await page.locator('#subjectsInput').press('Enter')

        if (hobby === 'Sports') {
            await page.locator('label[for="hobbies-checkbox-1"]').click()
        } else if (hobby === 'Reading') {
            await page.locator('label[for="hobbies-checkbox-2"]').click()
        } else if (hobby === 'Music') {
            await page.locator('label[for="hobbies-checkbox-3"]').click()
        }

        await page.locator('#uploadPicture').setInputFiles(
            path.join(__dirname, "../testdata", image)
        )

        await page.locator('#currentAddress').fill(address)
        await page.locator('#react-select-3-input').fill(state)
        await page.locator('#react-select-3-input').press('Enter')
        await page.locator('#react-select-4-input').fill(city)
        await page.locator('#react-select-4-input').press('Enter')
        await page.waitForTimeout(4000)
        await page.locator('#submit').click()
    }
})