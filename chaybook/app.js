let divMenu=document.createElement("div")
let divContent=document.createElement("div")
divMenu.classList.add("divMenu")
divContent.classList.add("divContent")
let userId
const validateUser=async()=>{
    userId=txtUserId.value
    userName.innerHTML= await getName(userId)
    container.innerHTML=""
let str=`
<P onclick="showData(1)"><i class="bi bi-bookmarks-fill"></i>Feeds[all]</p>
<p onclick="showData(2)"><i class=bi bi-file-earmark-post-fill"></i></i>My Post</p> 
<P onclick="showData(3)"><i class="bi bi-journal-album"></i>My Albums</p>
<P onclick="showData(4)"><i class="bi bi-person"></i>My Profile</p> 
<P onclick="showData(5)"><i class="bi bi-door-open"></i>Logout</p>`
divMenu.innerHTML=str
container.append(divMenu)
divContent.innerHTML= await getFeeds()
container.append(divContent)
}
const fetchData= async (url)=>{
    const responce =await fetch(url)
    const json= await responce.json()
    return json
}
const getName= async (id)=>{
    const url=`https://jsonplaceholder.typicode.com/users/${userId}`
    const json= await fetchData(url)
    return json.name
}
const getFeeds= async()=>{
    const url= "https://jsonplaceholder.typicode.com/posts"
    const json= await fetchData(url)
    let str="<div><h2>Feeds [All Posts]</h2>"
    json.map((element)=>{
        str+=`<p><b>User:</b>${element.userId}</p>
        <p><b>Title:</b>${element.title}</p>
        <p><b>Body:</b>${element.id}</p>
        <p onclick=getComments(${element.id})>View Comments</p><hr>`
    })
    str+= "</div>"
    return str
}
const getPosts= async()=>{
    const url= `https://jsonplaceholder.typicode.com/posts/?userId=${userId}`
    const json= await fetchData(url)
    let str="<div><h2>my Posts</h2>"
    json.map((element)=>{
        str+=`<p><b>User:</b>${element.userId}</p>
        <p><b>Title:</b>${element.title}</p>
        <p><b>Body:</b>${element.id}</p>
        <p onclick=getComments(${element.id})>View Comments</p><hr>`
    })
    str+= "</div>"
    return str
}
const getAlbums= async()=>{
    const url= `https://jsonplaceholder.typicode.com/albums/?${userId}`
    const json= await fetchData(url)
    let str="<div><h2>my Albums</h2>"
    json.map((element)=>{
        str+=`
        <p><b>Title:</b>${element.title}</p>
        
        <p onclick=getComments(${element.title})>View Comments</p><hr>`
    })
    str+= "</div>"
    return str
}
const showData= async (pageId)=>{
    if (pageId===1){
        divContent.innerHTML= await getFeeds()
    }else if(pageId===2){
        divContent.innerHTML= await getPosts()
    }else if(pageId===3){
        divContent.innerHTML= await getAlbums()
    }else if(pageId===4){
        divContent.innerHTML= await getProfile()
    }else if(pageId===5){
     location.reload()
    }
}