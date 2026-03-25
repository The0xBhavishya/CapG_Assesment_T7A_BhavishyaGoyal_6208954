import {test,expect} from "@playwright/test"
import Bank from "../../PageObjectModel/bank.page";

test('bank', async({page})=>{


const bk = new Bank(page)
// await page.pause()
await bk.navi()
await bk.loginAll()

})