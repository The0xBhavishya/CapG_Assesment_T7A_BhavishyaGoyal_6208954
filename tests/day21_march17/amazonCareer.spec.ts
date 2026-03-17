import {test} from "@playwright/test"
import Career from '../../PageObjectModel/career.page'
import data from '../../testdata/career.json'
test("amazon ", async({page})=>{
await page.goto("https://www.amazon.in/");
const career = new Career(page);

await career.navi("https://www.amazon.in/")
await career.findCareer();
await career.findRole();
await career.univrole();

 await career.selectFilter(0, data.Country)
    await career.selectFilter(1, data.state)
    await career.selectFilter(2, data.city)
    await career.selectFilter(3, data["Emp-type"])
    await career.selectFilter(4, data.category)
    await career.selectFilter(5, data["career-area"])
    await career.selectFilter(6, data.team)
    await career.selectFilter(7, data["role-type"])

    const newPage = await career.selectJob()
    await career.applyJob(newPage)

    await career.takeScreenshot()

    await page.waitForTimeout(2000)


} )