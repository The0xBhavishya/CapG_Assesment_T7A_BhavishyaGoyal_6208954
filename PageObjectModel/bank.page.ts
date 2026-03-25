import { expect } from "@playwright/test"
import data from "../testdata/banks.json"
class Bank{
page :any
clickManager:any
addCustomer:any
fname:any
lname:any
postCode:any
addcustomer:any
home:any

// new customer
customeLogin:any
select:any
clogin:any

// depost in clogin
deposit:any
damount:any
dclick:any

// withdrwal function in customer
// [ng-click="withdrawl()"]

withdrwal:any
wamount:any
wclick:any

finalamout:any

//logout
logout:any




constructor(page){

    this.page=page
    this.clickManager=page.locator('[ng-click="manager()"]')
    this.addCustomer=page.locator('[ng-click="addCust()"]')
    this.fname=page.getByPlaceholder('First Name')
    this.lname=page.getByPlaceholder('Last Name')
    this.postCode=page.getByPlaceholder('Post Code')
    // this.postCode=page.locator('.form-control.ng-pristine.ng-invalid.ng-invalid-required.ng-touched')
    // this.addcustomer=page.locator('.btn.btn-default')
    this.addcustomer=page.locator('.btn.btn-default')
    this.home=page.locator('[ng-click="home()"]')

    // customers
    this.customeLogin=page.locator('[ng-click="customer()"]')
    this.select=page.locator('#userSelect')
    this.clogin=page.locator(`[ng-show="custId != ''"]`)
   

    // deposit
    this.deposit=page.locator('[ng-click="deposit()"]')
    this.damount=page.getByPlaceholder("amount")
    this.dclick=page.locator('.btn.btn-default')

    // withdrwa
    this.withdrwal=page.locator('[ng-click="withdrawl()"]')
    this.wamount=page.getByPlaceholder("amount")
    this.wclick=page.locator('.btn.btn-default')


    this.finalamout=page.locator('strong[class="ng-binding"]').nth(1)


    // logout
    this.logout=page.locator('[ng-click="byebye()"]')
    


}
async navi(){
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
}


async loginAll(){
    await this.clickManager.click()
    await this.addCustomer.click()
    await this.fname.fill(data.firstname)
    await this.lname.fill(data.lastname)
    await this.postCode.fill(data.postcode)

//     this.page.on('dialog', async dialog=>{
// expect (dialog.type()).toContain('alert')
// // expect (dialog.message()).toContain('Customer added successfully with customer id :11')
// await dialog.accept()
//     })


    await this.addcustomer.click()
    // await this.page.pause()
    await this.home.click()

    await this.customeLogin.click()

    await this.select.selectOption('Neville Longbottom')

    await this.clogin.click()

    await this.deposit.click()
    await this.damount.fill(data.damout)
    await this.dclick.click()

    await this.withdrwal.click()
    await this.page.waitForTimeout(1000)
    await this.damount.fill(data.wamount)
    await this.wclick.click()
   
    const bal=await this.finalamout.textContent();
    expect (Number(bal)).toBe(0)

   await this.page.screenshot({ path: 'day25_screenshot.png' });

     await this.logout.click()




   


}



}

export default Bank