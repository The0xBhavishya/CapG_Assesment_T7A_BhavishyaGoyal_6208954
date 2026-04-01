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

    // 
    let r11 = await request.put(`${baseURL}/shoppers/${shopperId}/carts/${iId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        data: {
            productId: pId,
            quantity: 7
        }, ignoreHTTPSErrors: true
    })
    console.log(await r11.status());
    

    let r12 = await request.post(`${baseURL}/shoppers/${shopperId}/orders`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        data: {
            address: {
                addressId: aId,
                buildingInfo: "House No. 45, Goyal Villa",
                city: "Pune",
                country: "India",
                landmark: "Near Central Park",
                name: "Bhavishya Goyal",
                phone: "9521842144",
                pincode: "432101",
                state: "Maharashtra",
                streetInfo: "C-Scheme, Ashok Nagar",
                type: "Home"
            },
            paymentMode: "COD"
        }, ignoreHTTPSErrors: true
    })
    const status12 = await r12.status();
    console.log('Order API status:', status12);
  

    let r13 = await request.get(`${baseURL}/shoppers/${shopperId}/orders`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }, ignoreHTTPSErrors: true
    })
    console.log(await r13.json());
    let orderId = (await r13.json()).data[0].orderId;

    let r14 = await request.patch(`${baseURL}/shoppers/${shopperId}/orders/${orderId}?status=DELIVERED`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }, ignoreHTTPSErrors: true
    })
    console.log(await r14.status());
    console.log(await r14.json());

    
})