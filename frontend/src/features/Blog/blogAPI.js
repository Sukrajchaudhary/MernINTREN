import { host } from "../../Common/Api";
export function CreateBlog(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/api/create-blog`, {
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

export function getAllBlogs(filter, pagination) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`; 
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getallblog?` + queryString, {
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
  return new Promise(async (resolve, _) => {
    const response = await fetch(`http://localhost:8080/api/getblog/` + id, {
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
export function deleteBlog(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/api/delete/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("info"))?.accessToken}`
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    }
  });
}
export function getOwnBlog() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getownBlog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("info"))?.accessToken}`
        },
        credentials: "include",
     
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

// update blog
export function updateBlog(id, formdata) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/api/update/` + id, {
      method: "PATCH",
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("info"))?.accessToken}`
      },
      body: formdata,
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    } else {
      const error = await response.json();
      reject({ error });
    }
  });
}
