// console.log('phone');

const loadData = async(searchText)=>{
    try{
        const res  = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        const phones = data.data;
        displayAllPhone(phones);
    }
    catch(err){
        console.log(err);
    }
    
}

// display data 
const displayAllPhone=(phones)=>{
    // console.log(phones.length);
    phones=phones.slice(0,12);
    const showAllContainer=document.getElementById('show-all-container');
    if(phones.length>=12){
        phones=phones.slice(0,12);
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
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
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
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
const handleSearch=()=>{
    toggleLoadingSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    loadData(searchText);
}

// handle show all
const handleShowAll=()=>{

}

loadData('phone');