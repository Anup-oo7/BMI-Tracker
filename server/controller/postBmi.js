
import Post from "../model/postBmiSchema.js"


export const postBMI = async(request, response)=>{
  try{
    const post = await new Post(request.body);
    const toPost ={
        bmi:request.body.bmi,
        email:request.body.email,
        measuredDate:request.body.measuredDate
    }
    post.save(toPost)
    

    return response.status(200).json({message: 'BMI saved successfully'});

  }catch(error){
    return response.status(500).json(error)
  }

}
