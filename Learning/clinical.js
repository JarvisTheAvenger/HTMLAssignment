var studies = ['study1', 'study2']
var countries = ['India', 'France']
var hospitals = ['hospital1','hospital2', 'hospital3', 'hospital4', 'hospital5', 'hospital6', 'hospital7']

var currentStudy = ''
var newList = {}

function loadClinicalStudy() {
  
  for (let study of studies) {
    newList[study] = {}
    newList[study]['nonNetworkHospital'] = hospitals
    
    // For every country Set hospitals to empty.
       for (let country of countries) {
         newList[study][country] = []
       }
   }

  // Reset study to default...
  document.getElementById('clinicalStudyList').innerHTML = ""

  for (let studyName of studies) {
    document.getElementById('clinicalStudyList').innerHTML += "<article class='studyTitle' id='" +studyName+"' onclick=showStudies('" +studyName+ "')>" +studyName+ "</article>"
  }

  showStudies()
}

function showStudies(name = 'study1') {
  debugger

  currentStudy && document.getElementById(currentStudy).classList.remove("studySelected")
  currentStudy = name
  document.getElementById('drugTitle').innerHTML = name
  document.getElementById(currentStudy).classList.add('studySelected')

  initilizeCountryList()
  initilizeHospitalList()
}

function initilizeCountryList() {
  // Resetting country list to default state...
  document.getElementById('countriesList').innerHTML = ''

  for (let country of countries) {
    document.getElementById('countriesList').innerHTML += "<div class='countryName'>"+country+"</div>"
    + "<div ondrop='drop(event)' ondragover='allowDrop(event)' class='dropBox' id='"+country+"'></div>"

    for(let hospital of newList[currentStudy][country]) {
      console.log(hospital)
      document.getElementById(country).innerHTML += "<div class='hospitalName' draggable='true' ondragstart='drag(event)' id='"+hospital+"'>"+hospital+"</div>"
    }
  }
}

function initilizeHospitalList() {
  document.getElementById('hospitalsList').innerHTML = ''
  for (let hospital of newList[currentStudy].nonNetworkHospital) {
    document.getElementById('hospitalsList').innerHTML += "<div class='hospitalName' draggable='true' ondragstart='drag(event)' id='"+hospital+"'>"+hospital+"</div>"
  }
}

//MARK: Drag/Drop event related

function drop(event) {
  event.preventDefault()

  var data = event.dataTransfer.getData("text")
  
  console.log("*******************drop event************************")
  event.target.appendChild(document.getElementById(data))

  let temp = [...document.querySelectorAll('#hospitalsList > div')]
  let unselectedHospitals = []

  for (let el of temp) {
     unselectedHospitals.push(el.id)
  }

  console.log("*******************Unselected hospitals************************")
  console.log(unselectedHospitals)

  newList[currentStudy]['nonNetworkHospital'] = unselectedHospitals

  for (const countryName of countries) {
    let selectedHospitalElements = [...document.querySelectorAll('#'+countryName+' > div')]
    let selectedHospitals = []
     
     for (let el of selectedHospitalElements) {
        selectedHospitals.push(el.id) 
     }

     console.log(selectedHospitals)

     newList[currentStudy][countryName] = selectedHospitals
  }

}

function allowDrop(event) {
  event.preventDefault()
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id)
}
