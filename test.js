const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 4000
const data = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
        address: "7 Agunbiade street, Jakarta",
        phone: "08123456789",
        
    },
    {
        id: 2,
        name: "Ayodeji Ayorinde",
        email: "ayokele@gmail.com",
        address: "11, Wonuola street, Akoka",
        phone: "09123456789",
        
    }
]

app.use(bodyParser.json())

app.get('/', (req, res) => { 
    res.json({
        status: "success",
        message: "Welcome to my API"
    })
})



app.get('/user', (req, res) => {
    res.json({
        status: "success",
        message: "All Users",
        data: data
    })
})


app.post('/user/add', (req, res) => { 

    const { name, email, phone, address } = req.body
    if (!name || !email || !phone || !address || email.indexOf('@') === -1) { 
        res.json({
            status: "error",
            message: "All fields are required"
        })
    }

    const tempData = {
        id: data.length + 1,
        name,
        email,
        address,
        phone,

    }
    data.push(tempData)
    res.json({
        status: "success",
        message: "Data created successfully",
        data: tempData
    })
})
app.put('/user/update', (req, res) => {  
   
  const { id, name, phone, email, address } = req.body
  if (!id || !name || !phone || !email || !address || email.indexOf('@') === -1)
  { 
      res.json({
          status: "error",
          message: "All fields are required"
      })
  }
  const filteredData = data.filter(item => item.id === id)
  // const filteredDataObj = filteredData[0]
  filteredData[0].name = name
  filteredData[0].phone = phone
  filteredData[0].email = email
  filteredData[0].address = address

  res.json({
      status: "success",
      message: "User Updated ",
      data : data
  });
});

app.delete('/user/delete', (req, res) => {
    const {id} = req.body;
    const filteredData = data.filter(item => item.id === id)
    if (!id) {
        res.json({
            status: "error",
            message: "All fields are required"
        })
    }

    else if (filteredData.length === 0){
        res.json({
            status: "error",
            message: "The data you are trying to delete does not exist"
        })
    }
    else{
        const idIndex = data.indexOf(filteredData[0]) 
        data.splice(idIndex, 1)
        
        res.json({
            status: "success",
            message: "User Deleted",
            data: data,
            DeletedData: filteredData
        })
    }
        
})
// delete Multiple data
// User inputs in body in the format: {"idArr":[1,3,2,5]} where the elements in the array are the required ids. 

app.delete('/user/deleteMultiple', (req, res) => {
    const {idArr} = req.body
    
    let newIdArr = []
    for (let id of idArr) {
         let filteredData= data.filter(item => item.id === id)
        if (filteredData.length === 1){
            newIdArr.push(filteredData[0])
         }
    }
    if(newIdArr.length===0){
        res.json({
            status: 'error',
            'message': 'None of the data you intend to delete exists'
        })
    }
    else{
    newIdArr.forEach(id => {
       filteredData= data.filter(item => item.id === id)
       const idIndex = data.indexOf(filteredData[0]) 
       data.splice(idIndex, 1)
    });
    
    res.json({
        status: "success",
        message: "User Deleted",
        data: data,
    

})
    }
})


app.listen(PORT, () => { 

    console.log(`Server is running on port ${PORT}`) 
})