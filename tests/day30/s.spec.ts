import{ test, expect } from '@playwright/test';

test('shopper stack api', async ({request}) => {
    let r1 = await request.post(`https://www.shoppersstack.com/shopping/users/login`,{
        data : {
            email: "bhavishyacoderr@gmail.com",
            password: "Bhavishya@12u",
            role:"SHOPPER"
        },ignoreHTTPSErrors:true
    })
 
    let body=await r1.json();
    console.log(body);
    let token = (body).data.jwtToken;
    console.log(token);

    let shopperId = body.data.userId;
    console.log(shopperId) ;

   let r2= await request.get(`https://www.shoppersstack.com/shopping/products/alpha`,{ignoreHTTPSErrors:true}
 )  
    
   let product = await r2.json();
   
   let pId= product.data[4].productId
   console.log(pId)
   console.log(product.data[4].category)




   
// wishlist
  let r3_wishlist=await request.post(`https://www.shoppersstack.com/shopping/shoppers/${shopperId}/wishlist`,{
    headers : {
      Authorization : `Bearer ${token}`
        }
    
    ,data : {
  productId: pId,
  quantity: 1
},ignoreHTTPSErrors:true
})

console.log(r3_wishlist.status());

console.log(await r3_wishlist.json());


  let r3_getwishlist=await request.get(`https://www.shoppersstack.com/shopping/shoppers/${shopperId}/wishlist`,{
     headers : {
      Authorization : `Bearer ${token}`
        },ignoreHTTPSErrors:true
  })
console.log(r3_getwishlist.status());
console.log(await r3_getwishlist.json());
//  let r3_address=await request.get(`https://www.shoppersstack.com/shopping/shoppers/${shopperId}/wishlist`)



//get cart

})