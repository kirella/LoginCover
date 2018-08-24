$(document).ready(function () {
    var $tebela = $("#tabelaUsuarios");
    var users = [];
    var tabela = "";
    var userStorage = localStorage.getItem("users");
    // se for uma string transforma em array
    if (!(userStorage instanceof Array) && typeof(userStorage) === "string")
        JSON.parse(userStorage).forEach(u => users.push(new User(u)));
        
    users.forEach(AdicionarTabela);
    $tebela.html(tabela);
        
    function AdicionarTabela(element, index, array) {
        //cabeçalho da tabela
        if(index === 0 ) 
            tabela = "<table class=\"table table-striped\">  <thead> <tr>     <th scope==\"col\">Nome</th>        <th scope=\"col\">Email</th>        <th scope=\"col\">Senha</th>        <th scope=\"col\">Opções</th>      </tr> </thead>    <tbody>";
    
        //corpo da tabela
        tabela +=    "    <tr>    <th scope=\"row\">"+array[index]["name"]+"</th>    <td>"+array[index]["email"]+"</td>    <td>*******</td>    <td><a onClick=\"carregarUsuario('"+array[index]["email"]+"')\" href=\"#exampleModalLong\" data-toggle=\"modal\" data-target=\"#exampleModalLong\"><i class=\"fas fa-user-edit\"></i></a> | <a onClick=\"deletarUsuario('"+array[index]["email"]+"')\"><i class=\"fas fa-user-times\"></i></a></td>  </tr>";

        // final da tabela
        if(array.length-1 === index ) 
            tabela += "</tbody>        </table>";
        
    }

    $("#formEditar").submit(function (ev) {
        var $name = $("#name"),
        $email = $("#email"),
        $password = $("#password");
        try {
            var user = new User({
                name: $name.val(),
                password: $password.val()
            });
            user.save();
        } catch (error) {
            console.log(error);
        }
        ev.preventDefault();
    
        window.location.href = "index.html";
    });
});

function carregarUsuario(email) {
    var usuario
    console.log(email);
    if(email == null || email == ""){
        var userSession = new User(JSON.parse(sessionStorage.getItem("user")));
        usuario  = ManageUsers.find(u => u.email === userSession.email);
    }else{
        usuario  = ManageUsers.find(u=> u.email === email);
    } 
    document.getElementById("name").value = usuario.name;
    document.getElementById("email").value = usuario.email;
    sessionStorage.setItem("emailOriginal", usuario.email);
    document.getElementById("password").value = usuario.password;    
}

function deletarUsuario(email) {
    if (email != "" && confirm("Você realmente quer deletar o usuário?")) {

        ManageUsers.delete(email);

        /*
        var users = [];
        var usersCerto = [];
        var userStorage = localStorage.getItem("users");
        // se for uma string transforma em array
        if (!(userStorage instanceof Array) && typeof(userStorage) === "string") 
                JSON.parse(userStorage).forEach(u =>users.push(new User(u)));
        

        users.forEach(deleta);
        function deleta(element, index, array) {
            if (users[index]["email"] != email)
            usersCerto.push(users[index]);
        }

        localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(usersCerto));
        

      var userStorage = localStorage.getItem("users");
        var usuario = ManageUsers.find(u=> u.email === email);
        var u = new User(usuario)
        console.log(usuario);
        console.log(u);
        localStorage.removeItem("users", 0);
        
        var a = localStorage.getItem("users");  
        a.removeItem(i); 
        */           
    } 
    
}