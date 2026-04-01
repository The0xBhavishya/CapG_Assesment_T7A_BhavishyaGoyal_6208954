import {test,expect} from "@playwright/test"

test('basic api',async({request})=>{

    let r1= await request.post('https://petstore3.swagger.io/api/v3/pet',{
        data :{
  id: 10,
  name: "doggie",
 status: "available"

}
    })

    console.log(r1.status())
    console.log(  (await r1.json()).name)
    let r2 = await request.get('https://petstore3.swagger.io/api/v3/pet/10');
      console.log  (await r2.json())


    let r3= await request.put('https://petstore3.swagger.io/api/v3/pet',{
        data : {
    id: 10,
    name: "dogesh",
        }
    })  
     console.log(r3.status())


    let r4 = await request.get('https://petstore3.swagger.io/api/v3/pet/10');
      console.log  (await r4.json())


    let r5= await request.delete('https://petstore3.swagger.io/api/v3/pet/10');
    console.log(r5.status())  



    //  let r51 = await request.get('https://petstore3.swagger.io/api/v3/pet/10');
    //   console.log  (await r51.json())





 

})  