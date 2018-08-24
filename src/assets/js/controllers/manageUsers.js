const ManageUsers = (function () {
    // tenta pegar a lista de usuários, senão cria um objeto
    var users = [];
    var userStorage = localStorage.getItem("users");

    // se for uma string transforma em array
    if (!(userStorage instanceof Array) && typeof(userStorage) === "string")
        JSON.parse(userStorage).forEach(u => users.push(new User(u)));

    const find = (predicate) =>
        typeof (predicate) === "function" && users.find(predicate);
    
    const save = (user) => {
        let u;
        console.log(sessionStorage.getItem("emailOriginal"));
        if(sessionStorage.getItem("emailOriginal")) {
            console.log("editando");
            u = find(u => u.email === sessionStorage.getItem("emailOriginal"));
            sessionStorage.removeItem("emailOriginal");   
        }
        else {
            console.log("criando");
            u = find(u => u.email === user.email);
        }

        console.log("Entrou no metodo salvar");
        console.log(u);
        console.log(user);
        // se achou seta as propriedades
        if (u) {
            console.log("Achou U");
            u.name = user.name;
            u.password - user.password;
            console.log("ASSIGNOU O OBBJETO PORRA");
        } else {
            // se não achou adicionar o usuário
            console.log("Ta tentando adicionar");
            users.push(user);
            console.log("deu push");
        }
        localStorage.setItem("users", JSON.stringify(users));
        console.log("deu set item");
        var userSession = new User(JSON.parse(sessionStorage.getItem("user")));
        console.log("user sessao " + userSession);
        
        if(u && userSession.email ==  u.email){
            console.log("entrou no if");
            sessionStorage.setItem("user", JSON.stringify(u))
        }
        console.log("saiu do manageUser");
    }

    const login = (email, password) => {
        var user = find(u => u.email === email && u.password === password);

        if (!user) return false;

        sessionStorage.setItem("user", JSON.stringify(user))
        return true;
    }

    const logged = () => {
        var user = sessionStorage.getItem("user");

        if (!user) window.location.href = "Login/index.html";

        return new User(JSON.parse(user));
    }

    const logout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "index.html";
    }
    function del(email) {
        var index = users.findIndex(u => u.email === email);
        console.log(index);
        console.log(users);
        if (index > -1) {
            console.log("deletando...");
            users = users.slice(index);
        }
        console.log("deletado");
        console.log(users);
        localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(users));
    }

    return {
        getAll: () => users,
        find: find,
        save: save,
        login: login,
        logged: logged,
        logout: logout,
        delete: del
    }
})();