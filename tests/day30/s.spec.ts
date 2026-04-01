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


//

import { test } from '@playwright/test';

test('API testing with playwright on SS', async ({ request }) => {
    let baseURL = 'https://www.shoppersstack.com/shopping';
    let r1 = await request.post(`${baseURL}/users/login`, {
        data: {
            email: "bhavishyacoderr@gmail.com",
            password: "Bhavishya@12u",
            role: "SHOPPER"
        }, ignoreHTTPSErrors: true
    })
    console.log(await r1.json());
    let jwt = (await r1.json()).data.jwtToken;
    let shopperId = (await r1.json()).data.userId;
    console.log(shopperId)
    console.log(jwt);


    let r2 = await request.get(`${baseURL}/products/alpha`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }, ignoreHTTPSErrors: true
    })
    let pId = (await r2.json()).data[3].productId;
    console.log(pId);


// wishlist - add to wishlist
    let r3 = await request.post(`${baseURL}/shoppers/${shopperId}/wishlist`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        data: {
            productId: pId,
            quantity: 0
        }, ignoreHTTPSErrors: true
    })
    console.log(await r3.status());
    console.log(await r3.json());


// wishlist - get to wishlist
    let r4 = await request.get(`${baseURL}/shoppers/${shopperId}/wishlist`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }, ignoreHTTPSErrors: true
    })
    console.log(await r4.json());


// address - add address    
    let r5 = await request.post(`${baseURL}/shoppers/${shopperId}/address`, {
        headers: { Authorization: `Bearer ${jwt}`
        },
        data: { addressId: 2,
            buildingInfo: "House No. 45, Goyal Villa",
            city: "Jaipur",
            country: "India",
            landmark: "Near Central Park",
            name: "Bhavishya Goyal",
            phone: "9521842144",
            pincode: "432101",
            state: "maharashtra",
            streetInfo: "C-Scheme, Ashok Nagar",
            type: "Home"
        },ignoreHTTPSErrors: true
    })
    console.log(await r5.status());
    console.log(await r5.json());
    let aId = (await r5.json()).data.addressId;
    console.log(aId);


// address - get all address
    let r6 = await request.get(`${baseURL}/shoppers/${shopperId}/address`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }, ignoreHTTPSErrors: true
    })
   console.log(await r6.json());


// address - get specific address
    let r7 = await request.get(`${baseURL}/shoppers/${shopperId}/address/${aId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }, ignoreHTTPSErrors: true
    })
    console.log(await r7.json());


// address - update specific address using aId
  let r8 = await request.put(`${baseURL}/shoppers/${shopperId}/address/${aId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }, data: {
            addressId: aId,
            buildingInfo: "House No. 45, Goyal Villa",
            city: "Pune",
            country: "India",
            landmark: "Near Central Park",
            name: "Bhavishya Goyal",
            phone: "9521842144",
            pincode: "432101",
            state: "maharashtra",
            streetInfo: "C-Scheme, Ashok Nagar",
            type: "Home"
        },ignoreHTTPSErrors:true
    })
    console.log(await r8.status());
    console.log(await r8.json());

// get cart details using shopperId
    let r9 = await request.get(`${baseURL}/shoppers/${shopperId}/carts`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },ignoreHTTPSErrors:true
    })
    console.log(await r9.json());
    let iId = (await r9.json()).data.itemId;
    console.log(iId);


// update cart details using shopperId and itemId
    let r10 = await request.put(`${baseURL}/shoppers/${shopperId}/carts/${iId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        data:{
            productId:pId,
            quantity: 7
        },ignoreHTTPSErrors:true
    })
