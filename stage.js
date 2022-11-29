let nom = document.getElementById('name')
let postnom = document.getElementById('post')
let prenom = document.getElementById('prenom')
let pays = document.getElementById('pays')
let genre = document.querySelector('select')
let github = document.getElementById('git')
let button = document.getElementById('button')
let form = document.getElementById('form')
let tableBody = document.querySelector('table tbody')

let editMode = false
let editionID = null

editModeEnabled(editMode);


let identites = [
    {
        'nom': "Mumbere",
        'postnom' : "Wasukundi",
        'prenom' : "Sammy",
        'pays' : "congo",
        'github': "https://github.com/sammywasukundi",
        'genre': "M"
    }

]


function loadTasksInTable() {
    tableBody.innerHTML = ''

    for (const identite of identites) {
        let temp = `<tr>

        <td> ${identite.nom}</td>
        <td> ${identite.postnom}</td>
        <td> ${identite.prenom}</td>
        <td> ${identite.pays}</td>
        <td> ${identite.genre}</td>
        <td> ${identite.github}</td>

        <td>
        <button class="btn btn-outline-dark" data-nom="${identite.nom}" data-postnom="${identite.postnom}" data-prenom="${identite.prenom}" 
        data-pays="${identite.pays}" data-genre="${identite.genre}" data-github="${identite.github}" 
        onclick= "editIdentite(this)"> Modifier</button>
        <button class="btn btn-outline-dark" onclick="deleteIdentite(this, ${identites.indexOf(identite)}); confirmer()"> Supprimer</button>
        </td>
        </tr>`

        tableBody.innerHTML += temp
    }
}
loadTasksInTable()

form.addEventListener('submit', function(e){
    e.preventDefault();

    let nomValue = nom.value
    let postnomValue = postnom.value
    let prenomValue = prenom.value
    let paysValue = pays.value
    let genreValue = genre.value
    let githubValue = github.value

    if(editMode) {
        updateIdentite(nomValue,postnomValue,prenomValue,paysValue,genreValue,githubValue)
    } else {
        addIdentite(nomValue,postnomValue,prenomValue,paysValue,genreValue,githubValue);
    }
    
})


function updateIdentite() {
    editionID.nom =nom.value,
    editionID.postnom = postnom.value,
    editionID.prenom = prenom.value,
    editionID.pays = pays.value,
    editionID.genre = genre.value,
    editionID.github = github.value;
    // init
    identites.find((t) => t.nom == editionID.nom)
    loadTasksInTable()

    editModeEnabled(false)
}


function addIdentite() {
    let apprenant = {
        'nom': nom.value,
        'postnom' : postnom.value,
        'prenom' : prenom.value,
        'pays' : pays.value,
        'genre' : genre.value,
        'github':  github.value
    }

    identites.push(apprenant)

    loadTasksInTable()
        nom.value = ''
        postnom.value = ''
        prenom.value = ''
        pays.value = ''
        genre.value = ''
        github.value = ''
}
// 
function nettoyer(){
    
    Nom.value=''
    PostNom.value=''
    prenom.value=''
    pays.value=''
    genre.value=''
    GitHub.value=''
}

function deleteIdentite(e){
    e.parentNode.parentNode.remove()
    nettoyer()
}
// 
function deleteIdentite(e, index){
    identites.splice(index, 1)
    loadTasksInTable()
}

const confirmer = () =>{
    var question = confirm("Voulez-vous vraiment supprimer?");
    if(question){
        return true;
    }else{
        return false;
    } 
}


function editIdentite(e, identite) {
    editModeEnabled(true)
    nom.value = e.dataset.nom
    postnom.value=e.dataset.postnom
    prenom.value=e.dataset.prenom
    pays.value=e.dataset.pays
    genre.value=e.dataset.genre
    github.value=e.dataset.github
    editionID = identites.find((t) => t.nom == e.dataset.nom)
}


function editModeEnabled(enabled) {
    if(enabled) {
        editMode = true
        button.innerText = "Modifier"
    } else {
        editMode = false
        button.innerText = "Ajouter"
        editionID = null
        nom.value = ''
        postnom.value = ''
        prenom.value = ''
        pays.value = ''
        genre.value = ''
        github.value = ''
    }
    
}
