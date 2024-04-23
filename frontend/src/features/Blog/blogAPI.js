import { host } from "../../Common/Api";
export function CreateBlog(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/create-blog`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject(error.message);
    }
  });
}

//  get All user Blogs

export function getAllBlogs() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/getallblog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
}

//getblogByid
export function getBlogByid(id) {
  return new Promise(async (resolve,_) => {
    const response = await fetch(`${host}/getblog/` + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    }
  });
}


// deleteblog
export function deleteBlog(id){
  return new Promise(async(resolve,reject)=>{
    const response=await fetch(`${host}/delete/`+id,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json'
      },
      credentials:"include"
    });
    if(response.ok){
      const data= await response.json();
      resolve({data})
    }
  })
}
export function getOwnBlog(){
  return new Promise(async(resolve,reject)=>{
   try {
    const response=await fetch(`${host}/getownBlog`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      },
      credentials:"include"
    });
    if(response.ok){
      const data= await response.json();
      resolve({data})
    }
    else{
      const error= await response.json();
      reject({error})
    }
   } catch (error) {
    reject(error.message)
   }
  })
}

// update blog
export function updateBlog(id,formdata) {
  

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${host}/update/` + id, {
      method: "PATCH",
      body:formdata,
      credentials: 'include'
    });
    if (response.ok) {
      const data = await response.json();
      resolve({data});
    } else {
      const error = await response.json();
      reject({error});
    }
  });
}