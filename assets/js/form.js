function submitData(){

    let name = document.getElementById("inputcontactname").value
    console.log(name);
    let email = document.getElementById("inputcontactemail").value
    let phone = document.getElementById("inputcontactphone").value
    let subject = document.getElementById("selectcontactsubject").value
    let message = document.getElementById("inputcontactmessage").value

    if( name== ""){
       return alert("nama wajib diisi")
    } else if(email == ""){
       return alert("email wajib diisi")
    } else if(phone == ""){
       return alert("phone wajib diisi")
    } else if(subject == ""){
       return alert("subject wajib diisi")
    } else if(message == ""){
       return alert("message wajib diisi")
    }
    bukaMail(name,email,phone,subject,message);    
}

function bukaMail(name,email,phone,subject,message){
    const emailReceiver = "amirul281000@gmail.com"
    let a = document.createElement('a')
    a.href=`mailto:${emailReceiver}?subject=${subject}&body=Hallo nama saya ${name}, ${message}, silahkan kontak saya dengan email ${email}, telp ${phone}`
    a.click()
}