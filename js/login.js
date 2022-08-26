function setUsrName() {
    let id=document.getElementById("floatingInput").value;
    console.log(id);
    localStorage.setItem("usrName", id);
}