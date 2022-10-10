const asideJobs = []
let jsonData = JSON.parse(localStorage.getItem("appliedJobs")) || []

function createMainList(){
    let teste = jsonData
    const mainListFull = document.querySelector('.card-1_ul')
    const asideListFull = document.querySelector('.card-2_ul')   

    jobsData.forEach(job => { 
    const listItems = document.createElement('li') 
    const listItemTitle = document.createElement('h2') 
    const listItemDivOne = document.createElement('div') 
    const listItemDivOneSpanOne = document.createElement('span') 
    const listItemDivOneSpanTwo = document.createElement('span')  
    const listItemParagraph = document.createElement('p') 
    const listItemDivTwo = document.createElement('div')
    const listItemDivTwoSpan = document.createElement('span') 
    const listItemDivTwoBtn = document.createElement('button')
 
   
    listItems.classList = 'card-1_li flex_column'
    listItemTitle.classList = 'card-1_li_title title-4' 
    listItemDivOne.classList = 'card-1_li_div flex_row gap-1'
    listItemDivOneSpanOne.classList = 'card-1_li_div_span-1 text-3' 
    listItemDivOneSpanTwo.classList = 'card-1_li_div_span-1 text-3'
    listItemParagraph.classList = 'card-1_li_div_p text-2'
    listItemDivTwo.classList = 'section-1_desktop'
    listItemDivTwoSpan.classList = 'card-1_li_div_span-2 text-3'
    listItemDivTwoBtn.classList = 'card-1_li_div_button button border_none button_add_card'

    listItemTitle.innerText = job.title
    listItemDivOneSpanOne.innerText = job.enterprise
    listItemDivOneSpanTwo.innerText = job.location
    listItemParagraph.innerText = job.description
    listItemDivTwoSpan.innerText = job.modalities[0]

    if(teste.filter(element => element.title == job.title).length > 0){
        listItemDivTwoBtn.innerText = 'Retirar candidatura'
    }else{
        listItemDivTwoBtn.innerText = 'Candidatar'
    }
    
    listItemDivTwoBtn.addEventListener('click', function(){ 
        asideListFull.innerHTML = ''

        if(listItemDivTwoBtn.innerText == 'Candidatar'){  
            listItemDivTwoBtn.innerText = 'Retirar candidatura'
            let newObject = {
                id:job.id, 
                title:job.title, 
                enterprise:job.enterprise, 
                location:job.location
            }
            asideJobs.push(newObject)
            localStorage.setItem("appliedJobs", JSON.stringify(asideJobs))
            renderAside(asideJobs) 
        }else{
            listItemDivTwoBtn.innerText = 'Candidatar' 
            let indexAside = asideJobs.indexOf(job)
            asideJobs.splice(indexAside, 1)
            localStorage.setItem("appliedJobs", JSON.stringify(asideJobs))
            renderAside(asideJobs)
        }
    })

    listItemDivTwo.append(listItemDivTwoSpan, listItemDivTwoBtn)
    listItemDivOne.append(listItemDivOneSpanOne, listItemDivOneSpanTwo)
    listItems.append(listItemTitle, listItemDivOne, listItemParagraph, listItemDivTwo)
    mainListFull.appendChild(listItems)
    });
    return mainListFull
}

function createAside(asideList){
    const asideListFull = document.querySelector('.card-2_ul')
    const mainListFull = document.querySelector('.card-1_ul')
    asideList.forEach(job => {
        const listItems = document.createElement('li')
        const listItemsDivOne = document.createElement('div')
        const listItemsDivOneTitle = document.createElement('h2')
        const listItemsDivOneBtn = document.createElement('button')
        const listItemsDivOneBtnImg = document.createElement('img')
        const listItemsDivTwo = document.createElement('div')
        const listItemsDivTwoSpanOne = document.createElement('span')
        const listItemsDivTwoSpanTwo = document.createElement('span')

        listItems.classList = 'card-2_li flex_column'
        listItemsDivOne.classList = 'card-2_div flex_row align_center justify_between'
        listItemsDivOneTitle.classList = 'card-2_li_title title-5'
        listItemsDivOneBtn.classList = 'card-2_li_button'
        listItemsDivTwo.classList = 'card-2_div-2 flex_row gap-1'
        listItemsDivTwoSpanOne.classList = 'card-2_span text-3'
        listItemsDivTwoSpanTwo.classList = 'card-2_span text-3'

        listItemsDivOneTitle.innerText = job.title
        listItemsDivTwoSpanOne.innerText = job.enterprise
        listItemsDivTwoSpanTwo.innerText = job.location
        listItemsDivOneBtnImg.src = '../../assets/img/trash.svg'

        listItemsDivOneBtn.addEventListener('click', function(){
            asideListFull.innerHTML = ''
            mainListFull.innerHTML = ''
            let indexAside = asideJobs.indexOf(job)
            asideJobs.splice(indexAside, 1)
            localStorage.setItem("appliedJobs", JSON.stringify(asideJobs))
            renderMainList()
            renderAside(asideJobs)
        })

        listItemsDivTwo.append(listItemsDivTwoSpanOne, listItemsDivTwoSpanTwo)
        listItemsDivOneBtn.appendChild(listItemsDivOneBtnImg)
        listItemsDivOne.append(listItemsDivOneTitle, listItemsDivOneBtn)
        listItems.append(listItemsDivOne, listItemsDivTwo)
        asideListFull.appendChild(listItems)
    })
    return asideListFull
}

function createAsideEmpty(){ 
    const asideListFull = document.querySelector('.card-2_ul')
    const asideEmpty = document.createElement('div') 
    const emptyParagraph = document.createElement('p')

    emptyParagraph.innerText = 'Você ainda não aplicou para nenhuma vaga!'
    asideEmpty.appendChild(emptyParagraph)
    asideListFull.appendChild(asideEmpty)
    return asideListFull
}

function renderMainList(){
    const mainSection = document.querySelector('#sectionOne')
    return mainSection.appendChild(createMainList())
}


function renderAside(list){
    const asideSection = document.querySelector('.card-2')
    if(list.length == 0){
        return asideSection.appendChild(createAsideEmpty())
    }else{
        return asideSection.appendChild(createAside(list))
    }
}

function getJsonItem(){
    return JSON.parse(localStorage.getItem("appliedJobs")) || []
}

renderAside(getJsonItem())

renderMainList()


