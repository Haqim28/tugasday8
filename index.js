const { response } = require('express')
const express = require('express')
const app = express()
const port = 8000
let dataProjects = []

app.set('view engine','hbs') 

app.use('/assets', express.static(__dirname + '/assets'))
app.use(express.urlencoded({extended: false}))

let isLogin = true

app.get('/', function(request,respond){
    

    //apa yg mau kita map (perulangan)
    let data = dataProjects.map(function(item){
        return {
            ...item,
            isLogin,
            duration: distance(item.startDate,item.endDate),
        }
    })

    respond.render('index', {isLogin, project : data} ); 
})

app.get('/add-project', function(request,respond){
    respond.render('addProject')
})

app.post('/add-project', function(request,respond){
    let projectName = request.body.inputprojectname
    let startDate = request.body.startdate
    let endDate = request.body.enddate
    let description = request.body.description
    
    let projects = {
        projectName,
        startDate,
        endDate,
        description,
    }

    dataProjects.push(projects);
   
    respond.redirect('/')
})
app.get('/detail-project', function(request,respond){
    respond.render('projectDetail')
})

app.get('/detail-project/:name', function(request,respond){
    
    let id=request.params.name
   
    
    respond.render('projectDetail', {
        id,
        title: 'Selamat Datang',
        
    })
})

app.get('/delete-project/:index', function (request,respond) {
    //console.log(request.params); 
    let index =request.params.index;   
    
    dataProjects.splice(index,1);



    respond.redirect('/')
})


app.get('/update-project/:index',function(request,respond){
    let index = request.params.index
    

    let data = {
        projectName: dataProjects[index].projectName,
        startDate: dataProjects[index].startDate,
        endDate: dataProjects[index].endDate,
        description: dataProjects[index].description

    }
    
    respond.render('updateProject',{index, data})
})
app.post('/update-project/:index',function(request,respond){
    let index = request.params.index
    
    dataProjects[index].projectName = request.body.inputprojectname
    dataProjects[index].startDate = request.body.startdate
    dataProjects[index].endDate = request.body.enddate
    dataProjects[index].description = request.body.description

    respond.redirect('/')
})

app.get('/contact', function(request,respond){
    respond.render('contact')
})

app.get('/project-detail/:index', function(request,respond){
    let index = request.params.index
    let data = dataProjects[index]
    data = {
        projectName: data.projectName,
        startDate: getTanggal(data.startDate),
        endDate: getTanggal(data.endDate),
        description: data.description,
        duration: distance(data.startDate,data.endDate),
    }
    

    respond.render('projectDetail',{data})
})

function distance(start,end){
    let bulan = 0;
	const date1 = new Date(start);
	const date2 = new Date(end);
	const time = Math.abs(date2 - date1);
	let days = Math.ceil(time / (1000 * 60 * 60 *24) );
	if(days<30){
		return `${days} Hari`
	
    }else 
		{	do{
				bulan++;
				days-=30;	
			}while(days>=30);
		}
    
    if(days==0 && bulan>0){
            return `${bulan} Bulan`
    }else
    return `${bulan} Bulan ${days} Hari`
}

function getTanggal(tanggal){
    let time = new Date(tanggal)

    let date = time.getDate()
    let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let fulldate =  `${date} ${month[monthIndex]} ${year}`
    return fulldate
}
app.listen(port,function(){
    console.log(`Server running on port ${port}`);
})

