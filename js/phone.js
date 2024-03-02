// console.log('phone');

const loadData = async(searchText='13',isShowAll=null)=>{
    try{
        const res  = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        const phones = data.data;
        displayAllPhone(phones,isShowAll);
    }
    catch(err){
        console.log(err);
    }
    
}

// display data 
const displayAllPhone=(phones,isShowAll=null)=>{
    
    const showAllContainer=document.getElementById('show-all-container');
    if(phones.length>=12 && isShowAll===null){
        
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }

    if(isShowAll===null){
        phones=phones.slice(0,12);
    }

    const phoneContainer=document.getElementById('phone-container');
    phoneContainer.textContent='';
    phones.forEach((phone) => {

       
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card w-96 bg-gray-100 shadow-xl mb-10`;

        phoneCard.innerHTML= `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="showDetail('${phone.slug}')" class="btn btn-secondary">Details</button>
                </div>
            </div>

        `
        phoneContainer.appendChild(phoneCard);
        
    });

    toggleLoadingSpinner(false);
}

// spinner 
const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner= document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle search 
const handleSearch=(isShowAll=null)=>{
    toggleLoadingSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    loadData(searchText,isShowAll);
}

// handle show all
const handleShowAll=()=>{
    handleSearch(true);
}


const showDetail= async (id)=>{
    // console.log(id);
    // load single data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const phone= await res.json();
    // console.log(phone.data);
    showPhoneDetails(phone.data);
}

const showPhoneDetails=(phone)=>{
    console.log(phone);
    const showDetailContainer=document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
        <dialog id="show_details_modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box text-center">
            <img class='mx-auto' src="${phone.image}" alt="">       
            <h3 class="font-bold text-lg">${phone.name}</h3>
            <p>Release Date: ${phone?.releaseDate}</p>
            <p>Storage: ${phone?.mainFeatures?.storage}</p>
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
    `;

    show_details_modal.showModal();
    
}

loadData('phone');