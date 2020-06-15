var studies = {study1:'Study1', study2:'Study2'}
var countries = {ind:'India', fra:'France'}
var hospitals = {hosp1:'hospital1', hosp2:'hospital2', hosp3:'hospital3', hosp4:'hospital4', hosp5:'hospital5', hosp6:'hospital6', hosp7:'hospital7'}

var currentStudy = ''
var newList = {}

function drop(event) {
  event.preventDefault()

  var data = event.dataTransfer.getData("text")
  event.target.appendChild(document.getElementById(data))
  newList[currentStudy]['unTaggedHospitals'] = [...document.querySelectorAll('#hospitalsList > div')].map(({ id }) => id)

  Object.keys(countries).forEach( country => {
    newList[currentStudy][country] = [...document.querySelectorAll('#'+country+' > div')].map(({ id }) => id)
  })

}

function allowDrop(event) {
  event.preventDefault()
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id)
}

function loadClinicalStudy() {
  for (let study in studies) {
    newList[study]={}
    newList[study]['unTaggedHospitals'] = Object.keys(hospitals)

    Object.keys(countries).forEach( country => {
      newList[study][country] = []
    })
  }

  // Reset study to default...
  document.getElementById('clinicalStudyList').innerHTML = ""

  for (var idx in studies) {
    document.getElementById('clinicalStudyList').innerHTML += "<article class='studyTitle' id='" +idx+"' onclick=showStudies('" + idx + "')>" +studies[idx]+ "</article>"
  }

  showStudies()
}

function showStudies(name = 'study1') {
  currentStudy && document.getElementById(currentStudy).classList.remove("studySelected");
  currentStudy = name
  document.getElementById('drugTitle').innerHTML = studies[name]
  document.getElementById(currentStudy).classList.add('studySelected')

  createCountries()
  createHospitalList()
}

function createCountries() {
  // Resetting country list to default state...
  document.getElementById('countriesList').innerHTML = ''

  for (let i in countries) {
    document.getElementById('countriesList').innerHTML += "<div class='countryName'>" +countries[i]+ "</div>"
    + "<div ondrop='drop(event)' ondragover='allowDrop(event)' class='dropBox' id='" +i+ "'></div>"
    for(let hospital of newList[currentStudy][i]) {
      document.getElementById(i).innerHTML += "<div class='hospitalName' draggable='true' ondragstart='drag(event)' id='" +hospital+"'>" +hospitals[hospital]+ "</div>"
    }
  }
  
}

function createHospitalList() {
  document.getElementById('hospitalsList').innerHTML = ''
  for (let i of newList[currentStudy].unTaggedHospitals) {
    document.getElementById('hospitalsList').innerHTML += "<div class='hospitalName' draggable='true' ondragstart='drag(event)' id='" +i+"'>" +hospitals[i]+ "</div>"
  }
}


// var hospitals = ["Columbia Asia","Sahyadri hospital","Ruby clinic","Imax hospital","Jehangir hospital","Sassoon hospital","Sancheti hospital"]

// var array = [
//   {
//     "study_name": "study 1",
//     "countries": [
//       {
//         "country_name": "India",
//         "hospitals": []
//       },
//       {
//         "country_name": "France",
//         "hospitals": []
//       }
//     ]
//   },
//   {
//     "study_name": "study 2",
//     "countries": [
//       {
//         "country_name": "India",
//         "hospitals": []
//       },
//       {
//         "country_name": "France",
//         "hospitals": []
//       }
//     ]
//   }
// ]


// function loadClinicalStudy() {
//   for (let study in studies) {
//     updatedList[study]={}
//     updatedList[study]['unTaggedHospitals'] = Object.keys(hospitals)
//     Object.keys(countries).forEach( country => {
//       updatedList[study][country] = []
//     })
//   }
//   console.log(updatedList)
//   document.getElementById('studyList').innerHTML = ""
//   for (let i in studies) {
//     document.getElementById('studyList').innerHTML += "<article class='studyTitle' id='" +i+"' onclick=displayName('" + i + "')>" +studies[i]+ "</article>"
//   }

//   displayName()
// }

// function addHospital(hospitalName, countryName, studyIndex) {
//   // Check if hospital already exist...
//   var object = array[studyIndex]

//   var countriesList = object["countries"]

//   const filterCondition = (element) => element["country_name"] == countryName;
//   var idx = countriesList.findIndex(filterCondition)
//   var countryObject = countriesList[idx]

//   var hospitals = countryObject.hospitals
//   const result = hospitals.filter(temp => hospitalName == temp);

//   //If hospital is already present in the object list don't add it.
//    if (result.length > 0) {
//    	  return; 
//    } 

//   hospitals.push(hospitalName)
  
//   countryObject.hospitals = hospitals
//   countriesList[idx] = countryObject

//   object["countries"] = countriesList
//   array[studyIndex] = object
// }

// function removeHospital(hospitalName, countryName, studyIndex) {
//   var object = array[studyIndex]
//   var countriesList = object["countries"]

//   const filterCondition = (element) => element["country_name"] == countryName;
//   var idx = countriesList.findIndex(filterCondition)
//   var countryObject = countriesList[idx]

//   var hospitals = countryObject.hospitals
  
//   var idx = hospitals.indexOf(hospitalName);
//   if (idx !== -1) hospitals.splice(idx, 1);

//   countryObject.hospitals = hospitals
//   countriesList[idx] = countryObject

//   object["countries"] = countriesList
//   array[studyIndex] = object

//   console.log(array[studyIndex])
// }