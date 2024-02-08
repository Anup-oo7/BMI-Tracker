import Post from "../model/postBmiSchema.js"


export const getBMI = async(request, response)=>{
  try{
    const bmiData = await Post.find()
     response.json(bmiData)
     console.log(bmiData)
  }catch(error){
    
 response.status(500).json(error)
  }
}
