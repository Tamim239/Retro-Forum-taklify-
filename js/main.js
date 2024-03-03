const loaderApiSearch = async(category , isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    const data = await res.json()
    // console.log(data.posts)
    const allPost = data.posts
    allPostDataHandle(allPost)
}

const handleSearchBtn = (isShowAll) =>{
    handleSpinner(true)
    const searchField = document.getElementById("search-field");
    const searchValue = searchField.value;
    // console.log(searchValue)
    const timeOut = setTimeout(() =>{
        loaderApiSearch(searchValue, isShowAll)
        clearTimeout(timeOut);
    }, 2000)
}


let isActive = ''
const allPostDataHandle = (details) => {
    
    const discussContainer = document.getElementById("discuss-container");
    discussContainer.textContent = '';
    details.forEach(data => {
        // console.log(data.category)
        const div = document.createElement("div");
        if (data?.isActive) {
            isActive = `<span class="indicator-item badge badge-success"></span>`
        }
        else {
            isActive = `<span class="indicator-item badge badge-error"></span>`
        }
        div.innerHTML = `
                     <div class="card  shadow-xl p-5 md:p-10 rounded-3xl space-y-3">
                        <div class="flex flex-col md:flex-row items-center gap-4">
                            <div class="indicator">
                                ${isActive}
                                <img src="${data?.image}" alt="pic" class="grid w-20 h-20 bg-base-300 place-items-center rounded-2xl">
                            </div>
                            <div class=" space-y-3">
                                <div class="flex items-center gap-5 text-sm font-medium">
                                    <h1># ${data?.category}</h1>
                                    <h2>Author : ${data?.author?.name}</h2>
                                </div>
                                <h1 class="text-xl fon?t-bold">${data?.title}</h1>
                            </div>
                        </div>
                        <div class=" md:pl-24 ">
                            <p class="border-b border-dashed border-black pb-5">${data?.description}</p>
                            <div class=" flex justify-between md:items-center pt-2">
                                <div class=" flex gap-6 *:flex *:gap-3 *:text-base">
                                    <div>
                                        <i class="ri-message-2-line text-xl"></i>
                                        <p>${data?.comment_count}</p>
                                    </div>
                                    <div>
                                        <i class="ri-eye-line text-xl"></i>
                                        <p>${data?.view_count}</p>
                                    </div>
                                    <div>
                                        <i class="ri-time-line text-xl"></i>
                                        <p>${data?.posted_time}</p>
                                    </div>
                                </div>
                                <button onclick="markBtn('${data?.title}','${data?.view_count}')" class="btn mt-7 -ml-7 md:mt-0 md:ml-0 bg-[#10B981] rounded-full text-white text-xl"><i
                                        class="ri-mail-check-line"></i></button>
                            </div>
                          </div>
                        </div>
        
        `
        discussContainer.appendChild(div)
    }); 
    handleSpinner(false)
}
// spinner loader
const handleSpinner = (isSpinner) =>{
    const spinner = document.getElementById("handleSpinner");
    if (isSpinner) {
        spinner.classList.remove("hidden");
      }
      else {
        spinner.classList.add("hidden");
      }
}




const count = document.getElementById("count");
const discussOutputContainer = document.getElementById("discuss-output-container");
let countNumber = 0;
const markBtn = (title, view) => {
    // console.log(title, view)
    countNumber++;
    count.innerText = countNumber;
    const div = document.createElement("div");
    div.classList = "flex justify-between items-center gap-4 bg-[#ffffff99] p-4 rounded-3xl"
    div.innerHTML = `
    <h1 class="font-semibold">${title}</h1>
    <div class="flex items-center gap-3">
        <i class="ri-eye-line text-xl"></i>
        <p>${view}</p>
     </div>
    `
    discussOutputContainer.appendChild(div)

}


loaderApiSearch("")


const handleLatestApi = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    const data = await res.json()
    // console.log(data)
    handleLatestShow(data)
}

const handleLatestShow = (data) =>{
    // console.log(data)
    const latestContainer = document.getElementById("latest-container");
    data.forEach(detail =>{
        // console.log(detail)
        const div = document.createElement("div");
        div.classList = "card card-compact bg-base-100 border p-6"
        div.innerHTML = `
        <figure><img src="${detail?.cover_image}"
                            alt="Shoes" /></figure>
                    <div class="card-body">
                        <div class="flex items-center gap-3">
                            <i class="ri-calendar-line"></i>
                            <p>${detail?.author?.posted_date || "No publish date"}</p>
                        </div>
                        <h2 class="card-title font-extrabold">${detail?.title}</h2>
                        <p>${detail?.description}</p>
                        <div class="flex items-center gap-4">
                            <img src="${detail?.profile_image}" alt="pic" class="grid size-14 bg-base-300 place-items-center rounded-3xl">
                            <div>
                                <h1 class="text-xl font-bold">${detail?.author?.name}</h1>
                                <p><span>${detail?.author?.designation || "Unknown"}</span></p>
                            </div>
                        </div>
                    </div>
        `
        latestContainer.appendChild(div)
    })
}


handleLatestApi()
